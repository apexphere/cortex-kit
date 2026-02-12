# cortex-kit

CLI tool that scaffolds AI-native projects with AGENTS.md specifications for AI coding assistants.

## Features

- Single command to initialize AI-native project structure
- AGENTS.md template with software development best practices
- Framework-agnostic (works with any tech stack)
- Compatible with 20+ AI coding tools (Claude Code, GitHub Copilot, Cursor, etc.)
- Zero dependencies

## Installation

```bash
# Use with npx (no installation needed)
npx cortex-kit init my-project

# Or install globally
npm install -g cortex-kit
cortex-kit init my-project
```

## Usage

### Create a new project
```bash
npx cortex-kit init my-awesome-project
cd my-awesome-project
```

### Initialize in current directory
```bash
npx cortex-kit init .
```

## What Gets Generated

- `AGENTS.md` - Project context for AI coding agents (workflows, testing, conventions)
- `CLAUDE.md` - Reference to AGENTS.md for Claude Code
- `README.md` - Setup instructions for your team
- `docs/` - Empty directory for architecture documentation

## Next Steps After Generation

1. Customize `AGENTS.md` with your project details:
   - Update project overview
   - Add build and test commands
   - Specify coding conventions
   - Add project-specific guidelines

2. Start coding with AI assistants (Claude Code, Copilot, Cursor, etc.)

3. Document architecture decisions in `docs/`

## Why AGENTS.md?

AGENTS.md is an open standard used by 60,000+ projects to provide context to AI coding agents. It's like a README for AI - containing build steps, conventions, and practices that AI agents need to work effectively.

Learn more: [agents.md](https://agents.md/)

## Requirements

- Node.js 18 or higher

## License

MIT
