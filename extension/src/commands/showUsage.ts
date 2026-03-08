import * as vscode from 'vscode'
import type { AuthService } from '../auth/authService'

export async function showUsageCommand(authService: AuthService): Promise<void> {
  const state = authService.userState

  if (!state.isSignedIn) {
    const action = await vscode.window.showInformationMessage(
      'CommitCraft: Sign in to see your usage.',
      'Sign In'
    )
    if (action === 'Sign In') {
      vscode.commands.executeCommand('commitcraft.login')
    }
    return
  }

  if (state.tier === 'pro') {
    vscode.window.showInformationMessage(
      `CommitCraft Pro — Unlimited generations ✨\nAccount: ${state.email}`
    )
    return
  }

  const remaining = state.limit - state.used
  const resetDate = new Date(state.resetDate).toLocaleDateString()

  const upgradeLabel = 'Upgrade to Pro — $4.99/mo'
  const action = await vscode.window.showInformationMessage(
    `CommitCraft: ${state.used}/${state.limit} generations used this month. ${remaining} remaining. Resets ${resetDate}.`,
    upgradeLabel
  )

  if (action === upgradeLabel) {
    vscode.env.openExternal(vscode.Uri.parse('https://commitcraft.ai/upgrade'))
  }
}
