import { IUserWithId } from '../interface/user.interface';

export function toUserResponseDto(user: any): IUserWithId {
    return {
        _id: user._id.toString(),
        email: user.email,
        name: user.name,
        password: user.password,
        role: user.role,
        loginCount: user.loginCount,
    };
}
