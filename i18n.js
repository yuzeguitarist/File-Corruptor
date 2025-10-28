// ==================== 国际化系统 ====================

const translations = {
    zh: {
        // 网站标题和元信息
        'site.title': '文件破坏工具 - File Corruptor',
        'site.name': '文件破坏工具',
        'site.subtitle': 'File Corruptor - 安全破坏任何格式文件',
        
        // 语言切换
        'language.label': '语言',
        'language.chinese': '中文',
        'language.english': 'English',
        'language.switchToChinese': '切换到中文',
        'language.switchToEnglish': '切换到英语',
        
        // 上传区域
        'upload.prompt': '点击或拖拽文件到此处',
        'upload.supported': '支持格式：PDF, DOCX, CMD, PS1, LICENSE, DB, SIB, PNG, ZIP 等',
        
        // 文件信息
        'file.labels.name': '文件名：',
        'file.labels.size': '文件大小：',
        'file.labels.type': '文件类型：',
        'file.messages.unknownType': '未知类型',
        
        // 破坏程度
        'levels.title': '破坏程度',
        'levels.items.light.name': '轻度破坏',
        'levels.items.light.description': '修改文件头部，提示文件损坏',
        'levels.items.medium.name': '中度破坏',
        'levels.items.medium.description': '修改多处关键位置，无法识别',
        'levels.items.heavy.name': '重度破坏',
        'levels.items.heavy.description': '随机修改大量数据，彻底损坏',
        
        // 高级设置
        'advanced.summary': '高级设置',
        'advanced.options.randomizeName.title': '随机化输出文件名',
        'advanced.options.randomizeName.description': '使用随机字符串重命名下载的文件，进一步隐藏原始信息。',
        'advanced.options.embedSignature.title': '嵌入破坏签名',
        'advanced.options.embedSignature.description': '在文件内部写入不可见签名，增强不可恢复性。',
        'advanced.options.downloadReport.title': '导出破坏报告',
        'advanced.options.downloadReport.description': '生成一份 JSON 报告，记录破坏操作细节。',
        
        // 按钮
        'buttons.reset': '重新选择',
        'buttons.corrupt': '破坏文件',
        'buttons.continue': '继续破坏其他文件',
        
        // 状态
        'status.processing': '正在处理文件...',
        'status.corrupting': '正在破坏文件...',
        'status.preparing': '破坏完成，正在准备下载...',
        
        // 成功消息
        'success.title': '文件已成功破坏！',
        'success.description': '损坏后的文件已自动下载',
        
        // 报告
        'report.title': '破坏报告',
        'report.labels.originalFile': '原文件',
        'report.labels.outputFile': '输出文件',
        'report.labels.level': '破坏程度',
        'report.labels.category': '所属类别',
        'report.labels.bytesModified': '修改字节',
        'report.labels.duration': '耗时',
        'report.labels.seed': '随机种子',
        'report.labels.settings': '高级设置',
        'report.settings.default': '默认设置',
        'report.steps': '执行步骤',
        
        // 页脚
        'footer.warning': '本工具仅供学习测试使用，请勿用于不当用途。破坏后的文件无法恢复，请保留原文件备份。',
        'footer.links.privacy': '隐私政策',
        'footer.links.terms': '使用条款',
        'footer.links.disclaimer': '免责声明',
        'footer.copyright': '© 2025 Yuze Pan. All rights reserved.',
        
        // 错误消息
        'errors.noFile': '没有文件被选择',
        'errors.fileTooBig': '文件过大！\n\n当前文件：{current}\n最大限制：{max}\n\n请选择较小的文件。',
        'errors.noExtension': '无法识别文件扩展名。\n\n请确保文件有正确的扩展名（如 .txt, .pdf 等）。',
        'errors.unsupportedFormat': '不支持的文件格式：.{ext}\n\n支持的格式包括：\n{formats}\n\n请选择支持的文件格式。',
        'errors.corruptionFailed': '文件破坏失败，请重试。',
        'errors.quotaExceeded': '内存不足！文件过大，浏览器无法处理。\n\n请尝试使用较小的文件。',
        'errors.fileReadError': '文件读取错误！请确保文件完整且未损坏。',
        'errors.browserIncompatible': '您的浏览器不支持以下功能：{features}\n\n请使用现代浏览器（如 Chrome、Firefox、Safari、Edge）访问本工具。',
        'errors.default': '错误：{message}',
        
        // 文件类别
        'categories.documents': '文档 & 表格',
        'categories.images': '图片 & 图形',
        'categories.videos': '视频',
        'categories.audio': '音频',
        'categories.archives': '压缩 & 归档',
        'categories.code': '代码 & 配置',
        'categories.system': '系统 & 可执行',
        'categories.database': '数据库',
        'categories.certificates': '证书 & 密钥',
        'categories.misc': '其他',
        
        // 破坏程度标签
        'level.light': '轻度',
        'level.medium': '中度',
        'level.heavy': '重度',
        
        // 浏览器兼容性
        'browser.incompatibleButton': '浏览器不兼容',
        
        // 控制台消息
        'console.loaded': '文件破坏工具已加载',
        'console.supportedLevels': '支持的破坏程度：轻度、中度、重度',
        'console.supportedFormats': '支持 {count} 种文件格式',
        'console.warning': '⚠️ 请勿用于不当用途'
    },
    en: {
        // Site title and metadata
        'site.title': 'File Corruptor - Damage Any File Format',
        'site.name': 'File Corruptor',
        'site.subtitle': 'File Corruptor - Safely damage any file format',
        
        // Language switcher
        'language.label': 'Language',
        'language.chinese': 'Chinese',
        'language.english': 'English',
        'language.switchToChinese': 'Switch to Chinese',
        'language.switchToEnglish': 'Switch to English',
        
        // Upload area
        'upload.prompt': 'Click or drag file here',
        'upload.supported': 'Supported formats: PDF, DOCX, CMD, PS1, LICENSE, DB, SIB, PNG, ZIP, etc.',
        
        // File information
        'file.labels.name': 'File Name:',
        'file.labels.size': 'File Size:',
        'file.labels.type': 'File Type:',
        'file.messages.unknownType': 'Unknown Type',
        
        // Corruption levels
        'levels.title': 'Corruption Level',
        'levels.items.light.name': 'Light Corruption',
        'levels.items.light.description': 'Modify file header to indicate damage',
        'levels.items.medium.name': 'Medium Corruption',
        'levels.items.medium.description': 'Modify multiple key locations, unrecognizable',
        'levels.items.heavy.name': 'Heavy Corruption',
        'levels.items.heavy.description': 'Randomly modify large amounts of data, completely damaged',
        
        // Advanced settings
        'advanced.summary': 'Advanced Settings',
        'advanced.options.randomizeName.title': 'Randomize output filename',
        'advanced.options.randomizeName.description': 'Rename the downloaded file with a random string to further hide original information.',
        'advanced.options.embedSignature.title': 'Embed corruption signature',
        'advanced.options.embedSignature.description': 'Write an invisible signature inside the file to enhance irrecoverability.',
        'advanced.options.downloadReport.title': 'Export corruption report',
        'advanced.options.downloadReport.description': 'Generate a JSON report documenting corruption operation details.',
        
        // Buttons
        'buttons.reset': 'Reselect',
        'buttons.corrupt': 'Corrupt File',
        'buttons.continue': 'Corrupt Another File',
        
        // Status
        'status.processing': 'Processing file...',
        'status.corrupting': 'Corrupting file...',
        'status.preparing': 'Corruption complete, preparing download...',
        
        // Success messages
        'success.title': 'File Successfully Corrupted!',
        'success.description': 'The corrupted file has been automatically downloaded',
        
        // Report
        'report.title': 'Corruption Report',
        'report.labels.originalFile': 'Original File',
        'report.labels.outputFile': 'Output File',
        'report.labels.level': 'Corruption Level',
        'report.labels.category': 'Category',
        'report.labels.bytesModified': 'Bytes Modified',
        'report.labels.duration': 'Duration',
        'report.labels.seed': 'Random Seed',
        'report.labels.settings': 'Advanced Settings',
        'report.settings.default': 'Default Settings',
        'report.steps': 'Execution Steps',
        
        // Footer
        'footer.warning': 'This tool is for educational and testing purposes only. Do not use for improper purposes. Corrupted files cannot be recovered, please keep original file backups.',
        'footer.links.privacy': 'Privacy Policy',
        'footer.links.terms': 'Terms of Service',
        'footer.links.disclaimer': 'Disclaimer',
        'footer.copyright': '© 2025 Yuze Pan. All rights reserved.',
        
        // Error messages
        'errors.noFile': 'No file selected',
        'errors.fileTooBig': 'File too large!\n\nCurrent file: {current}\nMaximum limit: {max}\n\nPlease select a smaller file.',
        'errors.noExtension': 'Cannot recognize file extension.\n\nPlease ensure the file has a proper extension (e.g., .txt, .pdf, etc.).',
        'errors.unsupportedFormat': 'Unsupported file format: .{ext}\n\nSupported formats include:\n{formats}\n\nPlease select a supported file format.',
        'errors.corruptionFailed': 'File corruption failed, please try again.',
        'errors.quotaExceeded': 'Out of memory! File is too large for the browser to handle.\n\nPlease try with a smaller file.',
        'errors.fileReadError': 'File read error! Please ensure the file is complete and not damaged.',
        'errors.browserIncompatible': 'Your browser does not support the following features: {features}\n\nPlease use a modern browser (Chrome, Firefox, Safari, Edge) to access this tool.',
        'errors.default': 'Error: {message}',
        
        // File categories
        'categories.documents': 'Documents & Spreadsheets',
        'categories.images': 'Images & Graphics',
        'categories.videos': 'Videos',
        'categories.audio': 'Audio',
        'categories.archives': 'Archives & Compression',
        'categories.code': 'Code & Configuration',
        'categories.system': 'System & Executable',
        'categories.database': 'Database',
        'categories.certificates': 'Certificates & Keys',
        'categories.misc': 'Miscellaneous',
        
        // Level translations
        'level.light': 'Light',
        'level.medium': 'Medium',
        'level.heavy': 'Heavy',
        
        // Browser compatibility
        'browser.incompatibleButton': 'Browser incompatible',
        
        // Console messages
        'console.loaded': 'File Corruptor loaded',
        'console.supportedLevels': 'Available corruption levels: Light, Medium, Heavy',
        'console.supportedFormats': 'Supports {count} file formats',
        'console.warning': '⚠️ Please do not misuse this tool'
    }
};

// 当前语言
let currentLanguage = 'zh';

// 初始化语言系统
function init() {
    // 从 localStorage 读取保存的语言设置
    const savedLanguage = localStorage.getItem('fileCorruptorLanguage');
    if (savedLanguage && translations[savedLanguage]) {
        currentLanguage = savedLanguage;
    } else {
        // 尝试从浏览器语言检测
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang && browserLang.startsWith('zh')) {
            currentLanguage = 'zh';
        } else {
            currentLanguage = 'en';
        }
    }
    
    // 设置语言切换器的事件监听
    setupLanguageSwitcher();
    
    // 应用当前语言
    applyLanguage();
}

// 设置语言切换器
function setupLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn[data-lang]');
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            if (lang && translations[lang]) {
                switchLanguage(lang);
            }
        });
    });
}

// 获取翻译文本
function t(key, params = {}) {
    let text = translations[currentLanguage]?.[key] || translations['zh']?.[key] || key;
    
    // 替换参数
    Object.keys(params).forEach(param => {
        text = text.replace(new RegExp(`\\{${param}\\}`, 'g'), params[param]);
    });
    
    return text;
}

// 切换语言
function switchLanguage(lang) {
    if (!translations[lang]) {
        console.warn(`Language '${lang}' not found`);
        return;
    }
    
    currentLanguage = lang;
    localStorage.setItem('fileCorruptorLanguage', lang);
    
    // 应用新语言
    applyLanguage();
    
    // 触发自定义事件
    document.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { language: lang } 
    }));
}

// 应用语言到页面
function applyLanguage() {
    // 更新 HTML lang 属性
    document.documentElement.lang = currentLanguage === 'zh' ? 'zh-CN' : 'en';
    
    // 更新页面标题
    document.title = t('site.title');
    
    // 更新所有带 data-i18n 属性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const text = t(key);
        
        element.textContent = text;
    });
    
    // 更新所有带 data-i18n-attr 属性的元素（用于属性）
    document.querySelectorAll('[data-i18n-attr]').forEach(element => {
        const attrs = element.getAttribute('data-i18n-attr');
        attrs.split(',').forEach(attrPair => {
            const [attr, key] = attrPair.split(':').map(s => s.trim());
            if (attr && key) {
                element.setAttribute(attr, t(key));
            }
        });
    });
    
    // 更新语言切换按钮状态
    updateLanguageSwitcherState();
}

// 更新语言切换器的状态
function updateLanguageSwitcherState() {
    const buttons = document.querySelectorAll('.lang-btn[data-lang]');
    buttons.forEach(btn => {
        const lang = btn.getAttribute('data-lang');
        if (lang === currentLanguage) {
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
        } else {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        }
    });
}

// 获取当前语言
function getCurrentLanguage() {
    return currentLanguage;
}

// 导出函数
if (typeof window !== 'undefined') {
    window.i18n = {
        init,
        t,
        switchLanguage,
        getCurrentLanguage,
        applyLanguage
    };
}
