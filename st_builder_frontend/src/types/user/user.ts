export interface IUser {
  userId: number,
  email: string,
  username: string | null,
  roles: string[],
  createdAt: Date,
  updatedAt: Date,
}