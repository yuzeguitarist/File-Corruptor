// ==================== 全局变量 ====================
let selectedFiles = [];

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
            'avif': 'AVIF图片',
            'jxl': 'JPEG XL图片',
            'svg': '矢量图',
            'ico': '图标文件',
            'tif': 'TIFF图片',
            'tiff': 'TIFF图片',
            'psd': 'Photoshop文件',
            'ai': 'Illustrator文件',
            'eps': 'EPS矢量文件',
            'heic': 'HEIC图片',
            'raw': 'RAW原始图片',
            'dng': 'DNG RAW图片',
            'cr2': 'Canon RAW图片',
            'cr3': 'Canon RAW图片',
            'nef': 'Nikon RAW图片',
            'arw': 'Sony RAW图片',
            'orf': 'Olympus RAW图片',
            'rw2': 'Panasonic RAW图片',
            'exr': 'OpenEXR图片',
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
            'm4v': 'M4V视频',
            'vob': 'DVD视频',
            'ts': '传输流视频',
            'f4v': 'Flash视频',
            'ogv': 'Ogg视频',
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
            'opus': 'Opus音频',
            'wma': 'WMA音频',
            'aiff': 'AIFF音频',
            'amr': 'AMR音频',
            'ape': 'APE无损音频',
            'alac': 'Apple无损音频',
            'dsd': 'DSD音频',
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
            'mxl': 'MusicXML压缩文件',
            'vsix': 'VS Code扩展包',
            'har': 'HTTP归档文件'
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
            'reg': 'Windows注册表文件',
            'unix-executable': 'Unix可执行文件'
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
    models: {
        label: '3D模型',
        strategy: 'binary',
        formats: {
            'blend': 'Blender文件',
            'fbx': 'FBX模型',
            'obj': 'Wavefront OBJ',
            'stl': 'STL 3D打印',
            'dae': 'COLLADA模型',
            'gltf': 'glTF模型',
            'glb': 'glTF二进制',
            '3ds': '3DS Max模型',
            'max': '3DS Max场景',
            'c4d': 'Cinema 4D文件',
            'ma': 'Maya ASCII',
            'mb': 'Maya二进制',
            'skp': 'SketchUp模型',
            'dwg': 'AutoCAD图纸',
            'dxf': 'AutoCAD交换格式'
        }
    },
    fonts: {
        label: '字体文件',
        strategy: 'binary',
        formats: {
            'ttf': 'TrueType字体',
            'otf': 'OpenType字体',
            'woff': 'Web字体',
            'woff2': 'Web字体2',
            'eot': 'Embedded OpenType',
            'fon': '位图字体',
            'dfont': 'Mac字体'
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
            'sib': 'Sibelius记谱文件',
            'kdbx': 'KeePass数据库',
            'vmdk': 'VMware磁盘',
            'vdi': 'VirtualBox磁盘',
            'qcow2': 'QEMU磁盘',
            'ova': '虚拟机归档',
            'ovf': '虚拟机格式'
        }
    }
};

const SUPPORTED_FORMATS = Object.values(FILE_CATEGORIES).reduce((all, category) => {
    return { ...all, ...category.formats };
}, {});

// 现实的内存限制：2GB
// 使用分块处理（chunk processing）机制，但仍需在Blob创建前保持所有块引用
// 2GB = 8个256MB块，这是现代浏览器可以合理处理的上限
// 注意：即使使用Blob，所有块在合并前仍在内存中
const MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024; // 2GB

// 可逆模式的文件大小限制：500MB
// 超过此大小的文件无法使用可逆模式（因为需要在内存中生成和处理diff）
const MAX_REVERSIBLE_FILE_SIZE = 500 * 1024 * 1024; // 500MB

// 分块处理配置
const CHUNK_PROCESSING_CONFIG = {
    chunkSize: 256 * 1024 * 1024, // 每块256MB
    largeFileThreshold: 256 * 1024 * 1024, // 大于256MB的文件启用分块处理
    maxChunksInMemory: 2, // 未强制执行（浏览器限制）
    maxIterationsPerChunk: 10 * 1000 * 1000 // 每块最多1000万次迭代，避免锁死
};

const SIGNATURE_SCAN_CONFIG = {
    smallFileThreshold: 1 * 1024 * 1024,
    headBytes: 512 * 1024,
    tailBytes: 512 * 1024,
    midWindowBytes: 256 * 1024
};

// ==================== 硬件性能配置 ====================

// SoC芯片性能评分表（满分10分）
const SOC_PERFORMANCE_SCORES = {
    // Apple芯片
    'A19 Pro': { score: 10, tier: 'ultra', cores: 6, gpu: 'high' },
    'A19': { score: 9.5, tier: 'ultra', cores: 6, gpu: 'high' },
    'A18 Pro': { score: 9.5, tier: 'ultra', cores: 6, gpu: 'high' },
    'A18': { score: 9, tier: 'ultra', cores: 6, gpu: 'high' },
    'A17 Pro': { score: 9, tier: 'ultra', cores: 6, gpu: 'high' },
    'A17': { score: 8.5, tier: 'fast', cores: 6, gpu: 'medium' },
    'A16 Bionic': { score: 8.5, tier: 'fast', cores: 6, gpu: 'medium' },
    'A15 Bionic': { score: 8, tier: 'fast', cores: 6, gpu: 'medium' },
    'A14 Bionic': { score: 7.5, tier: 'fast', cores: 6, gpu: 'medium' },
    'A13 Bionic': { score: 7, tier: 'fast', cores: 6, gpu: 'medium' },

    // Apple M系列芯片（桌面级）
    'M4': { score: 10, tier: 'ultra', cores: 10, gpu: 'ultra' },
    'M3 Ultra': { score: 10, tier: 'ultra', cores: 24, gpu: 'ultra' },
    'M3 Max': { score: 9.5, tier: 'ultra', cores: 16, gpu: 'ultra' },
    'M3 Pro': { score: 9, tier: 'ultra', cores: 12, gpu: 'high' },
    'M3': { score: 8.5, tier: 'fast', cores: 8, gpu: 'high' },
    'M2 Ultra': { score: 9.5, tier: 'ultra', cores: 24, gpu: 'ultra' },
    'M2 Max': { score: 9, tier: 'ultra', cores: 12, gpu: 'high' },
    'M2 Pro': { score: 8.5, tier: 'fast', cores: 12, gpu: 'high' },
    'M2': { score: 8, tier: 'fast', cores: 8, gpu: 'high' },
    'M1 Ultra': { score: 9, tier: 'ultra', cores: 20, gpu: 'ultra' },
    'M1 Max': { score: 8.5, tier: 'fast', cores: 10, gpu: 'high' },
    'M1 Pro': { score: 8, tier: 'fast', cores: 10, gpu: 'high' },
    'M1': { score: 7.5, tier: 'fast', cores: 8, gpu: 'medium' },

    // NVIDIA GPU
    'RTX 5090': { score: 10, tier: 'ultra', cores: 24, gpu: 'ultra' },
    'RTX 5080': { score: 9.5, tier: 'ultra', cores: 20, gpu: 'ultra' },
    'RTX 4090': { score: 9.5, tier: 'ultra', cores: 24, gpu: 'ultra' },
    'RTX 4080': { score: 9, tier: 'ultra', cores: 16, gpu: 'ultra' },
    'RTX 4070': { score: 8.5, tier: 'fast', cores: 12, gpu: 'high' },
    'RTX 3090': { score: 9, tier: 'ultra', cores: 24, gpu: 'ultra' },
    'RTX 3080': { score: 8.5, tier: 'fast', cores: 16, gpu: 'high' },
    'RTX 3070': { score: 8, tier: 'fast', cores: 12, gpu: 'high' },

    // Intel桌面处理器
    'i9-14900K': { score: 9.5, tier: 'ultra', cores: 24, gpu: 'low' },
    'i9-13900K': { score: 9, tier: 'ultra', cores: 24, gpu: 'low' },
    'i9-12900K': { score: 8.5, tier: 'fast', cores: 16, gpu: 'low' },
    'i7-14700K': { score: 8.5, tier: 'fast', cores: 20, gpu: 'low' },
    'i7-13700K': { score: 8, tier: 'fast', cores: 16, gpu: 'low' },

    // AMD桌面处理器
    'Ryzen 9 7950X': { score: 9.5, tier: 'ultra', cores: 16, gpu: 'low' },
    'Ryzen 9 7900X': { score: 9, tier: 'ultra', cores: 12, gpu: 'low' },
    'Ryzen 7 7700X': { score: 8.5, tier: 'fast', cores: 8, gpu: 'low' },

    // 高通骁龙（Android）
    'Snapdragon 8 Gen 3': { score: 9, tier: 'ultra', cores: 8, gpu: 'high' },
    'Snapdragon 8 Gen 2': { score: 8.5, tier: 'fast', cores: 8, gpu: 'high' },
    'Snapdragon 8 Gen 1': { score: 8, tier: 'fast', cores: 8, gpu: 'medium' },
    'Snapdragon 888': { score: 7.5, tier: 'fast', cores: 8, gpu: 'medium' },

    // 联发科天玑（Android）
    'Dimensity 9300': { score: 8.5, tier: 'fast', cores: 8, gpu: 'high' },
    'Dimensity 9200': { score: 8, tier: 'fast', cores: 8, gpu: 'medium' },
};

// 内存配置策略（根据可用内存调整处理参数）
const MEMORY_STRATEGIES = {
    low: {      // < 4GB
        label: '低内存模式',
        chunkSize: 128 * 1024 * 1024,  // 128MB块
        maxChunksInMemory: 1,
        processingDelay: 1000,
        maxFileSize: 500 * 1024 * 1024  // 限制500MB
    },
    medium: {   // 4-8GB
        label: '标准内存模式',
        chunkSize: 256 * 1024 * 1024,  // 256MB块
        maxChunksInMemory: 2,
        processingDelay: 500,
        maxFileSize: 1024 * 1024 * 1024  // 1GB
    },
    high: {     // 8-16GB
        label: '高内存模式',
        chunkSize: 512 * 1024 * 1024,  // 512MB块
        maxChunksInMemory: 3,
        processingDelay: 200,
        maxFileSize: 2 * 1024 * 1024 * 1024  // 2GB
    },
    ultra: {    // > 16GB
        label: '超高内存模式',
        chunkSize: 1024 * 1024 * 1024,  // 1GB块
        maxChunksInMemory: 4,
        processingDelay: 50,
        maxFileSize: 2 * 1024 * 1024 * 1024  // 2GB
    }
};

// 性能档位配置
const PERFORMANCE_TIERS = {
    slow: {
        label: '低速档位',
        delay: 1000,
        description: '适用于低配设备，减少内存压力'
    },
    medium: {
        label: '中速档位',
        delay: 500,
        description: '适用于普通设备，平衡性能和稳定性'
    },
    fast: {
        label: '高速档位',
        delay: 200,
        description: '适用于高配设备，快速处理'
    },
    ultra: {
        label: '极速档位',
        delay: 50,
        description: '适用于高性能设备，极速处理'
    }
};

// 全局硬件配置缓存
let hardwareConfig = null;

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

// Unix可执行文件检测 - 无扩展名的文件
const UNIX_EXECUTABLE_NAMES = [
    'bash', 'sh', 'zsh', 'fish', 'tcsh', 'ksh',
    'python', 'python2', 'python3', 'node', 'perl', 'ruby',
    'awk', 'sed', 'grep', 'find', 'git', 'vim', 'nano',
    'npm', 'yarn', 'docker', 'kubectl', 'make', 'cmake'
];

// ==================== DOM 元素 ====================

// 在浏览器环境中初始化 DOM 元素引用
// 在 Node.js 测试环境中跳过（避免 ReferenceError）
let uploadArea, fileInput, fileInfo, fileName, fileSize, fileType;
let optionsSection, statusSection, successSection, statusText;
let resetBtn, corruptBtn, continueBtn, reportCard;
let randomizeNameCheckbox, downloadReportCheckbox, embedSignatureCheckbox;
let lastCorruptionReport = null;

// 存储动画相关的 timeout IDs，用于取消机制
let animationTimeouts = [];

if (typeof document !== 'undefined') {
    uploadArea = document.getElementById('uploadArea');
    fileInput = document.getElementById('fileInput');
    fileInfo = document.getElementById('fileInfo');
    fileName = document.getElementById('fileName');
    fileSize = document.getElementById('fileSize');
    fileType = document.getElementById('fileType');
    optionsSection = document.getElementById('optionsSection');
    statusSection = document.getElementById('statusSection');
    successSection = document.getElementById('successSection');
    statusText = document.getElementById('statusText');
    resetBtn = document.getElementById('resetBtn');
    corruptBtn = document.getElementById('corruptBtn');
    continueBtn = document.getElementById('continueBtn');
    reportCard = document.getElementById('reportCard');
    randomizeNameCheckbox = document.getElementById('randomizeName');
    downloadReportCheckbox = document.getElementById('downloadReport');
    embedSignatureCheckbox = document.getElementById('embedSignature');
}

// ==================== 文件上传处理 ====================

// 仅在浏览器环境中注册事件监听器
if (typeof document !== 'undefined') {
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
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            handleFileSelect(files);
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

        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            handleFileSelect(files);
        }
    });

    // 防止全局拖放（避免用户拖拽文件到页面其他位置时打开文件）
    document.addEventListener('dragover', (e) => {
        // 获取恢复上传区域（可能在DOM中不存在）
        const restoreUploadArea = document.getElementById('restoreUploadArea');

        // 检查拖拽是否在允许的区域内
        const isInUploadArea = uploadArea && uploadArea.contains(e.target);
        const isInRestoreArea = restoreUploadArea && restoreUploadArea.contains(e.target);

        // 只阻止不在任何上传区域内的拖拽
        if (!isInUploadArea && !isInRestoreArea) {
            e.preventDefault();
            if (e.dataTransfer) {
                e.dataTransfer.dropEffect = 'none';
            }
        }
    });

    document.addEventListener('drop', (e) => {
        // 获取恢复上传区域（可能在DOM中不存在）
        const restoreUploadArea = document.getElementById('restoreUploadArea');

        // 检查drop是否在允许的区域内
        const isInUploadArea = uploadArea && uploadArea.contains(e.target);
        const isInRestoreArea = restoreUploadArea && restoreUploadArea.contains(e.target);

        // 只阻止不在任何上传区域内的drop
        if (!isInUploadArea && !isInRestoreArea) {
            e.preventDefault();
        }
    });
}

// ==================== 文件处理函数 ====================

/**
 * 处理选中的文件
 * @param {File[]} files - 用户选择的文件数组
 */
function handleFileSelect(files) {
    if (!files || files.length === 0) {
        console.error('没有文件被选择');
        return;
    }

    // 验证所有文件
    const validFiles = [];
    const errors = [];

    for (const file of files) {
        if (file.size > MAX_FILE_SIZE) {
            errors.push(`${file.name}: 文件过大 (${formatFileSize(file.size)})`);
            continue;
        }

        const extension = extractExtension(file.name);

        if (!extension) {
            errors.push(`${file.name}: 无法识别文件扩展名`);
            continue;
        }

        if (!SUPPORTED_FORMATS[extension]) {
            errors.push(`${file.name}: 不支持的文件格式 (.${extension})`);
            continue;
        }

        validFiles.push(file);
    }

    if (errors.length > 0 && validFiles.length === 0) {
        // 所有文件都被拒绝，需要完整重置UI状态
        showAlert(`所有文件都无效：\n\n${errors.join('\n')}\n\n最大限制：${formatFileSize(MAX_FILE_SIZE)}`);

        // 重置所有状态和UI元素，避免显示陈旧数据
        resetApp();
        return;
    }

    if (errors.length > 0) {
        showAlert(`以下文件被跳过：\n\n${errors.join('\n')}\n\n将处理 ${validFiles.length} 个有效文件。`);
    }

    selectedFiles = validFiles;

    // 清空并安全地重建文件信息显示（防止 XSS）
    fileInfo.innerHTML = ''; // 先清空

    if (validFiles.length === 1) {
        // 单文件模式 - 使用安全的 DOM 操作
        const file = validFiles[0];
        const extension = extractExtension(file.name);
        const categoryKey = getFileCategory(extension);
        const categoryLabel = getCategoryLabel(categoryKey);
        const typeLabel = SUPPORTED_FORMATS[extension] || file.type || '未知类型';

        // 文件名行
        const nameRow = createSafeElement('div', { class: 'info-row' });
        nameRow.appendChild(createSafeElement('span', { class: 'info-label' }, '文件名：'));
        nameRow.appendChild(createSafeElement('span', { class: 'info-value' }, file.name)); // 安全的 textContent
        fileInfo.appendChild(nameRow);

        // 文件大小行
        const sizeRow = createSafeElement('div', { class: 'info-row' });
        sizeRow.appendChild(createSafeElement('span', { class: 'info-label' }, '文件大小：'));
        sizeRow.appendChild(createSafeElement('span', { class: 'info-value' }, formatFileSize(file.size)));
        fileInfo.appendChild(sizeRow);

        // 文件类型行
        const typeRow = createSafeElement('div', { class: 'info-row' });
        typeRow.appendChild(createSafeElement('span', { class: 'info-label' }, '文件类型：'));
        const typeText = categoryLabel ? `${typeLabel} · ${categoryLabel}` : typeLabel;
        typeRow.appendChild(createSafeElement('span', { class: 'info-value' }, typeText));
        fileInfo.appendChild(typeRow);
    } else {
        // 批量文件模式 - 使用安全的 DOM 操作
        const totalSize = validFiles.reduce((sum, f) => sum + f.size, 0);

        // 文件数量行
        const countRow = createSafeElement('div', { class: 'info-row' });
        countRow.appendChild(createSafeElement('span', { class: 'info-label' }, '文件数量：'));
        countRow.appendChild(createSafeElement('span', { class: 'info-value' }, `${validFiles.length} 个文件`));
        fileInfo.appendChild(countRow);

        // 总大小行
        const totalSizeRow = createSafeElement('div', { class: 'info-row' });
        totalSizeRow.appendChild(createSafeElement('span', { class: 'info-label' }, '总大小：'));
        totalSizeRow.appendChild(createSafeElement('span', { class: 'info-value' }, formatFileSize(totalSize)));
        fileInfo.appendChild(totalSizeRow);

        // 文件列表行
        const listRow = createSafeElement('div', {
            class: 'info-row',
            style: { display: 'block', 'margin-top': '12px' }
        });
        const listLabel = createSafeElement('span', {
            class: 'info-label',
            style: { display: 'block', 'margin-bottom': '8px' }
        }, '文件列表：');
        listRow.appendChild(listLabel);

        // 文件列表容器（每个文件单独一个元素，避免 XSS）
        const listContainer = createSafeElement('div', {
            style: {
                'font-size': '13px',
                'line-height': '1.6',
                color: 'var(--gray-700)'
            }
        });

        validFiles.forEach(f => {
            const fileItem = createSafeElement('div', {}, `• ${f.name} (${formatFileSize(f.size)})`);
            listContainer.appendChild(fileItem);
        });

        listRow.appendChild(listContainer);
        fileInfo.appendChild(listRow);
    }

    // 显示文件信息和选项，隐藏上传区域
    fileInfo.style.display = 'block';
    optionsSection.style.display = 'block';
    uploadArea.style.display = 'none';

    // 检查并更新可逆模式的可用性
    updateReversibleModeAvailability();
}

/**
 * 更新可逆模式复选框的可用性（基于文件大小）
 */
function updateReversibleModeAvailability() {
    const reversibleModeCheckbox = document.getElementById('reversibleMode');
    const passwordInputWrapper = document.getElementById('passwordInputWrapper');

    if (!reversibleModeCheckbox) return;

    // 检查所有选中的文件是否都在500MB以内
    let allFilesSupported = true;
    let maxFileSize = 0;
    let maxFileName = '';

    for (const file of selectedFiles) {
        if (file.size > maxFileSize) {
            maxFileSize = file.size;
            maxFileName = file.name;
        }
        if (file.size > MAX_REVERSIBLE_FILE_SIZE) {
            allFilesSupported = false;
        }
    }

    if (!allFilesSupported) {
        // 禁用可逆模式
        reversibleModeCheckbox.disabled = true;
        reversibleModeCheckbox.checked = false;
        if (passwordInputWrapper) {
            passwordInputWrapper.style.display = 'none';
        }

        // 更新复选框的父元素样式，添加提示
        const optionLabel = reversibleModeCheckbox.closest('.advanced-option');
        if (optionLabel) {
            optionLabel.style.opacity = '0.5';
            optionLabel.style.cursor = 'not-allowed';

            // 添加禁用原因提示
            let hintDiv = optionLabel.querySelector('.reversible-hint');
            if (!hintDiv) {
                hintDiv = document.createElement('div');
                hintDiv.className = 'reversible-hint';
                hintDiv.style.cssText = 'margin-top: 8px; padding: 8px; background-color: #fff3cd; border: 1px solid #ffc107; border-radius: 4px; font-size: 12px; color: #856404;';
                const descDiv = optionLabel.querySelector('div:last-child');
                if (descDiv) {
                    descDiv.appendChild(hintDiv);
                }
            }
            hintDiv.textContent = `不可用：文件 "${maxFileName}" (${formatFileSize(maxFileSize)}) 超过500MB限制。可逆模式仅支持500MB以内的文件。`;
        }
    } else {
        // 启用可逆模式
        reversibleModeCheckbox.disabled = false;

        const optionLabel = reversibleModeCheckbox.closest('.advanced-option');
        if (optionLabel) {
            optionLabel.style.opacity = '1';
            optionLabel.style.cursor = 'pointer';

            // 移除禁用提示
            const hintDiv = optionLabel.querySelector('.reversible-hint');
            if (hintDiv) {
                hintDiv.remove();
            }
        }
    }
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
            // 例如：README, CHANGELOG, AUTHORS 等文档文件
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

function showAlert(message) {
    if (typeof alert === 'function') {
        alert(message);
    } else {
        console.warn('[ALERT]', message);
    }
}

/**
 * 安全的 HTML 转义函数，防止 XSS 攻击
 * @param {string} str - 需要转义的字符串
 * @returns {string} 转义后的安全字符串
 */
function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/**
 * 安全地创建并添加 DOM 元素（防止 XSS）
 * @param {string} tag - 标签名
 * @param {Object} attributes - 属性对象
 * @param {string} textContent - 文本内容（会自动转义）
 * @returns {HTMLElement}
 */
function createSafeElement(tag, attributes = {}, textContent = '') {
    const element = document.createElement(tag);
    for (const [key, value] of Object.entries(attributes)) {
        if (key === 'style' && typeof value === 'object') {
            Object.assign(element.style, value);
        } else {
            element.setAttribute(key, value);
        }
    }
    if (textContent) {
        element.textContent = textContent; // 使用 textContent 而非 innerHTML 防止 XSS
    }
    return element;
}

// ==================== 按钮事件处理 ====================

// 仅在浏览器环境中注册按钮事件
if (typeof document !== 'undefined') {
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
    if (!selectedFiles || selectedFiles.length === 0) return;

    try {
        const level = document.querySelector('input[name="level"]:checked').value;
        const options = getAdvancedOptions();
        const delay = getProcessingDelay(options.processingSpeed);

        optionsSection.style.display = 'none';
        fileInfo.style.display = 'none';

        if (selectedFiles.length === 1) {
            // 单文件模式：使用碎纸机动画
            const file = selectedFiles[0];
            const extension = extractExtension(file.name);
            const displayFormat = extension ? extension.toUpperCase() : 'FILE';

            // 估算处理时间（至少1秒，根据实际delay延长）
            const estimatedTime = Math.max(1000, delay);

            // 启动碎纸机动画和文件破坏同时进行
            const animationPromise = playShredderAnimation(displayFormat, level, estimatedTime);
            const corruptPromise = corruptFile(file, level, options);

            // 等待两者都完成
            await Promise.all([animationPromise, corruptPromise]);
        } else {
            // 批量处理多个文件：使用传统的转圈效果
            statusSection.style.display = 'block';
            for (let i = 0; i < selectedFiles.length; i++) {
                const file = selectedFiles[i];
                statusText.textContent = `正在破坏文件 ${i + 1}/${selectedFiles.length}: ${file.name}`;

                // 根据速度档位调整延迟
                const batchDelay = Math.min(delay, 500);
                await new Promise(resolve => setTimeout(resolve, batchDelay));
                await corruptFile(file, level, options);
            }
            statusSection.style.display = 'none';
        }

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

        // 隐藏所有处理中的显示
        statusSection.style.display = 'none';
        const printerAnimation = document.getElementById('printerAnimation');
        if (printerAnimation) {
            printerAnimation.style.display = 'none';
        }

        // 恢复选项和文件信息
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

    // ==================== 可逆模式UI事件 ====================

    /**
     * 可逆模式复选框 - 显示/隐藏密码输入框
     */
    const reversibleModeCheckbox = document.getElementById('reversibleMode');
    const passwordInputWrapper = document.getElementById('passwordInputWrapper');
    if (reversibleModeCheckbox && passwordInputWrapper) {
        reversibleModeCheckbox.addEventListener('change', (e) => {
            passwordInputWrapper.style.display = e.target.checked ? 'block' : 'none';
        });
    }

    /**
     * 密码强度检查
     */
    const encryptionPassword = document.getElementById('encryptionPassword');
    const passwordStrengthDiv = document.getElementById('passwordStrength');
    if (encryptionPassword && passwordStrengthDiv) {
        encryptionPassword.addEventListener('input', (e) => {
            const strengthInfo = checkPasswordStrength(e.target.value);
            if (strengthInfo.strength > 0) {
                passwordStrengthDiv.textContent = `密码强度：${strengthInfo.text}`;
                passwordStrengthDiv.style.color = strengthInfo.color;
            } else {
                passwordStrengthDiv.textContent = '';
            }
        });
    }

    /**
     * 模式切换按钮（破坏模式 vs 恢复模式）
     */
    const modeTabs = document.querySelectorAll('.mode-tab');
    const uploadSection = document.querySelector('.upload-section');
    const restoreSection = document.getElementById('restoreSection');
    const optionsSection = document.getElementById('optionsSection');

    modeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const mode = tab.dataset.mode;

            // 更新tab样式
            modeTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // 重置应用状态
            resetApp();

            if (mode === 'corrupt') {
                // 破坏模式
                if (uploadSection) uploadSection.style.display = 'block';
                if (restoreSection) restoreSection.style.display = 'none';
                // 显示上传区域
                if (uploadArea) uploadArea.style.display = 'block';
            } else if (mode === 'restore') {
                // 恢复模式
                if (uploadSection) uploadSection.style.display = 'none';
                if (restoreSection) restoreSection.style.display = 'block';
                if (optionsSection) optionsSection.style.display = 'none';
                // 隐藏破坏模式的上传区域
                if (uploadArea) uploadArea.style.display = 'none';
            }
        });
    });

    /**
     * 恢复模式：文件上传
     */
    const restoreUploadArea = document.getElementById('restoreUploadArea');
    const restoreFileInput = document.getElementById('restoreFileInput');
    const restoreFileInfo = document.getElementById('restoreFileInfo');
    const restorePasswordSection = document.getElementById('restorePasswordSection');
    let restoreFileData = null;

    if (restoreUploadArea && restoreFileInput) {
        // 共享的文件处理函数，供change事件和drop事件（回退路径）使用
        async function processRestoreFile(file) {
            if (!file) return;

            // 显示加载状态
            statusSection.style.display = 'block';
            statusText.textContent = '正在验证文件...';

            try {
                // 读取文件
                const arrayBuffer = await file.arrayBuffer();
                const fileData = new Uint8Array(arrayBuffer);

                statusText.textContent = '正在检查文件格式...';

                // 验证是否为可逆文件
                const reversibleData = extractReversibleData(fileData);

                // 隐藏加载状态
                statusSection.style.display = 'none';

                if (!reversibleData) {
                    showAlert('此文件不是通过可逆模式破坏的文件，无法恢复！\n\n请确保：\n1. 文件是通过本工具的"可逆破坏模式"创建的\n2. 文件未被二次修改');
                    // 重置文件输入
                    restoreFileInput.value = '';
                    return;
                }

                // 显示文件信息
                restoreFileData = reversibleData;
                document.getElementById('restoreFileName').textContent = file.name;
                document.getElementById('restoreFileSize').textContent = formatFileSize(file.size);
                document.getElementById('restoreVerifyStatus').innerHTML = '<span style="color: green;">[可恢复] 文件验证通过</span>';

                restoreUploadArea.style.display = 'none';
                restoreFileInfo.style.display = 'block';
                restorePasswordSection.style.display = 'block';
            } catch (error) {
                // 隐藏加载状态
                statusSection.style.display = 'none';

                console.error('文件验证失败:', error);
                showAlert(`文件验证失败：${error.message}`);

                // 重置文件输入
                restoreFileInput.value = '';
            }
        }

        // 点击上传区域时触发文件选择（参考破坏模式的交互逻辑）
        restoreUploadArea.addEventListener('click', (e) => {
            // 只有在上传区域可见时才处理点击
            if (restoreUploadArea.style.display === 'none') {
                return;
            }
            // 如果点击的不是文件输入框本身，触发文件选择
            if (e.target !== restoreFileInput) {
                e.preventDefault();
                restoreFileInput.click();
            }
        });

        // 添加拖放支持
        restoreUploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            restoreUploadArea.classList.add('dragover');
        });

        restoreUploadArea.addEventListener('dragleave', () => {
            restoreUploadArea.classList.remove('dragover');
        });

        restoreUploadArea.addEventListener('drop', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            restoreUploadArea.classList.remove('dragover');

            const files = e.dataTransfer.files;
            if (files.length > 0) {
                // 特性检测：DataTransfer构造函数在Safari/iOS和旧版Firefox中不可用
                // 尝试使用DataTransfer将文件设置到input并触发change事件（避免代码重复）
                // 如果不支持，则直接处理文件（回退路径）
                try {
                    if (typeof DataTransfer !== 'undefined' && DataTransfer.prototype.items) {
                        // Chromium和新版浏览器：设置到input元素，然后触发change事件
                        const dataTransfer = new DataTransfer();
                        dataTransfer.items.add(files[0]);
                        restoreFileInput.files = dataTransfer.files;

                        // 触发change事件
                        const event = new Event('change', { bubbles: true });
                        restoreFileInput.dispatchEvent(event);
                    } else {
                        // Safari/iOS、旧版Firefox：直接处理文件
                        await processRestoreFile(files[0]);
                    }
                } catch (error) {
                    // DataTransfer构造失败，回退到直接处理
                    console.warn('DataTransfer不可用，使用回退路径:', error);
                    await processRestoreFile(files[0]);
                }
            }
        });

        restoreFileInput.addEventListener('change', async (e) => {
            await processRestoreFile(e.target.files[0]);
        });
    }

    /**
     * 恢复模式：取消按钮
     */
    const restoreCancelBtn = document.getElementById('restoreCancelBtn');
    if (restoreCancelBtn) {
        restoreCancelBtn.addEventListener('click', () => {
            restoreFileData = null;
            restoreUploadArea.style.display = 'block';
            restoreFileInfo.style.display = 'none';
            restorePasswordSection.style.display = 'none';
            if (restoreFileInput) restoreFileInput.value = '';
        });
    }

    /**
     * 恢复模式：恢复文件按钮
     */
    const restoreBtn = document.getElementById('restoreBtn');
    const restoreSuccess = document.getElementById('restoreSuccess');
    const restorePassword = document.getElementById('restorePassword');

    if (restoreBtn) {
        restoreBtn.addEventListener('click', async () => {
            if (!restoreFileData) {
                showAlert('请先上传文件！');
                return;
            }

            const password = restorePassword ? restorePassword.value : '';
            if (!password) {
                showAlert('请输入解密密钥！');
                return;
            }

            try {
                // 显示状态
                statusSection.style.display = 'block';
                restorePasswordSection.style.display = 'none';
                statusText.textContent = '正在解密恢复数据...';

                const { reversibleInfo, corruptedData } = restoreFileData;

                // 解码Base64
                const iv = base64ToArray(reversibleInfo.iv);
                const salt = base64ToArray(reversibleInfo.salt);
                const encryptedDiff = base64ToArray(reversibleInfo.encryptedDiff);

                // 解密diff
                statusText.textContent = '正在验证密钥...';
                let compressedDiff;
                try {
                    compressedDiff = await decryptData(encryptedDiff, password, iv, salt);
                } catch (decryptError) {
                    throw new Error('密钥错误！请确认输入的密钥是否正确。');
                }

                // 解压diff
                statusText.textContent = '正在解压恢复数据...';
                const diff = decompressDiff(compressedDiff);

                // 应用diff恢复文件
                statusText.textContent = '正在恢复原始文件...';
                const restoredData = applyDiff(corruptedData, diff);

                // 下载恢复后的文件
                statusText.textContent = '恢复完成，正在下载...';
                const blob = new Blob([restoredData]);
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = reversibleInfo.originalFileName || 'restored_file';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);

                // 显示成功信息
                statusSection.style.display = 'none';
                restoreFileInfo.style.display = 'none';
                restoreSuccess.style.display = 'block';

                console.log('文件恢复成功！');
            } catch (error) {
                console.error('文件恢复失败:', error);
                statusSection.style.display = 'none';
                restorePasswordSection.style.display = 'block';
                showAlert(`恢复失败：${error.message}`);
            }
        });
    }

    /**
     * 恢复模式：恢复其他文件按钮
     */
    const restoreAnotherBtn = document.getElementById('restoreAnotherBtn');
    if (restoreAnotherBtn) {
        restoreAnotherBtn.addEventListener('click', () => {
            restoreFileData = null;
            restoreUploadArea.style.display = 'block';
            restoreFileInfo.style.display = 'none';
            restorePasswordSection.style.display = 'none';
            restoreSuccess.style.display = 'none';
            if (restoreFileInput) restoreFileInput.value = '';
            if (restorePassword) restorePassword.value = '';
        });
    }
} // 结束浏览器环境检查

// ==================== 文件破坏核心逻辑 ====================

/**
 * 分块读取文件
 * @param {File} file - 要读取的文件
 * @param {number} start - 起始位置
 * @param {number} end - 结束位置
 * @returns {Promise<Uint8Array>} 读取的数据块
 */
async function readFileChunk(file, start, end) {
    const slice = file.slice(start, end);
    const arrayBuffer = await slice.arrayBuffer();
    return new Uint8Array(arrayBuffer);
}

/**
 * 对单个数据块应用智能破坏（策略感知版本）
 * @param {Uint8Array} chunkData - 数据块
 * @param {number} chunkStart - 块在文件中的起始位置
 * @param {number} chunkBudget - 这个块应该破坏的字节数
 * @param {string} level - 破坏级别
 * @param {Object} context - 破坏上下文
 * @returns {number} 修改的字节数
 */
function applyCorruptionToChunk(chunkData, chunkStart, chunkBudget, level, context) {
    const { random, strategy, extension } = context;
    const chunkSize = chunkData.length;
    const isFirstChunk = (chunkStart === 0);
    let bytesModified = 0;

    // 第一个块：应用头部和签名破坏（格式感知）
    if (isFirstChunk) {
        if (strategy === 'archive') {
            // 破坏归档文件头部
            const headerSize = Math.min(64, chunkSize);
            bytesModified += mutateHeader(chunkData, headerSize, level === 'heavy' ? 1 : 0.8, random);

            // 特定格式的签名破坏
            if (extension === 'zip' && chunkSize > 4) {
                bytesModified += corruptSignature(chunkData, [0x50, 0x4B], 1, random);
            } else if (extension === 'rar' && chunkSize > 4) {
                bytesModified += corruptSignature(chunkData, [0x52, 0x61, 0x72, 0x21], 1, random);
            } else if (extension === '7z' && chunkSize > 4) {
                bytesModified += corruptSignature(chunkData, [0x37, 0x7A, 0xBC, 0xAF], 1, random);
            }
        } else if (strategy === 'text') {
            // 文本文件：注入破坏标记
            const encoder = new TextEncoder();
            const headline = encoder.encode('/* FILE CORRUPTED */');
            if (chunkSize > headline.length) {
                bytesModified += writePattern(chunkData, 0, headline);
            }
        } else if (strategy === 'media') {
            // 媒体文件：破坏头部信息
            const headerSize = Math.min(48, chunkSize);
            bytesModified += mutateHeader(chunkData, headerSize, 0.8, random);
        } else {
            // 其他文件：破坏文件头
            const headerSize = Math.min(32, chunkSize);
            bytesModified += randomizeRange(chunkData, 0, headerSize, 1, random);
        }
    }

    // 在块内随机分布破坏（性能优化版本）
    const remainingBudget = Math.max(0, chunkBudget - bytesModified);

    // 性能限制：避免数亿次迭代锁死浏览器
    // 对于大预算，使用区间破坏而非逐字节
    const maxIterations = CHUNK_PROCESSING_CONFIG.maxIterationsPerChunk;

    if (remainingBudget > maxIterations) {
        // 大预算：使用区间破坏（高效）
        const numIntervals = Math.min(100, Math.ceil(chunkSize / 10000)); // 最多100个区间
        const intervalSize = Math.floor(chunkSize / numIntervals);

        for (let i = 0; i < numIntervals; i++) {
            const intervalStart = i * intervalSize;
            const intervalEnd = Math.min((i + 1) * intervalSize, chunkSize);
            const probability = Math.min(1.0, remainingBudget / chunkSize); // 破坏概率

            bytesModified += randomizeRange(chunkData, intervalStart, intervalEnd, probability, random);
        }
    } else {
        // 小预算：逐字节破坏（精确）
        const intervalsCount = Math.min(remainingBudget, chunkSize);

        for (let i = 0; i < intervalsCount; i++) {
            const localPos = Math.floor(random() * chunkSize);
            chunkData[localPos] = Math.floor(random() * 256);
            bytesModified++;
        }
    }

    return bytesModified;
}

/**
 * 使用分块处理大文件（内存优化版本，使用Blob）
 * @param {File} file - 要处理的文件
 * @param {string} level - 破坏级别
 * @param {Object} context - 破坏上下文
 * @returns {Promise<{data: Blob, bytesModified: number}>}
 */
async function processLargeFileInChunks(file, level, context) {
    const fileSize = file.size;

    // 使用优化配置（根据硬件自动调整）
    // 使用let使其在处理过程中可以被自适应调整
    let currentConfig = getOptimizedConfig();
    let chunkSize = currentConfig.chunkSize;
    const totalChunks = Math.ceil(fileSize / chunkSize);

    console.log(`📦 分块处理: 文件大小=${(fileSize/1024/1024).toFixed(1)}MB, 块大小=${(chunkSize/1024/1024).toFixed(0)}MB, 总块数=${totalChunks}`);

    // 计算总的目标破坏字节数
    let totalTargetCount;
    switch (level) {
        case 'light':
            totalTargetCount = Math.floor(fileSize * 0.001); // 0.1%
            break;
        case 'medium':
            totalTargetCount = Math.floor(fileSize * 0.01); // 1%
            break;
        case 'heavy':
            totalTargetCount = Math.floor(fileSize * 0.40); // 40%
            break;
        default:
            totalTargetCount = Math.floor(fileSize * 0.001);
    }
    totalTargetCount = Math.min(totalTargetCount, fileSize);

    // 使用BlobParts数组，让浏览器管理内存
    const blobParts = [];
    let totalBytesModified = 0;

    try {
        // 分块处理
        for (let i = 0; i < totalChunks; i++) {
            const start = i * chunkSize;
            const end = Math.min(start + chunkSize, fileSize);
            const currentChunkSize = end - start;
            const isLastChunk = (i === totalChunks - 1);

            // 计算这个块的预算：按比例分配
            const chunkBudget = Math.floor(currentChunkSize / fileSize * totalTargetCount);

            // 更新进度显示
            const progress = Math.floor((i / totalChunks) * 100);
            if (typeof statusText !== 'undefined') {
                statusText.textContent = `处理中... ${progress}% (${i + 1}/${totalChunks} 块)`;
            }

            // 读取块（添加错误处理）
            let chunkData;
            try {
                chunkData = await readFileChunk(file, start, end);
            } catch (readError) {
                throw new Error(`读取文件块 ${i + 1}/${totalChunks} 失败: ${readError.message}`);
            }

            // 对块应用智能破坏（传递 level 参数）
            const bytesModified = applyCorruptionToChunk(chunkData, start, chunkBudget, level, context);
            totalBytesModified += bytesModified;

            // 如果是最后一个块且需要嵌入签名，在这个块中嵌入
            if (isLastChunk && context.options.embedSignature && chunkData.length > 1024) {
                try {
                    const signatureResult = embedCorruptionSignature(chunkData, context);
                    totalBytesModified += signatureResult.bytesModified;
                } catch (sigError) {
                    // 签名嵌入失败不致命，继续处理
                    console.warn('签名嵌入失败:', sigError);
                }
            }

            // 将处理后的块添加到BlobParts（浏览器管理内存）
            blobParts.push(chunkData);

            // 内存监控和自适应优化
            if (context.monitor) {
                const memCheck = context.monitor.checkMemory();
                if (memCheck.warning) {
                    // 检测到内存警告：应用自适应降级配置
                    const previousConfig = currentConfig;
                    currentConfig = createAdaptiveConfig(currentConfig, context.monitor);

                    // 如果配置发生变化，应用新的处理延迟
                    if (currentConfig !== previousConfig) {
                        console.log(`🔄 自适应降级: 延迟 ${previousConfig.processingDelay}ms → ${currentConfig.processingDelay}ms`);
                        // 立即应用更长的延迟以缓解内存压力
                        await new Promise(resolve => setTimeout(resolve, currentConfig.processingDelay));
                    } else {
                        // 未触发降级，但仍需额外延迟以缓解内存压力
                        await new Promise(resolve => setTimeout(resolve, 200));
                    }
                }
            }

            // 允许浏览器在处理块之间进行垃圾回收
            // 使用当前配置的处理延迟
            if (i % 4 === 0 && currentConfig.processingDelay > 0) {
                await new Promise(resolve => setTimeout(resolve, Math.min(currentConfig.processingDelay / 4, 100)));
            }
        }

        // 创建最终Blob（浏览器内部优化，不会复制所有数据到内存）
        if (typeof statusText !== 'undefined') {
            statusText.textContent = '合并数据...';
        }

        const resultBlob = new Blob(blobParts, { type: 'application/octet-stream' });

        // 报告自适应降级情况
        if (context.monitor && context.monitor.degraded) {
            console.log(`📊 处理完成: 检测到 ${context.monitor.memoryWarnings} 次内存警告，已应用自适应降级`);
        }

        return { data: resultBlob, bytesModified: totalBytesModified };

    } catch (error) {
        // 清理已分配的资源
        blobParts.length = 0;

        // 重新抛出错误，由上层处理
        throw new Error(`分块处理失败: ${error.message}`);
    }
}

/**
 * 破坏文件的核心函数（重构版，支持大文件分块处理）
 * @param {File} file - 要破坏的文件
 * @param {string} level - 破坏程度 (light/medium/heavy)
 */
async function corruptFile(file, level, options) {
    const startTime = getTimestamp();

    // 创建性能监控器
    const monitor = new PerformanceMonitor();
    monitor.start();

    // 内存安全检查
    try {
        await checkMemorySafety(file.size);
        monitor.checkpoint('内存安全检查');
    } catch (error) {
        console.error('❌ 内存安全检查失败:', error);
        throw error;
    }

    // 获取文件扩展名及类别
    const extension = extractExtension(file.name);
    const categoryKey = getFileCategory(extension);
    const strategy = getStrategyForCategory(categoryKey);

    const randomSeed = generateSeed();
    const random = createRandomGenerator(randomSeed);
    const fileSize = file.size;

    const corruptionContext = {
        fileSize: fileSize,
        extension,
        categoryKey,
        strategy,
        seed: randomSeed,
        options,
        random,
        monitor  // 传递监控器
    };

    let dataResult; // 可以是 Uint8Array 或 Blob
    let corruptionResult;

    // 根据文件大小和硬件配置选择处理策略
    const config = getOptimizedConfig();
    const usesChunkedProcessing = fileSize > config.chunkSize;

    monitor.checkpoint('初始化完成');

    if (usesChunkedProcessing) {
        // 大文件：使用分块处理（返回Blob）
        statusText.textContent = '处理大文件（分块模式）...';

        try {
            const result = await processLargeFileInChunks(file, level, corruptionContext);
            dataResult = result.data; // Blob

            const stepsArray = [
                `使用分块处理模式处理大文件 (${formatFileSize(fileSize)})`,
                `使用格式感知的智能破坏策略（${strategy}）`,
                `共修改 ${result.bytesModified} 字节`,
                `破坏级别: ${level === 'light' ? '轻度' : level === 'medium' ? '中度' : '重度'}`
            ];

            // 如果嵌入了签名，添加到步骤中
            if (options.embedSignature) {
                stepsArray.push('在最后一个数据块中嵌入破坏签名');
            }

            corruptionResult = {
                level,
                bytesModified: result.bytesModified,
                steps: stepsArray
            };
        } catch (chunkError) {
            // 分块处理失败，显示友好错误
            throw new Error(`大文件处理失败: ${chunkError.message}。请尝试较小的文件或刷新页面重试。`);
        }
    } else {
        // 小文件：使用传统的精细处理策略（返回Uint8Array）
        statusText.textContent = '读取文件...';
        const arrayBuffer = await file.arrayBuffer();
        dataResult = new Uint8Array(arrayBuffer);

        // 更新context中的fileSize为实际的数组长度
        corruptionContext.fileSize = dataResult.length;

        statusText.textContent = '应用破坏策略...';
        switch (level) {
            case 'light':
                corruptionResult = corruptLight(dataResult, corruptionContext);
                break;
            case 'medium':
                corruptionResult = corruptMedium(dataResult, corruptionContext);
                break;
            case 'heavy':
            default:
                corruptionResult = corruptHeavy(dataResult, corruptionContext);
                break;
        }

        // 嵌入签名（仅对小文件，大文件已在分块处理中嵌入）
        if (options.embedSignature && dataResult.length > 1024) {
            statusText.textContent = '嵌入破坏签名...';
            const signatureResult = embedCorruptionSignature(dataResult, corruptionContext);
            corruptionResult.bytesModified += signatureResult.bytesModified;
            corruptionResult.steps.push(signatureResult.description);
        }
    }

    // 可逆破坏处理
    if (options.reversibleMode && options.encryptionPassword) {
        statusText.textContent = '生成恢复数据...';

        try {
            // 读取原始文件数据（用于生成diff）
            const originalArrayBuffer = await file.arrayBuffer();
            const originalData = new Uint8Array(originalArrayBuffer);

            // 将结果转换为Uint8Array（如果是Blob）
            let corruptedData;
            if (dataResult instanceof Blob) {
                const corruptedBuffer = await dataResult.arrayBuffer();
                corruptedData = new Uint8Array(corruptedBuffer);
            } else {
                corruptedData = dataResult;
            }

            // 生成diff
            statusText.textContent = '分析文件差异...';
            const diff = generateDiff(originalData, corruptedData);

            // 压缩diff
            statusText.textContent = '压缩恢复数据...';
            const compressedDiff = compressDiff(diff);

            // 加密压缩后的diff
            statusText.textContent = '加密恢复数据...';
            const encryptedResult = await encryptData(compressedDiff, options.encryptionPassword);

            // 构建可逆信息
            const reversibleInfo = {
                version: REVERSIBLE_MARKER.version,
                timestamp: new Date().toISOString(),
                originalFileName: file.name,
                originalSize: originalData.length,
                corruptedSize: corruptedData.length,
                iv: arrayToBase64(encryptedResult.iv),
                salt: arrayToBase64(encryptedResult.salt),
                encryptedDiff: arrayToBase64(encryptedResult.encrypted),
                diffSize: diff.totalChanges,
                level: level,
                strategy: strategy
            };

            // 嵌入可逆数据
            statusText.textContent = '嵌入恢复信息...';
            dataResult = embedReversibleData(corruptedData, reversibleInfo);

            // 更新报告
            corruptionResult.steps.push(`[可逆模式] 已加密保存 ${diff.totalChanges} 处修改记录`);
            corruptionResult.steps.push(`[加密算法] AES-256-GCM with PBKDF2 (100000次迭代)`);
            corruptionResult.steps.push(`[压缩后大小] ${formatFileSize(encryptedResult.encrypted.length)}`);
        } catch (reversibleError) {
            console.error('可逆处理失败:', reversibleError);
            throw new Error(`可逆数据处理失败: ${reversibleError.message}`);
        }
    }

    statusText.textContent = '破坏完成，正在准备下载...';

    monitor.checkpoint('文件处理完成');

    const downloadName = downloadCorruptedFile(dataResult, file.name, options);

    monitor.checkpoint('文件下载准备完成');

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
        seed: randomSeed,
        usedChunkedProcessing: usesChunkedProcessing
    });

    // 输出性能报告
    monitor.report();

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
    // 如果 data 已经是 Blob，直接使用；否则创建 Blob
    const blob = (data instanceof Blob)
        ? data
        : new Blob([data], { type: 'application/octet-stream' });

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
    const processingSpeed = document.getElementById('processingSpeed');
    const reversibleMode = document.getElementById('reversibleMode');
    const encryptionPassword = document.getElementById('encryptionPassword');
    const encryptionPasswordConfirm = document.getElementById('encryptionPasswordConfirm');

    // 验证可逆模式的密码
    let password = null;
    if (reversibleMode && reversibleMode.checked) {
        const pwd = encryptionPassword ? encryptionPassword.value : '';
        const confirmPwd = encryptionPasswordConfirm ? encryptionPasswordConfirm.value : '';

        if (!pwd || pwd.length < 8) {
            throw new Error('可逆模式需要至少8个字符的加密密钥！');
        }

        if (pwd !== confirmPwd) {
            throw new Error('两次输入的密钥不一致，请检查！');
        }

        password = pwd;
    }

    return {
        randomizeName: randomizeName ? randomizeName.checked : false,
        downloadReport: downloadReport ? downloadReport.checked : false,
        embedSignature: embedSignature ? embedSignature.checked : true,
        processingSpeed: processingSpeed ? processingSpeed.value : 'medium',
        reversibleMode: reversibleMode ? reversibleMode.checked : false,
        encryptionPassword: password
    };
}

// ==================== 高级硬件检测模块 ====================

/**
 * 检测SoC芯片型号
 * 通过UserAgent、WebGL信息等多种方式识别具体芯片
 */
function detectSoCChip() {
    const ua = navigator.userAgent;
    let chipName = null;
    let chipInfo = null;

    // 检测Apple设备
    if (/iPhone|iPad|iPod/i.test(ua)) {
        // 尝试通过设备型号推断芯片
        // iPhone 15 Pro -> A17 Pro, iPhone 15 -> A16
        // iPad Pro M2/M1等

        // 通过核心数推断（粗略估计）
        const cores = navigator.hardwareConcurrency || 4;

        if (/iPad/i.test(ua)) {
            if (cores >= 10) {
                chipName = 'M2'; // M2或更新
                chipInfo = SOC_PERFORMANCE_SCORES['M2'];
            } else if (cores >= 8) {
                chipName = 'M1'; // M1或A14X
                chipInfo = SOC_PERFORMANCE_SCORES['M1'];
            } else if (cores >= 6) {
                chipName = 'A15 Bionic';
                chipInfo = SOC_PERFORMANCE_SCORES['A15 Bionic'];
            }
        } else if (/iPhone/i.test(ua)) {
            if (cores >= 6) {
                // iPhone 13 Pro及以上
                chipName = 'A15 Bionic'; // 默认A15+
                chipInfo = SOC_PERFORMANCE_SCORES['A15 Bionic'];
            } else if (cores >= 4) {
                chipName = 'A13 Bionic';
                chipInfo = SOC_PERFORMANCE_SCORES['A13 Bionic'];
            }
        }
    }

    // 检测Android设备（通过常见标识）
    else if (/Android/i.test(ua)) {
        // 检测高通骁龙
        if (/Snapdragon/i.test(ua)) {
            if (/8 Gen 3/i.test(ua)) {
                chipName = 'Snapdragon 8 Gen 3';
            } else if (/8 Gen 2/i.test(ua)) {
                chipName = 'Snapdragon 8 Gen 2';
            } else if (/888/i.test(ua)) {
                chipName = 'Snapdragon 888';
            }
            chipInfo = SOC_PERFORMANCE_SCORES[chipName];
        }
        // 检测联发科
        else if (/Dimensity/i.test(ua)) {
            if (/9300/i.test(ua)) {
                chipName = 'Dimensity 9300';
            } else if (/9200/i.test(ua)) {
                chipName = 'Dimensity 9200';
            }
            chipInfo = SOC_PERFORMANCE_SCORES[chipName];
        }
    }

    // 检测桌面处理器（通过核心数推断）
    else {
        const cores = navigator.hardwareConcurrency || 4;
        // 桌面处理器通常核心数较多
        if (cores >= 20) {
            chipName = 'i9-14900K'; // 或同级别
            chipInfo = SOC_PERFORMANCE_SCORES['i9-14900K'];
        } else if (cores >= 16) {
            chipName = 'i9-13900K';
            chipInfo = SOC_PERFORMANCE_SCORES['i9-13900K'];
        } else if (cores >= 12) {
            chipName = 'i7-13700K';
            chipInfo = SOC_PERFORMANCE_SCORES['i7-13700K'];
        }
    }

    return { chipName, chipInfo };
}

/**
 * 检测GPU信息
 * 通过WebGL获取GPU型号
 */
function detectGPU() {
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

        if (!gl) {
            return { name: null, vendor: null };
        }

        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (!debugInfo) {
            return { name: null, vendor: null };
        }

        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);

        // 检测NVIDIA RTX系列
        let gpuInfo = null;
        if (/RTX 5090/i.test(renderer)) {
            gpuInfo = SOC_PERFORMANCE_SCORES['RTX 5090'];
        } else if (/RTX 5080/i.test(renderer)) {
            gpuInfo = SOC_PERFORMANCE_SCORES['RTX 5080'];
        } else if (/RTX 4090/i.test(renderer)) {
            gpuInfo = SOC_PERFORMANCE_SCORES['RTX 4090'];
        } else if (/RTX 4080/i.test(renderer)) {
            gpuInfo = SOC_PERFORMANCE_SCORES['RTX 4080'];
        } else if (/RTX 4070/i.test(renderer)) {
            gpuInfo = SOC_PERFORMANCE_SCORES['RTX 4070'];
        } else if (/RTX 3090/i.test(renderer)) {
            gpuInfo = SOC_PERFORMANCE_SCORES['RTX 3090'];
        } else if (/RTX 3080/i.test(renderer)) {
            gpuInfo = SOC_PERFORMANCE_SCORES['RTX 3080'];
        } else if (/RTX 3070/i.test(renderer)) {
            gpuInfo = SOC_PERFORMANCE_SCORES['RTX 3070'];
        }

        return {
            name: renderer,
            vendor: vendor,
            info: gpuInfo
        };
    } catch (e) {
        console.warn('GPU检测失败:', e);
        return { name: null, vendor: null };
    }
}

/**
 * 获取内存档位
 */
function getMemoryTier(memoryGB) {
    if (!memoryGB) return 'medium'; // 默认
    if (memoryGB < 4) return 'low';
    if (memoryGB < 8) return 'medium';
    if (memoryGB < 16) return 'high';
    return 'ultra';
}

/**
 * 检测设备性能并推荐速度档位（增强版）
 * 返回 { speed, recommendation, deviceInfo, hardwareConfig, chipName, gpuName, memoryTier }
 */
function detectDevicePerformance() {
    let score = 0;
    let deviceInfo = [];

    // 1. 检测CPU核心数
    const cores = navigator.hardwareConcurrency || 2;
    deviceInfo.push(`CPU核心数: ${cores}`);

    // 2. 检测内存
    const memory = navigator.deviceMemory || 4; // GB，默认4GB
    const memoryTier = getMemoryTier(memory);
    if (navigator.deviceMemory) {
        deviceInfo.push(`内存: ${memory}GB (${MEMORY_STRATEGIES[memoryTier].label})`);
    } else {
        deviceInfo.push(`内存: 未知 (默认${MEMORY_STRATEGIES[memoryTier].label})`);
    }

    // 3. 检测SoC芯片
    const { chipName, chipInfo } = detectSoCChip();
    if (chipName && chipInfo) {
        deviceInfo.push(`芯片: ${chipName}`);
        score = chipInfo.score; // 使用芯片评分
        console.log(`✓ 检测到芯片: ${chipName}, 评分: ${chipInfo.score}`);
    } else {
        // 回退到基于核心数的评分
        if (cores >= 16) score = 8.5;
        else if (cores >= 12) score = 8;
        else if (cores >= 8) score = 7;
        else if (cores >= 6) score = 6;
        else if (cores >= 4) score = 5;
        else score = 4;

        deviceInfo.push(`芯片: 未识别 (基于${cores}核心)`);
    }

    // 4. 检测GPU
    const gpu = detectGPU();
    if (gpu.name) {
        deviceInfo.push(`GPU: ${gpu.name}`);
        if (gpu.info) {
            // GPU信息可以进一步提升评分
            score = Math.max(score, gpu.info.score);
            console.log(`✓ 检测到GPU: ${gpu.name}, 评分: ${gpu.info.score}`);
        }
    }

    // 5. 根据内存调整评分
    if (memory >= 16) score += 1;
    else if (memory >= 8) score += 0.5;
    else if (memory < 4) score -= 0.5;

    // 6. 设备类型检测
    const userAgent = navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isTablet = /iPad|Android(?!.*Mobile)/i.test(userAgent);
    const isIPhone = /iPhone/i.test(userAgent);
    const isIPad = /iPad/i.test(userAgent);

    if (isIPhone) {
        deviceInfo.push('设备类型: iPhone');
    } else if (isIPad) {
        deviceInfo.push('设备类型: iPad');
    } else if (isTablet) {
        deviceInfo.push('设备类型: Android平板');
    } else if (isMobile) {
        deviceInfo.push('设备类型: Android手机');
    } else {
        deviceInfo.push('设备类型: 桌面设备');
    }

    // 7. 确定性能档位
    let recommendedSpeed;
    let recommendation;

    if (score <= 4) {
        recommendedSpeed = 'slow';
        recommendation = `推荐: ${PERFORMANCE_TIERS.slow.label} - ${PERFORMANCE_TIERS.slow.description}`;
    } else if (score <= 6.5) {
        recommendedSpeed = 'medium';
        recommendation = `推荐: ${PERFORMANCE_TIERS.medium.label} - ${PERFORMANCE_TIERS.medium.description}`;
    } else if (score <= 8.5) {
        recommendedSpeed = 'fast';
        recommendation = `推荐: ${PERFORMANCE_TIERS.fast.label} - ${PERFORMANCE_TIERS.fast.description}`;
    } else {
        recommendedSpeed = 'ultra';
        recommendation = `推荐: ${PERFORMANCE_TIERS.ultra.label} - ${PERFORMANCE_TIERS.ultra.description}`;
    }

    // 8. 生成优化配置
    const memoryStrategy = MEMORY_STRATEGIES[memoryTier];
    const performanceTier = PERFORMANCE_TIERS[recommendedSpeed];

    // 使用较慢的延迟以适应最慢的子系统（内存或CPU）
    // 并限制在合理范围内：50ms (ultra) 到 1000ms (slow)
    const rawDelay = Math.max(memoryStrategy.processingDelay, performanceTier.delay);
    const clampedDelay = Math.max(50, Math.min(rawDelay, 1000));

    const optimizedConfig = {
        chunkSize: memoryStrategy.chunkSize,
        maxChunksInMemory: memoryStrategy.maxChunksInMemory,
        processingDelay: clampedDelay,
        maxFileSize: memoryStrategy.maxFileSize,
        tier: recommendedSpeed,
        memoryTier: memoryTier
    };

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔍 硬件检测结果:');
    deviceInfo.forEach(info => console.log(`  ${info}`));
    console.log(`  综合评分: ${score.toFixed(1)}/10`);
    console.log(`  ${recommendation}`);
    console.log('⚙️ 优化配置:');
    console.log(`  分块大小: ${(optimizedConfig.chunkSize / 1024 / 1024).toFixed(0)}MB`);
    console.log(`  处理延迟: ${optimizedConfig.processingDelay}ms`);
    console.log(`  最大文件: ${(optimizedConfig.maxFileSize / 1024 / 1024 / 1024).toFixed(1)}GB`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    return {
        speed: recommendedSpeed,
        recommendation,
        deviceInfo,
        hardwareConfig: optimizedConfig,
        chipName: chipName || '未识别',
        gpuName: gpu.name || '未识别',
        memoryTier: memoryTier,
        score: score
    };
}

/**
 * 获取当前优化配置（带缓存）
 */
function getOptimizedConfig() {
    if (!hardwareConfig) {
        const detection = detectDevicePerformance();
        hardwareConfig = detection.hardwareConfig;
    }
    return hardwareConfig;
}

// ==================== 错误处理和性能监控 ====================

/**
 * 性能监控器
 */
class PerformanceMonitor {
    constructor() {
        this.startTime = null;
        this.lastCheckpoint = null;
        this.checkpoints = [];
        this.memoryWarnings = 0;
        this.degraded = false;
    }

    start() {
        this.startTime = performance.now();
        this.lastCheckpoint = this.startTime;
        this.checkpoints = [];
        this.memoryWarnings = 0;
        this.degraded = false;
    }

    checkpoint(name) {
        const now = performance.now();
        const elapsed = now - this.lastCheckpoint;
        this.checkpoints.push({
            name,
            elapsed,
            timestamp: now
        });
        this.lastCheckpoint = now;
        return elapsed;
    }

    checkMemory() {
        // 检查内存使用情况
        if (performance.memory) {
            const used = performance.memory.usedJSHeapSize;
            const limit = performance.memory.jsHeapSizeLimit;
            const usage = used / limit;

            if (usage > 0.9) {
                this.memoryWarnings++;
                console.warn(`⚠️ 内存使用率过高: ${(usage * 100).toFixed(1)}% (${(used/1024/1024).toFixed(0)}MB / ${(limit/1024/1024).toFixed(0)}MB)`);
                return { warning: true, usage, used, limit };
            }
        }
        return { warning: false };
    }

    getTotalTime() {
        return performance.now() - this.startTime;
    }

    report() {
        console.log('⏱️ 性能报告:');
        console.log(`  总耗时: ${(this.getTotalTime() / 1000).toFixed(2)}秒`);
        this.checkpoints.forEach(cp => {
            console.log(`  ${cp.name}: ${cp.elapsed.toFixed(2)}ms`);
        });
        if (this.memoryWarnings > 0) {
            console.log(`  内存警告次数: ${this.memoryWarnings}`);
        }
    }
}

/**
 * 错误处理包装器
 * @param {Function} fn - 要执行的函数
 * @param {Object} options - 选项 { retries, fallback, onError }
 */
async function withErrorHandling(fn, options = {}) {
    const {
        retries = 0,
        fallback = null,
        onError = null,
        context = 'operation'
    } = options;

    let lastError = null;
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            console.error(`❌ ${context} 失败 (尝试 ${attempt + 1}/${retries + 1}):`, error);

            if (onError) {
                try {
                    await onError(error, attempt);
                } catch (handlerError) {
                    console.error('错误处理器失败:', handlerError);
                }
            }

            // 如果还有重试机会，等待一段时间
            if (attempt < retries) {
                const delay = Math.min(1000 * Math.pow(2, attempt), 5000); // 指数退避，最多5秒
                console.log(`⏳ ${delay}ms 后重试...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }

    // 所有重试都失败了
    if (fallback !== null) {
        console.log(`🔄 使用降级方案...`);
        return fallback;
    }

    // 抛出最后一个错误
    throw new Error(`${context} 在 ${retries + 1} 次尝试后失败: ${lastError.message}`);
}

/**
 * 内存安全检查
 * 在处理大文件前检查是否有足够内存
 */
async function checkMemorySafety(fileSize) {
    const config = getOptimizedConfig();

    // 检查文件大小是否超过配置限制
    if (fileSize > config.maxFileSize) {
        throw new Error(
            `文件大小 (${(fileSize/1024/1024/1024).toFixed(2)}GB) 超过当前硬件配置限制 ` +
            `(${(config.maxFileSize/1024/1024/1024).toFixed(2)}GB)。\n` +
            `建议：升级设备内存或选择更小的文件。`
        );
    }

    // 检查当前内存使用情况
    if (performance.memory) {
        const available = performance.memory.jsHeapSizeLimit - performance.memory.usedJSHeapSize;
        const needed = config.chunkSize * 2; // 需要至少2个块的空间

        if (available < needed) {
            console.warn(
                `⚠️ 可用内存不足: 可用=${(available/1024/1024).toFixed(0)}MB, ` +
                `需要=${(needed/1024/1024).toFixed(0)}MB`
            );

            // 尝试触发垃圾回收（如果可用）
            if (window.gc) {
                console.log('🗑️ 触发垃圾回收...');
                window.gc();
            }

            // 再次检查
            const availableAfterGC = performance.memory.jsHeapSizeLimit - performance.memory.usedJSHeapSize;
            if (availableAfterGC < needed) {
                throw new Error(
                    `内存不足无法处理此文件。\n` +
                    `可用内存: ${(availableAfterGC/1024/1024).toFixed(0)}MB\n` +
                    `需要内存: ${(needed/1024/1024).toFixed(0)}MB\n` +
                    `建议：关闭其他标签页或选择更小的文件。`
                );
            }
        }
    }

    return true;
}

/**
 * 自适应降级策略
 * 当检测到性能问题时自动降低处理强度
 * @param {Object} baseConfig - 基础配置
 * @param {PerformanceMonitor} monitor - 性能监控器
 * @returns {Object} 调整后的配置（如果需要降级）或原配置
 */
function createAdaptiveConfig(baseConfig, monitor) {
    if (!monitor.degraded && monitor.memoryWarnings > 2) {
        const adaptedConfig = {
            ...baseConfig,
            chunkSize: Math.floor(baseConfig.chunkSize / 2),
            processingDelay: baseConfig.processingDelay * 2,
            maxChunksInMemory: 1
        };

        console.warn('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.warn('⚠️ 自适应降级已启用');
        console.warn(`  内存警告次数: ${monitor.memoryWarnings}`);
        console.warn(`  块大小: ${(baseConfig.chunkSize/1024/1024).toFixed(0)}MB → ${(adaptedConfig.chunkSize/1024/1024).toFixed(0)}MB`);
        console.warn(`  处理延迟: ${baseConfig.processingDelay}ms → ${adaptedConfig.processingDelay}ms`);
        console.warn(`  内存中块数: ${baseConfig.maxChunksInMemory} → ${adaptedConfig.maxChunksInMemory}`);
        console.warn('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        monitor.degraded = true;
        return adaptedConfig;
    }

    return baseConfig;
}

// ==================== UI硬件信息显示 ====================

/**
 * 初始化硬件信息显示
 */
function initHardwareInfoDisplay(performanceInfo) {
    const hardwareInfoDiv = document.getElementById('hardwareInfo');
    const hardwareDetails = document.getElementById('hardwareDetails');
    const toggleButton = document.getElementById('toggleHardwareInfo');

    if (!hardwareInfoDiv || !hardwareDetails || !toggleButton) {
        return;
    }

    // 生成硬件信息HTML
    const config = performanceInfo.hardwareConfig;
    const infoHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
            ${performanceInfo.deviceInfo.map(info => `
                <div style="padding: 4px 8px; background: white; border-radius: 4px;">
                    ${info}
                </div>
            `).join('')}
        </div>
        <div style="margin-top: 10px; padding: 8px; background: white; border-radius: 4px;">
            <div><strong>芯片:</strong> ${performanceInfo.chipName}</div>
            ${performanceInfo.gpuName !== '未识别' ? `<div><strong>GPU:</strong> ${performanceInfo.gpuName}</div>` : ''}
            <div><strong>综合评分:</strong> ${performanceInfo.score.toFixed(1)}/10</div>
        </div>
        <div style="margin-top: 10px; padding: 8px; background: var(--success-bg); border-radius: 4px;">
            <div style="margin-bottom: 4px;"><strong>⚙️ 自动优化配置:</strong></div>
            <div>• 分块大小: ${(config.chunkSize / 1024 / 1024).toFixed(0)}MB</div>
            <div>• 处理延迟: ${config.processingDelay}ms</div>
            <div>• 最大文件: ${(config.maxFileSize / 1024 / 1024 / 1024).toFixed(1)}GB</div>
            <div>• 性能档位: ${config.tier.toUpperCase()}</div>
            <div>• 内存模式: ${MEMORY_STRATEGIES[config.memoryTier].label}</div>
        </div>
    `;

    hardwareDetails.innerHTML = infoHTML;

    // 切换显示/隐藏
    toggleButton.addEventListener('click', (e) => {
        e.preventDefault();

        // 使用计算后的样式来正确判断当前状态
        const computedDisplay = window.getComputedStyle(hardwareInfoDiv).display;
        const isHidden = computedDisplay === 'none';

        if (isHidden) {
            hardwareInfoDiv.style.display = 'block';
            toggleButton.textContent = '隐藏硬件信息';
        } else {
            hardwareInfoDiv.style.display = 'none';
            toggleButton.textContent = '显示硬件信息';
        }
    });
}

/**
 * 根据速度档位获取处理延迟时间（毫秒）
 * 如果speed为'auto'或未指定，则使用硬件自动检测结果
 */
function getProcessingDelay(speed) {
    // 如果是自动模式，使用优化配置
    if (speed === 'auto' || !speed) {
        const config = getOptimizedConfig();
        return config.processingDelay;
    }

    // 使用PERFORMANCE_TIERS配置
    if (PERFORMANCE_TIERS[speed]) {
        return PERFORMANCE_TIERS[speed].delay;
    }

    // 兼容旧版本的手动配置
    switch (speed) {
        case 'slow':
            return 1000;
        case 'medium':
            return 500;
        case 'fast':
            return 200;
        case 'ultra':
            return 50;
        default:
            return 500;
    }
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

    const segments = buildSignatureSegments(data.length, sigLength);
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

function buildSignatureSegments(length, signatureLength) {
    if (length <= 0 || length < signatureLength) {
        return [];
    }

    if (length <= SIGNATURE_SCAN_CONFIG.smallFileThreshold) {
        return [{ start: 0, end: length }];
    }

    const segments = [];

    const headEnd = Math.min(length, SIGNATURE_SCAN_CONFIG.headBytes);
    if (headEnd > 0) {
        segments.push({ start: 0, end: headEnd });
    }

    const tailStart = Math.max(headEnd, length - SIGNATURE_SCAN_CONFIG.tailBytes);
    if (tailStart < length) {
        segments.push({ start: tailStart, end: length });
    }

    const midStart = headEnd;
    const midEnd = Math.max(midStart, tailStart);
    const windowSize = Math.max(signatureLength * 4, SIGNATURE_SCAN_CONFIG.midWindowBytes);

    if (midEnd - midStart > signatureLength) {
        for (let start = midStart; start < midEnd; start += windowSize) {
            const end = Math.min(midEnd, start + windowSize);
            if (end - start >= signatureLength) {
                segments.push({ start, end });
            }
        }
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

        if (current.start < last.end) {
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

// ==================== 碎纸机动画 ====================

/**
 * 播放碎纸机动画
 * @param {string} fileFormat - 文件格式（如 "PDF", "HTML", "SIB" 等）
 * @param {string} level - 破坏程度 (light/medium/heavy)
 * @param {number} duration - 动画持续时间（毫秒），至少1000ms
 * @returns {Promise} 动画完成时resolve
 */
function playShredderAnimation(fileFormat, level, duration) {
    return new Promise((resolve) => {
        const printerAnimation = document.getElementById('printerAnimation');
        const animatedPaper = document.getElementById('animatedPaper');
        const formatLabel = document.getElementById('formatLabel');
        const paperShards = document.getElementById('paperShards');

        if (!printerAnimation || !animatedPaper || !formatLabel || !paperShards) {
            console.warn('碎纸机动画元素未找到，跳过动画');
            resolve();
            return;
        }

        // 清除可能存在的旧动画timeout
        animationTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
        animationTimeouts = [];

        // 设置文件格式标签
        formatLabel.textContent = fileFormat.toUpperCase();

        // 显示碎纸机动画区域
        printerAnimation.style.display = 'block';

        // 重置动画状态
        animatedPaper.classList.remove('ejecting', 'shredding');
        paperShards.innerHTML = '';
        animatedPaper.style.opacity = '1';

        // 根据破坏程度确定切割线数量
        const shredLineCount = level === 'light' ? 1 : level === 'medium' ? 2 : 3;

        // 添加切割线到纸张SVG
        addShredLines(animatedPaper, shredLineCount);

        // 计算动画时间分配（总时长 = 吐纸时间 + 展示时间）
        const minDuration = Math.max(duration, 1000);
        const ejectDuration = Math.min(800, minDuration * 0.6); // 吐纸占60%，最多800ms
        const displayDuration = minDuration - ejectDuration; // 剩余时间展示切割效果

        // 开始纸张吐出动画
        const timeout1 = setTimeout(() => {
            animatedPaper.classList.add('ejecting');

            // 吐出完成后，展示切割效果一段时间
            const timeout2 = setTimeout(() => {
                // 动画完成，隐藏并resolve
                printerAnimation.style.display = 'none';

                // 检查是否用户已重置
                if (selectedFiles && selectedFiles.length > 0) {
                    resolve();
                } else {
                    // 用户已重置，不resolve（防止显示成功页面）
                    console.log('用户已重置，取消动画回调');
                }
            }, ejectDuration + displayDuration);
            animationTimeouts.push(timeout2);
        }, 100);
        animationTimeouts.push(timeout1);
    });
}

/**
 * 在纸张SVG中添加切割线
 * @param {HTMLElement} paperElement - 纸张DOM元素
 * @param {number} lineCount - 切割线数量 (1-3)
 */
function addShredLines(paperElement, lineCount) {
    const paperSvg = paperElement.querySelector('svg');
    if (!paperSvg) return;

    // 移除旧的切割线
    const oldLines = paperSvg.querySelectorAll('.shred-line');
    oldLines.forEach(line => line.remove());

    // 纸张尺寸
    const paperWidth = 80;
    const paperHeight = 100;

    // 根据线条数量计算位置（均匀分布）
    const positions = [];
    if (lineCount === 1) {
        positions.push(paperWidth / 2); // 中间一条
    } else if (lineCount === 2) {
        positions.push(paperWidth / 3, paperWidth * 2 / 3); // 两条
    } else if (lineCount === 3) {
        positions.push(paperWidth / 4, paperWidth / 2, paperWidth * 3 / 4); // 三条
    }

    // 添加竖线
    positions.forEach(x => {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('class', 'shred-line');
        line.setAttribute('x1', x.toString());
        line.setAttribute('y1', '10');
        line.setAttribute('x2', x.toString());
        line.setAttribute('y2', (paperHeight - 10).toString());
        line.setAttribute('stroke', 'black');
        line.setAttribute('stroke-width', '2');
        line.setAttribute('stroke-dasharray', '5,3'); // 虚线效果
        line.setAttribute('opacity', '0.7');

        paperSvg.appendChild(line);
    });
}

// ==================== 应用重置 ====================

/**
 * 重置应用到初始状态
 */
function resetApp() {
    // 清空文件选择（这会导致动画回调中的检查失败）
    selectedFiles = [];
    fileInput.value = '';

    // 取消所有待执行的动画回调
    animationTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    animationTimeouts = [];

    // 隐藏所有区域
    fileInfo.style.display = 'none';
    optionsSection.style.display = 'none';
    statusSection.style.display = 'none';
    successSection.style.display = 'none';

    const printerAnimation = document.getElementById('printerAnimation');
    if (printerAnimation) {
        printerAnimation.style.display = 'none';
    }

    if (reportCard) {
        reportCard.style.display = 'none';
        reportCard.innerHTML = '';
    }
    lastCorruptionReport = null;

    // 重置单选按钮
    const lightRadio = document.querySelector('input[name="level"][value="light"]');
    if (lightRadio) {
        lightRadio.checked = true;
    }

    if (statusText) {
        statusText.textContent = '正在处理文件...';
    }

    // 重置恢复模式的状态
    const restoreFileInfo = document.getElementById('restoreFileInfo');
    const restorePasswordSection = document.getElementById('restorePasswordSection');
    const restoreSuccess = document.getElementById('restoreSuccess');
    const restoreUploadArea = document.getElementById('restoreUploadArea');

    if (restoreFileInfo) restoreFileInfo.style.display = 'none';
    if (restorePasswordSection) restorePasswordSection.style.display = 'none';
    if (restoreSuccess) restoreSuccess.style.display = 'none';
    if (restoreUploadArea) restoreUploadArea.style.display = 'block';

    // 检查当前激活的模式，如果是corrupt模式则显示uploadArea
    const activeTab = document.querySelector('.mode-tab.active');
    if (activeTab && activeTab.dataset.mode === 'corrupt') {
        if (uploadArea) uploadArea.style.display = 'block';
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

// ==================== 可逆破坏：加密/解密模块 ====================

/**
 * 可逆破坏的标记常量
 */
const REVERSIBLE_MARKER = {
    start: '<< REVERSIBLE_CORRUPTION_V1 >>',
    end: '<< END_REVERSIBLE_DATA >>',
    version: 1
};

/**
 * 使用PBKDF2从用户密码派生加密密钥
 * @param {string} password - 用户输入的密码
 * @param {Uint8Array} salt - 盐值
 * @returns {Promise<CryptoKey>} 派生的加密密钥
 */
async function deriveKeyFromPassword(password, salt) {
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);

    // 导入密码作为原始密钥
    const baseKey = await crypto.subtle.importKey(
        'raw',
        passwordBuffer,
        'PBKDF2',
        false,
        ['deriveKey']
    );

    // 使用PBKDF2派生AES-GCM密钥
    return await crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: salt,
            iterations: 100000, // 10万次迭代，安全性高
            hash: 'SHA-256'
        },
        baseKey,
        {
            name: 'AES-GCM',
            length: 256 // AES-256
        },
        false,
        ['encrypt', 'decrypt']
    );
}

/**
 * 使用AES-256-GCM加密数据
 * @param {Uint8Array} data - 要加密的数据
 * @param {string} password - 加密密码
 * @returns {Promise<Object>} 包含加密数据、IV和盐值的对象
 */
async function encryptData(data, password) {
    // 生成随机盐值和IV
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12)); // GCM推荐12字节

    // 派生密钥
    const key = await deriveKeyFromPassword(password, salt);

    // 加密数据
    const encryptedBuffer = await crypto.subtle.encrypt(
        {
            name: 'AES-GCM',
            iv: iv
        },
        key,
        data
    );

    return {
        encrypted: new Uint8Array(encryptedBuffer),
        iv: iv,
        salt: salt
    };
}

/**
 * 使用AES-256-GCM解密数据
 * @param {Uint8Array} encryptedData - 加密的数据
 * @param {string} password - 解密密码
 * @param {Uint8Array} iv - 初始化向量
 * @param {Uint8Array} salt - 盐值
 * @returns {Promise<Uint8Array>} 解密后的数据
 */
async function decryptData(encryptedData, password, iv, salt) {
    // 派生密钥
    const key = await deriveKeyFromPassword(password, salt);

    // 解密数据
    const decryptedBuffer = await crypto.subtle.decrypt(
        {
            name: 'AES-GCM',
            iv: iv
        },
        key,
        encryptedData
    );

    return new Uint8Array(decryptedBuffer);
}

/**
 * 将Uint8Array转换为Base64（优化版，O(n)复杂度）
 * 使用分块处理避免字符串拼接的O(n²)问题
 */
function arrayToBase64(array) {
    // 使用分块处理，避免超大字符串
    const CHUNK_SIZE = 8192; // 8KB chunks
    const chunks = [];

    for (let i = 0; i < array.length; i += CHUNK_SIZE) {
        const chunk = array.subarray(i, Math.min(i + CHUNK_SIZE, array.length));
        // String.fromCharCode.apply 对每个块是线性的
        chunks.push(String.fromCharCode.apply(null, chunk));
    }

    // 数组join是O(n)，一次性分配内存
    const binary = chunks.join('');
    return btoa(binary);
}

/**
 * 二进制数据写入辅助类 - 用于高效构建二进制格式的diff数据
 * 完全避免Base64编码和JSON序列化的内存膨胀问题
 */
class BinaryWriter {
    constructor() {
        this.buffers = [];
        this.totalSize = 0;
    }

    writeUint8(value) {
        const buffer = new Uint8Array(1);
        buffer[0] = value & 0xFF;
        this.buffers.push(buffer);
        this.totalSize += 1;
    }

    writeUint16(value) {
        const buffer = new Uint8Array(2);
        buffer[0] = (value >> 8) & 0xFF;
        buffer[1] = value & 0xFF;
        this.buffers.push(buffer);
        this.totalSize += 2;
    }

    writeUint32(value) {
        const buffer = new Uint8Array(4);
        buffer[0] = (value >> 24) & 0xFF;
        buffer[1] = (value >> 16) & 0xFF;
        buffer[2] = (value >> 8) & 0xFF;
        buffer[3] = value & 0xFF;
        this.buffers.push(buffer);
        this.totalSize += 4;
    }

    writeUint64(value) {
        // JavaScript number精度限制在2^53，对于文件大小足够
        const high = Math.floor(value / 0x100000000);
        const low = value & 0xFFFFFFFF;
        this.writeUint32(high);
        this.writeUint32(low);
    }

    writeBytes(bytes) {
        this.buffers.push(bytes);
        this.totalSize += bytes.length;
    }

    writeString(str) {
        const encoder = new TextEncoder();
        const bytes = encoder.encode(str);
        this.writeUint16(bytes.length);
        this.writeBytes(bytes);
    }

    toUint8Array() {
        const result = new Uint8Array(this.totalSize);
        let offset = 0;
        for (const buffer of this.buffers) {
            result.set(buffer, offset);
            offset += buffer.length;
        }
        return result;
    }
}

/**
 * 二进制数据读取辅助类
 */
class BinaryReader {
    constructor(buffer) {
        this.buffer = buffer;
        this.offset = 0;
    }

    readUint8() {
        if (this.offset + 1 > this.buffer.length) {
            throw new Error('BinaryReader: 读取越界');
        }
        const value = this.buffer[this.offset];
        this.offset += 1;
        return value;
    }

    readUint16() {
        if (this.offset + 2 > this.buffer.length) {
            throw new Error('BinaryReader: 读取越界');
        }
        const value = (this.buffer[this.offset] << 8) | this.buffer[this.offset + 1];
        this.offset += 2;
        return value;
    }

    readUint32() {
        if (this.offset + 4 > this.buffer.length) {
            throw new Error('BinaryReader: 读取越界');
        }
        const value = (this.buffer[this.offset] << 24) |
                      (this.buffer[this.offset + 1] << 16) |
                      (this.buffer[this.offset + 2] << 8) |
                      this.buffer[this.offset + 3];
        this.offset += 4;
        return value >>> 0; // 转换为无符号
    }

    readUint64() {
        const high = this.readUint32();
        const low = this.readUint32();
        return high * 0x100000000 + low;
    }

    readBytes(length) {
        if (this.offset + length > this.buffer.length) {
            throw new Error('BinaryReader: 读取越界');
        }
        const bytes = this.buffer.slice(this.offset, this.offset + length);
        this.offset += length;
        return bytes;
    }

    readString() {
        const length = this.readUint16();
        const bytes = this.readBytes(length);
        const decoder = new TextDecoder();
        return decoder.decode(bytes);
    }

    hasMore() {
        return this.offset < this.buffer.length;
    }
}

/**
 * 将Base64转换为Uint8Array（优化版，O(n)复杂度）
 */
function base64ToArray(base64) {
    const binary = atob(base64);
    const len = binary.length;
    const array = new Uint8Array(len);

    // 直接写入，避免多次访问
    for (let i = 0; i < len; i++) {
        array[i] = binary.charCodeAt(i);
    }

    return array;
}

/**
 * 生成diff记录（使用连续区间记录，而非逐字节）
 * 这样可以避免在大文件上分配海量对象，导致内存耗尽
 * @param {Uint8Array} original - 原始数据
 * @param {Uint8Array} corrupted - 破坏后的数据
 * @returns {Object} diff记录
 */
function generateDiff(original, corrupted) {
    const ranges = [];
    const length = Math.min(original.length, corrupted.length);

    let rangeStart = -1;
    let rangeBytes = [];

    for (let i = 0; i < length; i++) {
        if (original[i] !== corrupted[i]) {
            // 发现不同的字节
            if (rangeStart === -1) {
                // 开始新区间
                rangeStart = i;
                rangeBytes = [original[i]];
            } else {
                // 继续当前区间
                rangeBytes.push(original[i]);
            }
        } else {
            // 字节相同
            if (rangeStart !== -1) {
                // 结束当前区间 - 直接存储Uint8Array，不编码Base64
                ranges.push({
                    start: rangeStart,
                    length: rangeBytes.length,
                    originalBytes: new Uint8Array(rangeBytes)
                });
                rangeStart = -1;
                rangeBytes = [];
            }
        }
    }

    // 处理最后一个区间（如果存在）
    if (rangeStart !== -1) {
        ranges.push({
            start: rangeStart,
            length: rangeBytes.length,
            originalBytes: new Uint8Array(rangeBytes)
        });
    }

    // 如果长度不同，记录长度变化
    let lengthDiff = null;
    if (original.length !== corrupted.length) {
        lengthDiff = {
            originalLength: original.length,
            corruptedLength: corrupted.length
        };
    }

    // 计算总修改字节数
    const totalChanges = ranges.reduce((sum, range) => sum + range.length, 0);

    return {
        ranges: ranges,
        lengthDiff: lengthDiff,
        totalChanges: totalChanges
    };
}

/**
 * 将diff对象序列化为二进制格式（完全避免JSON和Base64）
 * @param {Object} diff - diff对象
 * @returns {Uint8Array} 序列化后的二进制数据
 */
function serializeDiff(diff) {
    const writer = new BinaryWriter();

    // 写入魔数和版本
    writer.writeBytes(new TextEncoder().encode('DIFF')); // 4字节魔数
    writer.writeUint16(2); // 版本2（二进制格式）

    // 写入总修改字节数
    writer.writeUint64(diff.totalChanges);

    // 写入lengthDiff
    if (diff.lengthDiff) {
        writer.writeUint8(1); // 有lengthDiff
        writer.writeUint64(diff.lengthDiff.originalLength);
        writer.writeUint64(diff.lengthDiff.corruptedLength);
    } else {
        writer.writeUint8(0); // 无lengthDiff
    }

    // 写入ranges数量
    writer.writeUint32(diff.ranges.length);

    // 写入每个range
    for (const range of diff.ranges) {
        writer.writeUint64(range.start);
        writer.writeUint32(range.length);
        writer.writeBytes(range.originalBytes); // 直接写入原始字节，无编码
    }

    return writer.toUint8Array();
}

/**
 * 从二进制格式反序列化diff对象
 * @param {Uint8Array} data - 二进制数据
 * @returns {Object} diff对象
 */
function deserializeDiff(data) {
    const reader = new BinaryReader(data);

    // 读取并验证魔数
    const magic = new TextDecoder().decode(reader.readBytes(4));
    if (magic !== 'DIFF') {
        throw new Error('无效的diff数据格式');
    }

    // 读取版本
    const version = reader.readUint16();
    if (version !== 2) {
        throw new Error(`不支持的diff版本: ${version}`);
    }

    // 读取总修改字节数
    const totalChanges = reader.readUint64();

    // 读取lengthDiff
    let lengthDiff = null;
    const hasLengthDiff = reader.readUint8();
    if (hasLengthDiff === 1) {
        lengthDiff = {
            originalLength: reader.readUint64(),
            corruptedLength: reader.readUint64()
        };
    }

    // 读取ranges数量
    const rangesCount = reader.readUint32();

    // 读取每个range
    const ranges = [];
    for (let i = 0; i < rangesCount; i++) {
        const start = reader.readUint64();
        const length = reader.readUint32();
        const originalBytes = reader.readBytes(length);
        ranges.push({ start, length, originalBytes });
    }

    return {
        ranges,
        lengthDiff,
        totalChanges
    };
}

/**
 * 应用diff恢复原始数据（支持二进制格式）
 * @param {Uint8Array} corrupted - 破坏后的数据
 * @param {Object} diff - diff记录
 * @returns {Uint8Array} 恢复后的原始数据
 */
function applyDiff(corrupted, diff) {
    // 确定正确的长度
    const targetLength = diff.lengthDiff ? diff.lengthDiff.originalLength : corrupted.length;
    const restored = new Uint8Array(targetLength);

    // 复制破坏后的数据
    const copyLength = Math.min(corrupted.length, targetLength);
    for (let i = 0; i < copyLength; i++) {
        restored[i] = corrupted[i];
    }

    // 应用所有区间的修改
    for (const range of diff.ranges) {
        // 现在originalBytes直接是Uint8Array，不需要解码
        const originalBytes = range.originalBytes;
        const start = range.start;

        for (let i = 0; i < originalBytes.length && (start + i) < restored.length; i++) {
            restored[start + i] = originalBytes[i];
        }
    }

    return restored;
}

/**
 * 压缩diff数据（使用二进制格式，完全避免JSON和Base64）
 * 这是性能优化的关键：直接序列化为二进制后压缩
 * @param {Object} diff - diff对象
 * @returns {Uint8Array} 压缩后的数据
 */
function compressDiff(diff) {
    // 使用二进制序列化，直接生成Uint8Array
    const binaryDiff = serializeDiff(diff);

    // 直接压缩二进制数据，无需JSON字符串中转
    return pako.gzip(binaryDiff);
}

/**
 * 解压diff数据（支持新旧两种格式，向后兼容）
 * @param {Uint8Array} compressed - 压缩的数据
 * @returns {Object} diff对象
 */
function decompressDiff(compressed) {
    // 解压得到数据
    const decompressed = pako.ungzip(compressed);

    // 格式检测：检查前4字节是否为"DIFF"魔数
    const decoder = new TextDecoder();
    const magic = decoder.decode(decompressed.slice(0, 4));

    if (magic === 'DIFF') {
        // 新格式：二进制格式（版本2）
        return deserializeDiff(decompressed);
    } else {
        // 旧格式：JSON格式（版本1）
        // 尝试将整个数据作为JSON字符串解析
        try {
            const jsonString = decoder.decode(decompressed);
            const diff = JSON.parse(jsonString);

            // 旧格式中，originalBytes是Base64字符串，需要转换为Uint8Array
            // 以便与新格式的接口一致（applyDiff期望Uint8Array）
            if (diff.ranges) {
                for (const range of diff.ranges) {
                    if (typeof range.originalBytes === 'string') {
                        // 旧格式：Base64字符串 → 解码为Uint8Array
                        range.originalBytes = base64ToArray(range.originalBytes);
                    }
                }
            }

            return diff;
        } catch (error) {
            throw new Error(`无法解析diff数据：不是有效的二进制格式或JSON格式。${error.message}`);
        }
    }
}

/**
 * 将可逆数据嵌入到破坏后的文件中
 * @param {Uint8Array} corruptedData - 破坏后的文件数据
 * @param {Object} reversibleInfo - 可逆信息（包含加密的diff等）
 * @returns {Uint8Array} 嵌入可逆数据后的文件
 */
function embedReversibleData(corruptedData, reversibleInfo) {
    const encoder = new TextEncoder();

    // 序列化可逆信息
    const infoJson = JSON.stringify(reversibleInfo);
    const infoBytes = encoder.encode(infoJson);

    // 构建最终数据
    const startMarker = encoder.encode(REVERSIBLE_MARKER.start);
    const endMarker = encoder.encode(REVERSIBLE_MARKER.end);

    // 总长度 = 原数据 + 开始标记 + 信息长度(4字节) + 信息 + 结束标记
    const totalLength = corruptedData.length + startMarker.length + 4 + infoBytes.length + endMarker.length;
    const result = new Uint8Array(totalLength);

    let offset = 0;

    // 复制破坏后的数据
    result.set(corruptedData, offset);
    offset += corruptedData.length;

    // 写入开始标记
    result.set(startMarker, offset);
    offset += startMarker.length;

    // 写入信息长度（4字节，大端序）
    const lengthView = new DataView(result.buffer, offset, 4);
    lengthView.setUint32(0, infoBytes.length, false);
    offset += 4;

    // 写入信息
    result.set(infoBytes, offset);
    offset += infoBytes.length;

    // 写入结束标记
    result.set(endMarker, offset);

    return result;
}

/**
 * 从文件中提取可逆数据
 * @param {Uint8Array} fileData - 文件数据
 * @returns {Object|null} 可逆信息，如果不是可逆文件则返回null
 */
function extractReversibleData(fileData) {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const startMarker = encoder.encode(REVERSIBLE_MARKER.start);
    const endMarker = encoder.encode(REVERSIBLE_MARKER.end);

    // 从文件末尾向前查找结束标记
    // 增加搜索窗口到2MB，以支持较大的可逆数据
    const endSearchWindow = Math.max(0, fileData.length - 2 * 1024 * 1024);
    let endMarkerPos = -1;

    for (let i = fileData.length - endMarker.length; i >= endSearchWindow; i--) {
        let match = true;
        for (let j = 0; j < endMarker.length; j++) {
            if (fileData[i + j] !== endMarker[j]) {
                match = false;
                break;
            }
        }
        if (match) {
            endMarkerPos = i;
            break;
        }
    }

    if (endMarkerPos === -1) {
        return null; // 不是可逆文件
    }

    // 从endMarkerPos向前查找开始标记，一直搜索到文件开头
    // 这样可以支持任意大小的可逆数据
    let startMarkerPos = -1;
    for (let i = endMarkerPos - 1; i >= 0; i--) {
        let match = true;
        for (let j = 0; j < startMarker.length; j++) {
            if (fileData[i + j] !== startMarker[j]) {
                match = false;
                break;
            }
        }
        if (match) {
            startMarkerPos = i;
            break;
        }
    }

    if (startMarkerPos === -1) {
        return null; // 标记不完整
    }

    // 读取信息长度
    const lengthOffset = startMarkerPos + startMarker.length;

    // 边界检查：确保有足够的字节读取长度字段
    if (lengthOffset + 4 > fileData.length) {
        console.error('文件格式错误：无法读取信息长度');
        return null;
    }

    const lengthView = new DataView(fileData.buffer, fileData.byteOffset + lengthOffset, 4);
    const infoLength = lengthView.getUint32(0, false);

    // 提取信息
    const infoOffset = lengthOffset + 4;

    // 边界检查：确保信息数据在文件范围内
    if (infoOffset + infoLength > fileData.length) {
        console.error(`文件格式错误：信息长度 ${infoLength} 超出文件范围（剩余 ${fileData.length - infoOffset} 字节）`);
        return null;
    }

    const infoBytes = fileData.slice(infoOffset, infoOffset + infoLength);

    try {
        const infoJson = decoder.decode(infoBytes);
        const reversibleInfo = JSON.parse(infoJson);

        // 提取原始破坏数据（不包含可逆信息部分）
        const corruptedData = fileData.slice(0, startMarkerPos);

        return {
            reversibleInfo: reversibleInfo,
            corruptedData: corruptedData
        };
    } catch (error) {
        console.error('解析可逆信息失败:', error);
        return null;
    }
}

/**
 * 检查密码强度
 * @param {string} password - 密码
 * @returns {Object} 强度信息
 */
function checkPasswordStrength(password) {
    if (!password) {
        return { strength: 0, text: '', color: '' };
    }

    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) {
        return { strength: 1, text: '弱密码 [不安全]', color: '#e74c3c' };
    } else if (strength <= 4) {
        return { strength: 2, text: '中等强度 [可用]', color: '#f39c12' };
    } else {
        return { strength: 3, text: '强密码 [安全]', color: '#27ae60' };
    }
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
        console.log('[警告] 请勿用于不当用途');

        // 自动检测设备性能并设置推荐速度
        const performanceInfo = detectDevicePerformance();
        const speedSelect = document.getElementById('processingSpeed');
        const speedRecommendation = document.getElementById('speedRecommendation');

        if (speedSelect && performanceInfo) {
            speedSelect.value = performanceInfo.speed;
            if (speedRecommendation) {
                speedRecommendation.textContent = performanceInfo.recommendation;
                speedRecommendation.style.color = 'var(--gray-700)';
                speedRecommendation.style.fontWeight = '500';
            }
            console.log('已自动设置推荐速度档位:', performanceInfo.speed);
        }

        // 初始化硬件信息显示
        initHardwareInfoDisplay(performanceInfo);
    }
}

// ==================== 模块导出（用于测试） ====================

// UMD 模式：支持浏览器和 Node.js
// 在浏览器中：这些函数已在全局作用域中定义
// 在 Node.js 中：通过 module.exports 导出供测试使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        // 核心函数
        extractExtension,

        // 常量
        UNIX_EXECUTABLE_NAMES,
        SPECIAL_EXTENSION_RULES,
        FILE_CATEGORIES,
        SUPPORTED_FORMATS,
        MAX_FILE_SIZE,

        // 辅助函数（可选，供测试使用）
        formatFileSize,
        getFileCategory,
        getCategoryLabel,
        getStrategyForCategory
    };
}
