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
    prompt: 'Enter your email to create your free account',
    placeHolder: 'you@example.com',
    validateInput: (value) => {
      if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Please enter a valid email address'
      }
      return undefined
    }
  })

  if (!email) return

  // Step 2: Register — API key comes back in the response directly
  let apiKey: string | undefined
  try {
    const result = await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: 'CommitCraft: Creating your account...',
      cancellable: false
    }, async () => {
      const client = new BackendClient()
      return await client.register(email)
    })
    apiKey = result.apiKey
  } catch (err) {
    vscode.window.showErrorMessage(
      `CommitCraft: Failed to create account — ${err instanceof Error ? err.message : 'Unknown error'}`
    )
    return
  }

  // Step 3: If API key came back directly, sign in immediately — no email needed
  if (apiKey) {
    const success = await authService.signIn(apiKey)
    if (success) {
      const state = authService.userState
      statusBar.update(state)
      statusBar.resetCommand()
      vscode.window.showInformationMessage(
        `CommitCraft: Welcome! You have ${state.isSignedIn && state.tier === 'free' ? `${state.limit - state.used} free generations` : 'unlimited generations'} this month. Your key was also sent to ${email}.`
      )
      return
    }
  }

  // Fallback: ask them to paste the key from email (legacy path)
  const pastedKey = await vscode.window.showInputBox({
    prompt: 'Paste your API key (check your email)',
    placeHolder: 'cc_live_...',
    password: true,
    validateInput: (value) => {
      if (!value || !value.startsWith('cc_live_')) {
        return 'API key must start with cc_live_'
      }
      return undefined
    }
  })

  if (!pastedKey) return

  const success = await authService.signIn(pastedKey)
  if (success) {
    const state = authService.userState
    statusBar.update(state)
    statusBar.resetCommand()
    vscode.window.showInformationMessage(
      `CommitCraft: Welcome! You have ${state.isSignedIn && state.tier === 'free' ? `${state.limit - state.used} free generations` : 'unlimited generations'} this month.`
    )
  } else {
    vscode.window.showErrorMessage('CommitCraft: Invalid API key. Please try again.')
  }
}
