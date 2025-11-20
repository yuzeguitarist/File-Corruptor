/**
 * Web Worker for cryptographic operations
 * 将CPU密集型的密码学操作移到后台线程，避免阻塞UI
 */

// 消息处理器
self.addEventListener('message', async (event) => {
    const { type, id, ...params } = event.data;
    
    try {
        let result;
        
        switch (type) {
            case 'deriveKey':
                result = await deriveKeyFromPassword(params.password, params.salt);
                break;
                
            case 'encrypt':
                result = await encryptData(params.data, params.password);
                break;
                
            case 'decrypt':
                result = await decryptData(params.encryptedData, params.password, params.iv, params.salt);
                break;
                
            case 'generateDiff':
                result = await generateDiff(params.original, params.corrupted, params.useChunked);
                break;
                
            default:
                throw new Error(`Unknown operation type: ${type}`);
        }
        
        // 发送成功结果
        self.postMessage({
            id,
            success: true,
            result
        });
        
    } catch (error) {
        // 发送错误结果
        self.postMessage({
            id,
            success: false,
            error: error.message
        });
    }
});

/**
 * 使用PBKDF2从密码派生密钥（Worker版本）
 */
async function deriveKeyFromPassword(password, salt) {
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);
    
    const baseKey = await crypto.subtle.importKey(
        'raw',
        passwordBuffer,
        'PBKDF2',
        false,
        ['deriveKey']
    );
    
    // 这里执行10万次迭代，但不会阻塞主线程
    const key = await crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: salt,
            iterations: 100000,
            hash: 'SHA-256'
        },
        baseKey,
        {
            name: 'AES-GCM',
            length: 256
        },
        true, // 可导出，用于传回主线程
        ['encrypt', 'decrypt']
    );
    
    // 导出密钥以便传回主线程
    const exportedKey = await crypto.subtle.exportKey('raw', key);
    return {
        key: Array.from(new Uint8Array(exportedKey)),
        salt: Array.from(salt)
    };
}

/**
 * 加密数据（Worker版本）
 */
async function encryptData(data, password) {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    
    // 生成随机盐和IV
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    // 派生密钥
    const keyData = await deriveKeyFromPassword(password, salt);
    const key = await crypto.subtle.importKey(
        'raw',
        new Uint8Array(keyData.key),
        'AES-GCM',
        false,
        ['encrypt']
    );
    
    // 准备数据
    const dataToEncrypt = typeof data === 'string' 
        ? encoder.encode(data)
        : new Uint8Array(data);
    
    // 加密
    const encrypted = await crypto.subtle.encrypt(
        {
            name: 'AES-GCM',
            iv: iv
        },
        key,
        dataToEncrypt
    );
    
    return {
        encrypted: Array.from(new Uint8Array(encrypted)),
        salt: Array.from(salt),
        iv: Array.from(iv)
    };
}

/**
 * 解密数据（Worker版本）
 */
async function decryptData(encryptedData, password, iv, salt) {
    // 转换数组回Uint8Array
    const encryptedArray = new Uint8Array(encryptedData);
    const ivArray = new Uint8Array(iv);
    const saltArray = new Uint8Array(salt);
    
    // 派生密钥
    const keyData = await deriveKeyFromPassword(password, saltArray);
    const key = await crypto.subtle.importKey(
        'raw',
        new Uint8Array(keyData.key),
        'AES-GCM',
        false,
        ['decrypt']
    );
    
    // 解密
    const decrypted = await crypto.subtle.decrypt(
        {
            name: 'AES-GCM',
            iv: ivArray
        },
        key,
        encryptedArray
    );
    
    return Array.from(new Uint8Array(decrypted));
}

/**
 * 生成差异数据（Worker版本）
 */
async function generateDiff(original, corrupted, useChunked) {
    const originalArray = new Uint8Array(original);
    const corruptedArray = new Uint8Array(corrupted);
    
    if (originalArray.length !== corruptedArray.length) {
        throw new Error('File sizes do not match');
    }
    
    const changes = [];
    const chunkSize = 1024 * 1024; // 1MB chunks for processing
    
    // 分块处理以避免内存问题
    for (let offset = 0; offset < originalArray.length; offset += chunkSize) {
        const end = Math.min(offset + chunkSize, originalArray.length);
        
        for (let i = offset; i < end; i++) {
            if (originalArray[i] !== corruptedArray[i]) {
                // 查找连续的变化
                let runLength = 1;
                while (i + runLength < end && 
                       originalArray[i + runLength] !== corruptedArray[i + runLength] &&
                       runLength < 255) {
                    runLength++;
                }
                
                changes.push({
                    offset: i,
                    length: runLength,
                    data: Array.from(originalArray.slice(i, i + runLength))
                });
                
                i += runLength - 1;
            }
        }
        
        // 定期发送进度更新
        if (offset % (10 * chunkSize) === 0) {
            self.postMessage({
                type: 'progress',
                progress: offset / originalArray.length
            });
        }
    }
    
    return {
        changes: changes,
        totalChanges: changes.length,
        fileSize: originalArray.length
    };
}
