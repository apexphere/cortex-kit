import { writeFile, readFile } from 'fs/promises';
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
