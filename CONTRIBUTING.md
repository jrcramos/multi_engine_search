# Contributing to Multi-Engine Search Pro

Thank you for your interest in contributing to Multi-Engine Search Pro! This document provides guidelines for contributing to the project.

## 🚀 Getting Started

### Prerequisites
- Basic knowledge of JavaScript, HTML, and CSS
- Understanding of Chrome Extension development
- Familiarity with Git and GitHub

### Development Setup
1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/multi_engine_search.git
   cd multi_engine_search
   ```
3. Load the extension in Chrome Developer Mode (see README.md)

## 📝 How to Contribute

### Reporting Bugs
When reporting bugs, please include:
- Chrome version and operating system
- Steps to reproduce the issue
- Expected behavior vs actual behavior
- Screenshots if applicable
- Console error messages (if any)

### Suggesting Features
For feature requests, please provide:
- Clear description of the feature
- Use cases and benefits
- Mockups or examples (if applicable)
- Consider backward compatibility

### Adding New Search Engines

To add a new search engine:

1. **Research the Engine**
   - Verify the search URL format
   - Test that searches work correctly
   - Check if the engine allows automated queries

2. **Update `popup.js`**
   ```javascript
   // Add to SEARCH_ENGINES object
   newengine: {
     name: 'New Engine Name',
     url: 'https://example.com/search?q={query}'
   }
   ```

3. **Update `popup.html`**
   ```html
   <!-- Add to appropriate category -->
   <div class="engine-item">
     <input type="checkbox" id="newengine" value="newengine">
     <label for="newengine">New Engine Name</label>
   </div>
   ```

4. **Test Thoroughly**
   - Verify searches work correctly
   - Test special characters in queries
   - Ensure proper category placement

### Code Style Guidelines

#### JavaScript
- Use `const` and `let` instead of `var`
- Use meaningful variable and function names
- Add comments for complex logic
- Follow existing code structure and patterns

#### HTML
- Use semantic HTML elements
- Maintain consistent indentation (2 spaces)
- Include proper accessibility attributes
- Follow existing naming conventions

#### CSS
- Use consistent class naming
- Group related styles together
- Comment complex CSS rules
- Maintain responsive design principles

## 🔄 Pull Request Process

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Follow coding standards
   - Add tests if applicable
   - Update documentation

3. **Test Your Changes**
   - Load extension in Chrome
   - Test all affected functionality
   - Verify no regressions

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add support for NewEngine search"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a Pull Request on GitHub

### Commit Message Format
Use conventional commit messages:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests

## 🧪 Testing

### Manual Testing Checklist
- [ ] Extension loads without errors
- [ ] All search engines work correctly
- [ ] UI elements respond properly
- [ ] Keyboard shortcuts function
- [ ] Data persistence works
- [ ] Error handling works

### Testing New Search Engines
- [ ] Basic search functionality
- [ ] Special characters (spaces, symbols)
- [ ] International characters
- [ ] Empty query handling
- [ ] Long query handling

## 📋 Project Roadmap

### Current Priorities
1. Chrome Web Store publication
2. Firefox extension support
3. Additional search engines
4. Advanced filtering options
5. Search history features

### Planned Features
- [ ] Search result preview
- [ ] Custom engine management
- [ ] Bulk search export
- [ ] Search analytics
- [ ] Theme customization

## 🤝 Community Guidelines

### Code of Conduct
- Be respectful and inclusive
- Focus on constructive feedback
- Help newcomers learn
- Keep discussions on-topic

### Communication
- Use GitHub Issues for bug reports and feature requests
- Use GitHub Discussions for general questions
- Be patient with response times
- Provide detailed information when asking for help

## 📚 Resources

### Chrome Extension Development
- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Migration Guide](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [Extension APIs](https://developer.chrome.com/docs/extensions/reference/)

### Web Technologies
- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript.info](https://javascript.info/)
- [Can I Use](https://caniuse.com/)

## 🏆 Recognition

Contributors will be:
- Listed in the README.md acknowledgments
- Credited in commit history
- Mentioned in release notes (for significant contributions)

Thank you for contributing to Multi-Engine Search Pro! 🎉