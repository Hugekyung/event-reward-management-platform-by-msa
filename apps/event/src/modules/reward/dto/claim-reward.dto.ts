import { EventType } from '@libs/enum/event-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';

export class ClaimRewardDto {
    @ApiProperty({ description: '이벤트 ID', example: '6646cc...' })
    @IsNotEmpty()
    @IsMongoId()
    eventId: string;

    @ApiProperty({
        description: '이벤트 유형',
        enum: EventType,
        example: EventType.ATTENDANCE,
    })
    @IsNotEmpty()
    @IsEnum(EventType)
    type: EventType;
}
