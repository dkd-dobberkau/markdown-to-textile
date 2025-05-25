# TODO - Markdown to Textile Converter Improvements

## High Priority Improvements

### Conversion Accuracy

- [x] Add newlines after Textile headlines for better rendering
- [ ] Fix incomplete table conversion (currently partially implemented at line 51)
- [ ] Fix code blocks - should generate Textile `bc.` syntax instead of HTML
- [ ] Add support for nested lists with proper indentation levels
- [ ] Implement footnotes conversion
- [ ] Add definition lists support
- [ ] Handle complex markdown structures (nested blockquotes, mixed content)

### Browser Compatibility

- [ ] Upgrade from Manifest V2 to V3 for modern browsers
- [ ] Replace deprecated `execCommand` with modern clipboard API
- [ ] Use `chrome` API instead of `browser` (remove polyfill dependency)
- [ ] Add fallback clipboard handling for older browsers

### Missing UI Features

- [ ] Add "Send to tab" button in popup.html (referenced in popup.js but missing)
- [ ] Implement keyboard shortcuts (Ctrl+Enter for quick conversion)
- [ ] Add real-time preview option with toggle
- [ ] Improve visual feedback for user actions (loading states, success/error messages)

## Medium Priority Improvements

### Code Quality

- [ ] Standardize async patterns (use async/await consistently)
- [ ] Implement singleton pattern for converter instances
- [ ] Add comprehensive error handling with custom error classes
- [ ] Add JSDoc documentation for all public methods
- [ ] Separate concerns better (UI logic vs conversion logic)

### Performance

- [ ] Implement caching for conversion results
- [ ] Optimize regex processing order (most common patterns first)
- [ ] Add debouncing for input events
- [ ] Create single converter instance management
- [ ] Optimize rule processing with compiled patterns

### Security

- [ ] Add input sanitization and validation
- [ ] Implement input size limits (prevent DoS)
- [ ] Fix potential XSS vulnerabilities with HTML in code blocks
- [ ] Add Content Security Policy headers
- [ ] Validate and escape user input properly

## Lower Priority Enhancements

### Testing & Validation

- [ ] Create comprehensive unit test suite
- [ ] Add integration tests for browser extension functionality
- [ ] Implement edge case testing
- [ ] Add automated testing pipeline
- [ ] Create test cases for all conversion patterns

### User Experience

- [ ] Add conversion statistics/metrics display
- [ ] Implement undo/redo functionality
- [ ] Add format validation warnings
- [ ] Support for custom conversion rules
- [ ] Add export/import settings functionality
- [ ] Implement conversion history

### Documentation

- [ ] Add inline code examples in JSDoc
- [ ] Create comprehensive usage guide
- [ ] Document all conversion patterns supported
- [ ] Add troubleshooting section
- [ ] Create changelog for version tracking

## Technical Debt

### Code Structure

- [ ] Extract conversion rules to separate configuration file
- [ ] Implement modular architecture with clear interfaces
- [ ] Add proper logging system
- [ ] Create constants file for magic numbers/strings
- [ ] Implement proper module exports for Node.js compatibility

### Browser Extension Architecture

- [ ] Implement proper message passing between components
- [ ] Add proper state management
- [ ] Create consistent error handling across all components
- [ ] Add proper event cleanup and memory management

## Implementation Examples

### High Priority Code Fixes


```javascript
// Fix code blocks conversion
{ pattern: /```(\w+)?\n([\s\S]+?)\n```/gm, replacement: 'bc. $2' }

// Add nested list support
{ pattern: /^(\s+)[-*] (.+)$/gm, replacement: (match, indent, text) => {
  const level = Math.floor(indent.length / 2) + 1;
  return '*'.repeat(level) + ' ' + text;
}}

// Proper table conversion
{ pattern: /\|(.+?)\|/g, replacement: (match, content) => {
  return '|' + content.split('|').map(cell => cell.trim()).join('|') + '|';
}}
```

### Manifest V3 Upgrade

```json
{
  "manifest_version": 3,
  "action": {...},
  "host_permissions": ["<all_urls>"],
  "background": {
    "service_worker": "background.js"
  }
}
```

### Modern Clipboard API

```javascript
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
}
```

## Priority Order for Implementation
1. Fix conversion accuracy issues (code blocks, tables, nested lists)
2. Upgrade to Manifest V3
3. Add missing UI elements (send to tab button, keyboard shortcuts)
4. Implement proper error handling and input validation
5. Add comprehensive test suite
6. Performance optimizations and caching
7. Enhanced security measures
8. Documentation and user experience improvements