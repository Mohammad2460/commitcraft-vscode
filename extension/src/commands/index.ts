import * as vscode from 'vscode'
import type { GitService } from '../git/gitService'
import type { AuthService } from '../auth/authService'
import type { BackendClient } from '../api/backendClient'
import type { StatusBarManager } from '../ui/statusBar'
import { generateCommitCommand } from './generateCommit'
import { loginCommand } from './login'
import { logoutCommand } from './logout'
import { showUsageCommand } from './showUsage'

export function registerCommands(
  context: vscode.ExtensionContext,
  gitService: GitService,
  authService: AuthService,
  backendClient: BackendClient,
  statusBar: StatusBarManager
): vscode.Disposable[] {
  return [
    vscode.commands.registerCommand('commitcraft.generate', () =>
      generateCommitCommand(context, gitService, authService, backendClient, statusBar, 'commit')
    ),
    vscode.commands.registerCommand('commitcraft.generatePR', () =>
      generateCommitCommand(context, gitService, authService, backendClient, statusBar, 'pr')
    ),
    vscode.commands.registerCommand('commitcraft.generateChangelog', () =>
      generateCommitCommand(context, gitService, authService, backendClient, statusBar, 'changelog')
    ),
    vscode.commands.registerCommand('commitcraft.login', () =>
      loginCommand(authService, statusBar)
    ),
    vscode.commands.registerCommand('commitcraft.logout', () =>
      logoutCommand(authService, statusBar)
    ),
    vscode.commands.registerCommand('commitcraft.showUsage', () =>
      showUsageCommand(authService)
    ),
    vscode.commands.registerCommand('commitcraft.upgrade', () => {
      vscode.env.openExternal(vscode.Uri.parse('https://commitcraft.ai/upgrade'))
    }),
  ]
}
