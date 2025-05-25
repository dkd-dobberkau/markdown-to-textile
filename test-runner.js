#!/usr/bin/env node

/**
 * Test runner for Markdown to Textile converter
 * Tests various Markdown examples and shows conversion results
 */

const fs = require('fs');
const path = require('path');

// Import the converter (simulate browser environment)
const converterPath = './markdown-to-textile/markdown-to-textile.js';
const converterCode = fs.readFileSync(converterPath, 'utf8');

// Create a minimal browser-like environment
global.window = global;
global.document = {};

// Execute the converter code in a sandbox
const vm = require('vm');
const sandbox = {
  console: console,
  window: {},
  document: {},
  require: require
};

vm.createContext(sandbox);
vm.runInContext(converterCode, sandbox);

// Extract the MarkdownToTextile class
const MarkdownToTextile = sandbox.window.MarkdownToTextile;

// Test cases with expected results
const testCases = [
  {
    name: "Basic Headers",
    input: "# H1 Header\n## H2 Header\n### H3 Header",
    description: "Should convert headers with newlines"
  },
  {
    name: "Text Emphasis", 
    input: "**Bold text** and *italic text* and ~~strikethrough~~",
    description: "Should convert emphasis correctly"
  },
  {
    name: "Code Blocks",
    input: "```javascript\nfunction test() {\n  return true;\n}\n```",
    description: "Should use bc(javascript). syntax"
  },
  {
    name: "Simple Table",
    input: "| Name | Age |\n|------|-----|\n| John | 25  |",
    description: "Should convert to Textile table format"
  },
  {
    name: "Table with Alignment",
    input: "| Left | Center | Right |\n|:-----|:------:|------:|\n| A | B | C |",
    description: "Should handle alignment with _., =., >. syntax"
  },
  {
    name: "Lists",
    input: "- Item 1\n- Item 2\n\n1. First\n2. Second",
    description: "Should convert list markers"
  },
  {
    name: "Links and Images",
    input: "[Link](https://example.com) and ![Alt](image.jpg)",
    description: "Should convert links and images"
  },
  {
    name: "Blockquote",
    input: "> This is a quote\n> Second line",
    description: "Should use bq. syntax"
  },
  {
    name: "Inline Code",
    input: "Use `console.log()` for debugging",
    description: "Should use @code@ syntax"
  },
  {
    name: "Mixed Content",
    input: "# Title\n\n**Bold** text with `code` and [link](url).\n\n- List item\n- Another item",
    description: "Should handle mixed content correctly"
  }
];

/**
 * Run a single test case
 */
function runTest(testCase) {
  try {
    if (!MarkdownToTextile) {
      throw new Error('MarkdownToTextile class not loaded');
    }
    
    const converter = new MarkdownToTextile();
    const result = converter.convert(testCase.input);
    
    return {
      passed: true,
      result: result,
      error: null
    };
  } catch (error) {
    return {
      passed: false,
      result: null,
      error: error.message
    };
  }
}

/**
 * Format output for display
 */
function formatOutput(text) {
  return text.split('\n').map(line => `  ${line}`).join('\n');
}

/**
 * Display test results
 */
function displayResults(testCase, testResult) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🧪 TEST: ${testCase.name}`);
  console.log(`📝 ${testCase.description}`);
  console.log(`${'='.repeat(60)}`);
  
  console.log('\n📥 INPUT:');
  console.log(formatOutput(testCase.input));
  
  if (testResult.passed) {
    console.log('\n📤 OUTPUT:');
    console.log(formatOutput(testResult.result));
    console.log('\n✅ Status: PASSED');
  } else {
    console.log('\n❌ Status: FAILED');
    console.log(`🚨 Error: ${testResult.error}`);
  }
}

/**
 * Run all tests
 */
function runAllTests() {
  console.log('🚀 Markdown to Textile Converter Test Runner');
  console.log(`📊 Running ${testCases.length} test cases...\n`);
  
  let passed = 0;
  let failed = 0;
  
  testCases.forEach((testCase, index) => {
    const result = runTest(testCase);
    displayResults(testCase, result);
    
    if (result.passed) {
      passed++;
    } else {
      failed++;
    }
  });
  
  // Summary
  console.log(`\n${'='.repeat(60)}`);
  console.log('📈 TEST SUMMARY');
  console.log(`${'='.repeat(60)}`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📊 Total:  ${testCases.length}`);
  
  if (failed === 0) {
    console.log('\n🎉 All tests passed!');
  } else {
    console.log(`\n⚠️  ${failed} test(s) failed. Please review the output above.`);
  }
  
  return failed === 0;
}

/**
 * Interactive mode - test custom input
 */
function interactiveMode() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  console.log('\n🎮 Interactive Mode');
  console.log('Enter Markdown text to convert (type "exit" to quit):\n');
  
  function promptUser() {
    rl.question('markdown> ', (input) => {
      if (input.toLowerCase() === 'exit') {
        rl.close();
        return;
      }
      
      try {
        const converter = new MarkdownToTextile();
        const result = converter.convert(input);
        console.log('\n📤 Textile output:');
        console.log(formatOutput(result));
        console.log('');
      } catch (error) {
        console.log(`❌ Error: ${error.message}\n`);
      }
      
      promptUser();
    });
  }
  
  promptUser();
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
📋 Markdown to Textile Test Runner

Usage:
  node test-runner.js [options]

Options:
  --interactive, -i    Run in interactive mode
  --help, -h          Show this help

Examples:
  node test-runner.js              # Run all tests
  node test-runner.js -i           # Interactive mode
`);
    return;
  }
  
  if (args.includes('--interactive') || args.includes('-i')) {
    interactiveMode();
  } else {
    const success = runAllTests();
    process.exit(success ? 0 : 1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { runTest, testCases };