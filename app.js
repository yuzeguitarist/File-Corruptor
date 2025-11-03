// ==================== 全局变量 ====================
let selectedFile = null;

// 支持的文件格式类别
const FILE_CATEGORIES = {
    documents: {
        label: '文档 & 表格',
        strategy: 'text',
        formats: {
            'pdf': 'PDF文档',
            'doc': 'Word文档',
            'docx': 'Word文档',
            'dotx': 'Word模板',
            'rtf': '富文本文件',
            'txt': '文本文件',
            'md': 'Markdown文档',
            'odt': 'OpenDocument文档',
            'ott': 'OpenDocument模板',
            'pages': 'Pages文档',
            'epub': 'EPUB电子书',
            'mobi': 'MOBI电子书',
            'azw3': 'Kindle电子书',
            'ppt': 'PowerPoint演示',
            'pptx': 'PowerPoint演示',
            'odp': 'OpenDocument演示',
            'key': 'Keynote演示',
            'xls': 'Excel表格',
            'xlsx': 'Excel表格',
            'xlsm': 'Excel宏表格',
            'ods': 'OpenDocument表格',
            'csv': 'CSV表格',
            'tsv': '制表符分隔文本',
            'numbers': 'Numbers表格'
        }
    },
    images: {
        label: '图片 & 图形',
        strategy: 'media',
        formats: {
            'jpg': '图片文件',
            'jpeg': '图片文件',
            'png': '图片文件',
            'gif': '图片文件',
            'bmp': '图片文件',
            'webp': '图片文件',
            'svg': '矢量图',
            'ico': '图标文件',
            'tif': 'TIFF图片',
            'tiff': 'TIFF图片',
            'psd': 'Photoshop文件',
            'ai': 'Illustrator文件',
            'eps': 'EPS矢量文件',
            'heic': 'HEIC图片',
            'raw': 'RAW原始图片',
            'indd': 'InDesign文档'
        }
    },
    videos: {
        label: '视频',
        strategy: 'media',
        formats: {
            'mp4': '视频文件',
            'avi': '视频文件',
            'mov': '视频文件',
            'wmv': '视频文件',
            'flv': '视频文件',
            'mkv': '视频文件',
            'webm': '视频文件',
            '3gp': '3GP视频',
            'mpeg': 'MPEG视频',
            'mpg': 'MPEG视频',
            'mts': 'AVCHD视频',
            'm2ts': 'AVCHD视频'
        }
    },
    audio: {
        label: '音频',
        strategy: 'media',
        formats: {
            'mp3': '音频文件',
            'wav': '音频文件',
            'flac': '音频文件',
            'aac': '音频文件',
            'm4a': '音频文件',
            'ogg': '音频文件',
            'wma': 'WMA音频',
            'aiff': 'AIFF音频',
            'amr': 'AMR音频',
            'mid': 'MIDI文件',
            'midi': 'MIDI文件'
        }
    },
    archives: {
        label: '压缩 & 归档',
        strategy: 'archive',
        formats: {
            'zip': 'ZIP压缩包',
            'rar': 'RAR压缩包',
            '7z': '7Z压缩包',
            'tar': 'TAR归档',
            'gz': 'GZ压缩文件',
            'bz2': 'BZ2压缩文件',
            'xz': 'XZ压缩文件',
            'iso': 'ISO镜像',
            'dmg': 'DMG镜像',
            'cab': 'CAB压缩包',
            'mxl': 'MusicXML压缩文件'
        }
    },
    code: {
        label: '代码 & 配置',
        strategy: 'text',
        formats: {
            'json': 'JSON数据',
            'xml': 'XML文件',
            'yml': 'YAML配置',
            'yaml': 'YAML配置',
            'ini': 'INI配置',
            'cfg': 'CFG配置',
            'env': '环境变量文件',
            'sql': 'SQL文件',
            'js': 'JavaScript文件',
            'mjs': 'JavaScript模块',
            'ts': 'TypeScript文件',
            'jsx': 'React组件',
            'tsx': 'React组件',
            'html': 'HTML文档',
            'css': 'CSS样式',
            'scss': 'SCSS样式',
            'less': 'LESS样式',
            'py': 'Python脚本',
            'java': 'Java源代码',
            'c': 'C源代码',
            'cpp': 'C++源代码',
            'h': 'C头文件',
            'hpp': 'C++头文件',
            'cs': 'C#源代码',
            'go': 'Go源代码',
            'rb': 'Ruby脚本',
            'php': 'PHP脚本',
            'sh': 'Shell脚本',
            'bash': 'Bash脚本',
            'zsh': 'Zsh脚本',
            'bat': '批处理脚本',
            'cmd': 'CMD批处理',
            'ps1': 'PowerShell脚本',
            'vbs': 'VBScript脚本',
            'pl': 'Perl脚本',
            'swift': 'Swift源代码',
            'kt': 'Kotlin源代码',
            'rs': 'Rust源代码',
            'lua': 'Lua脚本',
            'r': 'R语言脚本',
            'm': 'MATLAB脚本',
            'dockerfile': 'Docker配置',
            'makefile': 'Make配置',
            'gradle': 'Gradle配置',
            'toml': 'TOML配置',
            'properties': 'Properties配置'
        }
    },
    system: {
        label: '系统 & 可执行',
        strategy: 'binary',
        formats: {
            'exe': '可执行文件',
            'dll': '动态链接库',
            'apk': 'Android安装包',
            'ipa': 'iOS安装包',
            'msi': 'Windows安装包',
            'bin': '二进制文件',
            'img': '磁盘镜像',
            'app': 'macOS应用',
            'deb': 'Debian包',
            'rpm': 'RPM包',
            'pkg': '安装包',
            'command': 'macOS命令文件',
            'reg': 'Windows注册表文件'
        }
    },
    database: {
        label: '数据库',
        strategy: 'binary',
        formats: {
            'db': '数据库文件',
            'sqlite': 'SQLite数据库',
            'sqlite3': 'SQLite3数据库',
            'db3': 'SQLite3数据库',
            'mdb': 'Access数据库',
            'accdb': 'Access数据库'
        }
    },
    certificates: {
        label: '证书 & 密钥',
        strategy: 'text',
        formats: {
            'pem': 'PEM证书',
            'key': '密钥文件',
            'crt': '证书文件',
            'cer': '证书文件',
            'p12': 'PKCS12证书',
            'pfx': 'PFX证书',
            'license': '许可证文件',
            'lic': '许可证文件'
        }
    },
    misc: {
        label: '其他',
        strategy: 'binary',
        formats: {
            'log': '日志文件',
            'bak': '备份文件',
            'dat': '数据文件',
            'torrent': 'BT种子',
            'ics': '日历文件',
            'vcf': '联系人文件',
            'sib': 'Sibelius记谱文件'
        }
    }
};

const SUPPORTED_FORMATS = Object.values(FILE_CATEGORIES).reduce((all, category) => {
    return { ...all, ...category.formats };
}, {});

const MAX_FILE_SIZE = 500 * 1024 * 1024;

const SIGNATURE_SCAN_CONFIG = {
    smallFileThreshold: 1 * 1024 * 1024,
    headBytes: 512 * 1024,
    tailBytes: 512 * 1024,
    midWindowBytes: 256 * 1024,
    midSamples: 3
};

const SPECIAL_EXTENSION_RULES = [
    {
        match: (name) => name === 'dockerfile' || name.startsWith('dockerfile.'),
        value: 'dockerfile'
    },
    {
        match: (name) => name === 'makefile' || name.startsWith('makefile.'),
        value: 'makefile'
    },
    {
        match: (name) => name === 'license',
        value: 'license'
    },
    {
        match: (name) => name === '.env' || name.startsWith('.env.'),
        value: 'env'
    }
];

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
const reportCard = document.getElementById('reportCard');
const randomizeNameCheckbox = document.getElementById('randomizeName');
const downloadReportCheckbox = document.getElementById('downloadReport');
const embedSignatureCheckbox = document.getElementById('embedSignature');

let lastCorruptionReport = null;

// ==================== 文件上传处理 ====================

// 点击上传区域触发文件选择
uploadArea.addEventListener('click', (e) => {
    // 防止事件冒泡
    if (e.target !== fileInput) {
        e.preventDefault();
        fileInput.click();
    }
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
    if (!file) {
        console.error('没有文件被选择');
        return;
    }

    if (file.size > MAX_FILE_SIZE) {
        showAlert(`文件过大！\n\n当前文件：${formatFileSize(file.size)}\n最大限制：${formatFileSize(MAX_FILE_SIZE)}\n\n请选择较小的文件。`);
        fileInput.value = '';
        return;
    }

    const extension = extractExtension(file.name);

    if (!extension) {
        showAlert('无法识别文件扩展名。\n\n请确保文件有正确的扩展名（如 .txt, .pdf 等）。');
        fileInput.value = '';
        return;
    }

    if (!SUPPORTED_FORMATS[extension]) {
        uploadArea.style.backgroundColor = 'var(--gray-200)';
        uploadArea.style.borderColor = 'var(--gray-400)';
        uploadArea.style.opacity = '0.6';

        showAlert(`不支持的文件格式：.${extension}\n\n支持的格式包括：\n${getSupportedFormatsSummary()}\n\n请选择支持的文件格式。`);

        setTimeout(() => {
            uploadArea.style.backgroundColor = '';
            uploadArea.style.borderColor = '';
            uploadArea.style.opacity = '';
        }, 2000);

        fileInput.value = '';
        return;
    }

    selectedFile = file;
    const categoryKey = getFileCategory(extension);
    const categoryLabel = getCategoryLabel(categoryKey);

    fileName.textContent = file.name;
    fileSize.textContent = formatFileSize(file.size);
    const typeLabel = SUPPORTED_FORMATS[extension] || file.type || '未知类型';
    fileType.textContent = categoryLabel ? `${typeLabel} · ${categoryLabel}` : typeLabel;

    fileInfo.style.display = 'block';
    optionsSection.style.display = 'block';

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

function extractExtension(filename) {
    if (!filename || typeof filename !== 'string') return '';

    const trimmed = filename.trim();
    if (!trimmed) return '';

    const lower = trimmed.toLowerCase();

    for (const rule of SPECIAL_EXTENSION_RULES) {
        try {
            if (rule.match(lower)) {
                return rule.value;
            }
        } catch (error) {
            console.warn('[extractExtension] 特殊规则匹配失败:', error);
        }
    }

    if (lower.startsWith('.')) {
        const remainder = lower.slice(1);
        if (!remainder) return '';
        const [firstSegment] = remainder.split('.');
        return firstSegment || '';
    }

    const lastDotIndex = lower.lastIndexOf('.');
    if (lastDotIndex <= 0 || lastDotIndex === lower.length - 1) {
        return '';
    }

    return lower.slice(lastDotIndex + 1);
}

function showAlert(message) {
    if (typeof alert === 'function') {
        alert(message);
    } else {
        console.warn('[ALERT]', message);
    }
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
    
    try {
        const level = document.querySelector('input[name="level"]:checked').value;
        const options = getAdvancedOptions();

        optionsSection.style.display = 'none';
        fileInfo.style.display = 'none';
        statusSection.style.display = 'block';
        statusText.textContent = '正在破坏文件...';
        
        await new Promise(resolve => setTimeout(resolve, 800));
        
        await corruptFile(selectedFile, level, options);

        statusSection.style.display = 'none';
        successSection.style.display = 'block';
    } catch (error) {
        console.error('文件破坏失败:', error);
        
        let errorMessage = '文件破坏失败，请重试。';
        
        if (error instanceof DOMException && error.name === 'QuotaExceededError') {
            errorMessage = '内存不足！文件过大，浏览器无法处理。\n\n请尝试使用较小的文件。';
        } else if (error instanceof TypeError) {
            errorMessage = '文件读取错误！请确保文件完整且未损坏。';
        } else if (error.message) {
            errorMessage = `错误：${error.message}`;
        }
        
        showAlert(errorMessage);
        statusSection.style.display = 'none';
        optionsSection.style.display = 'block';
        fileInfo.style.display = 'block';
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
async function corruptFile(file, level, options) {
    const startTime = getTimestamp();

    // 读取文件为 ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // 获取文件扩展名及类别
    const extension = extractExtension(file.name);
    const categoryKey = getFileCategory(extension);
    const strategy = getStrategyForCategory(categoryKey);

    const randomSeed = generateSeed();
    const random = createRandomGenerator(randomSeed);
    const corruptionContext = {
        fileSize: uint8Array.length,
        extension,
        categoryKey,
        strategy,
        seed: randomSeed,
        options,
        random
    };

    let corruptionResult;
    switch (level) {
        case 'light':
            corruptionResult = corruptLight(uint8Array, corruptionContext);
            break;
        case 'medium':
            corruptionResult = corruptMedium(uint8Array, corruptionContext);
            break;
        case 'heavy':
        default:
            corruptionResult = corruptHeavy(uint8Array, corruptionContext);
            break;
    }

    if (options.embedSignature) {
        const signatureResult = embedCorruptionSignature(uint8Array, corruptionContext);
        corruptionResult.bytesModified += signatureResult.bytesModified;
        corruptionResult.steps.push(signatureResult.description);
    }

    statusText.textContent = '破坏完成，正在准备下载...';
    const downloadName = downloadCorruptedFile(uint8Array, file.name, options);
    const report = buildCorruptionReport({
        file,
        level,
        extension,
        categoryKey,
        strategy,
        options,
        corruptionResult,
        downloadName,
        duration: getTimestamp() - startTime,
        seed: randomSeed
    });

    renderReport(report);
    if (options.downloadReport) {
        downloadReportJSON(report);
    }
}

/**
 * 轻度破坏 - 修改文件头部
 * 破坏文件的魔数（Magic Number），使文件无法被识别
 * @param {Uint8Array} data - 文件数据
 * @param {Object} context - 破坏上下文
 */
function corruptLight(data, context) {
    const { extension, strategy, random } = context;
    const fileSize = data.length;
    const steps = [];
    let bytesModified = 0;

    if (strategy === 'archive') {
        bytesModified += mutateHeader(data, 32, 1, random);
        steps.push('破坏归档文件头部元数据');

        if (extension === 'zip') {
            bytesModified += corruptSignature(data, [0x50, 0x4B, 0x01, 0x02], 1, random);
            steps.push('篡改 ZIP 中央目录标识');
        } else if (extension === 'rar') {
            bytesModified += corruptSignature(data, [0x52, 0x61, 0x72, 0x21], 1, random);
            steps.push('破坏 RAR 魔数');
        } else if (extension === '7z') {
            bytesModified += corruptSignature(data, [0x37, 0x7A, 0xBC, 0xAF], 1, random);
            steps.push('扰乱 7Z 魔数');
        }
    } else if (strategy === 'text') {
        const encoder = new TextEncoder();
        const headline = encoder.encode('/* FILE CORRUPTED */');
        bytesModified += writePattern(data, 0, headline);
        steps.push('注入破坏标记到文本开头');

        if (fileSize > 64) {
            bytesModified += randomizeRange(data, 32, Math.min(128, fileSize), 0.4, random);
            steps.push('在文本局部插入随机噪声');
        }
    } else if (strategy === 'media') {
        bytesModified += mutateHeader(data, 48, 0.8, random);
        steps.push('扰乱媒体文件关键头信息');

        if (fileSize > 2048) {
            const midStart = Math.max(0, Math.floor(fileSize / 2) - 64);
            bytesModified += randomizeRange(data, midStart, Math.min(fileSize, midStart + 128), 0.35, random);
            steps.push('注入中部轻量伪影噪声');
        }
    } else {
        const corruptLength = Math.min(16, fileSize);
        bytesModified += randomizeRange(data, 0, corruptLength, 1, random);
        steps.push('随机篡改文件头部字节');
    }

    return {
        level: 'light',
        bytesModified,
        steps
    };
}

/**
 * 中度破坏 - 修改文件头部和关键位置
 * @param {Uint8Array} data - 文件数据
 * @param {string} extension - 文件扩展名
 */
function corruptMedium(data, context) {
    const { extension, strategy, random } = context;
    const fileSize = data.length;
    const steps = [];
    let bytesModified = 0;

    if (strategy === 'archive') {
        bytesModified += mutateHeader(data, 64, 1, random);
        steps.push('重写归档文件头与主记录');

        if (extension === 'zip') {
            bytesModified += corruptSignature(data, [0x50, 0x4B], 1, random);
            steps.push('破坏所有 PK 标识');
        }

        const tailLength = Math.min(256, fileSize);
        bytesModified += randomizeRange(data, fileSize - tailLength, fileSize, 0.65, random);
        steps.push('扰乱归档中央目录和结束记录');
    } else if (strategy === 'text') {
        const encoder = new TextEncoder();
        const banner = encoder.encode('<<<< FILE CORRUPTED >>>>');
        bytesModified += writePattern(data, 0, banner);
        steps.push('注入显式破坏横幅');

        const interval = Math.max(128, Math.floor(fileSize / 12));
        for (let i = interval; i < fileSize; i += interval) {
            bytesModified += randomizeRange(data, i, Math.min(fileSize, i + 32), 0.85, random);
        }
        steps.push('周期性篡改文本片段');

        bytesModified += randomizeRange(data, Math.max(0, fileSize - 512), fileSize, 0.6, random);
        steps.push('破坏文本结尾结构');
    } else if (strategy === 'media') {
        bytesModified += mutateHeader(data, 96, 1, random);
        steps.push('破坏媒体文件容器信息');

        const segmentSize = Math.min(2048, Math.floor(fileSize / 6));
        if (segmentSize > 0) {
            bytesModified += randomizeRange(data, segmentSize, Math.min(fileSize, segmentSize * 2), 0.75, random);
            steps.push('损坏索引/关键帧片段');
        }

        bytesModified += randomizeRange(data, Math.max(0, fileSize - 2048), fileSize, 0.5, random);
        steps.push('扰乱尾部媒体数据');
    } else {
        bytesModified += mutateHeader(data, 48, 1, random);
        steps.push('加大对文件头的随机损坏');

        const interval = 1024;
        const corruptSize = 24;
        for (let i = interval; i < fileSize; i += interval) {
            bytesModified += randomizeRange(data, i, Math.min(fileSize, i + corruptSize), 1, random);
        }
        steps.push('按间隔破坏文件主体数据');
    }

    return {
        level: 'medium',
        bytesModified,
        steps
    };
}

/**
 * 重度破坏 - 随机修改大量数据
 * @param {Uint8Array} data - 文件数据
 * @param {string} extension - 文件扩展名
 */
function corruptHeavy(data, context) {
    const { extension, strategy, random } = context;
    const fileSize = data.length;
    const steps = [];
    let bytesModified = 0;

    if (strategy === 'archive') {
        bytesModified += mutateHeader(data, 160, 1, random);
        steps.push('全面破坏归档头部与校验信息');

        bytesModified += corruptSignature(data, [0x50, 0x4B], 1, random);
        bytesModified += corruptSignature(data, [0x37, 0x7A], 1, random);
        bytesModified += corruptSignature(data, [0x52, 0x61], 1, random);
        steps.push('摧毁常见压缩格式标识');

        const totalCorrupt = Math.floor(fileSize * 0.55);
        bytesModified += randomizeRandomPositions(data, totalCorrupt, random);
        steps.push('随机重写超过一半的归档内容');
    } else if (strategy === 'text') {
        const encoder = new TextEncoder();
        const banner = encoder.encode('████ FILE IRRECOVERABLY CORRUPTED ████\n');
        bytesModified += writePattern(data, 0, banner);
        steps.push('覆盖文本头并插入破坏横幅');

        const totalCorrupt = Math.floor(fileSize * 0.35);
        bytesModified += randomizeRandomPositions(data, totalCorrupt, random);
        steps.push('随机重写 35% 的文本字节');

        const interval = 256;
        for (let i = interval; i < fileSize; i += interval) {
            bytesModified += randomizeRange(data, i, Math.min(fileSize, i + 64), 0.9, random);
        }
        steps.push('块状破坏全文结构');
    } else if (strategy === 'media') {
        bytesModified += mutateHeader(data, 160, 1, random);
        steps.push('破坏媒体容器头及索引');

        const blockSize = Math.max(1024, Math.floor(fileSize / 10));
        for (let i = 0; i < fileSize; i += blockSize) {
            bytesModified += randomizeRange(data, i, Math.min(fileSize, i + Math.floor(blockSize / 2)), 0.85, random);
        }
        steps.push('按块破坏音视频帧数据');

        const randomCorrupt = Math.floor(fileSize * 0.4);
        bytesModified += randomizeRandomPositions(data, randomCorrupt, random);
        steps.push('随机破坏 40% 的媒体字节');
    } else {
        bytesModified += mutateHeader(data, 96, 1, random);
        steps.push('强力破坏文件头部');

        const corruptRatio = 0.3;
        const totalCorrupt = Math.floor(fileSize * corruptRatio);
        bytesModified += randomizeRandomPositions(data, totalCorrupt, random);
        steps.push('随机破坏 30% 的文件内容');

        const interval = 512;
        const corruptSize = 48;
        for (let i = interval; i < fileSize; i += interval) {
            bytesModified += randomizeRange(data, i, Math.min(fileSize, i + corruptSize), 1, random);
        }
        steps.push('高频率破坏整段数据');
    }

    return {
        level: 'heavy',
        bytesModified,
        steps
    };
}

/**
 * 下载破坏后的文件
 * @param {Uint8Array} data - 破坏后的文件数据
 * @param {string} originalName - 原始文件名
 */
function downloadCorruptedFile(data, originalName, options = {}) {
    // 创建 Blob 对象
    const blob = new Blob([data], { type: 'application/octet-stream' });

    // 创建下载链接
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;

    const nameParts = originalName.split('.');
    const extension = nameParts.length > 1 ? nameParts.pop() : '';
    const baseName = nameParts.join('.') || 'file';

    let downloadName;
    if (options.randomizeName) {
        const randomBase = generateRandomFileName();
        downloadName = extension ? `${randomBase}.${extension}` : randomBase;
    } else {
        downloadName = extension ? `${baseName}.${extension}` : baseName;
    }

    a.download = downloadName;

    // 触发下载
    document.body.appendChild(a);
    a.click();

    // 清理
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    return downloadName;
}

// ==================== 辅助函数 ====================

function getAdvancedOptions() {
    // 实时获取checkbox状态，而不是依赖全局变量
    const randomizeName = document.getElementById('randomizeName');
    const downloadReport = document.getElementById('downloadReport');
    const embedSignature = document.getElementById('embedSignature');
    
    return {
        randomizeName: randomizeName ? randomizeName.checked : false,
        downloadReport: downloadReport ? downloadReport.checked : false,
        embedSignature: embedSignature ? embedSignature.checked : true
    };
}

function getFileCategory(extension) {
    if (!extension) return null;
    for (const [key, category] of Object.entries(FILE_CATEGORIES)) {
        if (category.formats[extension]) {
            return key;
        }
    }
    return null;
}

function getCategoryLabel(categoryKey) {
    return categoryKey ? FILE_CATEGORIES[categoryKey]?.label ?? '' : '';
}

function getStrategyForCategory(categoryKey) {
    return FILE_CATEGORIES[categoryKey]?.strategy || 'binary';
}

function generateSeed() {
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
        return crypto.getRandomValues(new Uint32Array(1))[0];
    }
    return Math.floor(Math.random() * 1_000_000_000);
}

function createRandomGenerator(seed) {
    let state = seed;
    return function() {
        state = (state * 1664525 + 1013904223) >>> 0;
        return state / 0x100000000;
    };
}

function generateRandomFileName() {
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
        const array = new Uint8Array(8);
        crypto.getRandomValues(array);
        return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('');
    }
    return Math.random().toString(16).slice(2, 10);
}

function mutateHeader(data, length, probability = 1, rng = Math.random) {
    return randomizeRange(data, 0, Math.min(length, data.length), probability, rng);
}

function corruptSignature(data, signature, probability = 1, rng = Math.random) {
    if (!Array.isArray(signature) || signature.length === 0 || !data.length) {
        return 0;
    }

    const chance = Math.max(0, Math.min(probability, 1));
    const sigLength = signature.length;

    const segments = buildSignatureSegments(data.length, sigLength, rng);
    if (!segments.length) {
        return 0;
    }

    let modified = 0;
    for (const segment of segments) {
        modified += mutateSignatureWithinRange(data, signature, segment.start, segment.end, chance, rng);
    }

    return modified;
}

function randomizeRange(data, start, end, probability = 1, rng = Math.random) {
    if (!data.length) return 0;
    const safeStart = Math.max(0, Math.min(start, data.length));
    const safeEnd = Math.max(safeStart, Math.min(end, data.length));
    const chance = Math.max(0, Math.min(probability, 1));
    let modified = 0;

    for (let i = safeStart; i < safeEnd; i++) {
        if (rng() <= chance) {
            data[i] = getRandomByte(rng);
            modified++;
        }
    }

    return modified;
}

function randomizeRandomPositions(data, total, rng = Math.random) {
    if (!data.length || total <= 0) return 0;

    const target = Math.min(total, data.length);
    let modified = 0;

    for (let i = 0; i < data.length && modified < target; i++) {
        const remainingPositions = data.length - i;
        const remainingNeeded = target - modified;
        const threshold = remainingNeeded / remainingPositions;

        if (rng() <= threshold) {
            data[i] = getRandomByte(rng);
            modified++;
        }
    }

    return modified;
}

function getRandomByte(rng = Math.random) {
    return Math.floor(rng() * 256);
}

function buildSignatureSegments(length, signatureLength, rng = Math.random) {
    if (length <= 0 || length < signatureLength) {
        return [];
    }

    if (length <= SIGNATURE_SCAN_CONFIG.smallFileThreshold) {
        return [{ start: 0, end: length }];
    }

    const segments = [];

    const headEnd = Math.min(length, SIGNATURE_SCAN_CONFIG.headBytes);
    segments.push({ start: 0, end: headEnd });

    const tailStart = Math.max(0, length - SIGNATURE_SCAN_CONFIG.tailBytes);
    if (tailStart > 0) {
        segments.push({ start: tailStart, end: length });
    }

    const windowSize = Math.min(
        SIGNATURE_SCAN_CONFIG.midWindowBytes,
        Math.max(signatureLength * 4, 4096)
    );

    const maxStart = Math.max(0, length - windowSize);
    const sampleCount = Math.max(0, SIGNATURE_SCAN_CONFIG.midSamples);
    for (let i = 0; i < sampleCount && maxStart > 0; i++) {
        const start = Math.floor(rng() * (maxStart + 1));
        const end = Math.min(length, start + windowSize);
        segments.push({ start, end });
    }

    return mergeSegments(segments, length);
}

function mergeSegments(segments, length) {
    if (!Array.isArray(segments)) return [];

    const normalized = segments
        .map(({ start, end }) => ({
            start: Math.max(0, Math.min(start ?? 0, length)),
            end: Math.max(0, Math.min(end ?? length, length))
        }))
        .filter((segment) => segment.end > segment.start);

    if (!normalized.length) {
        return [];
    }

    normalized.sort((a, b) => a.start - b.start);

    const merged = [normalized[0]];
    for (let i = 1; i < normalized.length; i++) {
        const current = normalized[i];
        const last = merged[merged.length - 1];

        if (current.start <= last.end) {
            last.end = Math.max(last.end, current.end);
        } else {
            merged.push(current);
        }
    }

    return merged;
}

function mutateSignatureWithinRange(data, signature, start, end, chance, rng) {
    const safeStart = Math.max(0, Math.min(start, data.length));
    const safeEnd = Math.max(safeStart, Math.min(end, data.length));

    if (safeEnd - safeStart < signature.length) {
        return 0;
    }

    let modified = 0;
    const windowEnd = safeEnd - signature.length + 1;

    for (let i = safeStart; i < windowEnd; i++) {
        let matched = true;
        for (let j = 0; j < signature.length; j++) {
            if (data[i + j] !== signature[j]) {
                matched = false;
                break;
            }
        }

        if (!matched) continue;

        for (let j = 0; j < signature.length; j++) {
            if (rng() <= chance) {
                data[i + j] = getRandomByte(rng);
                modified++;
            }
        }

        i += signature.length - 1;
    }

    return modified;
}

function writePattern(data, start, pattern) {
    if (!pattern || !pattern.length || !data.length) return 0;
    const maxStart = Math.max(0, data.length - pattern.length);
    const adjustedStart = Math.max(0, Math.min(start, maxStart));
    let written = 0;

    for (let i = 0; i < pattern.length && adjustedStart + i < data.length; i++) {
        data[adjustedStart + i] = pattern[i];
        written++;
    }

    return written;
}

function embedCorruptionSignature(data, context) {
    const encoder = new TextEncoder();
    const stamp = new Date().toISOString();
    const signature = encoder.encode(`\n<< FILE CORRUPTED | seed=${context.seed} | ${stamp} >>\n`);
    
    if (data.length < signature.length + 10) {
        return {
            bytesModified: 0,
            description: '文件过小，跳过签名嵌入'
        };
    }
    
    const rng = typeof context.random === 'function' ? context.random : Math.random;
    const insertionRange = Math.max(0, data.length - signature.length - 1);
    let offset;
    
    if (context.strategy === 'text') {
        offset = insertionRange;
    } else if (context.strategy === 'media' || context.strategy === 'binary') {
        const safeStart = Math.min(256, Math.floor(data.length * 0.1));
        const safeEnd = Math.max(safeStart, insertionRange - 256);
        offset = safeStart + Math.floor(rng() * Math.max(1, safeEnd - safeStart));
    } else {
        offset = Math.floor(rng() * (insertionRange + 1));
    }
    
    const bytesModified = writePattern(data, offset, signature);

    return {
        bytesModified,
        description: '嵌入破坏签名信息以强化不可恢复性'
    };
}

function buildCorruptionReport({
    file,
    level,
    extension,
    categoryKey,
    strategy,
    options,
    corruptionResult,
    downloadName,
    duration,
    seed
}) {
    const size = file.size;
    const ratio = size ? ((corruptionResult.bytesModified / size) * 100) : 0;
    const report = {
        originalName: file.name,
        downloadName,
        originalSize: size,
        formattedSize: formatFileSize(size),
        level,
        levelLabel: translateLevel(level),
        extension: extension || '无扩展名',
        category: getCategoryLabel(categoryKey) || '未识别类别',
        strategy,
        bytesModified: corruptionResult.bytesModified,
        modifiedRatio: Number(ratio.toFixed(2)),
        steps: corruptionResult.steps,
        options,
        duration: Number(duration.toFixed(2)),
        seed,
        generatedAt: new Date().toISOString()
    };

    lastCorruptionReport = report;
    return report;
}

function getTimestamp() {
    return (typeof performance !== 'undefined' && typeof performance.now === 'function')
        ? performance.now()
        : Date.now();
}

function renderReport(report) {
    if (!reportCard) return;

    reportCard.innerHTML = '';
    reportCard.style.display = 'block';

    const title = document.createElement('h4');
    title.className = 'report-title';
    title.textContent = '破坏报告';
    reportCard.appendChild(title);

    const metaList = document.createElement('ul');
    metaList.className = 'report-meta';

    const optionsUsed = [];
    if (report.options?.randomizeName) optionsUsed.push('随机化文件名');
    if (report.options?.embedSignature) optionsUsed.push('嵌入破坏签名');
    if (report.options?.downloadReport) optionsUsed.push('导出报告');

    const rows = [
        ['原文件', `${report.originalName}（${report.formattedSize}）`],
        ['输出文件', report.downloadName],
        ['破坏程度', report.levelLabel],
        ['所属类别', report.category],
        ['修改字节', `${report.bytesModified.toLocaleString()}（${report.modifiedRatio}%）`],
        ['耗时', `${Math.round(report.duration)} ms`],
        ['随机种子', report.seed],
        ['高级设置', optionsUsed.length ? optionsUsed.join('、') : '默认设置']
    ];

    rows.forEach(([label, value]) => {
        const item = document.createElement('li');
        item.innerHTML = `<span class="report-label">${label}</span><span class="report-value">${value}</span>`;
        metaList.appendChild(item);
    });

    reportCard.appendChild(metaList);

    if (report.steps?.length) {
        const stepsTitle = document.createElement('div');
        stepsTitle.className = 'report-steps-title';
        stepsTitle.textContent = '执行步骤';
        reportCard.appendChild(stepsTitle);

        const stepsList = document.createElement('ol');
        stepsList.className = 'report-steps';
        report.steps.forEach((step) => {
            const stepItem = document.createElement('li');
            stepItem.textContent = step;
            stepsList.appendChild(stepItem);
        });
        reportCard.appendChild(stepsList);
    }
}

function downloadReportJSON(report) {
    const data = JSON.stringify(report, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const baseName = report.downloadName?.split('.')?.shift() || 'corruption_report';
    a.download = `${baseName}_report.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function getSupportedFormatsSummary() {
    return Object.values(FILE_CATEGORIES)
        .map((category) => `${category.label}: ${Object.keys(category.formats).map((ext) => '.' + ext).join(', ')}`)
        .join('\n');
}


function translateLevel(level) {
    const mapping = {
        light: '轻度',
        medium: '中度',
        heavy: '重度'
    };
    return mapping[level] || level;
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

    if (reportCard) {
        reportCard.style.display = 'none';
        reportCard.innerHTML = '';
    }
    lastCorruptionReport = null;

    // 显示上传区域
    uploadArea.style.display = 'block';

    // 重置单选按钮
    document.querySelector('input[name="level"][value="light"]').checked = true;

    if (statusText) {
        statusText.textContent = '正在处理文件...';
    }
}

// ==================== 浏览器兼容性检查 ====================

function checkBrowserCompatibility() {
    const features = {
        'File API': typeof File !== 'undefined' && typeof FileReader !== 'undefined',
        'ArrayBuffer': typeof ArrayBuffer !== 'undefined',
        'Uint8Array': typeof Uint8Array !== 'undefined',
        'Blob': typeof Blob !== 'undefined',
        'URL.createObjectURL': typeof URL !== 'undefined' && typeof URL.createObjectURL === 'function',
        'TextEncoder': typeof TextEncoder !== 'undefined'
    };

    const unsupported = Object.entries(features).filter(([name, supported]) => !supported);
    
    if (unsupported.length > 0) {
        const missing = unsupported.map(([name]) => name).join(', ');
        showAlert(`您的浏览器不支持以下功能：${missing}\n\n请使用现代浏览器（如 Chrome、Firefox、Safari、Edge）访问本工具。`);
        return false;
    }
    
    return true;
}

// ==================== 初始化 ====================

if (typeof document !== 'undefined') {
    if (!checkBrowserCompatibility()) {
        console.error('浏览器兼容性检查失败');
        if (corruptBtn) {
            corruptBtn.disabled = true;
            corruptBtn.textContent = '浏览器不兼容';
        }
    } else {
        console.log('文件破坏工具已加载');
        console.log('支持的破坏程度：轻度、中度、重度');
        console.log(`支持 ${Object.keys(SUPPORTED_FORMATS).length} 种文件格式`);
        console.log('⚠️ 请勿用于不当用途');
    }
}
