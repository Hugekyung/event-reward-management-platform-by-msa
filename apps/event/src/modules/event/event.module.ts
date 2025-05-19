import { EventSchema } from '@libs/database/schemas/event.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
    EventFactoryToken,
    EventRepositoryToken,
    EventServiceToken,
} from '../../common/constants/token.constants';
import { EventController } from './event.controller';
import { EventFactory } from './event.factory';
import { EventRepository } from './event.repository';
import { EventService } from './event.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    ],
    controllers: [EventController],
    providers: [
        EventService,
        {
            provide: EventFactoryToken,
            useClass: EventFactory,
        },
        {
            provide: EventServiceToken,
            useClass: EventService,
        },
        {
            provide: EventRepositoryToken,
            useClass: EventRepository,
        },
    ],
    exports: [EventServiceToken],
})
export class EventModule {}
