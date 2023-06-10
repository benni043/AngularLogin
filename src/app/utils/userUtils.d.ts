export type User = {
  id: number,
  jwtToken: string,
  email: string,
  userName: string,
  password: string
}

export type DisplayUser = {
  id: number,
  email: string,
  userName: string,
}

export type UserRequest = {
  email: string,
  userName: string,
  password: string
}

export type UserResponse = {
  id: number,
  token: string
}
