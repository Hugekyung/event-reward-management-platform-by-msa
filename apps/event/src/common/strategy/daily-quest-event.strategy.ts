import { BadRequestException } from '@nestjs/common';
import { IEventConditionStrategy } from '../interface/event-condition-strategy.interface';

export class DailyQuestStrategy implements IEventConditionStrategy {
    validate(config: Record<string, any>): void {
        if (!config.questId) {
            throw new BadRequestException('퀘스트 ID가 필요합니다.');
        }
    }
}
