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
      const isLow = remaining <= 5

      this.item.text = `$(git-commit) CommitCraft: ${state.used}/${state.limit}`
      this.item.tooltip = `CommitCraft AI — ${remaining} generations remaining this month\n${state.email}\nClick to see usage`
      this.item.backgroundColor = isLow
        ? new vscode.ThemeColor('statusBarItem.warningBackground')
        : undefined
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
