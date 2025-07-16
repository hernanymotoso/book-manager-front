export type UserModel = {
  id: string
  name: string
  email: string
  token: string
  password: string
}

export type UserAuthenticated = Omit<UserModel, 'password'>
