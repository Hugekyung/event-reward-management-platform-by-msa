import { UserRole } from '@libs/enum/user-role.enum';
import {
    Body,
    Controller,
    Get,
    Inject,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common';
import { EventServiceToken } from '../../common/constants/token.constants';
import { Roles } from '../../common/decorators/role.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { IEventService } from '../../common/interface/event-service.interface';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events')
@UseGuards(RolesGuard)
export class EventController {
    constructor(
        @Inject(EventServiceToken) private readonly eventService: IEventService,
    ) {}

    @Post()
    @Roles(UserRole.OPERATOR, UserRole.ADMIN)
    create(@Body() dto: CreateEventDto): Promise<Event> {
        return this.eventService.createEvent(dto);
    }

    @Get()
    findAll(): Promise<Event[]> {
        return this.eventService.findAllEvents();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Event> {
        return this.eventService.findEventById(id);
    }
}
