import { resolve, join } from 'path';
import { mkdir } from 'fs/promises';
import { generateFiles, enableFiles } from './generator.js';

/**
 * Initialize a new AI-native project
 * @param {string} projectName - Name of project or '.' for current directory
 */
export async function init(projectName) {
  // Determine target directory
  const targetDir = projectName === '.'
    ? process.cwd()
    : resolve(process.cwd(), projectName);

  const isCurrentDir = projectName === '.';
  const displayName = isCurrentDir ? 'current directory' : projectName;

  console.log(`🚀 Initializing cortex-kit in ${displayName}...`);

  // Create project directory if not current directory
  if (!isCurrentDir) {
    try {
      await mkdir(targetDir, { recursive: true });
      console.log(`✓ Created directory: ${projectName}`);
    } catch (error) {
      if (error.code === 'EEXIST') {
        console.log(`✓ Directory exists: ${projectName}`);
      } else {
        throw new Error(`Failed to create directory: ${error.message}`);
      }
    }
  }

  // Create docs directory
  const docsDir = join(targetDir, 'docs');
  try {
    await mkdir(docsDir, { recursive: true });
    console.log('✓ Created docs/ directory');
  } catch (error) {
    throw new Error(`Failed to create docs directory: ${error.message}`);
  }

  // Generate all template files
  await generateFiles(targetDir);

  console.log('\n✨ Setup complete!');
  console.log('\nNext steps:');
  if (!isCurrentDir) {
    console.log(`  cd ${projectName}`);
  }
  console.log('  1. Customize AGENTS.md with your project details');
  console.log('  2. Add build and test commands to AGENTS.md');
  console.log('  3. Open your project with Claude Code or other AI tools');
  console.log('\nGenerated files:');
  console.log('  - AGENTS.md: Project context for AI coding agents');
  console.log('  - CLAUDE.md: Reference to AGENTS.md');
  console.log('  - README.md: Setup instructions');
  console.log('  - docs/: Architecture documentation folder');
}

/**
 * Enable AI features in an existing project
 */
export async function enable() {
  const targetDir = process.cwd();

  console.log('🚀 Enabling AI features in current directory...');

  // Create docs directory
  const docsDir = join(targetDir, 'docs');
  try {
    await mkdir(docsDir, { recursive: true });
    console.log('✓ Created docs/ directory');
  } catch (error) {
    throw new Error(`Failed to create docs directory: ${error.message}`);
  }

  // Generate files for existing project (skip AGENTS.md if exists, append README.md)
  await enableFiles(targetDir);

  console.log('\n✨ AI features enabled!');
  console.log('\nNext steps:');
  console.log('  1. Customize AGENTS.md with your project details');
  console.log('  2. Add build and test commands to AGENTS.md');
  console.log('  3. Open your project with Claude Code or other AI tools');
}
