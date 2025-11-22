# Contributing to He Said / She Said

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inspiring community for all. We pledge to make participation in our project a harassment-free experience for everyone, regardless of:
- Age, body size, disability, ethnicity, gender identity and expression
- Level of experience, nationality, personal appearance, race, religion
- Sexual identity and orientation

### Our Standards
**Positive behaviors include:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what's best for the community
- Showing empathy towards others

**Unacceptable behaviors include:**
- Trolling, insulting/derogatory comments, personal or political attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

## How to Contribute

### Reporting Bugs

Before creating a bug report:
1. Check the issue tracker to avoid duplicates
2. Verify you're using the latest version
3. Try to reproduce the issue

When creating a bug report, include:
- **Title**: Clear and descriptive
- **Description**: Detailed explanation of the issue
- **Steps to Reproduce**: Step-by-step instructions
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Screenshots**: If applicable
- **Environment**: OS, browser, Node version, etc.
- **Additional Context**: Any other relevant information

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:
- **Clear title** describing the enhancement
- **Detailed description** of the proposed functionality
- **Use case**: Why this enhancement would be useful
- **Possible implementation**: If you have ideas
- **Alternatives**: Other solutions you've considered

### Pull Requests

#### Before Submitting
1. Check existing PRs to avoid duplicates
2. Create an issue first for significant changes
3. Fork the repository
4. Create a feature branch from `main`

#### Branch Naming
Use descriptive branch names:
- `feature/add-voice-input`
- `fix/translation-timeout`
- `docs/update-readme`
- `refactor/simplify-auth`

#### Making Changes
1. **Write clear commit messages**
   ```
   feat: add voice input feature
   
   - Implement voice recording
   - Add speech-to-text conversion
   - Update UI with microphone button
   ```

2. **Follow the style guide**
   - Use TypeScript for all new code
   - Follow existing code patterns
   - Use meaningful variable names
   - Add comments for complex logic

3. **Add tests** (when test infrastructure exists)
   - Unit tests for new functions
   - Integration tests for features
   - E2E tests for user flows

4. **Update documentation**
   - Update README if needed
   - Add JSDoc comments
   - Update relevant docs in /docs

5. **Run quality checks**
   ```bash
   npm run lint
   npm run build
   npm run test  # when tests exist
   ```

#### Pull Request Process
1. **Create the PR**
   - Use a clear, descriptive title
   - Reference related issues
   - Provide detailed description of changes
   - Add screenshots for UI changes

2. **PR Description Template**
   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update
   
   ## Related Issues
   Fixes #123
   
   ## Changes Made
   - List of changes
   - Another change
   
   ## Testing
   How to test these changes
   
   ## Screenshots (if applicable)
   
   ## Checklist
   - [ ] My code follows the style guidelines
   - [ ] I have performed a self-review
   - [ ] I have commented my code where needed
   - [ ] I have updated the documentation
   - [ ] My changes generate no new warnings
   - [ ] I have added tests that prove my fix/feature works
   - [ ] New and existing tests pass locally
   ```

3. **Review Process**
   - Respond to review comments
   - Make requested changes
   - Keep the PR updated with main branch

4. **After Approval**
   - Squash commits if requested
   - Ensure CI passes
   - Wait for maintainer to merge

## Development Setup

### Prerequisites
```bash
Node.js 18+
npm or yarn
Git
```

### Local Development
```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/hesaidshesaidapp.git
cd hesaidshesaidapp

# Add upstream remote
git remote add upstream https://github.com/smffff/hesaidshesaidapp.git

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Run development server
npm run dev
```

### Keeping Your Fork Updated
```bash
# Fetch upstream changes
git fetch upstream

# Merge upstream main into your local main
git checkout main
git merge upstream/main

# Push to your fork
git push origin main
```

## Style Guide

### TypeScript
- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type
- Use optional chaining where appropriate
- Prefer `const` over `let`

### React
- Use functional components
- Use hooks appropriately
- Keep components small and focused
- Extract reusable logic to hooks
- Use proper prop typing

### Naming Conventions
- **Components**: PascalCase (`AuthForm`, `TranslatorForm`)
- **Files**: PascalCase for components, camelCase for utilities
- **Functions**: camelCase (`handleSubmit`, `translateMessage`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Interfaces/Types**: PascalCase (`TranslationResponse`)

### File Organization
```
src/
├── app/              # Next.js pages and API routes
├── components/       # React components
│   ├── ui/          # Reusable UI components
│   ├── auth/        # Auth-related components
│   └── translator/  # Translation feature components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and configs
├── store/           # State management
└── types/           # TypeScript type definitions
```

### CSS/Styling
- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Keep styles colocated with components
- Use semantic class names
- Ensure accessibility (focus states, ARIA labels)

### Git Commit Messages
Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```
feat: add voice input support
fix: resolve translation timeout issue
docs: update deployment guide
refactor: simplify authentication flow
```

## Testing Guidelines

### Unit Tests
- Test individual functions in isolation
- Mock external dependencies
- Aim for high code coverage
- Test edge cases

### Integration Tests
- Test feature workflows
- Test API endpoints
- Test database operations
- Test authentication flows

### E2E Tests
- Test complete user journeys
- Test critical paths
- Test responsive design
- Test accessibility

## Documentation

### Code Documentation
- Add JSDoc comments for functions
- Explain complex logic
- Document parameters and return types
- Include usage examples

### README Updates
- Keep installation instructions current
- Update feature list
- Add new screenshots
- Update API documentation

### Creating Documentation
- Use clear, concise language
- Include code examples
- Add screenshots/diagrams
- Provide context and motivation

## Community

### Communication Channels
- **GitHub Issues**: Bug reports, feature requests
- **Pull Requests**: Code contributions
- **Discussions**: General questions and ideas

### Getting Help
- Search existing issues and docs first
- Provide context and details
- Be patient and respectful
- Follow up on responses

### Recognition
Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Acknowledged in project README

## License

By contributing, you agree that your contributions will be licensed under the same MIT License that covers the project.

## Questions?

Don't hesitate to ask questions by:
- Opening a GitHub issue
- Starting a discussion
- Reaching out to maintainers

Thank you for contributing to He Said / She Said! 💜
