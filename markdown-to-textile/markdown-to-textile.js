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
        if (lang) {
          return `bc(${lang}). ${code.trim()}\n`;
        } else {
          return `bc. ${code.trim()}\n`;
        }
      }},
      
      // Blockquotes
      { pattern: /^> (.+)$/gm, replacement: 'bq. $1' },
      
      // Horizontal rule
      { pattern: /^---$/gm, replacement: '---' },
      
      // Strikethrough
      { pattern: /~~(.+?)~~/g, replacement: '-$1-' },
      
      // Tables - convert markdown tables to textile format
      { pattern: /^\|[^\n]*\|(?:\n\|[\s\-\:\|]*\|)?(?:\n\|[^\n]*\|)*/gm, replacement: (match) => this.convertTable(match) },
    ];
  }
  
  /**
   * Convert markdown table to textile format
   * @param {string} markdownTable - The markdown table text
   * @return {string} - The converted textile table
   */
  convertTable(markdownTable) {
    const lines = markdownTable.trim().split('\n').filter(line => line.trim());
    
    if (lines.length < 2) {
      // Not a proper table, return as-is
      return markdownTable;
    }
    
    const headerRow = lines[0];
    let dataStartIndex = 1;
    let alignments = [];
    
    // Check if second line is a separator
    if (lines[1] && /^\|[\s\-\:]+\|$/.test(lines[1])) {
      const separatorRow = lines[1];
      dataStartIndex = 2;
      
      // Parse alignment from separator
      alignments = separatorRow.split('|').slice(1, -1).map(sep => {
        const trimmed = sep.trim();
        if (trimmed.startsWith(':') && trimmed.endsWith(':')) return 'center';
        if (trimmed.endsWith(':')) return 'right';
        return 'left'; // default
      });
    }
    
    const dataRows = lines.slice(dataStartIndex);
    
    // Parse header
    const headers = headerRow.split('|').slice(1, -1).map(h => h.trim());
    
    // If no alignments parsed, default to left
    if (alignments.length === 0) {
      alignments = headers.map(() => 'left');
    }
    
    let result = '';
    
    // Header row with textile formatting
    result += '|' + headers.map((header, i) => {
      const align = alignments[i] || 'left';
      if (align === 'center') return `=. ${header}`;
      if (align === 'right') return `>. ${header}`;
      return `_. ${header}`; // left-aligned header
    }).join('|') + '|\n';
    
    // Data rows
    dataRows.forEach(row => {
      if (row.trim()) {
        const cells = row.split('|').slice(1, -1).map(c => c.trim());
        result += '|' + cells.map((cell, i) => {
          const align = alignments[i] || 'left';
          if (align === 'center') return `=. ${cell}`;
          if (align === 'right') return `>. ${cell}`;
          return cell; // left-aligned (default)
        }).join('|') + '|\n';
      }
    });
    
    return result.trim();
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
