import { EventType } from '@libs/enum/event-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CreateEventDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    startDate: Date;

    @ApiProperty()
    @IsNotEmpty()
    endDate: Date;

    @ApiProperty({ enum: EventType })
    @IsNotEmpty()
    @IsEnum(EventType)
    type: EventType;

    @ApiProperty({ description: '조건 정보' })
    @IsNotEmpty()
    @IsObject()
    conditions: {
        type: EventType;
        description: string;
        config: Record<string, any>;
    };

    @ApiProperty({ description: '보상 ID 목록' })
    @IsNotEmpty()
    @IsString({ each: true })
    rewardIds: string[];
}
