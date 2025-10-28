// ==================== 全局变量 ====================
let selectedFile = null;

// 获取i18n的t函数（安全访问）
const t = (key, params) => (window.i18n && window.i18n.t) ? window.i18n.t(key, params) : key;

// 支持的文件格式类别
const FILE_CATEGORIES = {
    documents: {
        labelKey: 'categories.documents',
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
        labelKey: 'categories.images',
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
        labelKey: 'categories.videos',
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
        labelKey: 'categories.audio',
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
        labelKey: 'categories.archives',
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
        labelKey: 'categories.code',
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
        labelKey: 'categories.system',
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
        labelKey: 'categories.database',
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
        labelKey: 'categories.certificates',
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
        labelKey: 'categories.misc',
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

const FORMAT_LABEL_TRANSLATIONS = {
    'PDF文档': 'PDF Document',
    'Word文档': 'Word Document',
    'Word模板': 'Word Template',
    '富文本文件': 'Rich Text File',
    '文本文件': 'Text File',
    'Markdown文档': 'Markdown Document',
    'OpenDocument文档': 'OpenDocument Text',
    'OpenDocument模板': 'OpenDocument Template',
    'Pages文档': 'Pages Document',
    'EPUB电子书': 'EPUB eBook',
    'MOBI电子书': 'MOBI eBook',
    'Kindle电子书': 'Kindle eBook',
    'PowerPoint演示': 'PowerPoint Presentation',
    'OpenDocument演示': 'OpenDocument Presentation',
    'Keynote演示': 'Keynote Presentation',
    'Excel表格': 'Excel Spreadsheet',
    'Excel宏表格': 'Excel Macro Spreadsheet',
    'OpenDocument表格': 'OpenDocument Spreadsheet',
    'CSV表格': 'CSV Spreadsheet',
    '制表符分隔文本': 'TSV Text File',
    'Numbers表格': 'Numbers Spreadsheet',
    '图片文件': 'Image File',
    '矢量图': 'Vector Graphic',
    '图标文件': 'Icon File',
    'TIFF图片': 'TIFF Image',
    'Photoshop文件': 'Photoshop File',
    'Illustrator文件': 'Illustrator File',
    'EPS矢量文件': 'EPS Vector File',
    'HEIC图片': 'HEIC Image',
    'RAW原始图片': 'RAW Image',
    'InDesign文档': 'InDesign Document',
    '视频文件': 'Video File',
    '3GP视频': '3GP Video',
    'MPEG视频': 'MPEG Video',
    'AVCHD视频': 'AVCHD Video',
    '音频文件': 'Audio File',
    'WMA音频': 'WMA Audio',
    'AIFF音频': 'AIFF Audio',
    'AMR音频': 'AMR Audio',
    'MIDI文件': 'MIDI File',
    'ZIP压缩包': 'ZIP Archive',
    'RAR压缩包': 'RAR Archive',
    '7Z压缩包': '7Z Archive',
    'TAR归档': 'TAR Archive',
    'GZ压缩文件': 'GZ Archive',
    'BZ2压缩文件': 'BZ2 Archive',
    'XZ压缩文件': 'XZ Archive',
    'ISO镜像': 'ISO Image',
    'DMG镜像': 'DMG Image',
    'CAB压缩包': 'CAB Archive',
    'MusicXML压缩文件': 'MusicXML Archive',
    'JSON数据': 'JSON Data',
    'XML文件': 'XML File',
    'YAML配置': 'YAML Configuration',
    'INI配置': 'INI Configuration',
    'CFG配置': 'CFG Configuration',
    '环境变量文件': 'Environment Variables File',
    'SQL文件': 'SQL File',
    'JavaScript文件': 'JavaScript File',
    'JavaScript模块': 'JavaScript Module',
    'TypeScript文件': 'TypeScript File',
    'React组件': 'React Component',
    'HTML文档': 'HTML Document',
    'CSS样式': 'CSS Stylesheet',
    'SCSS样式': 'SCSS Stylesheet',
    'LESS样式': 'LESS Stylesheet',
    'Python脚本': 'Python Script',
    'Java源代码': 'Java Source File',
    'C源代码': 'C Source File',
    'C++源代码': 'C++ Source File',
    'C头文件': 'C Header File',
    'C++头文件': 'C++ Header File',
    'C#源代码': 'C# Source File',
    'Go源代码': 'Go Source File',
    'Ruby脚本': 'Ruby Script',
    'PHP脚本': 'PHP Script',
    'Shell脚本': 'Shell Script',
    'Bash脚本': 'Bash Script',
    'Zsh脚本': 'Zsh Script',
    '批处理脚本': 'Batch Script',
    'CMD批处理': 'CMD Batch File',
    'PowerShell脚本': 'PowerShell Script',
    'VBScript脚本': 'VBScript Script',
    'Perl脚本': 'Perl Script',
    'Swift源代码': 'Swift Source File',
    'Kotlin源代码': 'Kotlin Source File',
    'Rust源代码': 'Rust Source File',
    'Lua脚本': 'Lua Script',
    'R语言脚本': 'R Script',
    'MATLAB脚本': 'MATLAB Script',
    'Docker配置': 'Docker Configuration',
    'Make配置': 'Make Configuration',
    'Gradle配置': 'Gradle Configuration',
    'TOML配置': 'TOML Configuration',
    'Properties配置': 'Properties Configuration',
    '可执行文件': 'Executable File',
    '动态链接库': 'Dynamic Library',
    'Android安装包': 'Android Package',
    'iOS安装包': 'iOS Package',
    'Windows安装包': 'Windows Installer',
    '二进制文件': 'Binary File',
    '磁盘镜像': 'Disk Image',
    'macOS应用': 'macOS Application',
    'Debian包': 'Debian Package',
    'RPM包': 'RPM Package',
    '安装包': 'Installer Package',
    'macOS命令文件': 'macOS Command File',
    'Windows注册表文件': 'Windows Registry File',
    '数据库文件': 'Database File',
    'SQLite数据库': 'SQLite Database',
    'SQLite3数据库': 'SQLite3 Database',
    'Access数据库': 'Access Database',
    'PEM证书': 'PEM Certificate',
    '密钥文件': 'Key File',
    '证书文件': 'Certificate File',
    'PKCS12证书': 'PKCS#12 Certificate',
    'PFX证书': 'PFX Certificate',
    '许可证文件': 'License File',
    '日志文件': 'Log File',
    '备份文件': 'Backup File',
    '数据文件': 'Data File',
    'BT种子': 'BitTorrent File',
    '日历文件': 'Calendar File',
    '联系人文件': 'Contact File',
    'Sibelius记谱文件': 'Sibelius Score File'
};

const FORMAT_LABELS = {};
Object.values(FILE_CATEGORIES).forEach((category) => {
    Object.entries(category.formats).forEach(([extension, zhLabel]) => {
        FORMAT_LABELS[extension] = {
            zh: zhLabel,
            en: FORMAT_LABEL_TRANSLATIONS[zhLabel] || zhLabel
        };
    });
});

const SUPPORTED_FORMATS = Object.values(FILE_CATEGORIES).reduce((all, category) => {
    return { ...all, ...category.formats };
}, {});

function getFormatLabel(extension) {
    const labels = FORMAT_LABELS[extension];
    if (!labels) return '';
    const currentLang = window.i18n && window.i18n.getCurrentLanguage ? window.i18n.getCurrentLanguage() : 'zh';
    return labels[currentLang] || labels.zh || '';
}

function getListSeparator() {
    const lang = window.i18n && window.i18n.getCurrentLanguage ? window.i18n.getCurrentLanguage() : 'zh';
    return lang === 'zh' ? '、' : ', ';
}

const STEP_MESSAGES = {
    'archive.headerMetadata': {
        zh: '破坏归档文件头部元数据',
        en: 'Corrupt archive header metadata'
    },
    'archive.zipCentralDirectory': {
        zh: '篡改 ZIP 中央目录标识',
        en: 'Tamper with ZIP central directory signature'
    },
    'archive.rarMagic': {
        zh: '破坏 RAR 魔数',
        en: 'Corrupt RAR magic number'
    },
    'archive.7zMagic': {
        zh: '扰乱 7Z 魔数',
        en: 'Disturb 7Z magic number'
    },
    'text.injectHeaderMarker': {
        zh: '注入破坏标记到文本开头',
        en: 'Inject corruption marker at text header'
    },
    'text.localNoise': {
        zh: '在文本局部插入随机噪声',
        en: 'Insert localized random noise into text'
    },
    'media.headerDisruption': {
        zh: '扰乱媒体文件关键头信息',
        en: 'Disrupt critical media header information'
    },
    'media.midNoise': {
        zh: '注入中部轻量伪影噪声',
        en: 'Inject light mid-section artifact noise'
    },
    'generic.randomHeaderBytes': {
        zh: '随机篡改文件头部字节',
        en: 'Randomly alter file header bytes'
    },
    'archive.rewriteHeader': {
        zh: '重写归档文件头与主记录',
        en: 'Rewrite archive header and main record'
    },
    'archive.destroyPkMarkers': {
        zh: '破坏所有 PK 标识',
        en: 'Destroy all PK markers'
    },
    'archive.disturbCentralDirectory': {
        zh: '扰乱归档中央目录和结束记录',
        en: 'Disrupt archive central directory and end records'
    },
    'text.explicitBanner': {
        zh: '注入显式破坏横幅',
        en: 'Inject explicit corruption banner'
    },
    'text.periodicCorrupt': {
        zh: '周期性篡改文本片段',
        en: 'Corrupt text segments periodically'
    },
    'text.tailCorrupt': {
        zh: '破坏文本结尾结构',
        en: 'Damage text tail structure'
    },
    'media.containerInfo': {
        zh: '破坏媒体文件容器信息',
        en: 'Corrupt media container information'
    },
    'media.keyframeSection': {
        zh: '损坏索引/关键帧片段',
        en: 'Damage index/keyframe segments'
    },
    'media.tailData': {
        zh: '扰乱尾部媒体数据',
        en: 'Disturb tail media data'
    },
    'generic.intensifyHeader': {
        zh: '加大对文件头的随机损坏',
        en: 'Intensify random damage to file header'
    },
    'generic.intervalCorrupt': {
        zh: '按间隔破坏文件主体数据',
        en: 'Corrupt file body data at intervals'
    },
    'archive.fullHeaderDestruction': {
        zh: '全面破坏归档头部与校验信息',
        en: 'Devastate archive header and checksum data'
    },
    'archive.destroySignatures': {
        zh: '摧毁常见压缩格式标识',
        en: 'Destroy common archive format signatures'
    },
    'archive.randomHalfRewrite': {
        zh: '随机重写超过一半的归档内容',
        en: 'Randomly rewrite over half of archive content'
    },
    'text.overwriteHead': {
        zh: '覆盖文本头并插入破坏横幅',
        en: 'Overwrite text head and insert corruption banner'
    },
    'text.randomRewritePercent': {
        zh: '随机重写 35% 的文本字节',
        en: 'Randomly rewrite 35% of text bytes'
    },
    'text.blockCorrupt': {
        zh: '块状破坏全文结构',
        en: 'Corrupt entire text structure in blocks'
    },
    'media.containerHeaderIndex': {
        zh: '破坏媒体容器头及索引',
        en: 'Corrupt media container header and index'
    },
    'media.blockFrameCorrupt': {
        zh: '按块破坏音视频帧数据',
        en: 'Corrupt audio/video frame data in blocks'
    },
    'media.randomFortyPercent': {
        zh: '随机破坏 40% 的媒体字节',
        en: 'Randomly corrupt 40% of media bytes'
    },
    'generic.forceHeader': {
        zh: '强力破坏文件头部',
        en: 'Aggressively corrupt file header'
    },
    'generic.randomThirtyPercent': {
        zh: '随机破坏 30% 的文件内容',
        en: 'Randomly corrupt 30% of file content'
    },
    'generic.highFrequencyCorrupt': {
        zh: '高频率破坏整段数据',
        en: 'Apply high-frequency corruption across data'
    },
    'signature.skipSmall': {
        zh: '文件过小，跳过签名嵌入',
        en: 'File too small, skip signature embedding'
    },
    'signature.embed': {
        zh: '嵌入破坏签名信息以强化不可恢复性',
        en: 'Embed corruption signature to strengthen irrecoverability'
    }
};

function getStepMessage(key) {
    const entry = STEP_MESSAGES[key];
    if (!entry) return key;
    const lang = window.i18n && window.i18n.getCurrentLanguage ? window.i18n.getCurrentLanguage() : 'zh';
    return entry[lang] || entry.zh;
}

const MAX_FILE_SIZE = 500 * 1024 * 1024;

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
let currentStatusKey = 'status.processing';
let currentStatusParams = {};
let browserCompatible = true;

function setStatus(key, params = {}) {
    currentStatusKey = key;
    currentStatusParams = params;
    if (statusText) {
        statusText.textContent = t(key, params);
    }
}

function updateCorruptButtonState() {
    if (!corruptBtn) return;
    if (browserCompatible) {
        corruptBtn.disabled = false;
        corruptBtn.textContent = t('buttons.corrupt');
    } else {
        corruptBtn.disabled = true;
        corruptBtn.textContent = t('browser.incompatibleButton');
    }
}

setStatus('status.processing');
updateCorruptButtonState();

// 监听语言切换事件
document.addEventListener('languageChanged', () => {
    // 更新状态文本
    if (statusSection.style.display === 'block' && statusText) {
        setStatus(currentStatusKey, currentStatusParams);
    }
    
    // 更新文件信息
    if (fileInfo.style.display === 'block') {
        updateFileInfoUI();
    }
    
    // 更新报告（如果存在）
    if (lastCorruptionReport && reportCard.style.display === 'block') {
        renderReport(lastCorruptionReport);
    }
    
    // 更新浏览器兼容性检查
    updateCorruptButtonState();
});

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
        console.error(t('errors.noFile'));
        return;
    }

    if (file.size > MAX_FILE_SIZE) {
        showAlert(t('errors.fileTooBig', {
            current: formatFileSize(file.size),
            max: formatFileSize(MAX_FILE_SIZE)
        }));
        fileInput.value = '';
        return;
    }

    const extension = extractExtension(file.name);

    if (!extension) {
        showAlert(t('errors.noExtension'));
        fileInput.value = '';
        return;
    }

    if (!SUPPORTED_FORMATS[extension]) {
        uploadArea.style.backgroundColor = 'var(--gray-200)';
        uploadArea.style.borderColor = 'var(--gray-400)';
        uploadArea.style.opacity = '0.6';

        showAlert(t('errors.unsupportedFormat', {
            ext: extension,
            formats: getSupportedFormatsSummary()
        }));

        setTimeout(() => {
            uploadArea.style.backgroundColor = '';
            uploadArea.style.borderColor = '';
            uploadArea.style.opacity = '';
        }, 2000);

        fileInput.value = '';
        return;
    }

    selectedFile = file;

    updateFileInfoUI();

    fileInfo.style.display = 'block';
    optionsSection.style.display = 'block';

    uploadArea.style.display = 'none';
}

function updateFileInfoUI() {
    if (!selectedFile) return;
    fileName.textContent = selectedFile.name;
    fileSize.textContent = formatFileSize(selectedFile.size);
    const extension = extractExtension(selectedFile.name);
    const categoryKey = getFileCategory(extension);
    const categoryLabel = getCategoryLabel(categoryKey);
    const typeLabel = getFormatLabel(extension) || selectedFile.type || t('file.messages.unknownType');
    fileType.textContent = categoryLabel ? `${typeLabel} · ${categoryLabel}` : typeLabel;
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
    const lastDotIndex = filename.lastIndexOf('.');
    if (lastDotIndex <= 0 || lastDotIndex === filename.length - 1) {
        return '';
    }
    return filename.slice(lastDotIndex + 1).toLowerCase();
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
        setStatus('status.corrupting');
        
        await new Promise(resolve => setTimeout(resolve, 800));
        
        await corruptFile(selectedFile, level, options);

        statusSection.style.display = 'none';
        successSection.style.display = 'block';
    } catch (error) {
        console.error('File corruption failed:', error);
        
        let errorMessage = t('errors.corruptionFailed');
        
        if (error instanceof DOMException && error.name === 'QuotaExceededError') {
            errorMessage = t('errors.quotaExceeded');
        } else if (error instanceof TypeError) {
            errorMessage = t('errors.fileReadError');
        } else if (error.message) {
            errorMessage = t('errors.default', { message: error.message });
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

    setStatus('status.preparing');
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
    if (!categoryKey) return '';
    const labelKey = FILE_CATEGORIES[categoryKey]?.labelKey;
    return labelKey ? t(labelKey) : '';
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
    if (!Array.isArray(signature) || signature.length === 0) return 0;
    let modified = 0;
    const sigLength = signature.length;
    const chance = Math.max(0, Math.min(probability, 1));

    for (let i = 0; i <= data.length - sigLength; i++) {
        let matched = true;
        for (let j = 0; j < sigLength; j++) {
            if (data[i + j] !== signature[j]) {
                matched = false;
                break;
            }
        }

        if (matched) {
            for (let j = 0; j < sigLength; j++) {
                if (rng() <= chance) {
                    data[i + j] = getRandomByte(rng);
                    modified++;
                }
            }
        }
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
    const positions = new Set();
    while (positions.size < target) {
        const index = Math.floor(rng() * data.length);
        positions.add(index);
    }

    positions.forEach((index) => {
        data[index] = getRandomByte(rng);
    });

    return target;
}

function getRandomByte(rng = Math.random) {
    return Math.floor(rng() * 256);
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
    title.textContent = t('report.title');
    reportCard.appendChild(title);

    const metaList = document.createElement('ul');
    metaList.className = 'report-meta';

    const optionsUsed = [];
    if (report.options?.randomizeName) optionsUsed.push(t('advanced.options.randomizeName.title'));
    if (report.options?.embedSignature) optionsUsed.push(t('advanced.options.embedSignature.title'));
    if (report.options?.downloadReport) optionsUsed.push(t('advanced.options.downloadReport.title'));

    const separator = getListSeparator();
    const rows = [
        [t('report.labels.originalFile'), `${report.originalName}（${report.formattedSize}）`],
        [t('report.labels.outputFile'), report.downloadName],
        [t('report.labels.level'), report.levelLabel],
        [t('report.labels.category'), report.category],
        [t('report.labels.bytesModified'), `${report.bytesModified.toLocaleString()}（${report.modifiedRatio}%）`],
        [t('report.labels.duration'), `${Math.round(report.duration)} ms`],
        [t('report.labels.seed'), report.seed],
        [t('report.labels.settings'), optionsUsed.length ? optionsUsed.join(separator) : t('report.settings.default')]
    ];

    rows.forEach(([label, value]) => {
        const item = document.createElement('li');
        item.innerHTML = `<span class="report-label">${label}</span><span class="report-value">${value}</span>`;
        metaList.appendChild(item);
    });

    reportCard.appendChild(metaList);

    const stepKeys = report.stepKeys || report.steps || [];
    if (stepKeys.length) {
        const stepsTitle = document.createElement('div');
        stepsTitle.className = 'report-steps-title';
        stepsTitle.textContent = t('report.steps');
        reportCard.appendChild(stepsTitle);

        const stepsList = document.createElement('ol');
        stepsList.className = 'report-steps';
        stepKeys.forEach((step) => {
            const key = typeof step === 'string' && STEP_MESSAGES[step] ? step : null;
            const stepItem = document.createElement('li');
            stepItem.textContent = key ? getStepMessage(key) : step;
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
        .map((category) => {
            const label = t(category.labelKey);
            const formats = Object.keys(category.formats).map((ext) => '.' + ext).join(', ');
            return `${label}: ${formats}`;
        })
        .join('\n');
}


function translateLevel(level) {
    const mapping = {
        light: 'level.light',
        medium: 'level.medium',
        heavy: 'level.heavy'
    };
    return t(mapping[level] || level);
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
        showAlert(t('errors.browserIncompatible', { features: missing }));
        return false;
    }
    
    return true;
}

// ==================== 初始化 ====================

if (typeof document !== 'undefined') {
    if (!checkBrowserCompatibility()) {
        console.error('Browser compatibility check failed');
        browserCompatible = false;
        updateCorruptButtonState();
    } else {
        browserCompatible = true;
        updateCorruptButtonState();
        console.log(t('console.loaded'));
        console.log(t('console.supportedLevels'));
        console.log(t('console.supportedFormats', { count: Object.keys(FORMAT_LABELS).length }));
        console.log(t('console.warning'));
    }
}
