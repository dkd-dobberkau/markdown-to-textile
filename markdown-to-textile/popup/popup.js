document.addEventListener('DOMContentLoaded', function() {
  // Get UI elements
  const markdownInput = document.getElementById('markdown-input');
  const textileOutput = document.getElementById('textile-output');
  const convertBtn = document.getElementById('convert-btn');
  const copyBtn = document.getElementById('copy-btn');
  const clearBtn = document.getElementById('clear-btn');
  const statusMessage = document.getElementById('status-message');
  
  // Create converter instance
  const converter = new MarkdownToTextile();
  
  // Convert button click handler
  convertBtn.addEventListener('click', function() {
    const markdownText = markdownInput.value.trim();
    if (!markdownText) {
      showStatus('Please enter some Markdown text', 'error');
      return;
    }
    
    try {
      const textileText = converter.convert(markdownText);
      textileOutput.value = textileText;
      
      // Enable copy button if there's output
      copyBtn.disabled = !textileText;
      
      showStatus('Conversion successful!', 'success');
    } catch (error) {
      showStatus('Conversion error: ' + error.message, 'error');
      console.error(error);
    }
  });
  
  // Copy button click handler
  copyBtn.addEventListener('click', function() {
    textileOutput.select();
    document.execCommand('copy');
    
    // Also use the modern Clipboard API if available
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textileOutput.value)
        .then(() => {
          showStatus('Copied to clipboard!', 'success');
        })
        .catch(err => {
          showStatus('Failed to copy: ' + err.message, 'error');
        });
    } else {
      showStatus('Copied to clipboard!', 'success');
    }
  });
  
  // Clear button click handler
  clearBtn.addEventListener('click', function() {
    markdownInput.value = '';
    textileOutput.value = '';
    copyBtn.disabled = true;
    statusMessage.textContent = '';
    markdownInput.focus();
  });
  
  // Input change handler to clear status
  markdownInput.addEventListener('input', function() {
    statusMessage.textContent = '';
  });
  
  // Function to show status messages
  function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = 'status-message';
    if (type === 'error') {
      statusMessage.style.color = '#db4437';
    } else if (type === 'success') {
      statusMessage.style.color = '#0f9d58';
    } else {
      statusMessage.style.color = '#4285f4';
    }
    
    // Clear the status message after 3 seconds
    setTimeout(function() {
      statusMessage.textContent = '';
    }, 3000);
  }
  
  // Send conversion to active tab
  const sendToActiveTab = document.getElementById('send-to-tab');
  if (sendToActiveTab) {
    sendToActiveTab.addEventListener('click', function() {
      const textileText = textileOutput.value.trim();
      if (!textileText) {
        showStatus('No converted text to send', 'error');
        return;
      }
      
      browser.runtime.sendMessage({
        action: "convertFromPopup",
        text: markdownInput.value.trim()
      });
      
      showStatus('Sent to active tab!', 'success');
    });
  }
});
