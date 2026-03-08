import * as vscode from 'vscode'
import { GitService } from './git/gitService'
import { BackendClient } from './api/backendClient'
import { AuthService } from './auth/authService'
import { registerCommands } from './commands'
import { StatusBarManager } from './ui/statusBar'

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  // Initialize core services
  const gitService = new GitService()
  const backendClient = new BackendClient()
  const authService = new AuthService(context.secrets, backendClient)

  // Initialize git
  await gitService.initialize()

  // Initialize status bar
  const statusBar = new StatusBarManager()
  context.subscriptions.push(statusBar)

  // Wire auth state changes to status bar
  context.subscriptions.push(
    authService.onStateChange(state => statusBar.update(state))
  )

  // Register all commands
  const disposables = registerCommands(context, gitService, authService, backendClient, statusBar)
  context.subscriptions.push(...disposables)

  // Refresh auth state on startup (async — don't block activation)
  authService.refreshState().then(state => {
    statusBar.update(state)
    // Show welcome message on very first install
    if (!context.globalState.get('commitcraft.hasActivated')) {
      context.globalState.update('commitcraft.hasActivated', true)
      vscode.window.showInformationMessage(
        'CommitCraft AI installed! Sign in to start generating commit messages.',
        'Sign In'
      ).then(action => {
        if (action === 'Sign In') {
          vscode.commands.executeCommand('commitcraft.login')
        }
      })
    }
  })
}

export function deactivate(): void {
  // cleanup handled by disposables
}
