import {
    EventRewardMapping,
    EventRewardMappingSchema,
} from '@libs/database/schemas/event-reward-mapping.schema';
import { EventSchema } from '@libs/database/schemas/event.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
    EventFactoryToken,
    EventRepositoryToken,
    EventRewardMappingRepositoryToken,
    EventServiceToken,
} from '../../common/constants/token.constants';
import { EventRewardMappingRepository } from '../reward/event-reward-mapping.repository';
import { EventController } from './event.controller';
import { EventFactory } from './event.factory';
import { EventRepository } from './event.repository';
import { EventService } from './event.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Event.name, schema: EventSchema },
            { name: EventRewardMapping.name, schema: EventRewardMappingSchema },
        ]),
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
        {
            provide: EventRewardMappingRepositoryToken,
            useClass: EventRewardMappingRepository,
        },
    ],
    exports: [EventServiceToken],
})
export class EventModule {}
