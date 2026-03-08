import * as vscode from 'vscode'
import type { UserState } from '../auth/authService'

export class StatusBarManager implements vscode.Disposable {
  private readonly item: vscode.StatusBarItem

  constructor() {
    this.item = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Right,
      100
    )
    this.item.command = 'commitcraft.showUsage'
    this.setNotSignedIn()
    this.item.show()
  }

  update(state: UserState): void {
    if (!state.isSignedIn) {
      this.setNotSignedIn()
      return
    }

    if (state.tier === 'pro') {
      this.item.text = '$(star-full) CommitCraft Pro'
      this.item.tooltip = `CommitCraft AI Pro — Unlimited generations\n${state.email}`
      this.item.backgroundColor = undefined
      this.item.color = new vscode.ThemeColor('statusBarItem.prominentForeground')
    } else {
      const remaining = state.limit - state.used
      const isLow = remaining <= 10
      const isEmpty = remaining <= 0

      this.item.text = isEmpty
        ? `$(warning) CommitCraft: Limit reached`
        : `$(git-commit) CommitCraft: ${state.used}/${state.limit}`
      this.item.tooltip = isEmpty
        ? `CommitCraft AI — Monthly limit reached\nUpgrade to Pro for unlimited generations\nClick to upgrade`
        : `CommitCraft AI — ${remaining} generation${remaining === 1 ? '' : 's'} remaining this month\n${state.email}\n${isLow ? '⚠️ Running low — click to upgrade' : 'Click to see usage'}`
      this.item.backgroundColor = isLow
        ? new vscode.ThemeColor('statusBarItem.warningBackground')
        : undefined
      this.item.command = isEmpty ? 'commitcraft.upgrade' : 'commitcraft.showUsage'
      this.item.color = undefined
    }
  }

  setLoading(): void {
    this.item.text = '$(sync~spin) CommitCraft: Generating...'
    this.item.tooltip = 'CommitCraft AI is generating...'
    this.item.backgroundColor = undefined
  }

  setNotSignedIn(): void {
    this.item.text = '$(account) CommitCraft: Sign In'
    this.item.tooltip = 'Click to sign in to CommitCraft AI'
    this.item.backgroundColor = undefined
    this.item.command = 'commitcraft.login'
  }

  resetCommand(): void {
    this.item.command = 'commitcraft.showUsage'
  }

  dispose(): void {
    this.item.dispose()
  }
}
