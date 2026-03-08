# CommitCraft AI — Launch Copy

---

## 1. PRODUCT HUNT LISTING

### Tagline (60 chars max)
```
AI commit messages from your staged diff — in VS Code
```
*(54 characters)*

### Description (260 chars max)
```
CommitCraft AI reads your staged git diff and generates commit messages, PR descriptions, and changelogs using Claude AI. Supports Conventional Commits, GitMoji, and Simple styles. Free tier: 20 generations/month. Pro: $4.99/month.
```
*(232 characters)*

### First Comment (Maker's Comment)

Hey Product Hunt! I'm Mohammad, the developer behind CommitCraft AI.

I built this because I found myself spending real time every day writing commit messages — and most of them were either too vague ("fix stuff") or so verbose I was thinking about phrasing instead of code. I wanted something that just reads what I actually changed and writes a decent message, without me switching context.

CommitCraft AI integrates directly into VS Code's source control panel. It calls VS Code's built-in Git API to read your staged diff, sends it to a backend powered by Claude AI, and returns a commit message in whatever style you prefer — Conventional Commits (feat/fix/chore), GitMoji, or plain Simple format. It also handles PR descriptions and changelog entries with the same workflow. There's no copy-pasting, no terminal switching, and no prompt engineering on your end.

What makes it a bit different from other commit-message tools: it uses the actual staged diff as context, not just file names or summary stats. It also reads your current branch name as a hint. The result is usually specific enough to be useful without being embarrassing in a code review.

Free tier is 20 generations per month — enough to evaluate whether it actually helps your workflow. Pro is $4.99/month for unlimited. No lock-in, cancel anytime.

Install from the VS Code Marketplace: https://marketplace.visualstudio.com/items?itemName=CommitCraftAI.commitcraft-ai

I'd genuinely appreciate feedback — especially if the generated messages are missing context you'd expect, or if the style options don't match how your team works. That's the part I'm actively trying to improve.

### Topics to Select (5)
1. Developer Tools
2. Artificial Intelligence
3. Productivity
4. Open Source
5. GitHub

---

## 2. HACKER NEWS SHOW HN

### Title (must start with "Show HN:", under 80 chars)
```
Show HN: CommitCraft AI – VS Code extension that writes commit messages from diffs
```
*(83 characters — trim if needed:)*
```
Show HN: VS Code extension that generates commit messages from staged diffs
```
*(75 characters)*

### First Comment (post immediately after submitting)

I built this after getting tired of the gap between "I know exactly what this change does" and "I know how to write that clearly in 72 characters."

Technically, it hooks into VS Code's built-in Git extension API (the same one the Source Control panel uses), reads the staged diff directly from the index, and sends it along with the current branch name to a backend that calls Claude. The branch name turns out to be a useful hint — a branch called `fix/auth-token-expiry` tells the model something the diff alone might not.

The result gets dropped back into VS Code's commit input box, so the flow is: stage changes, click a button, review the message, commit. Nothing leaves your usual workflow.

A few things I'm uncertain about and would like feedback on:

- Diff size handling: right now I truncate very large diffs before sending. There's a real question about whether summarizing large diffs produces worse commit messages than just refusing to process them.
- Style fidelity: the Conventional Commits output is usually correct on type (feat/fix/refactor) but the scope detection is guesswork based on changed file paths. If your project has non-obvious scopes, it probably gets them wrong.
- Privacy model: the diff is sent to my backend, which forwards to Anthropic's API. I don't store diffs. Some teams won't be comfortable with that and I understand why — a local model option is something I'm thinking about.

Free tier is 20 generations/month. Pro is $4.99/month. Source for the extension is on GitHub: https://github.com/Mohammad2460/commitcraft-vscode

Marketplace: https://marketplace.visualstudio.com/items?itemName=CommitCraftAI.commitcraft-ai

Happy to answer questions about the implementation or the design decisions.

---

## 3. TWITTER/X THREAD

### Tweet 1 — Hook (the problem)
```
Every day I write code for hours and then spend 3 minutes staring at the commit message box.

"fix stuff" is not a commit message.
"refactor authentication token refresh logic to handle edge cases in concurrent requests" took me longer to write than the actual fix.

There has to be a better way.
```

### Tweet 2 — The solution (show example commit)
```
So I built CommitCraft AI.

You stage your changes. You click one button. It reads your actual diff and generates:

feat(auth): handle token refresh race condition in concurrent requests

- Add mutex lock around refresh logic
- Return cached token if refresh already in progress
- Add test for concurrent refresh scenario

That's from a real diff. No prompt engineering. No copy-paste.
```

### Tweet 3 — How it works technically
```
Under the hood:

→ Hooks into VS Code's built-in Git API to read your staged index diff
→ Sends the diff + branch name to a backend powered by Claude AI
→ Supports Conventional Commits, GitMoji, or Simple style
→ Also generates PR descriptions and changelogs from the same diff

The branch name matters — "fix/auth-token-expiry" gives useful context the diff alone doesn't.
```

### Tweet 4 — Free tier + install link
```
Free tier: 20 generations/month (enough to know if it actually helps your workflow)
Pro: $4.99/month for unlimited

Works with any language, any repo. No config required.

Install from the VS Code Marketplace:
https://marketplace.visualstudio.com/items?itemName=CommitCraftAI.commitcraft-ai
```

### Tweet 5 — Call to action
```
If you've ever written "WIP" or "updates" as a commit message and moved on, give it a try.

GitHub: https://github.com/Mohammad2460/commitcraft-vscode

What would make this actually useful for your team? Genuinely open to feedback.
```

---

## 4. LINKEDIN POST

I shipped a VS Code extension this week: CommitCraft AI.

It reads your staged git diff and generates commit messages using Claude AI — Conventional Commits, GitMoji, or Simple style. It also handles PR descriptions and changelog entries from the same diff.

The workflow: stage your changes, click a button in the Source Control panel, review the message, commit. That's it.

Free tier is 20 generations/month. Pro is $4.99/month.

Built it to solve a real problem in my own workflow — writing commit messages is the kind of task that's easy enough to do badly and tedious enough that you usually do. Interested to hear if others find it useful.

Install: https://marketplace.visualstudio.com/items?itemName=CommitCraftAI.commitcraft-ai

GitHub: https://github.com/Mohammad2460/commitcraft-vscode

---

## 5. EMAIL TO DEVELOPER NEWSLETTERS

### Subject Line
```
Tool: AI-generated commit messages from staged diffs, inside VS Code
```

### 100-Word Pitch

CommitCraft AI is a VS Code extension that generates git commit messages by reading your staged diff via VS Code's Git API and sending it to Claude AI. It supports Conventional Commits, GitMoji, and Simple styles, and also generates PR descriptions and changelog entries. The branch name is included as context, which meaningfully improves output for fix/* and feature/* branches.

Free tier: 20 generations/month. Pro: $4.99/month.

Marketplace: https://marketplace.visualstudio.com/items?itemName=CommitCraftAI.commitcraft-ai
GitHub: https://github.com/Mohammad2460/commitcraft-vscode

Relevant for readers who work with VS Code and want to reduce the overhead of writing structured commit history.

---

*All links:*
- *Marketplace: https://marketplace.visualstudio.com/items?itemName=CommitCraftAI.commitcraft-ai*
- *GitHub: https://github.com/Mohammad2460/commitcraft-vscode*
- *Upgrade/Pro: https://commitcraft.ai/upgrade*
