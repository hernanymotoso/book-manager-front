const localStorageKeys = {
  users: '@book-manager_users'
} as const

type LocalStorageKey = (typeof localStorageKeys)[keyof typeof localStorageKeys]

export const localStorageHelper = {
  save(key: LocalStorageKey, data: any) {
    localStorage.setItem(key, JSON.stringify(data))
  },
  get<T = unknown>(key: LocalStorageKey): T | null {
    const value = localStorage.getItem(key)
    if (!value) return null
    try {
      return JSON.parse(value) as T
    } catch {
      return null
    }
  }
}
