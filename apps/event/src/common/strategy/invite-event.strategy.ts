import { BadRequestException } from '@nestjs/common';
import { IEventConditionStrategy } from '../interface/event-condition-strategy.interface';

export class InviteFriendStrategy implements IEventConditionStrategy {
    validate(config: Record<string, any>): void {
        if (typeof config.targetCount !== 'number' || config.targetCount <= 0) {
            throw new BadRequestException('초대 수는 1명 이상이어야 합니다.');
        }
    }
}
