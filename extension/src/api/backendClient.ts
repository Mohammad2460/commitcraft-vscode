import * as vscode from 'vscode'
import { BACKEND_URL_DEFAULT } from '../config/constants'

export interface GenerateRequest {
  diff: string
  style: 'conventional' | 'gitmoji' | 'simple'
  branchName: string
  type: 'commit' | 'pr' | 'changelog'
}

export interface GenerateResponse {
  title: string
  body: string
  bullets: string[]
  generationsRemaining: number
}

export interface VerifyResponse {
  valid: boolean
  email: string
  tier: 'free' | 'pro'
  used: number
  limit: number
  resetDate: string
}

export class BackendError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string
  ) {
    super(message)
    this.name = 'BackendError'
  }
}

export class BackendClient {
  private get baseUrl(): string {
    const config = vscode.workspace.getConfiguration('commitcraft')
    return config.get<string>('backendUrl', BACKEND_URL_DEFAULT).replace(/\/$/, '')
  }

  private async request<T>(
    path: string,
    options: RequestInit,
    apiKey: string
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        ...options.headers,
      },
    })

    if (!response.ok) {
      let errorData: { message?: string; code?: string } = {}
      try {
        errorData = await response.json() as typeof errorData
      } catch {
        // ignore parse error
      }
      throw new BackendError(
        errorData.message ?? `Request failed with status ${response.status}`,
        response.status,
        errorData.code
      )
    }

    return response.json() as Promise<T>
  }

  async generate(params: GenerateRequest, apiKey: string): Promise<GenerateResponse> {
    return this.request<GenerateResponse>('/api/generate', {
      method: 'POST',
      body: JSON.stringify(params),
    }, apiKey)
  }

  async verify(apiKey: string): Promise<VerifyResponse> {
    return this.request<VerifyResponse>('/api/auth/verify', {
      method: 'GET',
    }, apiKey)
  }

  async register(email: string): Promise<{ message: string; isExisting: boolean }> {
    // Register doesn't need API key
    const url = `${this.baseUrl}/api/auth/register`
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    if (!response.ok) {
      const err = await response.json() as { message?: string }
      throw new BackendError(err.message ?? 'Registration failed', response.status)
    }
    return response.json() as Promise<{ message: string; isExisting: boolean }>
  }
}
