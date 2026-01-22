# Sistemas Documentation

## Overview

This directory contains comprehensive technical documentation for the Sistemas application. All guides follow a consistent structure with code examples, best practices, and verification checklists.

---

## 📚 Available Guides

### Layout & Design
- **[LAYOUT_GUIDE.md](./LAYOUT_GUIDE.md)** - Complete layout system documentation
  - Bootstrap 4 container alignment
  - Responsive breakpoints (960px/1140px)
  - Component-by-component breakdown
  - Testing and verification procedures

---

## 🎯 Documentation Standards

### Structure
Each guide should include:
1. **Overview** - High-level summary
2. **Problem statement** - What issue does this solve?
3. **Implementation details** - Code examples with explanations
4. **Testing procedures** - How to verify correctness
5. **Common pitfalls** - What to avoid
6. **Best practices** - Recommended patterns
7. **Reference links** - External resources

### Code Examples
- Use syntax highlighting (tsx, css, javascript)
- Include both "before" and "after" examples
- Add inline comments for clarity
- Show complete, copy-paste-ready snippets

### Visual Aids
- Use tables for comparison (e.g., breakpoint tables)
- Include checklists for verification steps
- Use emojis sparingly for section markers
- Add ASCII diagrams for complex concepts

---

## 📝 Contributing to Documentation

### Adding a New Guide
1. Create a new `.md` file in this directory
2. Follow the naming convention: `TOPIC_GUIDE.md` (uppercase)
3. Use the structure template above
4. Add entry to this index file
5. Link from `../AGENTS.md` if it's a major topic
6. Create or update session in `../REFACTORING_LOG.md`

### Updating Existing Guides
1. Make changes to the relevant guide
2. Update "Last Updated" date if present
3. Add changelog entry if significant changes
4. Notify in `../REFACTORING_LOG.md` if affects code

---

## 🔮 Future Documentation Needs

### High Priority
- [ ] `ARCHITECTURE_GUIDE.md` - Component structure, data flow, state management
- [ ] `API_INTEGRATION.md` - Gemini API patterns, error handling, retry logic
- [ ] `EXCALIDRAW_GUIDE.md` - Canvas integration, snapshot syncing, JSON schema

### Medium Priority
- [ ] `TESTING_GUIDE.md` - Unit tests, integration tests, visual regression
- [ ] `DEPLOYMENT_GUIDE.md` - Build process, environment variables, hosting
- [ ] `PERFORMANCE_GUIDE.md` - Bundle size, lazy loading, optimization

### Low Priority
- [ ] `ACCESSIBILITY_GUIDE.md` - ARIA labels, keyboard navigation, screen readers
- [ ] `INTERNATIONALIZATION_GUIDE.md` - Multi-language support (if needed)
- [ ] `ANALYTICS_GUIDE.md` - User tracking, conversion funnels, metrics

---

## 📖 Related Documentation

### Main Website
- `../website/docs/` - Website documentation (Bootstrap 4, Elm, multi-page routing)
- `../website/AGENTS.md` - Website architecture summary
- `../website/REFACTORING_LOG.md` - Website refactoring history

### Root Level
- `../AGENTS.md` - Sistemas architecture summary (start here!)
- `../REFACTORING_LOG.md` - Sistemas refactoring history
- `../README.md` - Project overview and getting started

---

## 🆘 Getting Help

If you're looking for specific information:

1. **Start with [`../AGENTS.md`](../AGENTS.md)** - High-level architecture and navigation
2. **Check this index** - Find the relevant guide
3. **Search the guide** - Use Ctrl+F/Cmd+F for keywords
4. **Check [`../REFACTORING_LOG.md`](../REFACTORING_LOG.md)** - Historical context and lessons learned
5. **Check the code** - Components are well-commented

---

**Last Updated:** January 22, 2026  
**Documentation Version:** 1.0
