export interface UserAccountEntity {
  id: string
  email: string
  fullname: string
  password: string
  phoneNumber: string
  twoFactorAuth: boolean
  status: boolean
  isRoot: boolean
  createdAt: string
  updatedAt: string
}
