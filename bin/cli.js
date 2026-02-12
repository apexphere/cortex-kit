#!/usr/bin/env node

import { init } from '../src/index.js';

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0];
const projectName = args[1] || '.';

// Simple argument validation
if (!command) {
  console.error('Error: No command provided');
  console.log('Usage: cortex-kit init [project-name]');
  console.log('       cortex-kit init .  (for current directory)');
  process.exit(1);
}

if (command !== 'init') {
  console.error(`Error: Unknown command "${command}"`);
  console.log('Available commands: init');
  process.exit(1);
}

// Execute init command
try {
  await init(projectName);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
