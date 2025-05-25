#!/usr/bin/env node

/**
 * Build script for Markdown to Textile Converter
 * Updates version and packages the extension
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const MANIFEST_PATH = './markdown-to-textile/manifest.json';
const BUILD_DIR = './markdown-to-textile/web-ext-artifacts';

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const versionArg = args.find(arg => arg.startsWith('--version='));
  const typeArg = args.find(arg => ['--patch', '--minor', '--major'].includes(arg));
  
  if (versionArg) {
    return { type: 'explicit', version: versionArg.split('=')[1] };
  }
  
  if (typeArg) {
    return { type: typeArg.replace('--', '') };
  }
  
  return { type: 'patch' }; // default
}

/**
 * Increment version based on type
 */
function incrementVersion(currentVersion, type) {
  const parts = currentVersion.split('.').map(Number);
  
  // Ensure we have at least major.minor.patch
  while (parts.length < 3) {
    parts.push(0);
  }
  
  switch (type) {
    case 'major':
      parts[0]++;
      parts[1] = 0;
      parts[2] = 0;
      break;
    case 'minor':
      parts[1]++;
      parts[2] = 0;
      break;
    case 'patch':
    default:
      parts[2]++;
      break;
  }
  
  return parts.join('.');
}

/**
 * Update manifest.json version
 */
function updateManifest(newVersion) {
  console.log(`📝 Updating manifest.json to version ${newVersion}`);
  
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  const oldVersion = manifest.version;
  
  manifest.version = newVersion;
  
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
  
  console.log(`✅ Version updated from ${oldVersion} to ${newVersion}`);
  return { oldVersion, newVersion };
}

/**
 * Run web-ext lint
 */
function runLint() {
  console.log('🔍 Running web-ext lint...');
  try {
    execSync('web-ext lint --source-dir=./markdown-to-textile', { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    console.log('✅ Lint passed');
  } catch (error) {
    console.error('❌ Lint failed');
    throw error;
  }
}

/**
 * Build extension package
 */
function buildExtension() {
  console.log('📦 Building extension...');
  
  // Ensure build directory exists
  if (!fs.existsSync(BUILD_DIR)) {
    fs.mkdirSync(BUILD_DIR, { recursive: true });
  }
  
  try {
    execSync('web-ext build --source-dir=./markdown-to-textile --artifacts-dir=./markdown-to-textile/web-ext-artifacts --overwrite-dest', {
      stdio: 'inherit',
      cwd: process.cwd()
    });
    console.log('✅ Extension built successfully');
  } catch (error) {
    console.error('❌ Build failed');
    throw error;
  }
}

/**
 * Create git tag
 */
function createGitTag(version) {
  try {
    console.log(`🏷️  Creating git tag v${version}`);
    execSync(`git tag v${version}`, { stdio: 'inherit' });
    console.log(`✅ Git tag v${version} created`);
  } catch (error) {
    console.warn(`⚠️  Could not create git tag: ${error.message}`);
  }
}

/**
 * Show usage information
 */
function showUsage() {
  console.log(`
📋 Markdown to Textile Converter Build Script

Usage:
  node build.js [options]

Options:
  --patch           Increment patch version (default)
  --minor           Increment minor version  
  --major           Increment major version
  --version=X.Y.Z   Set specific version
  --help            Show this help

Examples:
  node build.js                    # 1.0.0 → 1.0.1
  node build.js --minor            # 1.0.1 → 1.1.0
  node build.js --major            # 1.1.0 → 2.0.0
  node build.js --version=2.5.3    # Set to 2.5.3

Steps performed:
  1. Update version in manifest.json
  2. Run web-ext lint validation
  3. Build extension package
  4. Create git tag (if in git repo)
`);
}

/**
 * Main build function
 */
function main() {
  const args = parseArgs();
  
  if (process.argv.includes('--help')) {
    showUsage();
    return;
  }
  
  try {
    // Read current version
    const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
    const currentVersion = manifest.version;
    
    // Calculate new version
    let newVersion;
    if (args.type === 'explicit') {
      newVersion = args.version;
    } else {
      newVersion = incrementVersion(currentVersion, args.type);
    }
    
    console.log(`🚀 Building Markdown to Textile Converter v${newVersion}\n`);
    
    // Update manifest
    const { oldVersion } = updateManifest(newVersion);
    
    // Run lint
    runLint();
    
    // Build extension
    buildExtension();
    
    // Create git tag
    createGitTag(newVersion);
    
    console.log(`\n🎉 Build complete!`);
    console.log(`📈 Version: ${oldVersion} → ${newVersion}`);
    console.log(`📦 Package: ${BUILD_DIR}/`);
    console.log(`\nNext steps:`);
    console.log(`  git add . && git commit -m "Release v${newVersion}"`);
    console.log(`  git push && git push --tags`);
    
  } catch (error) {
    console.error(`\n❌ Build failed: ${error.message}`);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { incrementVersion, updateManifest, main };