// Track the last selected text and its element
let lastSelectedText = '';
let lastActiveElement = null;
let lastSelectionStart = 0;
let lastSelectionEnd = 0;

// Create an instance of our converter
let converter = null;

// Load the converter script
(function loadConverter() {
  // Create an instance of the converter directly
  converter = new MarkdownToTextile();
})();

// Store selection information when text is selected
document.addEventListener('mouseup', function(e) {
  const selection = window.getSelection();
  if (selection.toString().trim()) {
    lastSelectedText = selection.toString();
    
    // Check if selection is in an editable element
    lastActiveElement = document.activeElement;
    if (lastActiveElement && (lastActiveElement.isContentEditable || 
        lastActiveElement.tagName === 'TEXTAREA' || 
        lastActiveElement.tagName === 'INPUT')) {
      lastSelectionStart = lastActiveElement.selectionStart;
      lastSelectionEnd = lastActiveElement.selectionEnd;
    } else {
      lastSelectionStart = null;
      lastSelectionEnd = null;
    }
  }
});

// Listen for messages from the background script
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "convert" && message.text) {
    convertAndReplace(message.text);
  } else if (message.action === "convertFromPopup" && message.text) {
    convertAndCopy(message.text);
  }
});

// Function to convert text and replace selected text
function convertAndReplace(markdownText) {
  if (!converter) {
    // If the converter isn't loaded yet, create a new instance
    converter = new MarkdownToTextile();
  }
  
  const textileText = converter.convert(markdownText);
  
  // Try to replace text in the active element
  const activeElement = lastActiveElement;
  
  // Check if we have an active textarea or input
  if (activeElement && (activeElement.isContentEditable || 
      activeElement.tagName === 'TEXTAREA' || 
      activeElement.tagName === 'INPUT')) {
      
    // For textarea and input elements
    if (typeof lastSelectionStart === 'number' && typeof lastSelectionEnd === 'number') {
      try {
        // Get the current value
        const value = activeElement.value || '';
        
        // Create updated text
        const newValue = value.substring(0, lastSelectionStart) + 
                        textileText + 
                        value.substring(lastSelectionEnd);
        
        // Update the value
        activeElement.value = newValue;
        
        // Position cursor at the end of inserted text
        activeElement.selectionStart = lastSelectionStart + textileText.length;
        activeElement.selectionEnd = lastSelectionStart + textileText.length;
        
        // Make sure the element is still in focus
        activeElement.focus();
        
        // Trigger input event for React and other frameworks
        const inputEvent = new Event('input', { bubbles: true });
        activeElement.dispatchEvent(inputEvent);
        
        // Trigger change event
        const changeEvent = new Event('change', { bubbles: true });
        activeElement.dispatchEvent(changeEvent);
        
        // Show success notification
        showNotification("Text converted and replaced");
        return;
      } catch (err) {
        console.error('Error replacing text in textarea:', err);
      }
    }
  } else if (activeElement && activeElement.isContentEditable) {
    // For contentEditable elements
    try {
      document.execCommand('insertText', false, textileText);
      showNotification("Text converted and replaced");
      return;
    } catch (err) {
      console.error('Error replacing text in contentEditable:', err);
    }
  }
  
  // If we couldn't replace directly, copy to clipboard as fallback
  navigator.clipboard.writeText(textileText)
    .then(() => {
      showNotification("Converted text copied to clipboard");
    })
    .catch(err => {
      console.error('Failed to copy text:', err);
      showNotification("Conversion failed", true);
    });
}

// Function to convert text and copy to clipboard
function convertAndCopy(markdownText) {
  if (!converter) {
    converter = new MarkdownToTextile();
  }
  
  const textileText = converter.convert(markdownText);
  
  // Copy to clipboard
  navigator.clipboard.writeText(textileText)
    .then(() => {
      showNotification("Converted and copied to clipboard!");
    })
    .catch(err => {
      console.error('Failed to copy text:', err);
      showNotification("Failed to copy to clipboard", true);
    });
}

// Helper function to show notifications
function showNotification(message, isError = false) {
  // Create notification element
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.position = 'fixed';
  notification.style.bottom = '20px';
  notification.style.right = '20px';
  notification.style.padding = '10px 15px';
  notification.style.backgroundColor = isError ? '#f44336' : '#4CAF50';
  notification.style.color = 'white';
  notification.style.borderRadius = '4px';
  notification.style.zIndex = '10000';
  notification.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
  notification.style.transition = 'opacity 0.3s';
  
  // Add to page
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
  
  // Also send to background script
  browser.runtime.sendMessage({
    action: "notify",
    message: message
  });
}