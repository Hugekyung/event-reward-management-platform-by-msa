import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto {
    @ApiProperty({ description: '이벤트 이름' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: '이벤트 조건 설명' })
    @IsString()
    @IsNotEmpty()
    conditionDescription: string;

    @ApiProperty({ description: '이벤트 타입 (출석, 초대, 퀘스트 등)' })
    @IsString()
    @IsNotEmpty()
    type: string; // ! 추후 ENUM 타입으로 뺴기
}
