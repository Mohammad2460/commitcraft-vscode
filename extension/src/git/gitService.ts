import * as vscode from 'vscode'

// Type definitions for VS Code Git API
interface GitRepository {
  diff(cached: boolean): Promise<string>
  readonly state: {
    HEAD: { name?: string } | undefined
    indexChanges: Array<{ uri: vscode.Uri }>
    workingTreeChanges: Array<{ uri: vscode.Uri }>
  }
  readonly inputBox: {
    value: string
  }
}

interface GitAPI {
  readonly repositories: GitRepository[]
}

export class GitService {
  private gitApi: GitAPI | null = null

  async initialize(): Promise<boolean> {
    const gitExtension = vscode.extensions.getExtension('vscode.git')
    if (!gitExtension) {
      return false
    }
    if (!gitExtension.isActive) {
      await gitExtension.activate()
    }
    this.gitApi = gitExtension.exports.getAPI(1) as GitAPI
    return true
  }

  private getRepo(): GitRepository {
    if (!this.gitApi) {
      throw new Error('Git extension not initialized')
    }
    if (this.gitApi.repositories.length === 0) {
      throw new Error('No git repository found in workspace')
    }
    return this.gitApi.repositories[0]
  }

  async getStagedDiff(): Promise<string> {
    const repo = this.getRepo()
    return await repo.diff(true) // true = staged (index) diff
  }

  async getUnstagedDiff(): Promise<string> {
    const repo = this.getRepo()
    return await repo.diff(false) // false = working tree diff
  }

  async hasStagedChanges(): Promise<boolean> {
    const repo = this.getRepo()
    return repo.state.indexChanges.length > 0
  }

  async hasAnyChanges(): Promise<boolean> {
    const repo = this.getRepo()
    return repo.state.indexChanges.length > 0 || repo.state.workingTreeChanges.length > 0
  }

  async getBranchName(): Promise<string> {
    const repo = this.getRepo()
    return repo.state.HEAD?.name ?? 'main'
  }

  async fillCommitMessage(message: string): Promise<void> {
    const repo = this.getRepo()
    repo.inputBox.value = message
  }

  isAvailable(): boolean {
    return this.gitApi !== null && this.gitApi.repositories.length > 0
  }
}
