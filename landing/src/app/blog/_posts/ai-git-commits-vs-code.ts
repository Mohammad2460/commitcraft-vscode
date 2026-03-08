import type { BlogPost } from './types'

export const post: BlogPost = {
  slug: 'ai-git-commits-vs-code',
  title: 'AI Commit Message Generators for VS Code: How They Work and Which to Use',
  description: 'A technical look at how AI commit message generators read your code changes and produce semantic commits. Comparison of VS Code extension options and how to choose the right one.',
  publishedAt: 'March 8, 2026',
  readTime: '6 min read',
  keywords: ['ai commit message generator', 'ai commit vscode', 'auto generate commit message', 'git commit ai', 'vscode commit extension'],
  content: [
    {
      type: 'p',
      content: 'AI commit message generators have matured significantly in the past two years. What started as basic tools that described file changes have become systems that understand the semantic meaning of code diffs — the difference between a change that adds a feature and one that fixes a regression. This post gets into the technical details of how they actually work, what makes a good one, and which options are worth using in VS Code.',
    },
    {
      type: 'h2',
      content: 'How AI Commit Generators Actually Work',
    },
    {
      type: 'p',
      content: 'The core loop is straightforward: read the git diff, send it to a language model with a structured prompt, parse the response, fill it into your commit input. But every step in that loop has implementation decisions that meaningfully affect output quality. Understanding those decisions helps you evaluate and configure these tools effectively.',
    },
    {
      type: 'h3',
      content: 'Step 1: Reading the Staged Diff',
    },
    {
      type: 'p',
      content: 'The first decision is how to read the diff. There are two approaches: calling git as a subprocess, or using VS Code\'s built-in Git extension API. The subprocess approach shells out to the terminal and runs git diff --cached. It works, but it has OS-specific path issues, can break with non-standard git configurations, and doesn\'t integrate cleanly with VS Code\'s authentication layer for private repositories.',
    },
    {
      type: 'p',
      content: 'The VS Code Git API approach is cleaner. VS Code ships with a first-party Git extension (extension ID: vscode.git) that exposes a stable API. Extensions can reach into it and get repository objects with typed methods:',
    },
    {
      type: 'code',
      content: `// Access VS Code's built-in Git extension API
const gitExtension = vscode.extensions.getExtension('vscode.git')
if (!gitExtension?.isActive) {
  await gitExtension?.activate()
}
const api = gitExtension!.exports.getAPI(1)
const repo = api.repositories[0]

// Get staged diff (index vs HEAD)
// The boolean parameter: true = staged, false = working tree
const diff = await repo.diff(true)

// Also useful: get the current branch name for context
const branch = repo.state.HEAD?.name ?? 'unknown'`,
    },
    {
      type: 'p',
      content: 'This is more reliable because VS Code\'s Git extension already handles the edge cases — Windows path separators, SSH key authentication, git worktrees. You get a clean string representation of the staged diff without reinventing that plumbing.',
    },
    {
      type: 'h3',
      content: 'Step 2: Truncating for Context Windows',
    },
    {
      type: 'p',
      content: 'Raw diffs can be enormous. A single dependency update might generate thousands of lines of lockfile changes. A significant refactor might touch dozens of files. Language model context windows have limits, and even within limits, feeding a 50,000-token diff raises cost and latency with minimal benefit to commit message quality.',
    },
    {
      type: 'p',
      content: 'The pragmatic approach is to cap the diff at 6,000–8,000 characters before sending it. In practice, this captures the semantically important parts of most changes. The first few hundred lines of a diff contain the actual code changes — the interesting deletions and additions. What gets cut is usually repetitive churn (lockfile updates, generated code, test snapshots). When you\'re writing a commit message, you\'re summarizing the intent of the change, and that intent is usually visible in the first portion of the diff.',
    },
    {
      type: 'code',
      content: `// Truncate to avoid excessive token usage
const MAX_DIFF_CHARS = 8000
const truncatedDiff = diff.length > MAX_DIFF_CHARS
  ? diff.slice(0, MAX_DIFF_CHARS) + '\\n... [diff truncated]'
  : diff`,
    },
    {
      type: 'callout',
      content: 'For genuinely massive changes that span entire modules, AI-generated messages will be less precise — but those changes are also the hardest for humans to summarize accurately. A slight imprecision in a message for a 2,000-line refactor is expected.',
    },
    {
      type: 'h3',
      content: 'Step 3: Prompt Engineering for Commit Messages',
    },
    {
      type: 'p',
      content: 'The prompt structure is where most of the quality difference between tools actually lives. A naive prompt ("Write a commit message for this diff") produces generic output. A well-structured prompt that includes format requirements, context signals, and explicit output structure produces specific, accurate messages.',
    },
    {
      type: 'p',
      content: 'A good commit message generation prompt includes several elements: the diff itself, the branch name (a feature/ branch signals different intent than a hotfix/ branch), the target format (Conventional Commits, gitmoji, plain), and a strict output schema that forces structured JSON:',
    },
    {
      type: 'code',
      content: `You are a git commit message expert. Generate a Conventional Commits format message.

Context:
- Branch: feature/oauth-google-login
- Format: type(scope): description

Rules:
- Subject line: imperative mood, max 72 characters
- type must be: feat, fix, docs, style, refactor, test, chore, perf, or ci
- scope should be the module or component affected
- description: what changed, not how

Diff:
\`\`\`diff
<your staged diff here, first 8KB>
\`\`\`

Respond with ONLY valid JSON, no explanation:
{
  "type": "feat",
  "scope": "auth",
  "description": "add Google OAuth login with refresh token rotation",
  "body": "Optional 2-3 sentence explanation of why this change was made.",
  "breaking": false
}`,
    },
    {
      type: 'p',
      content: 'The key constraints are: JSON-only output (prevents the model from adding prose around the message), strict character limits on the description, and explicit type enumeration (prevents the model from inventing types like "update" or "improvement").',
    },
    {
      type: 'h3',
      content: 'Step 4: Model Selection',
    },
    {
      type: 'p',
      content: 'Not all language models are equally suited for commit message generation. The requirements are specific: fast response time (this is an interactive, synchronous operation — users are waiting in their editor), reliable structured output (JSON parsing failures break the workflow), and genuine code understanding across all major programming languages.',
    },
    {
      type: 'p',
      content: 'Claude Haiku fits this use case well for several reasons. It\'s fast enough for interactive use — typical responses for a commit message arrive in under 2 seconds even for complex diffs. It reliably produces structured JSON without the model "breaking character" to add explanations. And Anthropic has trained Claude with particular attention to code understanding, which translates to more accurate scope attribution and type classification.',
    },
    {
      type: 'p',
      content: 'GPT-4o-mini is a reasonable alternative with similar characteristics. The larger models (GPT-4o, Claude Sonnet) produce marginally more nuanced descriptions for complex changes but at meaningfully higher latency — the tradeoff rarely makes sense for an interactive commit workflow.',
    },
    {
      type: 'h3',
      content: 'Step 5: Filling the SCM Input Box',
    },
    {
      type: 'p',
      content: 'The final step is actually writing the message somewhere useful. VS Code exposes the Source Control Message via the inputBox property on a repository object. A good extension writes the generated message there and focuses the Source Control panel, so the user can immediately review and edit:',
    },
    {
      type: 'code',
      content: `// Write the generated message to VS Code's commit input box
repo.inputBox.value = formattedMessage

// Open Source Control panel so user sees it immediately
await vscode.commands.executeCommand('workbench.view.scm')`,
    },
    {
      type: 'h2',
      content: 'VS Code Extension Options',
    },
    {
      type: 'p',
      content: 'Several extensions bring AI commit generation to VS Code. They differ significantly in approach, model choice, configurability, and how well they handle edge cases.',
    },
    {
      type: 'h3',
      content: 'CommitCraft AI',
    },
    {
      type: 'p',
      content: 'CommitCraft AI is built specifically for this workflow. It uses the VS Code Git API (not subprocess), reads staged changes, generates Conventional Commits format messages via Claude Haiku, and writes the result directly to the Source Control input box. The extension also handles PR description generation and changelog entries from the same diff.',
    },
    {
      type: 'p',
      content: 'The standout feature is the review flow: the generated message appears in a side panel before being applied to the commit box, letting you see and edit it before committing. This is the right UX — AI output should be reviewed, not auto-accepted. The extension has a free tier that covers typical individual developer usage.',
    },
    {
      type: 'h3',
      content: 'Generic AI Chat Extensions (GitHub Copilot, Cursor)',
    },
    {
      type: 'p',
      content: 'GitHub Copilot in VS Code gained a commit message button in 2024. It generates messages by sending the staged diff to OpenAI and fills the input box. The quality is decent but the format is inconsistent — it doesn\'t enforce Conventional Commits, and the messages tend toward the verbose end. If you\'re already paying for Copilot, it\'s a reasonable option for basic use. It doesn\'t do PR descriptions or changelogs.',
    },
    {
      type: 'p',
      content: 'Cursor has similar built-in functionality within its AI-native editor. If your team is already on Cursor, use that. If you\'re on VS Code, Cursor\'s commit generation isn\'t available.',
    },
    {
      type: 'h2',
      content: 'CLI Alternatives to VS Code Extensions',
    },
    {
      type: 'p',
      content: 'If you prefer terminal-first workflows, there are established CLI tools worth knowing:',
    },
    {
      type: 'h3',
      content: 'aicommits',
    },
    {
      type: 'p',
      content: 'The original AI commit CLI tool. Reads staged diff via git subprocess, calls OpenAI, prints a message. No VS Code integration — you run it in the terminal, copy the output, paste into your commit. Works well for developers who live in the terminal. Requires your own OpenAI API key.',
    },
    {
      type: 'code',
      content: `# Install
npm install -g aicommits

# Configure your API key
aicommits config set OPENAI_KEY=sk-...

# Use it (after git add)
aicommits`,
    },
    {
      type: 'h3',
      content: 'OpenCommit',
    },
    {
      type: 'p',
      content: 'Similar to aicommits but with more configuration options — you can set the model, the commit convention, the number of messages to generate (it can suggest 3 options for you to pick from), and whether to automatically stage changes. Good for teams that want more control.',
    },
    {
      type: 'code',
      content: `# Install
npm install -g opencommit

# Set API key
oco config set OCO_OPENAI_API_KEY=sk-...

# Generate message and pick from options
oco`,
    },
    {
      type: 'p',
      content: 'The CLI tools are most useful when you\'re not in VS Code — working over SSH, in a Docker container, or on a system where installing extensions isn\'t practical. For typical day-to-day development in VS Code, an extension that integrates with Source Control is more ergonomic.',
    },
    {
      type: 'h2',
      content: 'What AI Gets Right — and Where It Struggles',
    },
    {
      type: 'p',
      content: 'Understanding the genuine capabilities and limitations helps you calibrate how much to trust the output.',
    },
    {
      type: 'ul',
      content: [
        'Type classification: AI correctly identifies feat vs fix vs refactor with high accuracy. A new function clearly introduced in the diff gets classified as feat. A conditional that changes existing behavior gets classified as fix. This is the most consistently accurate part.',
        'Scope attribution: Good at identifying which module or component was changed when file paths are clear (e.g., src/auth/tokenService.ts → scope: auth). Weaker in flat directory structures.',
        'Summarizing multiple changes: When you have 5 related changes in one commit, AI effectively distills them into a single coherent message rather than listing all 5 files.',
        'Consistent formatting: The most obvious win — every message follows the same format without effort.',
      ],
    },
    {
      type: 'p',
      content: 'Where AI commit generators struggle:',
    },
    {
      type: 'ul',
      content: [
        'Business context: The model can\'t know that a particular "fix" is actually a regression introduced in the last release, or that a refactor was motivated by a performance audit. It sees code, not organizational context.',
        'Generated code in diffs: If your diff contains auto-generated files (Prisma migrations, GraphQL types, OpenAPI client code), AI might try to summarize the generated content rather than the intent behind the generation.',
        'Ambiguous changes: A 100-line change that refactors internals while also adding a small feature at the end is genuinely hard to classify. The model will pick one or the other rather than both.',
        'Very large diffs that span unrelated modules: When the diff contains genuinely unrelated changes, AI will try to find a theme that doesn\'t exist. This is a signal that you should have made two separate commits.',
      ],
    },
    {
      type: 'h2',
      content: 'The Right Posture: Review Before Accepting',
    },
    {
      type: 'p',
      content: 'The correct mental model for AI commit generation is "very good first draft, not final answer". In practice, AI-generated messages are accurate enough to commit directly 70-80% of the time for typical feature and fix commits. The remaining 20-30% need a small correction — usually tweaking the type, adjusting the scope, or adding a word of context.',
    },
    {
      type: 'p',
      content: 'That\'s still dramatically better than "fix stuff" as a starting point. The cognitive load of reviewing and optionally editing a generated message is far lower than writing from scratch. You\'re proofreading, not authoring.',
    },
    {
      type: 'callout',
      content: 'A useful heuristic: if the generated message uses the word "update" without a specific noun, it\'s a signal the model couldn\'t find a better word. Add the specific noun yourself before committing.',
    },
    {
      type: 'h2',
      content: 'Getting Started with CommitCraft AI in VS Code',
    },
    {
      type: 'p',
      content: 'Here\'s the step-by-step setup:',
    },
    {
      type: 'ol',
      content: [
        'Install CommitCraft AI from the VS Code Marketplace (search "CommitCraft AI")',
        'Open the command palette (Cmd+Shift+P / Ctrl+Shift+P) and run "CommitCraft: Sign In" to authenticate',
        'Stage your changes as usual (git add, or click the + icon in VS Code\'s Source Control panel)',
        'Click the CommitCraft icon in the Source Control panel header, or run "CommitCraft: Generate Commit Message" from the command palette',
        'Review the generated message in the CommitCraft panel — edit if needed',
        'Click Accept to write the message to the commit input box, then commit normally',
      ],
    },
    {
      type: 'p',
      content: 'The extension works with any git repository — GitHub, GitLab, Bitbucket, self-hosted. It reads locally staged changes and never sends your entire codebase anywhere, only the staged diff.',
    },
    {
      type: 'cta',
      content: '',
    },
  ],
}
