import * as vscode from 'vscode'
import type { AuthService } from '../auth/authService'
import type { StatusBarManager } from '../ui/statusBar'

export async function logoutCommand(
  authService: AuthService,
  statusBar: StatusBarManager
): Promise<void> {
  const confirm = await vscode.window.showWarningMessage(
    'CommitCraft: Sign out? You can sign back in anytime with your email.',
    'Sign Out',
    'Cancel'
  )
  if (confirm !== 'Sign Out') return

  await authService.clearApiKey()
  statusBar.setNotSignedIn()
  vscode.window.showInformationMessage('CommitCraft: Signed out successfully.')
}
