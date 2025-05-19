import { RewardType } from '@libs/enum/reward-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateRewardDto {
    @ApiProperty({ enum: RewardType })
    @IsEnum(RewardType)
    type: RewardType;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty({ required: false })
    @IsOptional()
    description?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    amount?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    itemGroupName?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    discountAmount?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    minimumOrderPrice?: number;
}
