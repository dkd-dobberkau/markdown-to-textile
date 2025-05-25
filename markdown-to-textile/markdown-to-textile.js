/**
 * Markdown to Textile converter
 */
class MarkdownToTextile {
  constructor() {
    this.rules = [
      // Headers
      { pattern: /^# (.+)$/gm, replacement: 'h1. $1\n' },
      { pattern: /^## (.+)$/gm, replacement: 'h2. $1\n' },
      { pattern: /^### (.+)$/gm, replacement: 'h3. $1\n' },
      { pattern: /^#### (.+)$/gm, replacement: 'h4. $1\n' },
      { pattern: /^##### (.+)$/gm, replacement: 'h5. $1\n' },
      { pattern: /^###### (.+)$/gm, replacement: 'h6. $1\n' },
      
      // Emphasis
      { pattern: /\*\*([^*]+)\*\*/g, replacement: '*$1*' },  // Bold
      { pattern: /\*([^*]+)\*/g, replacement: '_$1_' },      // Italic
      { pattern: /__([^_]+)__/g, replacement: '*$1*' },      // Bold (alternate)
      { pattern: /_([^_]+)_/g, replacement: '_$1_' },        // Italic (alternate)
      
      // Lists
      { pattern: /^- (.+)$/gm, replacement: '* $1' },        // Unordered list
      { pattern: /^\* (.+)$/gm, replacement: '* $1' },       // Unordered list (alternate)
      { pattern: /^(\d+)\. (.+)$/gm, replacement: '# $2' },  // Ordered list
      
      // Links
      { pattern: /\[([^\]]+)\]\(([^)]+)\)/g, replacement: '"$1":$2' },
      
      // Images
      { pattern: /!\[([^\]]+)\]\(([^)]+)\)/g, replacement: '!$2($1)!' },
      
      // Code
      { pattern: /`([^`]+)`/g, replacement: '@$1@' },        // Inline code
      
      // Code blocks
      { pattern: /```(\w+)?\n([\s\S]+?)\n```/gm, replacement: function(match, lang, code) {
        lang = lang || '';
        return '<pre><code' + (lang ? ' class="' + lang + '"' : '') + '>\n' + code + '\n</code></pre>';
      }},
      
      // Blockquotes
      { pattern: /^> (.+)$/gm, replacement: 'bq. $1' },
      
      // Horizontal rule
      { pattern: /^---$/gm, replacement: '---' },
      
      // Strikethrough
      { pattern: /~~(.+?)~~/g, replacement: '-$1-' },
      
      // Tables - this is simplified and handles basic tables
      { pattern: /\|(.+)\|/g, replacement: '|$1|' },
    ];
  }
  
  /**
   * Convert Markdown text to Textile
   * @param {string} markdownText - The markdown text to convert
   * @return {string} - The converted textile text
   */
  convert(markdownText) {
    let textileText = markdownText;
    
    // Apply each conversion rule
    this.rules.forEach(rule => {
      if (typeof rule.replacement === 'function') {
        textileText = textileText.replace(rule.pattern, rule.replacement);
      } else {
        textileText = textileText.replace(rule.pattern, rule.replacement);
      }
    });
    
    return textileText;
  }
}

// If running in a browser environment, attach to window
if (typeof window !== 'undefined') {
  window.MarkdownToTextile = MarkdownToTextile;
}

// If in Node.js environment, export the class
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MarkdownToTextile;
}
