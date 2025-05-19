import { EventType } from '@libs/enum/event-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto {
    @ApiProperty({ description: '이벤트 이름' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: '이벤트 조건 설명' })
    @IsString()
    @IsNotEmpty()
    conditionDescription: string;

    @ApiProperty({
        enum: EventType,
        description: '이벤트 타입 (출석, 초대, 퀘스트, 업그레이드)',
    })
    @IsEnum(EventType)
    @IsNotEmpty()
    type: EventType;
}
