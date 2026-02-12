# Project Context for AI Agents

## Development Workflow

### Before Starting Work
1. Understand the requirements and scope
2. Check existing documentation in `docs/`
3. Review relevant code and tests
4. Plan the approach before implementing

### Implementation Process
1. Write clean, readable code with clear intent
2. Follow existing patterns and conventions in the codebase
3. Keep changes focused and atomic
4. Add comments only for complex logic that isn't self-evident

### Testing Requirements
- **Always write tests** for new features and bug fixes
- Run all tests before considering work complete
- Include both positive and negative test cases
- Ensure tests are deterministic and reliable
- Test edge cases and error conditions

### Development Testing
- **Run tests after every change** to catch issues early
- Fix failing tests immediately, don't accumulate technical debt
- Verify tests pass locally before committing
- Add regression tests for bugs to prevent recurrence

## Code Quality Standards

### General Principles
- Write self-documenting code with meaningful names
- Keep functions small and focused (single responsibility)
- Avoid premature optimization
- Prefer clarity over cleverness
- Don't repeat yourself (DRY) but avoid premature abstraction

### Error Handling
- Handle errors gracefully and provide clear messages
- Validate input at system boundaries
- Don't swallow exceptions silently
- Use appropriate error types for different scenarios

### Security
- Never commit secrets, API keys, or credentials
- Validate and sanitize all external input
- Follow security best practices for your tech stack
- Consider security implications of changes

## Documentation

### Code Documentation
- Document **why**, not **what** (code shows what)
- Update documentation when changing behavior
- Keep documentation close to the code it describes

### Architecture Documentation
- Document architectural decisions in `docs/architecture/`
- Include context, decision, and consequences (ADR format)
- Update architecture docs when making structural changes
- Explain trade-offs and alternatives considered

### API Documentation
- Document public interfaces and APIs in `docs/api/`
- Include usage examples
- Document expected inputs, outputs, and error cases

## Git Workflow

### Commits
- Write clear, descriptive commit messages
- Keep commits focused on a single logical change
- Commit message format: Brief summary, detailed explanation if needed
- Don't commit broken code or failing tests

### Before Committing
- [ ] All tests pass
- [ ] Code is clean and follows conventions
- [ ] No debug code, console logs, or commented-out code
- [ ] Documentation updated if needed

---

**Note**: Customize this file with project-specific details like build commands, test commands, and tech stack conventions as your project evolves.
