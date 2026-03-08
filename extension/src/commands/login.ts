import * as vscode from 'vscode'
import type { AuthService } from '../auth/authService'
import type { StatusBarManager } from '../ui/statusBar'
import { BackendClient } from '../api/backendClient'

export async function loginCommand(
  authService: AuthService,
  statusBar: StatusBarManager
): Promise<void> {
  // Step 1: Ask for email
  const email = await vscode.window.showInputBox({
    prompt: 'Enter your email to get your free API key',
    placeHolder: 'you@example.com',
    validateInput: (value) => {
      if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Please enter a valid email address'
      }
      return undefined
    }
  })

  if (!email) return

  // Step 2: Register (send API key to email)
  try {
    await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: 'CommitCraft: Sending API key to your email...',
      cancellable: false
    }, async () => {
      const client = new BackendClient()
      await client.register(email)
    })
  } catch (err) {
    vscode.window.showErrorMessage(`CommitCraft: Failed to send API key — ${err instanceof Error ? err.message : 'Unknown error'}`)
    return
  }

  // Step 3: Ask for API key
  const apiKey = await vscode.window.showInputBox({
    prompt: 'Check your email and paste your API key here',
    placeHolder: 'cc_live_...',
    password: true,
    validateInput: (value) => {
      if (!value || !value.startsWith('cc_live_')) {
        return 'API key must start with cc_live_'
      }
      return undefined
    }
  })

  if (!apiKey) return

  // Step 4: Verify and store
  const success = await authService.signIn(apiKey)
  if (success) {
    const state = authService.userState
    statusBar.update(state)
    statusBar.resetCommand()
    vscode.window.showInformationMessage(
      `CommitCraft: Welcome! You have ${state.isSignedIn && state.tier === 'free' ? `${state.limit - state.used} free generations` : 'unlimited generations'} this month.`
    )
  } else {
    vscode.window.showErrorMessage('CommitCraft: Invalid API key. Please check and try again.')
  }
}
