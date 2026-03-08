import * as vscode from 'vscode'
import type { GenerateResponse } from '../api/backendClient'
import { UPGRADE_URL } from '../config/constants'

type GenerationType = 'commit' | 'pr' | 'changelog'

export class CommitPanel {
  private static instance: CommitPanel | undefined
  private readonly panel: vscode.WebviewPanel
  private onAcceptCallback: ((message: string) => Promise<void>) | undefined

  private constructor(
    private readonly context: vscode.ExtensionContext,
    private generationType: GenerationType
  ) {
    this.panel = vscode.window.createWebviewPanel(
      'commitcraft',
      'CommitCraft AI',
      vscode.ViewColumn.Beside,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: []
      }
    )

    this.panel.webview.onDidReceiveMessage(async (message: { command: string; text?: string }) => {
      if (message.command === 'accept' && message.text) {
        if (this.onAcceptCallback) {
          await this.onAcceptCallback(message.text)
        }
        // Fill git commit message box for commit type
        if (this.generationType === 'commit') {
          await this.fillCommitBox(message.text)
        } else {
          // For PR/changelog, copy to clipboard
          await vscode.env.clipboard.writeText(message.text)
          vscode.window.showInformationMessage('CommitCraft: Copied to clipboard!')
        }
      } else if (message.command === 'upgrade') {
        vscode.env.openExternal(vscode.Uri.parse(UPGRADE_URL))
      }
    })

    this.panel.onDidDispose(() => {
      CommitPanel.instance = undefined
    })
  }

  private async fillCommitBox(message: string): Promise<void> {
    try {
      const gitExtension = vscode.extensions.getExtension('vscode.git')
      if (gitExtension) {
        const api = gitExtension.exports.getAPI(1)
        const repo = api.repositories[0]
        if (repo) {
          repo.inputBox.value = message
          await vscode.commands.executeCommand('workbench.view.scm')
        }
      }
    } catch {
      // Fallback: copy to clipboard
      await vscode.env.clipboard.writeText(message)
      vscode.window.showInformationMessage('CommitCraft: Copied to clipboard!')
    }
  }

  static createOrShow(context: vscode.ExtensionContext, type: GenerationType): CommitPanel {
    if (CommitPanel.instance) {
      CommitPanel.instance.generationType = type
      CommitPanel.instance.panel.reveal(vscode.ViewColumn.Beside)
      return CommitPanel.instance
    }
    CommitPanel.instance = new CommitPanel(context, type)
    return CommitPanel.instance
  }

  showLoading(type: GenerationType): void {
    const titles: Record<GenerationType, string> = {
      commit: 'Generating commit message...',
      pr: 'Generating PR description...',
      changelog: 'Generating changelog entry...'
    }
    this.panel.title = 'CommitCraft AI'
    this.panel.webview.html = this.getLoadingHtml(titles[type])
  }

  showResult(result: GenerateResponse, type: GenerationType): void {
    const fullMessage = result.bullets.length > 0
      ? `${result.title}\n\n${result.bullets.map(b => `- ${b}`).join('\n')}`
      : result.title

    const acceptLabel = type === 'commit' ? 'Accept & Fill Commit Box' : 'Copy to Clipboard'
    this.panel.webview.html = this.getResultHtml(result, fullMessage, acceptLabel, type)
  }

  showError(message: string, showUpgrade = false): void {
    this.panel.webview.html = this.getErrorHtml(message, showUpgrade)
  }

  private getLoadingHtml(message: string): string {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: var(--vscode-font-family); color: var(--vscode-foreground); background: var(--vscode-editor-background); padding: 24px; display: flex; align-items: center; justify-content: center; min-height: 200px; }
    .loading { text-align: center; }
    .spinner { font-size: 32px; animation: spin 1s linear infinite; display: inline-block; }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    p { color: var(--vscode-descriptionForeground); margin-top: 16px; }
  </style>
</head>
<body>
  <div class="loading">
    <div class="spinner">✨</div>
    <p>${message}</p>
  </div>
</body>
</html>`
  }

  private getResultHtml(result: GenerateResponse, fullMessage: string, acceptLabel: string, type: GenerationType): string {
    const escapedMessage = fullMessage.replace(/`/g, '\\`').replace(/\$/g, '\\$')
    const bulletsHtml = result.bullets.map(b =>
      `<li>${b.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</li>`
    ).join('')
    const quotaHtml = result.generationsRemaining >= 0
      ? `<div class="quota">Generations remaining: <strong>${result.generationsRemaining}</strong>${result.generationsRemaining <= 5 ? ' <a href="#" onclick="upgrade()">Upgrade to Pro →</a>' : ''}</div>`
      : `<div class="quota">✨ Pro — Unlimited generations</div>`

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { box-sizing: border-box; }
    body { font-family: var(--vscode-font-family); font-size: var(--vscode-font-size); color: var(--vscode-foreground); background: var(--vscode-editor-background); padding: 20px; margin: 0; }
    h3 { margin: 0 0 12px; font-size: 13px; color: var(--vscode-descriptionForeground); text-transform: uppercase; letter-spacing: 0.5px; }
    textarea { width: 100%; min-height: 80px; background: var(--vscode-input-background); color: var(--vscode-input-foreground); border: 1px solid var(--vscode-input-border, #555); border-radius: 3px; padding: 10px; font-family: var(--vscode-font-family); font-size: 13px; resize: vertical; outline: none; }
    textarea:focus { border-color: var(--vscode-focusBorder); }
    ul { margin: 12px 0; padding-left: 20px; }
    li { margin: 4px 0; font-size: 13px; color: var(--vscode-foreground); }
    .actions { display: flex; gap: 8px; margin-top: 16px; flex-wrap: wrap; }
    button { padding: 7px 14px; border: none; border-radius: 3px; cursor: pointer; font-size: 12px; font-family: var(--vscode-font-family); }
    .btn-primary { background: var(--vscode-button-background); color: var(--vscode-button-foreground); }
    .btn-primary:hover { background: var(--vscode-button-hoverBackground); }
    .btn-secondary { background: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); }
    .btn-secondary:hover { background: var(--vscode-button-secondaryHoverBackground); }
    .quota { margin-top: 16px; padding-top: 12px; border-top: 1px solid var(--vscode-widget-border, #444); font-size: 12px; color: var(--vscode-descriptionForeground); }
    a { color: var(--vscode-textLink-foreground); cursor: pointer; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .divider { height: 1px; background: var(--vscode-widget-border, #444); margin: 16px 0; }
  </style>
</head>
<body>
  <h3>${type === 'commit' ? 'Commit Message' : type === 'pr' ? 'PR Description' : 'Changelog Entry'}</h3>
  <textarea id="message">${result.title.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</textarea>

  ${result.bullets.length > 0 ? `<div class="divider"></div><h3>Details</h3><ul>${bulletsHtml}</ul>` : ''}

  <div class="actions">
    <button class="btn-primary" onclick="accept()">${acceptLabel}</button>
    <button class="btn-secondary" onclick="copy()">Copy</button>
  </div>

  ${quotaHtml}

  <script>
    const vscode = acquireVsCodeApi();
    function accept() {
      const text = document.getElementById('message').value;
      vscode.postMessage({ command: 'accept', text });
    }
    function copy() {
      const text = document.getElementById('message').value;
      navigator.clipboard.writeText(text);
    }
    function upgrade() {
      vscode.postMessage({ command: 'upgrade' });
    }
  </script>
</body>
</html>`
  }

  private getErrorHtml(message: string, showUpgrade: boolean): string {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: var(--vscode-font-family); color: var(--vscode-foreground); background: var(--vscode-editor-background); padding: 24px; }
    .error { color: var(--vscode-errorForeground); margin-bottom: 16px; }
    button { padding: 7px 14px; border: none; border-radius: 3px; cursor: pointer; background: var(--vscode-button-background); color: var(--vscode-button-foreground); font-family: var(--vscode-font-family); }
  </style>
</head>
<body>
  <p class="error">⚠️ ${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
  ${showUpgrade ? '<button onclick="acquireVsCodeApi().postMessage({command:\'upgrade\'})">Upgrade to Pro — $4.99/mo</button>' : ''}
</body>
</html>`
  }
}
