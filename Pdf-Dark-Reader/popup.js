document.addEventListener('DOMContentLoaded', () => {
    const darkModeOptions = document.getElementById('darkModeOptions');

    // Retrieve and set the current dark mode on popup load
    chrome.storage.local.get('selectedDarkMode', (result) => {
        if (result.selectedDarkMode) {
            darkModeOptions.value = result.selectedDarkMode;
            // Apply the selected dark mode immediately
            applyDarkMode(result.selectedDarkMode);
        } else {
            darkModeOptions.value = 'select'; // Default value
        }
    });

    darkModeOptions.addEventListener('change', (event) => {
        const selectedMode = event.target.value;

        // Save the selected dark mode to storage
        chrome.storage.local.set({ selectedDarkMode: selectedMode }, () => {
            console.log('Dark mode saved:', selectedMode);
            // Apply the selected dark mode to the PDF
            applyDarkMode(selectedMode);
        });
    });
});

function applyDarkMode(mode) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'setDarkMode', mode: mode });
    });
}
