# Markdown to Textile Test Examples

This file contains various Markdown examples to test the conversion functionality.

## Headers

### Basic Headers
```markdown
# H1 Header
## H2 Header  
### H3 Header
#### H4 Header
##### H5 Header
###### H6 Header
```

### Headers with Content
```markdown
# Main Title

Some content directly after the header.

## Subsection

More content here.
```

## Text Emphasis

### Basic Emphasis
```markdown
**Bold text with asterisks**
__Bold text with underscores__
*Italic text with asterisks*
_Italic text with underscores_
~~Strikethrough text~~
```

### Nested and Combined
```markdown
**Bold with *nested italic* text**
*Italic with **nested bold** text*
***Bold and italic combined***
```

## Lists

### Unordered Lists
```markdown
- Item 1
- Item 2
- Item 3

* Alternative syntax
* Item B
* Item C
```

### Ordered Lists
```markdown
1. First item
2. Second item  
3. Third item
10. Jump to ten
```

### Nested Lists
```markdown
- Main item 1
  - Sub item 1.1
  - Sub item 1.2
    - Sub sub item 1.2.1
- Main item 2
  - Sub item 2.1

1. Ordered main
   1. Ordered sub
   2. Another sub
2. Second main
```

### Mixed Lists
```markdown
1. Ordered item
   - Unordered sub
   - Another sub
2. Back to ordered
   * Different syntax
   * More items
```

## Links

### Basic Links
```markdown
[Simple link](https://example.com)
[Link with title](https://example.com "Title text")
[Reference link][1]

[1]: https://example.com
```

### Complex Links
```markdown
Visit [Google](https://google.com) for search.
Email me at [contact@example.com](mailto:contact@example.com).
[Link in **bold**](https://example.com)
```

## Images

### Basic Images
```markdown
![Alt text](image.jpg)
![Alt with title](image.png "Image title")
![Reference image][img1]

[img1]: /path/to/image.gif
```

## Code

### Inline Code
```markdown
Use `console.log()` to debug.
The `<div>` element is common.
Mix code with **bold** and `inline code`.
```

### Code Blocks
```markdown
```
Plain code block
with multiple lines
```

```javascript
function hello() {
    console.log("Hello World!");
    return true;
}
```

```python
def calculate(x, y):
    return x + y

result = calculate(5, 3)
print(f"Result: {result}")
```

```html
<div class="container">
    <h1>Title</h1>
    <p>Paragraph text</p>
</div>
```
```

## Tables

### Basic Table
```markdown
| Name | Age | City |
|------|-----|------|
| John | 25  | NYC  |
| Jane | 30  | LA   |
```

### Table with Alignment
```markdown
| Left | Center | Right |
|:-----|:------:|------:|
| Left aligned | Centered | Right aligned |
| Text | More | Data |
| A | B | C |
```

### Complex Table
```markdown
| Feature | Markdown | Textile | Notes |
|---------|:--------:|:-------:|-------|
| Headers | `# Text` | `h1. Text` | Both support 6 levels |
| Bold | `**text**` | `*text*` | Different syntax |
| Links | `[text](url)` | `"text":url` | Textile more compact |
```

## Blockquotes

### Basic Blockquotes
```markdown
> This is a simple blockquote.
> It can span multiple lines.

> Single line quote.
```

### Nested Blockquotes
```markdown
> First level quote
> > Second level quote
> > > Third level quote
> Back to first level
```

### Blockquotes with Content
```markdown
> ## Header in Quote
> 
> This blockquote contains a **header** and *emphasis*.
> 
> - Even lists work
> - Inside blockquotes
```

## Horizontal Rules

```markdown
---

***

___
```

## Mixed Content Examples

### Article Example
```markdown
# How to Use Markdown

Markdown is a **lightweight markup language** that allows you to format text easily.

## Basic Syntax

Here are some common elements:

1. **Headers** - Use `#` symbols
2. **Emphasis** - Use `*` or `_` 
3. **Lists** - Use `-`, `*`, or numbers

### Code Example

```javascript
// Simple function
function greet(name) {
    return `Hello, ${name}!`;
}
```

> **Note:** Markdown is widely supported across platforms.

For more information, visit [Markdown Guide](https://markdownguide.org).
```

### Documentation Example  
```markdown
# API Documentation

## Authentication

All API requests require authentication:

```bash
curl -H "Authorization: Bearer TOKEN" \
     https://api.example.com/data
```

### Response Format

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Unique identifier |
| `name` | string | Resource name |
| `active` | boolean | Status flag |

Example response:

```json
{
  "id": 123,
  "name": "Example Resource", 
  "active": true
}
```

> **Warning:** Keep your API tokens secure!
```

## Edge Cases

### Empty Lines and Spacing
```markdown
# Header


Multiple empty lines above.

Text with  
trailing spaces for line break.

More text here.
```

### Special Characters
```markdown
Text with `backticks`, **asterisks**, and _underscores_.
Email: user@example.com
URL: https://example.com/path?param=value&other=123
Symbols: & < > " ' 
```

### Mixed Syntax
```markdown
- List item with **bold** and `code`
- [Link in list](https://example.com)
- Item with > quote character

1. Ordered with *italic*
2. Item with ![image](img.jpg)
```

## Potential Issues

### Problematic Cases
```markdown
**Unclosed bold
*Unclosed italic
[Broken link](

Nested **bold with *italic* inside**

`Code with **bold** inside`

| Broken | table |
|--------|
| Missing | cell |
```