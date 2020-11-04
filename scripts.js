var style = document.createElement('link');
style.rel = 'icon';
style.type = 'image/png';
style.href = chrome.extension.getURL('logo.png');
document.getElementsByTagName('head')[0].appendChild(style);