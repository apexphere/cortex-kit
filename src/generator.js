import { writeFile, readFile, access, appendFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Generate all template files in target directory
 * @param {string} targetDir - Target directory path
 */
export async function generateFiles(targetDir) {
  const templates = [
    { name: 'AGENTS.md', dest: 'AGENTS.md' },
    { name: 'CLAUDE.md', dest: 'CLAUDE.md' },
    { name: 'README.md', dest: 'README.md' }
  ];

  for (const template of templates) {
    const templatePath = join(__dirname, 'templates', template.name);
    const destPath = join(targetDir, template.dest);

    try {
      const content = await readFile(templatePath, 'utf-8');
      await writeFile(destPath, content, 'utf-8');
      console.log(`✓ Generated ${template.dest}`);
    } catch (error) {
      throw new Error(`Failed to generate ${template.dest}: ${error.message}`);
    }
  }
}

/**
 * Check if a file exists
 * @param {string} filePath - Path to check
 * @returns {Promise<boolean>} - True if file exists
 */
async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Enable AI features in existing project
 * @param {string} targetDir - Target directory path
 */
export async function enableFiles(targetDir) {
  // Check if AGENTS.md exists
  const agentsPath = join(targetDir, 'AGENTS.md');
  const agentsExists = await fileExists(agentsPath);

  if (agentsExists) {
    console.log('⊘ Skipped AGENTS.md (already exists)');
  } else {
    const templatePath = join(__dirname, 'templates', 'AGENTS.md');
    const content = await readFile(templatePath, 'utf-8');
    await writeFile(agentsPath, content, 'utf-8');
    console.log('✓ Generated AGENTS.md');
  }

  // Always create CLAUDE.md
  const claudePath = join(targetDir, 'CLAUDE.md');
  const claudeTemplatePath = join(__dirname, 'templates', 'CLAUDE.md');
  const claudeContent = await readFile(claudeTemplatePath, 'utf-8');
  await writeFile(claudePath, claudeContent, 'utf-8');
  console.log('✓ Generated CLAUDE.md');

  // Check if README.md exists
  const readmePath = join(targetDir, 'README.md');
  const readmeExists = await fileExists(readmePath);

  if (readmeExists) {
    // Append AI setup section to existing README
    const aiSection = `

---

## AI-Native Development

This project is configured for AI-native development with AI coding assistants.

### AI Configuration Files

- **AGENTS.md**: Project context and conventions for AI coding agents (Claude Code, GitHub Copilot, Cursor, etc.)
- **CLAUDE.md**: Reference file that points Claude Code to AGENTS.md

### Working with AI Assistants

AI coding assistants will automatically read \`AGENTS.md\` to understand:
- How to build and test your project
- Code quality standards to follow
- Testing requirements
- Documentation expectations

Customize \`AGENTS.md\` with your project-specific build commands, test commands, and conventions.

Generated with [cortex-kit](https://www.npmjs.com/package/cortex-kit)
`;
    await appendFile(readmePath, aiSection, 'utf-8');
    console.log('✓ Appended AI setup section to README.md');
  } else {
    // Create new README.md
    const readmeTemplatePath = join(__dirname, 'templates', 'README.md');
    const readmeContent = await readFile(readmeTemplatePath, 'utf-8');
    await writeFile(readmePath, readmeContent, 'utf-8');
    console.log('✓ Generated README.md');
  }
}
