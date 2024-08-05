chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggleDarkMode') {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: toggleDarkMode,
            args: [request.mode]
          });
        } else {
          console.error('No active tabs found.');
        }
      });
    }
  });
  
  function toggleDarkMode(mode) {
    const pdfEmbed = document.querySelector('embed[type="application/pdf"]');
    if (pdfEmbed) {
      removeExistingStyles();
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
      }
    } else {
      console.error('No PDF embed element found.');
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
  
  function removeExistingStyles() {
    const existingStyles = document.querySelectorAll('style#darkModeStyle');
    existingStyles.forEach(style => style.remove());
  }
  