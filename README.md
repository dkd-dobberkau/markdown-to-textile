# Markdown to Textile Converter

A Firefox extension that allows you to easily convert Markdown text to Textile format directly in your browser.

## Features

- Convert selected Markdown text to Textile with a single right-click
- Built-in popup interface for converting larger pieces of text
- Works in text areas, input fields, and contentEditable elements
- Supports common Markdown elements:
  - Headers
  - Emphasis (bold/italic)
  - Lists (ordered/unordered)
  - Links
  - Images
  - Code blocks
  - Blockquotes
  - Horizontal rules
  - Strikethrough
  - Basic tables

## Installation

### From Firefox Add-ons (Recommended)

Visit the [Add-on page](https://addons.mozilla.org/de/firefox/addon/markdown-to-textile-converter/) and click "Add to Firefox"

### Manual Installation (Development)

1. Clone this repository:
   ```
   git clone https://github.com/dkd-dobberkau/markdown-to-textile.git
   ```

2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`

3. Click "Load Temporary Add-on" and select any file from the extension directory (e.g., `manifest.json`)

## Usage

### Context Menu (Right-Click)

1. Select Markdown text on any webpage
2. Right-click and choose "Convert Markdown to Textile"
3. The selected text will be replaced with its Textile equivalent

### Popup Interface

1. Click the extension icon in the Firefox toolbar
2. Enter or paste Markdown text in the top textarea
3. Click "Convert" to transform it to Textile
4. Use the "Copy to Clipboard" button to copy the result

## Examples

| Markdown | Textile |
|----------|---------|
| `# Heading` | `h1. Heading` |
| `**bold**` | `*bold*` |
| `*italic*` | `_italic_` |
| `[Link](url)` | `"Link":url` |
| ``` `code` ``` | `@code@` |
| `> quote` | `bq. quote` |

## Development

### Building the Extension

1. Install web-ext:
   ```
   npm install -g web-ext
   ```

2. Validate the extension:
   ```
   web-ext lint
   ```

3. Build the extension:
   ```
   web-ext build
   ```

### Extension Structure

- `manifest.json` - Extension metadata and configuration
- `markdown-to-textile.js` - Core conversion logic
- `background.js` - Background script for context menu integration
- `content.js` - Content script for DOM manipulation
- `popup/` - Files for the popup interface

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the Mozilla Public License Version 2.0 - see the LICENSE file for details.

## Acknowledgments

- Inspired by the need to work with both Markdown and Textile formats
- Thanks to all contributors who help improve this extension
