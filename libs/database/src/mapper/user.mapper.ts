import { IUserWithId } from '../interface/user.interface';

export function toUserResponseDto(user: any): Partial<IUserWithId> {
    return {
        _id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
    };
}
