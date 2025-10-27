// ==================== 全局变量 ====================
let selectedFile = null;

// 支持的文件格式列表
const SUPPORTED_FORMATS = {
    // 文档类
    'pdf': 'PDF文档',
    'doc': 'Word文档',
    'docx': 'Word文档',
    'xls': 'Excel表格',
    'xlsx': 'Excel表格',
    'ppt': 'PowerPoint演示',
    'pptx': 'PowerPoint演示',
    'txt': '文本文件',
    'rtf': '富文本文件',
    
    // 图片类
    'jpg': '图片文件',
    'jpeg': '图片文件',
    'png': '图片文件',
    'gif': '图片文件',
    'bmp': '图片文件',
    'webp': '图片文件',
    'svg': '矢量图',
    'ico': '图标文件',
    
    // 视频类
    'mp4': '视频文件',
    'avi': '视频文件',
    'mov': '视频文件',
    'wmv': '视频文件',
    'flv': '视频文件',
    'mkv': '视频文件',
    'webm': '视频文件',
    
    // 音频类
    'mp3': '音频文件',
    'wav': '音频文件',
    'flac': '音频文件',
    'aac': '音频文件',
    'm4a': '音频文件',
    'ogg': '音频文件',
    
    // 压缩包类
    'zip': 'ZIP压缩包',
    'rar': 'RAR压缩包',
    '7z': '7Z压缩包',
    'tar': 'TAR归档',
    'gz': 'GZ压缩文件',
    
    // 其他
    'json': 'JSON数据',
    'xml': 'XML文件',
    'csv': 'CSV表格',
    'sql': 'SQL文件',
    'exe': '可执行文件',
    'dll': '动态链接库',
    'apk': 'Android安装包',
    'ipa': 'iOS安装包'
};

// ==================== DOM 元素 ====================
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const fileName = document.getElementById('fileName');
const fileSize = document.getElementById('fileSize');
const fileType = document.getElementById('fileType');
const optionsSection = document.getElementById('optionsSection');
const statusSection = document.getElementById('statusSection');
const successSection = document.getElementById('successSection');
const statusText = document.getElementById('statusText');
const resetBtn = document.getElementById('resetBtn');
const corruptBtn = document.getElementById('corruptBtn');
const continueBtn = document.getElementById('continueBtn');

// ==================== 文件上传处理 ====================

// 点击上传区域触发文件选择
uploadArea.addEventListener('click', () => {
    fileInput.click();
});

// 文件选择处理
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        handleFileSelect(file);
    }
});

// 拖拽上传处理
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const file = e.dataTransfer.files[0];
    if (file) {
        handleFileSelect(file);
    }
});

// ==================== 文件处理函数 ====================

/**
 * 处理选中的文件
 * @param {File} file - 用户选择的文件
 */
function handleFileSelect(file) {
    // 获取文件扩展名
    const extension = file.name.split('.').pop().toLowerCase();
    
    // 检查文件格式是否支持
    if (!SUPPORTED_FORMATS[extension]) {
        // 显示不支持的提示
        uploadArea.style.backgroundColor = 'var(--gray-200)';
        uploadArea.style.borderColor = 'var(--gray-400)';
        uploadArea.style.opacity = '0.6';
        
        alert(`不支持的文件格式：.${extension}\n\n支持的格式包括：\nPDF, DOCX, XLSX, PPTX, MP4, MP3, PNG, JPG, ZIP, RAR 等\n\n请选择支持的文件格式。`);
        
        // 重置上传区域样式
        setTimeout(() => {
            uploadArea.style.backgroundColor = '';
            uploadArea.style.borderColor = '';
            uploadArea.style.opacity = '';
        }, 2000);
        
        return;
    }
    
    selectedFile = file;
    
    // 显示文件信息
    fileName.textContent = file.name;
    fileSize.textContent = formatFileSize(file.size);
    fileType.textContent = SUPPORTED_FORMATS[extension] || file.type || '未知类型';
    
    // 显示文件信息和选项区域
    fileInfo.style.display = 'block';
    optionsSection.style.display = 'block';
    
    // 隐藏上传区域
    uploadArea.style.display = 'none';
}

/**
 * 格式化文件大小
 * @param {number} bytes - 文件字节数
 * @returns {string} 格式化后的文件大小
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
    const exponent = Math.min(
        Math.floor(Math.log(bytes) / Math.log(k)),
        sizes.length - 1
    );
    const size = bytes / Math.pow(k, exponent);

    return Math.round(size * 100) / 100 + ' ' + sizes[exponent];
}

// ==================== 按钮事件处理 ====================

/**
 * 重置按钮 - 重新选择文件
 */
resetBtn.addEventListener('click', () => {
    resetApp();
});

/**
 * 破坏文件按钮
 */
corruptBtn.addEventListener('click', async () => {
    if (!selectedFile) return;
    
    // 获取选中的破坏程度
    const level = document.querySelector('input[name="level"]:checked').value;
    
    // 显示处理状态
    optionsSection.style.display = 'none';
    fileInfo.style.display = 'none';
    statusSection.style.display = 'block';
    statusText.textContent = '正在破坏文件...';
    
    // 模拟处理延迟，让用户看到处理过程
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
        // 执行文件破坏
        await corruptFile(selectedFile, level);
        
        // 显示成功界面
        statusSection.style.display = 'none';
        successSection.style.display = 'block';
    } catch (error) {
        console.error('文件破坏失败:', error);
        alert('文件破坏失败，请重试');
        resetApp();
    }
});

/**
 * 继续破坏其他文件按钮
 */
continueBtn.addEventListener('click', () => {
    resetApp();
});

// ==================== 文件破坏核心逻辑 ====================

/**
 * 破坏文件的核心函数
 * @param {File} file - 要破坏的文件
 * @param {string} level - 破坏程度 (light/medium/heavy)
 */
async function corruptFile(file, level) {
    // 读取文件为 ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    
    // 获取文件扩展名
    const extension = file.name.split('.').pop().toLowerCase();
    
    // 根据破坏程度执行不同的破坏策略
    switch (level) {
        case 'light':
            corruptLight(uint8Array, extension);
            break;
        case 'medium':
            corruptMedium(uint8Array, extension);
            break;
        case 'heavy':
            corruptHeavy(uint8Array, extension);
            break;
    }
    
    // 下载破坏后的文件
    downloadCorruptedFile(uint8Array, file.name);
}

/**
 * 轻度破坏 - 修改文件头部
 * 破坏文件的魔数（Magic Number），使文件无法被识别
 * @param {Uint8Array} data - 文件数据
 * @param {string} extension - 文件扩展名
 */
function corruptLight(data, extension) {
    // ZIP文件特殊处理：破坏文件头和中央目录
    if (extension === 'zip') {
        // ZIP文件头标识: 50 4B 03 04 (PK..)
        // 破坏前4个字节
        if (data.length >= 4) {
            data[0] = Math.floor(Math.random() * 256);
            data[1] = Math.floor(Math.random() * 256);
            data[2] = Math.floor(Math.random() * 256);
            data[3] = Math.floor(Math.random() * 256);
        }
        
        // 查找并破坏中央目录标识: 50 4B 01 02
        for (let i = 0; i < data.length - 4; i++) {
            if (data[i] === 0x50 && data[i+1] === 0x4B && 
                data[i+2] === 0x01 && data[i+3] === 0x02) {
                data[i] = Math.floor(Math.random() * 256);
                data[i+1] = Math.floor(Math.random() * 256);
                break;
            }
        }
    } else {
        // 其他文件：修改文件头部的前 8-16 个字节
        const corruptLength = Math.min(16, data.length);
        
        for (let i = 0; i < corruptLength; i++) {
            // 随机修改字节值
            data[i] = Math.floor(Math.random() * 256);
        }
    }
}

/**
 * 中度破坏 - 修改文件头部和关键位置
 * @param {Uint8Array} data - 文件数据
 * @param {string} extension - 文件扩展名
 */
function corruptMedium(data, extension) {
    const fileSize = data.length;
    
    // ZIP文件特殊处理
    if (extension === 'zip') {
        // 1. 破坏文件头
        if (fileSize >= 4) {
            data[0] = Math.floor(Math.random() * 256);
            data[1] = Math.floor(Math.random() * 256);
            data[2] = Math.floor(Math.random() * 256);
            data[3] = Math.floor(Math.random() * 256);
        }
        
        // 2. 查找并破坏所有 PK 标识
        for (let i = 0; i < fileSize - 1; i++) {
            if (data[i] === 0x50 && data[i+1] === 0x4B) {
                data[i] = Math.floor(Math.random() * 256);
                data[i+1] = Math.floor(Math.random() * 256);
            }
        }
        
        // 3. 破坏文件尾部（EOCD记录）
        const tailLength = Math.min(100, fileSize);
        for (let i = fileSize - tailLength; i < fileSize; i++) {
            if (Math.random() > 0.5) {
                data[i] = Math.floor(Math.random() * 256);
            }
        }
    } else {
        // 其他文件的中度破坏
        // 1. 破坏文件头部（前 32 字节）
        const headerLength = Math.min(32, fileSize);
        for (let i = 0; i < headerLength; i++) {
            data[i] = Math.floor(Math.random() * 256);
        }
        
        // 2. 破坏文件中间部分（每隔 1KB 破坏 16 字节）
        const interval = 1024; // 1KB
        const corruptSize = 16;
        
        for (let i = interval; i < fileSize; i += interval) {
            const end = Math.min(i + corruptSize, fileSize);
            for (let j = i; j < end; j++) {
                data[j] = Math.floor(Math.random() * 256);
            }
        }
    }
}

/**
 * 重度破坏 - 随机修改大量数据
 * @param {Uint8Array} data - 文件数据
 * @param {string} extension - 文件扩展名
 */
function corruptHeavy(data, extension) {
    const fileSize = data.length;
    
    // ZIP和RAR等压缩文件特殊处理
    if (extension === 'zip' || extension === 'rar' || extension === '7z') {
        // 完全破坏整个文件结构
        // 1. 破坏文件头部
        const headerLength = Math.min(100, fileSize);
        for (let i = 0; i < headerLength; i++) {
            data[i] = Math.floor(Math.random() * 256);
        }
        
        // 2. 破坏所有可能的标识符
        for (let i = 0; i < fileSize - 1; i++) {
            // 破坏 PK 标识（ZIP）
            if (data[i] === 0x50 && data[i+1] === 0x4B) {
                data[i] = Math.floor(Math.random() * 256);
                data[i+1] = Math.floor(Math.random() * 256);
            }
            // 破坏 Rar! 标识（RAR）
            if (i < fileSize - 3 && data[i] === 0x52 && data[i+1] === 0x61 && 
                data[i+2] === 0x72 && data[i+3] === 0x21) {
                data[i] = Math.floor(Math.random() * 256);
                data[i+1] = Math.floor(Math.random() * 256);
            }
        }
        
        // 3. 随机破坏 50% 的文件内容
        const corruptRatio = 0.5;
        const totalCorrupt = Math.floor(fileSize * corruptRatio);
        
        for (let i = 0; i < totalCorrupt; i++) {
            const randomIndex = Math.floor(Math.random() * fileSize);
            data[randomIndex] = Math.floor(Math.random() * 256);
        }
    } else {
        // 其他文件的重度破坏
        // 1. 完全破坏文件头部（前 64 字节）
        const headerLength = Math.min(64, fileSize);
        for (let i = 0; i < headerLength; i++) {
            data[i] = Math.floor(Math.random() * 256);
        }
        
        // 2. 随机破坏 30% 的文件内容
        const corruptRatio = 0.3;
        const totalCorrupt = Math.floor(fileSize * corruptRatio);
        
        for (let i = 0; i < totalCorrupt; i++) {
            const randomIndex = Math.floor(Math.random() * fileSize);
            data[randomIndex] = Math.floor(Math.random() * 256);
        }
        
        // 3. 每隔 512 字节破坏 32 字节
        const interval = 512;
        const corruptSize = 32;
        
        for (let i = interval; i < fileSize; i += interval) {
            const end = Math.min(i + corruptSize, fileSize);
            for (let j = i; j < end; j++) {
                data[j] = Math.floor(Math.random() * 256);
            }
        }
    }
}

/**
 * 下载破坏后的文件
 * @param {Uint8Array} data - 破坏后的文件数据
 * @param {string} originalName - 原始文件名
 */
function downloadCorruptedFile(data, originalName) {
    // 创建 Blob 对象
    const blob = new Blob([data], { type: 'application/octet-stream' });
    
    // 创建下载链接
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    // 保持原文件名，添加 _corrupted 后缀
    const nameParts = originalName.split('.');
    const extension = nameParts.length > 1 ? nameParts.pop() : '';
    const baseName = nameParts.join('.');
    a.download = extension ? `${baseName}_corrupted.${extension}` : `${originalName}_corrupted`;
    
    // 触发下载
    document.body.appendChild(a);
    a.click();
    
    // 清理
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ==================== 应用重置 ====================

/**
 * 重置应用到初始状态
 */
function resetApp() {
    selectedFile = null;
    fileInput.value = '';
    
    // 隐藏所有区域
    fileInfo.style.display = 'none';
    optionsSection.style.display = 'none';
    statusSection.style.display = 'none';
    successSection.style.display = 'none';
    
    // 显示上传区域
    uploadArea.style.display = 'block';
    
    // 重置单选按钮
    document.querySelector('input[name="level"][value="light"]').checked = true;
}

// ==================== 初始化 ====================
console.log('文件破坏工具已加载');
console.log('支持的破坏程度：轻度、中度、重度');
console.log('⚠️ 请勿用于不当用途');
