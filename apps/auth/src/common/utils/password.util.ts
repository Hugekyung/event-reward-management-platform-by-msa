import { compare, hash } from 'bcrypt';

export class PasswordUtil {
    private static readonly SALT_ROUNDS = 12;

    static async generateHash(pwd: string): Promise<string> {
        return await hash(pwd, PasswordUtil.SALT_ROUNDS);
    }

    static async verify(pwd: string, hashed: string): Promise<boolean> {
        return await compare(pwd, hashed);
    }
}
