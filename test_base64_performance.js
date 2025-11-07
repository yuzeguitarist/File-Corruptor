// 性能测试：arrayToBase64 优化前后对比

// 旧实现（O(n²)）
function arrayToBase64_OLD(array) {
    let binary = '';
    for (let i = 0; i < array.length; i++) {
        binary += String.fromCharCode(array[i]);
    }
    return btoa(binary);
}

// 新实现（O(n)）
function arrayToBase64_NEW(array) {
    const CHUNK_SIZE = 8192;
    const chunks = [];

    for (let i = 0; i < array.length; i += CHUNK_SIZE) {
        const chunk = array.subarray(i, Math.min(i + CHUNK_SIZE, array.length));
        chunks.push(String.fromCharCode.apply(null, chunk));
    }

    const binary = chunks.join('');
    return btoa(binary);
}

// 测试函数
function testPerformance(size, label) {
    console.log(`\n测试 ${label} (${size} 字节):`);

    // 创建测试数据
    const testData = new Uint8Array(size);
    for (let i = 0; i < size; i++) {
        testData[i] = Math.floor(Math.random() * 256);
    }

    // 测试新实现
    const startNew = Date.now();
    const resultNew = arrayToBase64_NEW(testData);
    const timeNew = Date.now() - startNew;
    console.log(`  新实现 (O(n)):  ${timeNew}ms`);

    // 只在小数据集上测试旧实现（避免锁死）
    if (size <= 100000) {
        const startOld = Date.now();
        const resultOld = arrayToBase64_OLD(testData);
        const timeOld = Date.now() - startOld;
        console.log(`  旧实现 (O(n²)): ${timeOld}ms`);
        console.log(`  速度提升: ${(timeOld / timeNew).toFixed(2)}x`);

        // 验证结果一致
        if (resultNew === resultOld) {
            console.log(`  ✓ 结果验证通过`);
        } else {
            console.log(`  ✗ 结果不一致！`);
        }
    } else {
        console.log(`  旧实现: 跳过（数据太大会锁死）`);
    }
}

// 运行测试
console.log('=== Base64 转换性能测试 ===');

testPerformance(1000, '1KB');
testPerformance(10000, '10KB');
testPerformance(100000, '100KB');
testPerformance(1000000, '1MB (新实现)');
testPerformance(5000000, '5MB (新实现)');
testPerformance(10000000, '10MB (新实现)');

console.log('\n=== 测试完成 ===');
