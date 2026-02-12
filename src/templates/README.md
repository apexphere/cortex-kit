# AI-Native Project Setup

This project is configured for AI-native development with AI coding assistants.

## What's Included

### AGENTS.md
Project context and conventions for AI coding agents (Claude Code, GitHub Copilot, Cursor, etc.). This file contains:
- Development workflow and best practices
- Testing requirements and quality standards
- Documentation guidelines
- Project-specific build and test commands

**This is the main file to customize** with your project's conventions, tech stack, and workflows.

### CLAUDE.md
A reference file that points to `AGENTS.md`, telling Claude Code to read the AGENTS.md file for project context.

### docs/
Empty directory for architecture documentation, design decisions, and API docs.

## Getting Started

### 1. Customize AGENTS.md
Update the following sections in `AGENTS.md`:
- **Project Overview**: Describe what your project does
- **Build Commands**: Add your actual build commands (e.g., `npm run build`, `cargo build`)
- **Test Commands**: Add your test commands (e.g., `npm test`, `pytest`)
- **Project-Specific Guidelines**: Add any conventions specific to your project

### 2. Use with AI Coding Tools
AI coding assistants will automatically read `AGENTS.md` to understand:
- How to build and test your project
- Code quality standards to follow
- Testing requirements
- Documentation expectations

### 3. Document Your Architecture
Create subdirectories in `docs/` as needed:
- `docs/architecture/` - Architectural decisions and design docs
- `docs/api/` - API documentation
- `docs/guides/` - Development guides

## Why AGENTS.md?

AGENTS.md is an open standard used by 60,000+ projects to provide context to AI coding agents. It's like a README for AI - containing build steps, conventions, and practices that AI agents need to work effectively on your codebase.

## Learn More

- [AGENTS.md Specification](https://agents.md/)
- [Claude Code Documentation](https://code.claude.com/docs)

---

Generated with [cortex-kit](https://www.npmjs.com/package/cortex-kit)
