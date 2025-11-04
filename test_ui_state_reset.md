# UI 状态重置测试指南

## 测试目的
验证当所有文件被拒绝时，应用能够正确重置所有UI状态和数据。

## 准备工作

### 创建测试文件

1. **小文件**（有效）：
   ```bash
   # 创建 10MB 文件
   dd if=/dev/zero of=small_valid.pdf bs=1M count=10
   ```

2. **大文件**（无效 - 超过200MB限制）：
   ```bash
   # 创建 300MB 文件
   dd if=/dev/zero of=huge_invalid.bin bs=1M count=300
   ```

3. **无扩展名文件**（无效 - 不支持的格式）：
   ```bash
   # 创建无扩展名文件
   echo "README content" > README
   ```

## 测试场景

### 场景 1：文件过大导致全部被拒绝

**步骤**：
1. 打开网站
2. 上传 `small_valid.pdf`（10MB）
3. 观察：
   - ✅ 文件信息显示
   - ✅ 选项区域显示
   - ✅ 上传区域隐藏
4. 点击"重新选择"
5. 上传 `huge_invalid.bin`（300MB）

**预期结果**：
- ✅ 显示警告："文件过大！当前文件：300 MB，最大限制：200 MB"
- ✅ 文件信息区域**隐藏**
- ✅ 选项区域**隐藏**
- ✅ 上传区域**显示**
- ✅ 可以重新上传文件

**验证点**：
```javascript
// 在浏览器控制台检查
console.log(selectedFiles);  // 应该是 []
console.log(fileInput.value); // 应该是 ''
console.log(fileInfo.style.display); // 应该是 'none'
console.log(uploadArea.style.display); // 应该是 'block'
```

---

### 场景 2：不支持的文件格式导致全部被拒绝

**步骤**：
1. 打开网站（如果继续上一个测试，先刷新页面）
2. 上传 `small_valid.pdf`（10MB）
3. 观察：文件信息显示 ✅
4. 点击"重新选择"
5. 上传 `README`（无扩展名）

**预期结果**：
- ✅ 显示警告："所有文件都无效：README: 无法识别文件扩展名"
- ✅ UI 完全重置
- ✅ 显示上传区域

---

### 场景 3：批量上传，全部被拒绝

**步骤**：
1. 刷新页面
2. 同时选择多个无效文件：
   - `huge_invalid.bin` (300MB)
   - `README` (无扩展名)
   - `another_huge.bin` (400MB)

**预期结果**：
- ✅ 显示警告，列出所有错误：
  ```
  所有文件都无效：

  huge_invalid.bin: 文件过大 (300 MB)
  README: 无法识别文件扩展名
  another_huge.bin: 文件过大 (400 MB)

  最大限制：200 MB
  ```
- ✅ UI 重置到初始状态
- ✅ `selectedFiles` 数组为空

---

### 场景 4：部分文件有效（对照测试）

**步骤**：
1. 刷新页面
2. 同时选择：
   - `small_valid.pdf` (10MB) ✅ 有效
   - `huge_invalid.bin` (300MB) ❌ 无效

**预期结果**：
- ✅ 显示警告："以下文件被跳过：huge_invalid.bin: 文件过大 (300 MB)，将处理 1 个有效文件。"
- ✅ **继续显示**有效文件信息（`small_valid.pdf`）
- ✅ 选项区域**仍然显示**
- ✅ "破坏文件"按钮可用

**验证点**：
```javascript
console.log(selectedFiles.length); // 应该是 1
console.log(selectedFiles[0].name); // 应该是 'small_valid.pdf'
console.log(fileInfo.style.display); // 应该是 'block'
console.log(uploadArea.style.display); // 应该是 'none'
```

---

### 场景 5：重复测试（验证可重复性）

**步骤**：
1. 上传 `small_valid.pdf` ✅
2. 观察 UI 状态
3. 上传 `huge_invalid.bin` ❌
4. 观察 UI 重置
5. **再次**上传 `small_valid.pdf` ✅
6. 观察 UI 是否正常显示

**预期结果**：
- ✅ 每次重置后都能正常重新上传
- ✅ UI 状态始终一致
- ✅ 不会出现"卡住"或状态混乱

---

## 浏览器控制台检查命令

在测试过程中，可以在浏览器控制台运行以下命令验证状态：

```javascript
// 1. 检查选中的文件数组
console.log('selectedFiles:', selectedFiles);

// 2. 检查文件输入框
console.log('fileInput.value:', fileInput.value);

// 3. 检查各区域的显示状态
console.log('fileInfo.display:', fileInfo.style.display);
console.log('optionsSection.display:', optionsSection.style.display);
console.log('uploadArea.display:', uploadArea.style.display);

// 4. 检查完整状态（在上传失败后运行）
function checkState() {
    console.log({
        selectedFiles: selectedFiles.length,
        fileInputValue: fileInput.value,
        fileInfoVisible: fileInfo.style.display !== 'none',
        optionsVisible: optionsSection.style.display !== 'none',
        uploadAreaVisible: uploadArea.style.display !== 'none'
    });
}
checkState();
```

**正常状态**（所有文件被拒绝后）：
```javascript
{
    selectedFiles: 0,
    fileInputValue: '',
    fileInfoVisible: false,
    optionsVisible: false,
    uploadAreaVisible: true
}
```

---

## 回归测试

确保修复没有破坏现有功能：

### ✅ 正常上传流程
1. 上传有效文件 → 显示文件信息 ✅
2. 选择破坏程度 → 选项可用 ✅
3. 点击"破坏文件" → 文件被处理 ✅
4. 下载破坏后的文件 ✅

### ✅ 重新选择流程
1. 上传文件 A ✅
2. 点击"重新选择" → UI 重置 ✅
3. 上传文件 B → 显示新文件信息 ✅

### ✅ 批量上传流程
1. 同时选择 3 个有效文件 ✅
2. 显示文件列表 ✅
3. 批量处理 ✅

---

## 测试结果记录

| 测试场景 | 日期 | 通过/失败 | 备注 |
|---------|------|----------|------|
| 场景 1：文件过大 | | | |
| 场景 2：不支持格式 | | | |
| 场景 3：批量全部无效 | | | |
| 场景 4：部分有效 | | | |
| 场景 5：重复测试 | | | |
| 回归测试 | | | |

---

## 已知限制

1. 测试需要手动创建测试文件
2. 需要手动观察 UI 变化
3. 建议在不同浏览器测试：
   - Chrome
   - Firefox
   - Safari
   - Edge

---

## 快速验证脚本

将以下代码粘贴到浏览器控制台，可以快速验证状态：

```javascript
// 验证函数
function verifyResetState() {
    const checks = {
        'selectedFiles 已清空': selectedFiles.length === 0,
        'fileInput 已清空': fileInput.value === '',
        'fileInfo 已隐藏': fileInfo.style.display === 'none',
        'optionsSection 已隐藏': optionsSection.style.display === 'none',
        'uploadArea 已显示': uploadArea.style.display === 'block' || uploadArea.style.display === ''
    };

    console.log('=== 状态验证结果 ===');
    for (const [check, passed] of Object.entries(checks)) {
        console.log(`${passed ? '✅' : '❌'} ${check}`);
    }

    const allPassed = Object.values(checks).every(v => v);
    console.log(allPassed ? '\n🎉 所有检查通过！' : '\n❌ 存在失败的检查');
    return allPassed;
}

// 在上传失败后运行
verifyResetState();
```

**预期输出**（修复后）：
```
=== 状态验证结果 ===
✅ selectedFiles 已清空
✅ fileInput 已清空
✅ fileInfo 已隐藏
✅ optionsSection 已隐藏
✅ uploadArea 已显示

🎉 所有检查通过！
```

---

**测试完成后，确认所有场景都通过，即可验证修复成功。**
