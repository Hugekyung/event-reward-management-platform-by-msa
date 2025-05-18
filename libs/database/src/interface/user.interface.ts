export interface IUser {
    email: string;
    name: string;
    password: string;
    role: string;
    refreshToken?: string;
    deletedAt?: Date;
}
