import * as vscode from 'vscode'
import { API_KEY_PREFIX } from '../config/constants'
import { BackendClient, type VerifyResponse } from '../api/backendClient'

const API_KEY_SECRET_KEY = 'commitcraft.apiKey'

export type UserState =
  | { isSignedIn: false }
  | {
      isSignedIn: true
      email: string
      tier: 'free' | 'pro'
      used: number
      limit: number
      resetDate: string
    }

export class AuthService {
  private _userState: UserState = { isSignedIn: false }
  private readonly _onStateChange = new vscode.EventEmitter<UserState>()
  readonly onStateChange = this._onStateChange.event

  constructor(
    private readonly secrets: vscode.SecretStorage,
    private readonly backendClient: BackendClient
  ) {}

  get userState(): UserState {
    return this._userState
  }

  async getApiKey(): Promise<string | undefined> {
    return this.secrets.get(API_KEY_SECRET_KEY)
  }

  async setApiKey(apiKey: string): Promise<void> {
    await this.secrets.store(API_KEY_SECRET_KEY, apiKey)
  }

  async clearApiKey(): Promise<void> {
    await this.secrets.delete(API_KEY_SECRET_KEY)
    this._userState = { isSignedIn: false }
    this._onStateChange.fire(this._userState)
  }

  isValidApiKeyFormat(key: string): boolean {
    return key.startsWith(API_KEY_PREFIX) && key.length > API_KEY_PREFIX.length + 16
  }

  async refreshState(): Promise<UserState> {
    const apiKey = await this.getApiKey()
    if (!apiKey) {
      this._userState = { isSignedIn: false }
      this._onStateChange.fire(this._userState)
      return this._userState
    }

    try {
      const data: VerifyResponse = await this.backendClient.verify(apiKey)
      if (data.valid) {
        this._userState = {
          isSignedIn: true,
          email: data.email,
          tier: data.tier,
          used: data.used,
          limit: data.limit,
          resetDate: data.resetDate,
        }
      } else {
        this._userState = { isSignedIn: false }
      }
    } catch {
      // Network error — keep previous state if signed in, else show not signed in
      if (!this._userState.isSignedIn) {
        this._userState = { isSignedIn: false }
      }
    }

    this._onStateChange.fire(this._userState)
    return this._userState
  }

  async signIn(apiKey: string): Promise<boolean> {
    if (!this.isValidApiKeyFormat(apiKey)) {
      return false
    }
    await this.setApiKey(apiKey)
    const state = await this.refreshState()
    return state.isSignedIn
  }
}
