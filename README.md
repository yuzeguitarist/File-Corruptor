# File Corruptor | 文件破坏工具

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-black?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-black?style=flat-square)
![HTML5](https://img.shields.io/badge/HTML5-black?style=flat-square&logo=html5)
![CSS3](https://img.shields.io/badge/CSS3-black?style=flat-square&logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-black?style=flat-square&logo=javascript)

一个优雅、安全的纯前端文件破坏工具

[English](#english) | [中文](#中文)

</div>

---

## 中文

### 📖 项目简介

File Corruptor 是一个完全在浏览器本地运行的文件破坏工具，可以安全地损坏任何格式的文件，使其无法被正常打开。所有操作均在客户端完成，不会上传任何数据到服务器。

### ✨ 功能特点

- 🎯 **广泛支持** - 支持 150+ 种文件格式（覆盖文档、媒体、压缩包、代码、数据库、证书、镜像等）
- 🔒 **隐私安全** - 100% 本地处理，文件不上传服务器
- 💾 **即时下载** - 自动下载破坏后的文件
- 🎨 **极简设计** - 黑白配色，Apple 风格界面
- ⚡ **即开即用** - 无需安装，打开即用
- 📱 **响应式** - 完美支持桌面和移动设备
- 📊 **破坏报告** - 自动生成详细报告，展示破坏细节
- 🧩 **高级选项** - 支持随机化文件名、嵌入签名、导出报告
- 🎲 **可复现破坏** - 所有随机操作使用报告中的种子，可实现完全复现

### 🚀 快速开始

#### 在线使用
访问 [GitHub Pages](https://yuzeguitarist.github.io/File-Corruptor/) 直接使用

#### 本地运行
```bash
# 克隆仓库
git clone https://github.com/yuzeguitarist/File-Corruptor.git

# 进入目录
cd File-Corruptor

# 用浏览器打开 index.html
open index.html  # macOS
start index.html # Windows
```

### 📝 使用方法

1. **上传文件** - 点击或拖拽文件到上传区域
2. **选择程度** - 选择破坏程度（轻度/中度/重度）
3. **高级选项（可选）** - 展开高级设置，自定义文件名、签名、报告等
4. **破坏文件** - 点击"破坏文件"按钮
5. **下载文件** - 自动下载损坏后的文件，并查看破坏报告

> 📦 **大小限制**：单个文件最大 500 MB，为保证浏览器稳定性，请尽量避免上传超大文件。

### ⚙️ 高级选项

- **随机化输出文件名**：使用随机字符串命名损坏后的文件，隐藏原始信息。
- **嵌入破坏签名**：向文件写入带时间戳和随机种子的签名，进一步破坏结构。
- **导出破坏报告**：生成 JSON 报告，包含修改字节、执行步骤、耗时等详细信息。
- **固定随机种子**：报告中会记录本次操作使用的随机种子，可用于复现同样的破坏过程。

### 🎚️ 破坏程度说明

| 程度 | 说明 | 效果 |
|------|------|------|
| **轻度破坏** | 修改文件头部魔数 | 大多数软件提示文件损坏 |
| **中度破坏** | 破坏文件头部和关键结构 | 文件完全无法识别 |
| **重度破坏** | 随机修改大量数据 | 文件彻底损坏，无法恢复 |

### 🛠️ 技术栈

- **前端框架**: 原生 HTML5 + CSS3 + JavaScript
- **文件处理**: File API + ArrayBuffer
- **设计风格**: Apple-inspired Minimalism
- **字体**: SF Mono, SF Pro Display

### 📂 项目结构

```
File-Corruptor/
├── index.html          # 主页面
├── privacy.html        # 隐私政策
├── terms.html          # 使用条款
├── disclaimer.html     # 免责声明
├── styles.css          # 样式表
├── app.js              # 核心逻辑
├── README.md           # 项目说明
└── .gitignore          # Git 忽略文件
```

### ⚠️ 重要提示

> **本工具仅供教育、研究和测试使用**

- ❌ 请勿用于逃避学术或工作责任
- ❌ 请勿用于破坏他人文件
- ❌ 请勿用于任何非法或不道德行为
- ✅ 使用前请务必备份原始文件
- ✅ 破坏后的文件无法恢复

### 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

### 👨‍💻 作者

**Yuze Pan**

- GitHub: [@yuzeguitarist](https://github.com/yuzeguitarist)

### 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 📮 联系方式

如有问题或建议，请通过 GitHub Issues 联系。

---

## English

### 📖 About

File Corruptor is a client-side file corruption tool that runs entirely in your browser. It can safely corrupt any file format, making it unreadable. All operations are performed locally - no data is uploaded to any server.

### ✨ Features

- 🎯 **Wide Support** - Supports 150+ formats across documents, media, archives, code, databases, certificates, and disk images
- 🔒 **Privacy First** - 100% local processing, no server uploads
- 💾 **Instant Download** - Automatically downloads corrupted files
- 🎨 **Minimal Design** - Black & white, Apple-inspired interface
- ⚡ **Zero Setup** - No installation required
- 📱 **Responsive** - Works on desktop and mobile
- 📊 **Corruption Report** - Generates detailed reports showing corruption details
- 🧩 **Advanced Controls** - Randomize filenames, embed signatures, export reports
- 🎲 **Reproducible** - All random operations use seeds from reports for perfect reproduction

### 🚀 Quick Start

#### Online Usage
Visit [GitHub Pages](https://yuzeguitarist.github.io/File-Corruptor/)

#### Local Usage
```bash
# Clone repository
git clone https://github.com/yuzeguitarist/File-Corruptor.git

# Navigate to directory
cd File-Corruptor

# Open index.html in browser
open index.html  # macOS
start index.html # Windows
```

### 📝 How to Use

1. **Upload File** - Click or drag file to upload area
2. **Select Level** - Choose corruption level (Light/Medium/Heavy)
3. **Advanced Options (Optional)** - Expand advanced settings to customize filename, signature, and report
4. **Corrupt File** - Click "Corrupt File" button
5. **Download & Review** - File downloads automatically with an in-app corruption report

### ⚙️ Advanced Options

- **Randomize output filename**: Obfuscate the corrupted file with a random name.
- **Embed corruption signature**: Inject a timestamped signature to make recovery harder.
- **Export corruption report**: Produce a JSON report capturing byte counts, steps, and timings.

### 🎚️ Corruption Levels

| Level | Description | Effect |
|-------|-------------|--------|
| **Light** | Modify file header magic numbers | Most software reports file corruption |
| **Medium** | Corrupt header and key structures | File completely unrecognizable |
| **Heavy** | Randomly modify large amounts of data | File thoroughly corrupted, unrecoverable |

### 🛠️ Tech Stack

- **Frontend**: Vanilla HTML5 + CSS3 + JavaScript
- **File Processing**: File API + ArrayBuffer
- **Design**: Apple-inspired Minimalism
- **Fonts**: SF Mono, SF Pro Display

### ⚠️ Disclaimer

> **This tool is for educational, research, and testing purposes only**

- ❌ Do not use to evade academic or work responsibilities
- ❌ Do not use to damage others' files
- ❌ Do not use for illegal or unethical purposes
- ✅ Always backup original files before use
- ✅ Corrupted files cannot be recovered

### 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file

### 👨‍💻 Author

**Yuze Pan**

- GitHub: [@yuzeguitarist](https://github.com/yuzeguitarist)

### 🤝 Contributing

Issues and Pull Requests are welcome!

### 📮 Contact

For questions or suggestions, please use GitHub Issues.

---

<div align="center">

**Made with ❤️ by Yuze Pan**

© 2025 Yuze Pan. All rights reserved.

</div>
