import * as vscode from 'vscode'
import type { GitService } from '../git/gitService'
import type { AuthService } from '../auth/authService'
import type { BackendClient } from '../api/backendClient'
import type { StatusBarManager } from '../ui/statusBar'
import { BackendError } from '../api/backendClient'
import { CommitPanel } from '../ui/commitPanel'
import { UPGRADE_URL } from '../config/constants'

type GenerationType = 'commit' | 'pr' | 'changelog'

export async function generateCommitCommand(
  context: vscode.ExtensionContext,
  gitService: GitService,
  authService: AuthService,
  backendClient: BackendClient,
  statusBar: StatusBarManager,
  type: GenerationType
): Promise<void> {
  // 1. Check auth
  const apiKey = await authService.getApiKey()
  if (!apiKey) {
    const action = await vscode.window.showErrorMessage(
      'CommitCraft: Sign in to generate commit messages.',
      'Sign In'
    )
    if (action === 'Sign In') {
      vscode.commands.executeCommand('commitcraft.login')
    }
    return
  }

  // 2. Initialize git if needed
  if (!gitService.isAvailable()) {
    await gitService.initialize()
    if (!gitService.isAvailable()) {
      vscode.window.showErrorMessage('CommitCraft: No git repository found in workspace.')
      return
    }
  }

  // 3. Get git diff
  let diff: string
  let usingUnstaged = false

  try {
    const hasStagedChanges = await gitService.hasStagedChanges()

    if (hasStagedChanges) {
      diff = await gitService.getStagedDiff()
    } else {
      const hasAnyChanges = await gitService.hasAnyChanges()
      if (!hasAnyChanges) {
        vscode.window.showWarningMessage('CommitCraft: No changes found. Make some code changes first.')
        return
      }

      diff = await gitService.getUnstagedDiff()
      usingUnstaged = true
      void vscode.window.showInformationMessage(
        'CommitCraft: No staged changes found. Using unstaged changes instead.'
      )
    }

    if (!diff || diff.trim() === '') {
      vscode.window.showWarningMessage(
        usingUnstaged
          ? 'CommitCraft: No unstaged changes found either.'
          : 'CommitCraft: Staged diff is empty. Try staging your changes first.'
      )
      return
    }
  } catch (err) {
    vscode.window.showErrorMessage(`CommitCraft: Failed to read git diff — ${err instanceof Error ? err.message : String(err)}`)
    return
  }

  // 4. Get config
  const config = vscode.workspace.getConfiguration('commitcraft')
  const style = config.get<'conventional' | 'gitmoji' | 'simple'>('commitStyle', 'conventional')

  let branchName: string
  try {
    branchName = await gitService.getBranchName()
  } catch {
    branchName = 'main'
  }

  // 5. Show panel with loading
  const panel = CommitPanel.createOrShow(context, type)
  panel.showLoading(type)
  statusBar.setLoading()

  // 6. Call backend
  try {
    const result = await backendClient.generate(
      { diff, style, branchName, type },
      apiKey
    )

    panel.showResult(result, type)
    await authService.refreshState()
    statusBar.update(authService.userState)

  } catch (err) {
    statusBar.update(authService.userState)

    if (err instanceof BackendError) {
      if (err.status === 402 || err.code === 'quota_exceeded') {
        // Show upgrade only in panel — no duplicate notification
        panel.showError('Monthly limit reached — upgrade to Pro for unlimited generations.', true)
      } else if (err.status === 401) {
        panel.showError('Authentication expired. Please sign in again.')
        vscode.window.showErrorMessage('CommitCraft: Your session expired. Please sign in again.', 'Sign In').then(action => {
          if (action === 'Sign In') vscode.commands.executeCommand('commitcraft.login')
        })
      } else if (err.status === 429 || err.code === 'rate_limited') {
        panel.showError('AI service is busy. Please try again in a moment.')
        vscode.window.showWarningMessage('CommitCraft: Rate limited. Please try again in a few seconds.')
      } else {
        panel.showError(`Error: ${err.message}`)
        vscode.window.showErrorMessage(`CommitCraft: ${err.message}`)
      }
    } else {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      panel.showError(`Network error: ${msg}`)
      vscode.window.showErrorMessage(`CommitCraft: Network error — ${msg}`)
    }
  }
}
