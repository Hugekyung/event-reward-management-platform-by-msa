import { RewardHistoryStatus } from '@libs/enum/reward-history-status.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsMongoId, IsOptional, Min } from 'class-validator';

export class RewardHistoryFilterDto {
    @ApiPropertyOptional({ description: '이벤트 ID' })
    @IsOptional()
    @IsMongoId()
    eventId?: string;

    @ApiPropertyOptional({ description: '보상 상태 (SUCCESS, FAILED)' })
    @IsOptional()
    @IsEnum(RewardHistoryStatus)
    status?: RewardHistoryStatus;

    @ApiPropertyOptional({
        description: '페이지 번호 (1부터 시작)',
        default: 1,
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page: number = 1;

    @ApiPropertyOptional({ description: '페이지당 항목 수', default: 10 })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    perPage: number = 10;

    @ApiPropertyOptional({
        description: '정렬 방법(1: 최신순, 2: 오래된 순)',
        default: 1,
    })
    @IsOptional()
    @IsInt()
    sort?: number = 1; // ! 최신 순, 오래된 순 => ENUM 으로 관리?
}

export class AdminRewardHistoryFilterDto extends RewardHistoryFilterDto {
    @ApiPropertyOptional()
    @IsMongoId()
    userId?: string; // 특정 유저 이력 조회
}
