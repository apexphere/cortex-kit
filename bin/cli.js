#!/usr/bin/env node

import { init, enable } from '../src/index.js';

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0];
const projectName = args[1] || '.';

// Simple argument validation
if (!command) {
  console.error('Error: No command provided');
  console.log('Usage: cortex-kit init [project-name]');
  console.log('       cortex-kit init .  (for current directory)');
  console.log('       cortex-kit enable  (enable AI features in existing project)');
  process.exit(1);
}

if (command !== 'init' && command !== 'enable') {
  console.error(`Error: Unknown command "${command}"`);
  console.log('Available commands: init, enable');
  process.exit(1);
}

// Execute command
try {
  if (command === 'init') {
    await init(projectName);
  } else if (command === 'enable') {
    await enable();
  }
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
