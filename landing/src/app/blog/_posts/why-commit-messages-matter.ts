import type { BlogPost } from './index'

export const post: BlogPost = {
  slug: 'why-commit-messages-matter',
  title: 'Why Git Commit Messages Matter (More Than Most Developers Think)',
  description: 'The real cost of bad commit messages on debugging time, code reviews, and long-term maintainability. With concrete examples and the case for automation.',
  publishedAt: 'March 8, 2026',
  readTime: '5 min read',
  keywords: ['why commit messages matter', 'git commit importance', 'git history best practices', 'developer productivity', 'code documentation git'],
  content: [
    {
      type: 'p',
      content: 'Most developers treat commit messages like receipts — something you fill out because the tool requires it, not because you expect to read it again. The data suggests this is the wrong mental model. Developers spend 20-30% of their time understanding existing code, and git history is one of the primary tools for that understanding. When that history is a wall of "fix", "update", and "wip", that understanding work gets dramatically harder.',
    },
    {
      type: 'h2',
      content: 'The Receipts Problem',
    },
    {
      type: 'p',
      content: 'Think about what a receipt actually does: it records a transaction for future reference. Git commits are exactly this — a record of what changed in the codebase, when, and why. The difference is that receipts are filed away and rarely retrieved, while git history is consulted constantly.',
    },
    {
      type: 'p',
      content: 'Every time a developer runs git log, git blame, or git bisect, they are reading those receipts. When the receipts just say "misc" and "fix stuff", the financial audit of your codebase is a nightmare. When they say "fix(auth): regenerate session ID on login to prevent session fixation", the audit takes seconds instead of hours.',
    },
    {
      type: 'h2',
      content: 'The Real Costs of Bad Commit Messages',
    },
    {
      type: 'p',
      content: 'Bad commit messages are not just aesthetically unpleasant. They have measurable, concrete costs that accumulate over the lifetime of a codebase.',
    },
    {
      type: 'h3',
      content: 'Cost 1: Debugging Time',
    },
    {
      type: 'p',
      content: 'When a regression appears in production and you need to find when it was introduced, git bisect is one of the most powerful tools in a developer\'s arsenal. It performs a binary search through your commit history, narrowing down the exact commit that introduced the bug.',
    },
    {
      type: 'p',
      content: 'With meaningful commit messages, the process often short-circuits entirely. You scan the bisect candidates, see "fix(auth): change token validation from RS256 to HS256", and immediately know that\'s the suspicious commit. You verify it, write a proper fix, and close the issue in under 30 minutes.',
    },
    {
      type: 'p',
      content: 'With meaningless commits, every bisect candidate requires manually checking out the commit and inspecting the code to understand what changed. The binary search becomes a series of manual code archeology sessions. What could take 30 minutes takes 3 hours.',
    },
    {
      type: 'code',
      content: `# git bisect with meaningful messages — what you want to see:
git bisect start
git bisect bad HEAD
git bisect good v2.3.0

# Git checkouts candidates; you mark each good or bad.
# On the fourth checkout, git log shows:
#
# fix(auth): switch JWT validation from asymmetric to symmetric key
#
# You know immediately this is the problem. Session tokens signed
# with the old key are being rejected by the new validator.
# Total time to find root cause: 8 minutes.

# git bisect with meaningless messages — what you get instead:
# fix
# update
# changes
# misc fixes
# stuff
#
# Every candidate requires checking out and manually reading
# the diff. Total time to find root cause: 2 hours.`,
    },
    {
      type: 'h3',
      content: 'Cost 2: Code Review Quality',
    },
    {
      type: 'p',
      content: 'Code review is fundamentally a comprehension exercise. Reviewers need to understand what changed and why before they can evaluate whether the change is correct. A good commit message does half that work before the reviewer opens a single file.',
    },
    {
      type: 'p',
      content: 'Consider these two code review openings for identical diffs:',
    },
    {
      type: 'code',
      content: `# Commit message version 1:
update auth

# Commit message version 2:
fix(auth): prevent session fixation by regenerating session ID on login

Previously, logging in did not invalidate the pre-authentication
session ID. An attacker who could observe or set the session ID
before login could hijack the session after the victim authenticated.

Fixes #445. Follows OWASP Session Management Cheat Sheet recommendation.`,
    },
    {
      type: 'p',
      content: 'With version 1, the reviewer has to derive intent from the diff alone. They\'ll spend time figuring out what changed before they can evaluate whether the security fix is correct. They might not even recognize it as a security change at all.',
    },
    {
      type: 'p',
      content: 'With version 2, the reviewer immediately knows the security context, can focus their attention on whether the fix is complete (did we handle all entry points?), and has a reference to check against. The review is faster and higher quality.',
    },
    {
      type: 'p',
      content: 'Research on code review consistently shows that reviewers who understand the intent of a change before reading the diff catch more issues and complete reviews faster. Commit messages are the primary vehicle for communicating that intent.',
    },
    {
      type: 'h3',
      content: 'Cost 3: Changelog Generation',
    },
    {
      type: 'p',
      content: 'Every meaningful software release needs release notes. Users need to know what changed. Support teams need to know what might have introduced a new issue. Security teams need to know if any security-relevant changes landed.',
    },
    {
      type: 'p',
      content: 'If your commits follow Conventional Commits format, tools like semantic-release and release-please can generate changelogs automatically. feat: commits become "New Features" entries. fix: commits become "Bug Fixes". BREAKING CHANGE footers trigger major version bumps.',
    },
    {
      type: 'p',
      content: 'If your commits say "update" and "fix", someone manually reads hundreds of commits and tries to reconstruct a human-readable summary. For a medium-sized team shipping twice a month, that manual work typically takes 2-4 hours per release. At two releases a month, that is 4-8 hours of engineering time every month — paid for by bad commit hygiene.',
    },
    {
      type: 'h3',
      content: 'Cost 4: Onboarding New Developers',
    },
    {
      type: 'p',
      content: 'When a developer joins a new team, one of the most valuable onboarding resources is the git history. Reading the history of a codebase tells you why architectural decisions were made, what problems have been encountered before, what previous approaches were tried and abandoned, and which parts of the system have a high churn rate.',
    },
    {
      type: 'p',
      content: 'A codebase with meaningful git history is a codebase that teaches itself to new developers. A codebase with three years of "fix" and "update" commits is a codebase that requires tribal knowledge to understand — knowledge that lives only in the heads of the people who wrote the code, and disappears when they leave.',
    },
    {
      type: 'h2',
      content: 'What Good Commit Messages Actually Look Like',
    },
    {
      type: 'p',
      content: 'Here are real-world before/after examples for common commit types. Same change, dramatically different information value.',
    },
    {
      type: 'code',
      content: `# Security fix — what most developers write:
fix login

# Security fix — what a meaningful commit looks like:
fix(auth): prevent session fixation attack on login

Regenerate session ID after successful authentication. Previously,
the session ID set before login was preserved after authentication,
allowing session fixation attacks.

See OWASP Session Fixation (CWE-384)
Fixes #445`,
    },
    {
      type: 'code',
      content: `# Performance change — what most developers write:
optimize query

# Performance change — what a meaningful commit looks like:
perf(db): add composite index on (user_id, created_at) for feed queries

Feed queries were doing full table scans on the posts table (9M rows)
when loading a user's timeline. Adding a composite index reduces
feed load time from ~2400ms to ~45ms at p99.

Identified via slow query log in staging under 10x load test.`,
    },
    {
      type: 'code',
      content: `# Dependency update — what most developers write:
update packages

# Dependency update — what a meaningful commit looks like:
chore(deps): upgrade axios from 0.27.2 to 1.6.0

Axios 1.x changes the default CSRF handling behavior. Updated the
API client to explicitly set withCredentials where previously it
was inferred. See axios migration guide in UPGRADING.md.

Fixes security advisory GHSA-wf5p-g6vw-rhxx (CVE-2023-45857)`,
    },
    {
      type: 'h2',
      content: 'The Accumulation Problem',
    },
    {
      type: 'p',
      content: 'Bad commit messages have a compounding cost. A codebase with a week of poor commits is fine — everyone remembers what happened last week. A codebase with a month of poor commits starts to get fuzzy. A codebase with two years of poor commits is a genuinely hostile environment to work in.',
    },
    {
      type: 'p',
      content: 'The git log of a mature codebase with poor commit discipline becomes useless as a navigation tool. You can see that files changed, but not why. git blame tells you who touched a line, but the associated message gives you no useful context. You are forced to read the code itself and try to infer intent from implementation, which is slower and more error-prone than reading explicit documentation.',
    },
    {
      type: 'p',
      content: 'The developers who joined the team in year one, who know why the authentication was written the way it was, who remember that the weird conditional in the payment flow was added because of a specific edge case in a specific payment processor — those developers leave eventually. And when they do, the knowledge in their heads leaves with them. Good commit messages are the insurance policy against that knowledge loss.',
    },
    {
      type: 'callout',
      content: 'A team that writes good commit messages is a team that systematically externalizes organizational knowledge into the codebase itself. That knowledge stays even when individuals leave.',
    },
    {
      type: 'h2',
      content: 'The Time Objection',
    },
    {
      type: 'p',
      content: 'The most common objection to better commit messages is time. Writing a meaningful commit message takes 30-60 seconds more than writing "fix". Over a typical work day with 10 commits, that is 5-10 minutes of extra work.',
    },
    {
      type: 'p',
      content: 'The counterargument is simple: a single debugging session that would have taken 30 minutes with a meaningful commit message but took 2 hours without it already exceeds weeks of accumulated "extra" time spent writing better messages. The ROI is absurdly high — you just do not see it because the savings are distributed across many future debugging sessions rather than appearing immediately.',
    },
    {
      type: 'p',
      content: 'The more compelling counterargument is that the time cost is now optional. AI commit generators like CommitCraft AI eliminate the extra time entirely. Stage your changes, click a button, get a Conventional Commits format message generated from the actual diff. Review it in 10 seconds, accept, and commit. The quality of your documentation goes up, and the time cost goes to zero.',
    },
    {
      type: 'h2',
      content: 'Where to Start',
    },
    {
      type: 'p',
      content: 'If you want to improve your team\'s commit quality, start with a single rule that is easy to remember and hard to game: every commit message must be specific enough that it could not describe any other commit in the codebase.',
    },
    {
      type: 'p',
      content: '"Fix bug" fails this test — it could describe any of thousands of commits. "Fix null pointer in OrderService when user has no payment methods" passes — it describes exactly one specific thing that changed.',
    },
    {
      type: 'p',
      content: 'From there, add Conventional Commits format to provide structure. Add commitlint to enforce it automatically in CI so standards do not drift when people are in a hurry. And add an AI commit generator to make compliance the path of least resistance rather than extra effort.',
    },
    {
      type: 'ul',
      content: [
        'Week 1: Enforce the "specific enough to be unique" rule — no commit message that could describe any other commit',
        'Week 2: Adopt Conventional Commits format (type(scope): description)',
        'Week 3: Add commitlint to enforce format in CI automatically',
        'Week 4: Add an AI commit generator so compliance requires near-zero extra effort',
      ],
    },
    {
      type: 'p',
      content: 'Within a month, your git history will be meaningfully better. Within six months, you will notice the compounding benefits: faster debugging, better code reviews, trivial changelog generation, and a codebase that new developers can actually learn from.',
    },
    {
      type: 'cta',
      content: '',
    },
  ],
}
