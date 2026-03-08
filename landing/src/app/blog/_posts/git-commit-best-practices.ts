import type { BlogPost } from './index'

export const post: BlogPost = {
  slug: 'git-commit-best-practices',
  title: 'Git Commit Best Practices: A Practical Checklist for Developers and Teams',
  description: 'A practical, opinionated checklist of git commit best practices that actually improve code review speed and team velocity. Real examples, no fluff.',
  publishedAt: 'March 8, 2025',
  readTime: '7 min read',
  keywords: ['git commit best practices', 'commit message best practices', 'git workflow best practices', 'git tips', 'better commits'],
  content: [
    {
      type: 'p',
      content: 'Most articles about git commit practices spend too long on theory and not enough on the specifics. This one is a checklist — ranked by impact, with before/after examples and the reasoning behind each rule. Read it once, save the checklist, refer back to it.',
    },
    {
      type: 'h2',
      content: 'The Non-Negotiables',
    },
    {
      type: 'p',
      content: 'These three practices have the highest return on investment. If your team does nothing else, do these.',
    },
    {
      type: 'h3',
      content: '1. One logical change per commit',
    },
    {
      type: 'p',
      content: 'This is the most important practice in the entire list. A commit should contain exactly one related set of changes. The test: if your commit message needs the word "and" to describe what changed, you probably have two commits worth of work bundled together.',
    },
    {
      type: 'p',
      content: 'Why it matters: atomic commits make git bisect effective (you can pinpoint exactly when a bug was introduced), make reverts safe (you can revert one change without undoing unrelated work), and make code review coherent (the reviewer can evaluate one idea at a time).',
    },
    {
      type: 'code',
      content: `# Bad: two unrelated changes in one commit
fix(api): handle rate limiting AND update logging dependencies

# Good: separate commits for separate concerns
fix(api): handle rate limiting with exponential backoff
chore(deps): upgrade pino logger to 8.15.0`,
    },
    {
      type: 'h3',
      content: '2. Write in the imperative mood',
    },
    {
      type: 'p',
      content: 'Write "Add login page" not "Added login page" or "Adding login page". This convention comes from git\'s own commit messages and reads naturally when completing the phrase: "If applied, this commit will..."',
    },
    {
      type: 'p',
      content: 'The practical benefit is not just consistency — imperative mood tends to force more precise descriptions because it requires a verb that describes action. "Fixed" is vague past tense. "Fix null pointer in UserService when profile image is absent" is imperative and specific.',
    },
    {
      type: 'code',
      content: `# Imperative — correct
Add user authentication with JWT
Fix null pointer in payment flow for guest users
Remove deprecated /v1/users endpoint
Refactor session middleware to use Redis

# Past tense — incorrect
Added user authentication with JWT
Fixed null pointer in payment flow
Removed deprecated endpoint`,
    },
    {
      type: 'h3',
      content: '3. Keep the subject line under 72 characters',
    },
    {
      type: 'p',
      content: 'GitHub truncates commit subjects at 72 characters in the commit list. Many terminal-based git tools truncate at 50. The subject line is the headline — it should be a complete, meaningful sentence within those limits.',
    },
    {
      type: 'p',
      content: 'A useful heuristic: if you can\'t describe the change in 72 characters, the commit is probably too large. Either break it into smaller commits, or use the commit body to add the extra detail.',
    },
    {
      type: 'callout',
      content: 'The 72-character limit applies to the subject line only. The body can be as long as needed — wrap lines at 72 characters there for terminal readability, but there is no length cap on the body.',
    },
    {
      type: 'h2',
      content: 'High-Impact Practices',
    },
    {
      type: 'p',
      content: 'These practices compound over time. Teams that adopt them consistently see measurably faster code reviews and dramatically easier debugging six months in.',
    },
    {
      type: 'h3',
      content: '4. Explain why in the body, not what',
    },
    {
      type: 'p',
      content: 'The diff already shows what changed — every line added and removed is there. The commit body should explain why the change was made. Business context, the bug it fixes, the alternative approaches considered, the trade-offs made. This is context that will be completely lost to memory in three months.',
    },
    {
      type: 'code',
      content: `fix(cache): disable in-memory cache for session data

The in-memory cache shared session data between worker processes in
PM2 cluster mode, causing users to occasionally see each other's
session state on high-traffic servers (particularly visible in
checkout flow — see issue #891).

Switching to Redis-backed session storage eliminates the shared
state problem entirely. No behavioral change for single-instance
deploys.

Fixes #891. Load tested at 10x normal traffic, no recurrence.`,
    },
    {
      type: 'p',
      content: 'The person who reads this at 2am six months from now — possibly you — will be genuinely grateful for that context. Without it, they have to reconstruct the reasoning from code alone, which is slow and error-prone.',
    },
    {
      type: 'h3',
      content: '5. Reference issues and pull requests',
    },
    {
      type: 'p',
      content: 'GitHub, GitLab, and Bitbucket all support issue references in commit messages. "Fixes #123" automatically closes the issue when the commit lands on the default branch. "See #456" creates a cross-reference without closing.',
    },
    {
      type: 'code',
      content: `fix(auth): prevent session fixation attack on login

Regenerate session ID after successful authentication. Without this,
an attacker who knows a pre-login session ID can hijack the session
after the victim authenticates.

Fixes #445
See also: OWASP A07:2021 — Identification and Authentication Failures`,
    },
    {
      type: 'p',
      content: 'This creates a bidirectional link: the issue links to the commit that fixed it, and the commit links to the issue that described the bug. Months later, when you\'re tracing why a particular security check exists, that link saves hours.',
    },
    {
      type: 'h3',
      content: '6. Adopt Conventional Commits format',
    },
    {
      type: 'p',
      content: 'The type(scope): description format is the most widely adopted commit standard. It enables automatic changelog generation, semantic versioning automation, and makes git log scannable at a glance. When you can run git log --oneline and immediately distinguish features from fixes from refactors, debugging and release preparation become dramatically faster.',
    },
    {
      type: 'code',
      content: `# With Conventional Commits, git log --oneline looks like:
a1b2c3d feat(auth): add Google OAuth with refresh token rotation
e4f5g6h fix(api): handle null response from /users endpoint
i7j8k9l chore(deps): upgrade Next.js to 14.1.0
m1n2o3p refactor(db): extract query builder into separate module
p4q5r6s test(auth): add integration tests for token refresh flow

# Without Conventional Commits:
a1b2c3d Add oauth
e4f5g6h fix
i7j8k9l update packages
m1n2o3p cleanup
p4q5r6s add tests`,
    },
    {
      type: 'callout',
      content: 'CommitCraft AI generates Conventional Commits format automatically from your staged diff. Stage your changes, click one button, get a properly formatted message with the right type, scope, and description.',
    },
    {
      type: 'h3',
      content: '7. Never use "WIP" in a commit that lands on main',
    },
    {
      type: 'p',
      content: 'WIP commits happen when you need to save progress mid-task. That\'s fine on a feature branch during development. It is never acceptable in the permanent history on main or master.',
    },
    {
      type: 'p',
      content: 'The solutions: use git stash to save uncommitted work when you need to switch context, use draft PRs where WIP commits are acceptable because they will be squashed before merging, or commit with a meaningful partial message and amend it before the PR merges.',
    },
    {
      type: 'h2',
      content: 'Team Practices',
    },
    {
      type: 'p',
      content: 'Individual discipline is harder to maintain than automated enforcement. These practices shift commit quality from "depends on who wrote it" to "consistently good across the team".',
    },
    {
      type: 'h3',
      content: '8. Enforce format with commitlint in CI',
    },
    {
      type: 'p',
      content: 'Voluntary standards drift. Automated enforcement does not. commitlint is a git hook tool that validates commit messages against a configurable rule set. Set it up as a Husky hook and commit messages that do not follow your convention will be rejected before they can be committed:',
    },
    {
      type: 'code',
      content: `# Install commitlint and Conventional Commits config
npm install --save-dev @commitlint/cli @commitlint/config-conventional husky

# commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-max-length': [2, 'always', 72],
    'type-enum': [2, 'always', [
      'feat', 'fix', 'docs', 'style', 'refactor',
      'test', 'chore', 'perf', 'ci', 'build', 'revert'
    ]]
  }
}

# .husky/commit-msg
npx --no -- commitlint --edit $1`,
    },
    {
      type: 'p',
      content: 'After setup, a commit like git commit -m "fix stuff" will fail with a clear error message explaining what is wrong. The developer fixes the message and tries again. Within a few iterations, the format becomes second nature.',
    },
    {
      type: 'h3',
      content: '9. Squash feature branches before merging',
    },
    {
      type: 'p',
      content: 'Feature branches accumulate noise: "wip", "fixup", "trying this approach", "revert previous", "actually revert the revert". These are useful during development, but they add noise to the permanent history on main.',
    },
    {
      type: 'p',
      content: 'The standard approach is squash-and-merge: when a feature branch is ready, squash all its commits into one (or a small number of) clean commits with meaningful messages, then merge. GitHub, GitLab, and Bitbucket all support squash merging as a merge option. The branch history is preserved for reference; main stays clean.',
    },
    {
      type: 'code',
      content: `# Squash all commits on your branch into one interactively
git rebase -i origin/main

# In the interactive rebase editor, mark all commits
# except the first as 'squash' (or 's'):
pick a1b2c3d feat: initial auth implementation
squash e4f5g6h wip
squash i7j8k9l fix tests
squash m1n2o3p address review feedback

# Git opens an editor to write the final combined commit message.
# Write a proper Conventional Commits message here.`,
    },
    {
      type: 'h3',
      content: '10. Write commit messages for the person debugging at 2am',
    },
    {
      type: 'p',
      content: 'This is the principle that unifies all the others. Your commit messages\' primary audience is not your future self in a calm moment — it is whoever is under pressure debugging a production issue, possibly in the middle of the night, possibly someone who has never touched this part of the codebase.',
    },
    {
      type: 'p',
      content: 'That person needs: what changed (from the subject line), why it changed (from the body), and what related issues or PRs provide more context (from the footer). Give them all three, and the 30 extra seconds you spent writing a good commit message pays back in hours saved.',
    },
    {
      type: 'h2',
      content: 'Practices Worth Adding Once the Basics Are Solid',
    },
    {
      type: 'h3',
      content: '11. Use Co-authored-by for pair programming',
    },
    {
      type: 'p',
      content: 'When two developers work on a commit together, both deserve credit in the git history. GitHub supports the Co-authored-by trailer, which adds the co-author to the commit metadata and shows both avatars in the commit view:',
    },
    {
      type: 'code',
      content: `feat(payments): implement Stripe subscription upgrade flow

Co-authored-by: Sarah Chen <sarah@company.com>`,
    },
    {
      type: 'h3',
      content: '12. Use --fixup for minor corrections to recent commits',
    },
    {
      type: 'p',
      content: 'When you catch a small mistake in your last commit — a typo, a missed file, a minor logic error — git commit --fixup creates a fixup commit that git rebase --autosquash will automatically combine with the parent commit when you clean up the branch:',
    },
    {
      type: 'code',
      content: `# You just committed, then noticed a typo in a comment
git add path/to/fixed-file.ts
git commit --fixup HEAD

# Later, before merging the branch:
git rebase -i --autosquash origin/main
# Git automatically marks the fixup commit for squashing
# into its parent — no manual editing required`,
    },
    {
      type: 'h3',
      content: '13. Automate commit messages with AI tooling',
    },
    {
      type: 'p',
      content: 'The biggest barrier to consistent commit quality is friction. Most developers know what a good commit message looks like. The barrier is the 30-60 seconds it takes to write one when you are in flow state and just want to push.',
    },
    {
      type: 'p',
      content: 'AI commit generators like CommitCraft AI eliminate that friction. Your staged diff is analyzed by an AI model that reads the actual code changes — function names, variable names, file paths, control flow — and generates a Conventional Commits message with the right type, an accurate scope, and a specific description. You review it in 10 seconds and accept or edit. The quality of your git history goes up, the time cost goes to near zero.',
    },
    {
      type: 'h2',
      content: 'Two Common Practices Worth Avoiding',
    },
    {
      type: 'h3',
      content: 'Emoji-first commit messages (Gitmoji)',
    },
    {
      type: 'p',
      content: 'Gitmoji assigns emoji to commit types: a sparkle for features, a bug for fixes, and so on. The argument is that emoji are faster to scan than text. In practice, the unicode characters render inconsistently across tools and terminals, emoji are not grep-able or machine-processable, and they add nothing over Conventional Commits types that tooling like semantic-release and commitlint can actually use. Avoid this in professional settings.',
    },
    {
      type: 'h3',
      content: 'Committing generated files that belong in .gitignore',
    },
    {
      type: 'p',
      content: 'Lock files (package-lock.json, yarn.lock, Cargo.lock) should be committed — they ensure reproducible installs. Build outputs, compiled assets, and files generated from OpenAPI specs or Prisma schemas generally should not. When generated files are tracked, their diffs swamp your actual changes and make accurate commit messages harder to write, both for humans and AI tools.',
    },
    {
      type: 'h2',
      content: 'The Quick Reference Checklist',
    },
    {
      type: 'ol',
      content: [
        'One logical change per commit — if the message needs "and", split the commit',
        'Subject in imperative mood: "Add", "Fix", "Remove", not "Added", "Fixing"',
        'Subject under 72 characters (GitHub truncates at 72)',
        'Conventional Commits format: type(scope): description',
        'Body explains why, not what — the diff already shows what',
        'Footer references related issues: "Fixes #N" or "See #N"',
        'No "wip", "fix", "update", or "changes" as a complete message',
        'No mixing of unrelated changes in one commit',
        'commitlint enforcing format automatically in CI',
        'Squash feature branch noise before merging to main',
      ],
    },
    {
      type: 'cta',
      content: '',
    },
  ],
}
