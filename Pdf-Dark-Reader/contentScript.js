chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'setDarkMode') {
        setDarkMode(request.mode);
    }
});

function setDarkMode(mode) {
    const pdfEmbed = document.querySelector('embed[type="application/pdf"]');
    if (pdfEmbed) {
        removeExistingStyles();
        if (mode) {
            switch (mode) {
                case 'darkMode1':
                    addDarkModeCss('invert(1) hue-rotate(180deg)');
                    break;
                case 'darkMode2':
                    addDarkModeCss('brightness(0.8) contrast(1.2)');
                    break;
                case 'darkMode3':
                    addDarkModeCss('sepia(1) saturate(5) contrast(0.8)');
                    break;
                case 'darkMode4':
                    addDarkModeCss('grayscale(1) invert(1)');
                    break;
                case 'darkMode5':
                    addDarkModeCss('invert(1) brightness(0.7)');
                    break;
                case 'darkMode6':
                    addDarkModeCss('contrast(1.5) grayscale(0.5)');
                    break;
                case 'darkMode7':
                    addDarkModeCss('saturate(2) brightness(0.6)');
                    break;
                case 'darkMode8':
                    addDarkModeCss('sepia(0.9) contrast(1.3)');
                    break;
                case 'darkMode9':
                    addDarkModeCss('hue-rotate(270deg) contrast(1.2)');
                    break;
                case 'darkMode10':
                    addDarkModeCss('invert(0.9) saturate(2)');
                    break;
                default:
                    addDarkModeCss('invert(1) hue-rotate(180deg)');
                    break;
            }
        }
    }
}

function addDarkModeCss(filterValue) {
    const style = document.createElement('style');
    style.id = 'darkModeStyle';
    style.textContent = `
        embed[type="application/pdf"] {
            filter: ${filterValue};
        }
    `;
    document.head.appendChild(style);
}

// function removeExistingStyles() {
//     const existingStyles = document.querySelectorAll('style#darkModeStyle');
//     existingStyles.forEach(style => style.remove());
// }
function removeExistingStyles() {
    const style = document.getElementById('darkModeStyle');
    if (style) {
        style.remove();
    }
}