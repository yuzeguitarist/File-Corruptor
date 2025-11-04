/**
 * 测试文件扩展名检测逻辑（特别是无扩展名文件的处理）
 *
 * 重要：此测试导入并测试真实的 app.js 代码，而不是重新实现逻辑
 * 这确保测试能够真正验证生产代码的行为
 */

// 导入真实的 app.js 模块
const {
    extractExtension,
    UNIX_EXECUTABLE_NAMES,
    SUPPORTED_FORMATS
} = require('./app.js');

// 测试案例
console.log('=== 测试：无扩展名文件的扩展名检测 ===\n');

const testCases = [
    // Unix 可执行文件（应该返回 'unix-executable'）
    { filename: 'bash', expected: 'unix-executable', category: 'Unix 可执行文件' },
    { filename: 'python', expected: 'unix-executable', category: 'Unix 可执行文件' },
    { filename: 'node', expected: 'unix-executable', category: 'Unix 可执行文件' },
    { filename: 'docker', expected: 'unix-executable', category: 'Unix 可执行文件' },

    // 普通无扩展名文件（应该返回空字符串）
    { filename: 'README', expected: '', category: '文档文件' },
    { filename: 'CHANGELOG', expected: '', category: '文档文件' },
    { filename: 'AUTHORS', expected: '', category: '文档文件' },
    { filename: 'TODO', expected: '', category: '文档文件' },
    { filename: 'CONTRIBUTING', expected: '', category: '文档文件' },
    { filename: 'INSTALL', expected: '', category: '文档文件' },
    { filename: 'NEWS', expected: '', category: '文档文件' },
    { filename: 'COPYING', expected: '', category: '文档文件' },

    // 有扩展名的文件（正常处理）
    { filename: 'README.md', expected: 'md', category: '普通文件' },
    { filename: 'script.sh', expected: 'sh', category: '普通文件' },
    { filename: 'test.py', expected: 'py', category: '普通文件' },

    // 边界情况
    { filename: 'bash.exe', expected: 'exe', category: '边界情况' },
    { filename: 'README.txt', expected: 'txt', category: '边界情况' },
];

let passed = 0;
let failed = 0;
const failures = [];

testCases.forEach(({ filename, expected, category }) => {
    const result = extractExtension(filename);
    const status = result === expected ? '✅ PASS' : '❌ FAIL';

    if (result === expected) {
        passed++;
    } else {
        failed++;
        failures.push({ filename, expected, result, category });
    }
});

// 显示失败的测试
if (failures.length > 0) {
    console.log('失败的测试：\n');
    failures.forEach(({ filename, expected, result, category }) => {
        console.log(`❌ FAIL [${category}]`);
        console.log(`  文件名: "${filename}"`);
        console.log(`  期望: "${expected}"`);
        console.log(`  实际: "${result}"`);
        console.log();
    });
}

console.log(`\n=== 测试结果 ===`);
console.log(`通过: ${passed}/${testCases.length}`);
console.log(`失败: ${failed}/${testCases.length}`);

if (failed === 0) {
    console.log('\n🎉 所有测试通过！');
    console.log('\n修复验证：');
    console.log('✅ 只有在 UNIX_EXECUTABLE_NAMES 列表中的文件被识别为 unix-executable');
    console.log('✅ README、CHANGELOG 等文档文件不再被误判为可执行文件');
    console.log('✅ 无扩展名的普通文件返回空字符串（触发"不支持的文件格式"提示）');

    // 额外验证：确保测试的是真实代码
    console.log('\n✅ 测试验证：');
    console.log(`  - 使用真实的 extractExtension 函数（来自 app.js）`);
    console.log(`  - 使用真实的 UNIX_EXECUTABLE_NAMES 常量（${UNIX_EXECUTABLE_NAMES.length} 个条目）`);
    console.log(`  - 测试覆盖 ${testCases.length} 个场景`);

    process.exit(0);
} else {
    console.log('\n❌ 存在失败的测试');
    process.exit(1);
}
