---
title: CommitCraft AI: Stop Writing "Fix Stuff" Commits — Auto-Generate Professional Git Messages in VS Code
published: true
description: Stop writing bad git commits. I built a VS Code extension that reads your code diff and generates perfect conventional commit messages using AI. Free tier included.
tags: vscode, git, productivity, ai, aitools, devtools, github
cover_image:
---

Let me tell you about a crime I committed every single day for years. Not one crime — hundreds. They're all sitting in my git history, plain as day:

```
fix stuff
wip
asdfgh
ok NOW it works
please just work
final final FINAL fix
```

I'm not proud of it. But if you've shipped code under deadline pressure, pulled an all-nighter debugging a race condition, or just wanted to push before a meeting — you know exactly what I'm talking about. The commit message field is right there, staring at you, and somehow "fix bug" makes it out the door.

The problem is that I always told myself I'd go back and clean it up. Spoiler: I never did. And six months later, `git log` becomes an archaeological dig through abstract expressionism instead of actual software history.

So I built [CommitCraft AI](https://marketplace.visualstudio.com/items?itemName=CommitCraftAI.commitcraft-ai) to fix this — a VS Code extension that generates professional commit messages in one click.

**➡️ [Install CommitCraft AI free — VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=CommitCraftAI.commitcraft-ai)**

Or install directly from VS Code terminal:
```bash
code --install-extension CommitCraftAI.commitcraft-ai
```

---

## Why bad commit messages actually hurt you

Here's the thing nobody tells you when you're starting out: commit messages are not for the computer. Git doesn't care what you write. The message is for **future you** — and future you is always confused, always under pressure, and always trying to figure out why past you thought this change was a good idea.

Bad commit messages create a cascade of problems:

**You can't understand your own code.** Six months later you're staring at a weird conditional and running `git blame` to understand why it's there. The answer? `"misc fixes"`. Thanks, past me. Super helpful.

**Code reviews get harder.** Reviewers have to read every line of your diff to understand what you were trying to accomplish. A good commit message like `feat(auth): add refresh token rotation with 15min expiry` tells the whole story before anyone opens a file.

**Changelogs become impossible.** If you've ever tried to write release notes by combing through 200 commits, half of which say "update" or "tweak", you know this pain. It's hours of detective work that should be seconds of copy-paste.

**git bisect becomes a nightmare.** Trying to find when a bug was introduced by bisecting through commits with no meaningful messages is like searching a library where every book is titled "Book".

The fix is obvious: write better commit messages. The execution is where it falls apart — because nobody wants to stop mid-flow and craft a perfectly structured conventional commit when they're in the zone.

---

## So I built something

Here's how CommitCraft AI works: you stage your changes like normal, then click one button. The extension reads your diff, sends it to Claude AI (using the Haiku model — fast and accurate for structured output), and gets back a properly formatted commit message. You review it, tweak if needed, and commit.

That's it. No prompt engineering. No copy-pasting diffs into ChatGPT. Just a button.

**Before CommitCraft:**
```
git commit -m "fix login"
```

**After CommitCraft:**
```
fix(auth): resolve token expiration not being cleared on logout

Ensures the cached auth token is properly invalidated when a user
logs out, preventing stale token errors on subsequent login attempts.
```

The extension supports three commit styles:

- **Conventional Commits** — `feat:`, `fix:`, `chore:`, `refactor:` Great for teams using semantic versioning.
- **GitMoji** — ✨ for features, 🐛 for bugs, you know the drill.
- **Simple** — Plain English, no prefix conventions. Good for personal projects.

Beyond commits, it also generates **PR descriptions** and **changelog entries** from your diff. The changelog one alone has saved me hours per release.

---

## Getting started (30 seconds)

**1. Install from VS Code marketplace**

Search "CommitCraft" in the Extensions panel, or:

**[→ Install CommitCraft AI](https://marketplace.visualstudio.com/items?itemName=CommitCraftAI.commitcraft-ai)**

**2. Sign in with your email**

First launch, hit `Ctrl+Shift+P` → `CommitCraft: Sign In`. Enter your email and you're instantly signed in — no credit card, no OAuth dance, no waiting for an email.

**3. Stage your changes**

Same as always. `git add .` or use the Source Control panel checkboxes.

**4. Click the ✨ button**

There's a new sparkle button in the Source Control toolbar. Click it. Done.

**5. Accept, edit, or regenerate**

The message appears in a panel. Accept it, edit it, or hit regenerate for a different take. Click Accept and it fills your commit box automatically.

---

## What it actually generates

Here are real examples from my own projects:

**A React component change:**
```
feat(UserCard): add skeleton loading state during data fetch

Replaces blank div with animated skeleton placeholder while user
profile data is loading, improving perceived performance on slow
connections.
```

**A bug fix:**
```
fix(api): handle null response from /users endpoint gracefully

Adds null check before accessing response.data.user to prevent
TypeError crash when the endpoint returns 204 No Content during
account deletion flow.
```

**A documentation update:**
```
docs(README): update installation steps for v2.x breaking changes

Removes deprecated --legacy flag from install command and adds note
about required Node 18+ for the new ESM build output.
```

**A refactor:**
```
refactor(db): extract connection pooling logic into separate module

Moves pool initialization and teardown from server.js into db/pool.js
to improve testability and reduce startup time coupling.
```

None of those are messages I would have written under normal commit-and-push pressure. The AI catches context I'd gloss over and phrases it in a way that'll actually make sense in six months.

**👉 [Try it yourself — Install free from VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=CommitCraftAI.commitcraft-ai)**

---

## Pricing

| Plan | Price | Generations |
|------|-------|-------------|
| **Free** | $0/month | 20/month |
| **Pro** | $4.99/month | Unlimited |

20 free/month is plenty to try it out. If you commit meaningful units of work (as you should), you're probably not making 20+ distinct commits every month on personal projects. Power users on multiple codebases will want Pro — it's less than a coffee.

---

## Final thoughts

Future-you will thank you for the commit messages. Past-you already had plenty of chances and blew it.

**[→ Install CommitCraft AI free — VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=CommitCraftAI.commitcraft-ai)**

Source code is on GitHub if you want to see how it works, report an issue, or leave a ⭐ if it saves you time:
**[github.com/Mohammad2460/commitcraft-vscode](https://github.com/Mohammad2460/commitcraft-vscode)**

---

**Drop your best AI-generated commit message in the comments below 👇** — curious what kinds of diffs people throw at it.
