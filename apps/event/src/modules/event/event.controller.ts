import { IEventWithId } from '@libs/database/interface/event.interface';
import { UserRole } from '@libs/enum/user-role.enum';
import {
    Body,
    Controller,
    Get,
    Inject,
    Param,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { EventServiceToken } from '../../common/constants/token.constants';
import { Roles } from '../../common/decorators/role.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { IEventService } from '../../common/interface/event-service.interface';
import { CreateEventDto } from './dto/create-event.dto';

@ApiTags('Event')
@Controller('events')
@UseGuards(RolesGuard)
export class EventController {
    constructor(
        @Inject(EventServiceToken) private readonly eventService: IEventService,
    ) {}

    @Post()
    @Roles(UserRole.OPERATOR, UserRole.ADMIN)
    @ApiOperation({
        summary: '신규 이벤트 등록(OPERATOR, ADMIN 관리자만 요청 가능)',
    })
    async createEvent(
        @Body() createEventDto: CreateEventDto,
        @Req() request: Request & { user: { id: string } }, // ! 타입 다시 확인
    ): Promise<IEventWithId> {
        return await this.eventService.createEvent(
            createEventDto,
            request.user.id,
        );
    }

    @Get()
    @ApiOperation({ summary: '이벤트 목록 조회' })
    async findAllEvents(): Promise<IEventWithId[]> {
        return await this.eventService.findAllEvents();
    }

    @Get(':eventId')
    @ApiOperation({ summary: '이벤트 상세 조회' })
    async findEventById(
        @Param('eventId') eventId: string,
    ): Promise<IEventWithId> {
        return await this.eventService.findEventById(eventId);
    }
}
