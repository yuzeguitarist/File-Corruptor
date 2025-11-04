/**
 * 测试文件扩展名检测逻辑（特别是无扩展名文件的处理）
 */

// 模拟 UNIX_EXECUTABLE_NAMES 列表
const UNIX_EXECUTABLE_NAMES = [
    'bash', 'sh', 'zsh', 'fish', 'tcsh', 'ksh',
    'python', 'python2', 'python3', 'node', 'perl', 'ruby',
    'awk', 'sed', 'grep', 'find', 'git', 'vim', 'nano',
    'npm', 'yarn', 'docker', 'kubectl', 'make', 'cmake'
];

// 模拟 extractExtension 函数的关键逻辑
function extractExtension(filename) {
    if (!filename || typeof filename !== 'string') return '';

    const trimmed = filename.trim();
    if (!trimmed) return '';

    const lower = trimmed.toLowerCase();
    const isDotFile = lower.startsWith('.');
    let sanitized = isDotFile ? lower.slice(1) : lower;

    if (!sanitized) return '';
    if (sanitized.endsWith('.')) {
        sanitized = sanitized.slice(0, -1);
        if (!sanitized) return '';
    }

    const lastDotIndex = sanitized.lastIndexOf('.');
    if (lastDotIndex === -1) {
        // 无扩展名文件处理
        if (!isDotFile) {
            // 只有在已知列表中的才识别为 Unix 可执行文件
            if (UNIX_EXECUTABLE_NAMES.includes(sanitized)) {
                return 'unix-executable';
            }
            // 其他无扩展名文件返回空字符串（不支持）
            return '';
        }
        return isDotFile ? sanitized : '';
    }

    if (lastDotIndex === sanitized.length - 1) {
        const withoutTrailingDot = sanitized.slice(0, lastDotIndex);
        return withoutTrailingDot || '';
    }

    return sanitized.slice(lastDotIndex + 1);
}

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

testCases.forEach(({ filename, expected, category }) => {
    const result = extractExtension(filename);
    const status = result === expected ? '✅ PASS' : '❌ FAIL';

    if (result === expected) {
        passed++;
    } else {
        failed++;
        console.log(`${status} [${category}]`);
        console.log(`  文件名: "${filename}"`);
        console.log(`  期望: "${expected}"`);
        console.log(`  实际: "${result}"`);
        console.log();
    }
});

console.log(`\n=== 测试结果 ===`);
console.log(`通过: ${passed}/${testCases.length}`);
console.log(`失败: ${failed}/${testCases.length}`);

if (failed === 0) {
    console.log('\n🎉 所有测试通过！');
    console.log('\n修复验证：');
    console.log('✅ 只有在 UNIX_EXECUTABLE_NAMES 列表中的文件被识别为 unix-executable');
    console.log('✅ README、CHANGELOG 等文档文件不再被误判为可执行文件');
    console.log('✅ 无扩展名的普通文件返回空字符串（触发"不支持的文件格式"提示）');
} else {
    console.log('\n❌ 存在失败的测试');
    process.exit(1);
}
