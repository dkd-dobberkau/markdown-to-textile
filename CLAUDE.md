# CLAUDE.md - Guidelines for Markdown to Textile Converter

## Build Commands
- `npm install -g web-ext` - Install web-ext tool
- `web-ext lint` - Validate extension
- `web-ext build` - Package extension
- `web-ext run` - Run extension in Firefox for testing

## Code Style Guidelines
- **JavaScript Version**: ES6+ vanilla JavaScript with browser compatibility
- **Formatting**: 2-space indentation, semicolons required
- **Documentation**: JSDoc comments for functions and classes
- **Error Handling**: Gracefully handle conversion errors, preserve original text
- **Naming Conventions**: 
  - Classes: PascalCase (`MarkdownToTextile`)
  - Methods/Functions: camelCase (`convert()`)
  - Variables: camelCase
- **Patterns**: Maintain modular structure with separation of concerns
- **Exports**: Support both browser and Node.js environments
- **Testing**: Manual testing through Firefox extension debugging