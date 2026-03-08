---
title: I got tired of writing "fix stuff" as my commit message, so I built this VS Code extension
published: false
description: Stop writing bad git commits. I built a VS Code extension that reads your code diff and generates perfect conventional commit messages using AI.
tags: vscode, git, productivity, ai
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

## Why bad commit messages actually hurt you

Here's the thing nobody tells you when you're starting out: commit messages are not for the computer. Git doesn't care what you write. The message is for **future you** — and future you is always confused, always under pressure, and always trying to figure out why past you thought this change was a good idea.

Bad commit messages create a cascade of problems:

**You can't understand your own code.** Six months later you're staring at a weird conditional and running `git blame` to understand why it's there. The answer? `"misc fixes"`. Thanks, past me. Super helpful.

**Code reviews get harder.** Reviewers have to read every line of your diff to understand what you were trying to accomplish. A good commit message like `feat(auth): add refresh token rotation with 15min expiry` tells the whole story before anyone opens a file.

**Changelogs become impossible.** If you've ever tried to write release notes by combing through 200 commits, half of which say "update" or "tweak", you know this pain. It's hours of detective work that should be seconds of copy-paste.

**git bisect becomes a nightmare.** Trying to find when a bug was introduced by bisecting through commits with no meaningful messages is like searching a library where every book is titled "Book".

The fix is obvious: write better commit messages. The execution is where it falls apart — because nobody wants to stop mid-flow and craft a perfectly structured conventional commit when they're in the zone.

## So I built something

I spent a weekend building [CommitCraft AI](https://marketplace.visualstudio.com/items?itemName=CommitCraftAI.commitcraft-ai) — a VS Code extension that does the boring part for you.

Here's how it works: you stage your changes like normal, then click a button. The extension reads your diff, sends it to Claude AI (using the Haiku model, which is fast and accurate for this kind of structured output), and gets back a properly formatted commit message. You review it, tweak if needed, and commit.

That's it. No prompt engineering. No copy-pasting diffs into ChatGPT. Just a button that does the one tedious thing you've been procrastinating on.

**Before:**
```
git commit -m "fix login"
```

**After:**
```
fix(auth): resolve token expiration not being cleared on logout

Ensures the cached auth token is properly invalidated when a user
logs out, preventing stale token errors on subsequent login attempts.
```

The extension supports three commit styles you can switch between:

- **Conventional Commits** — `feat:`, `fix:`, `chore:`, `refactor:`, etc. Great for teams using semantic versioning.
- **GitMoji** — For the emoji-commit crowd. ✨ for features, 🐛 for bugs, you know the drill.
- **Simple** — Plain English, no prefix conventions. Good for personal projects.

Beyond individual commits, it also generates PR descriptions and changelog entries from your commit history. That last one alone has saved me probably two hours per release.

## Getting started

**1. Install from the VS Code marketplace**

Search "CommitCraft" in the Extensions panel, or go directly to the [marketplace page](https://marketplace.visualstudio.com/items?itemName=CommitCraftAI.commitcraft-ai). One click install.

**2. Sign in with your email**

First launch, you'll get a prompt to create a free account. Just an email — no credit card, no OAuth dance.

**3. Stage your changes**

Same as always. `git add .` or use the Source Control panel checkboxes. CommitCraft reads whatever is staged.

**4. Click the ✨ button**

In the Source Control panel, there's a new button at the top. Click it. The extension analyzes your diff and generates the message in a couple seconds.

**5. Accept, edit, or regenerate**

The generated message drops into the commit input field. You can accept it as-is, edit it, or hit the button again for a different take. Then commit normally.

## What it actually generates

Here are real examples from my own projects — not cherry-picked, just a few recent ones:

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

## It's free to start

The free tier gives you 20 generations per month, which is plenty to try it out and see if it fits your workflow. If you hit the limit and want more, Pro is $4.99/month — less than a coffee.

Honestly, 20/month is enough for a lot of developers. If you're only committing meaningful units of work (as you should), you're probably not making 20+ distinct commits every month on personal projects. Power users working on multiple codebases will want Pro.

## Try it out

If this sounds useful, give it a try:

**Install:** [marketplace.visualstudio.com/items?itemName=CommitCraftAI.commitcraft-ai](https://marketplace.visualstudio.com/items?itemName=CommitCraftAI.commitcraft-ai)

**Source code:** [github.com/Mohammad2460/commitcraft-vscode](https://github.com/Mohammad2460/commitcraft-vscode)

The source is on GitHub if you want to see how it works under the hood, report an issue, or just leave a star if it saves you time. I built this to scratch my own itch, and I'm actively using it daily — feedback genuinely shapes where it goes next.

Future-you will thank you for the commit messages. Past-you already had plenty of chances and blew it.
