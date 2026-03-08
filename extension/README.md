# CommitCraft AI — AI Git Commit Message Generator

> **Stop writing commit messages by hand.** CommitCraft AI reads your staged git diff and generates perfect commit messages in one click — powered by Claude AI.

[![Version](https://img.shields.io/badge/version-0.1.0-blue)](https://marketplace.visualstudio.com/items?itemName=CommitCraftAI.commitcraft-ai)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/CommitCraftAI.commitcraft-ai)](https://marketplace.visualstudio.com/items?itemName=CommitCraftAI.commitcraft-ai)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/CommitCraftAI.commitcraft-ai)](https://marketplace.visualstudio.com/items?itemName=CommitCraftAI.commitcraft-ai)

---

## ⚡ What it does

You make code changes → stage them → click **one button** → get a perfect commit message.

**Before CommitCraft:**
```
git commit -m "fix stuff"
git commit -m "updates"
git commit -m "wip"
```

**After CommitCraft:**
```
feat(auth): add Google OAuth2 login with session persistence
fix(api): resolve race condition in concurrent request handler
docs(readme): update installation instructions for Windows
```

---

## 🚀 Quick Start

1. Install the extension
2. Open Command Palette (`Ctrl+Shift+P`) → **CommitCraft: Sign In**
3. Enter your email → get your free API key
4. Stage your changes → click **✨** in Source Control

**That's it.** You're generating professional commit messages.

---

## ✨ Features

### 🎯 One-Click Commit Messages
Press `Ctrl+Shift+G Ctrl+Shift+M` or click the **✨ button** in the Source Control panel. CommitCraft reads your entire staged diff and generates a contextually accurate commit message.

### 📋 Three Generation Types

| Type | What it generates |
|------|------------------|
| **Commit Message** | Title + bullet points from staged diff |
| **PR Description** | Full pull request description with summary, changes, testing |
| **Changelog Entry** | CHANGELOG.md entry for your release |

### 🎨 Three Commit Styles

| Style | Example |
|-------|---------|
| **Conventional** (default) | `feat(scope): description` |
| **GitMoji** | `✨ Add new feature` |
| **Simple** | `Add new feature` |

### 🔄 Edit Before Committing
Review the generated message in the panel, edit it if needed, then click **Accept** to fill your SCM input box.

---

## 📦 Installation

1. Open VS Code
2. Press `Ctrl+Shift+X` to open Extensions
3. Search for **"CommitCraft"**
4. Click **Install**

Or install directly: [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=CommitCraftAI.commitcraft-ai)

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+G Ctrl+Shift+M` | Generate commit message |
| Mac: `Cmd+Shift+G Cmd+Shift+M` | Generate commit message |

---

## 💰 Pricing

| Plan | Price | Generations |
|------|-------|-------------|
| **Free** | $0/month | 20/month |
| **Pro** | $4.99/month | Unlimited |

No credit card required to start. [Upgrade to Pro →](https://commitcraft.ai/upgrade)

---

## ⚙️ Settings

| Setting | Options | Default |
|---------|---------|---------|
| `commitcraft.commitStyle` | `conventional`, `gitmoji`, `simple` | `conventional` |
| `commitcraft.includeBody` | `true`, `false` | `true` |

---

## 🔒 Privacy

- Only your **git diff** is sent to our API
- **No source code is stored**
- No logging of your changes or history

---

## 📋 Commands

| Command | Description |
|---------|-------------|
| `CommitCraft: Generate Commit Message` | Generate from staged diff |
| `CommitCraft: Generate PR Description` | Generate PR description |
| `CommitCraft: Generate Changelog Entry` | Generate changelog entry |
| `CommitCraft: Sign In` | Sign in with email |
| `CommitCraft: Sign Out` | Sign out |
| `CommitCraft: Show Usage & Quota` | Check remaining free generations |
| `CommitCraft: Upgrade to Pro` | Get unlimited generations |

---

## 🆚 Why CommitCraft over GitHub Copilot?

| Feature | CommitCraft | Copilot |
|---------|-------------|---------|
| Focused on commits | ✅ Specialized | ❌ General purpose |
| PR descriptions | ✅ Full template | ❌ Basic |
| Changelog entries | ✅ Yes | ❌ No |
| Free tier | ✅ 20/month | ❌ Limited |
| Works without subscription | ✅ Yes | ❌ Requires GitHub |

---

## ❓ FAQ

**Does it work with any programming language?**
Yes. CommitCraft reads git diffs which are language-agnostic.

**What if I don't like the generated message?**
Click **Regenerate** for a new suggestion, or edit it directly in the panel.

**Does it work offline?**
No — it requires an internet connection to call the AI API.

**How do I cancel Pro?**
Email support@commitcraft.ai or manage at [commitcraft.ai/dashboard](https://commitcraft.ai/dashboard).

---

## 📞 Support

- 🌐 Website: [commitcraft.ai](https://commitcraft.ai)
- 📧 Email: support@commitcraft.ai
- 🐛 Issues: [GitHub Issues](https://github.com/commitcraftai/commitcraft-vscode/issues)

---

## 📝 Release Notes

### 0.1.0
- Initial release
- Commit message generation from git diff
- PR description generation
- Changelog entry generation
- Conventional Commits, GitMoji, and Simple styles
- Freemium model: 20 free generations/month

---

*Made with ❤️ for developers who care about clean git history*
