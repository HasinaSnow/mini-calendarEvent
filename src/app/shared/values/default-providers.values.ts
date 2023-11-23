import { InMemoryCategGateway } from 'src/app/core/adapters/in-memory-categ.gateway';
import { InMemoryEventGateway } from 'src/app/core/adapters/in-memory-event.gateway';
import { StubCategoryBuilder } from 'src/app/core/models/builder/category.builder';
import { StubEventBuilder } from 'src/app/core/models/builder/event.builder';
import { CategGateway } from 'src/app/core/ports/categ.gateway';
import { EventGateway } from 'src/app/core/ports/event.gateway';

export const DEFAULT_IN_MEMORY_PROVIDERS = [
  {
    provide: CategGateway,
    useValue: new InMemoryCategGateway().withCategs([
      new StubCategoryBuilder()
        .withId(1)
        .withName('Mariage')
        .withColor('red')
        .withInfos('lorem mariage ...')
        .build(),
      new StubCategoryBuilder()
        .withId(2)
        .withName('Fiancaille')
        .withColor('green')
        .withInfos('lorem fiancaille ...')
        .build(),
      new StubCategoryBuilder()
        .withId(3)
        .withName('Sortie de promition')
        .withColor('yellow')
        .withInfos('lorem sortie de promotion ...')
        .build(),
      new StubCategoryBuilder()
        .withId(4)
        .withName('Baptême')
        .withColor('pink')
        .withInfos('lorem baptême ...')
        .build(),
    ]),
  },
  {
    provide: EventGateway,
    useValue: new InMemoryEventGateway().withEvents([
      new StubEventBuilder()
        .withId(1)
        .withConfirmed()
        .build({ categName: 'Mariage' }),
      new StubEventBuilder()
        .withId(2)
        .withUnConfirmed()
        .build({ categName: 'Baptême' }),
      new StubEventBuilder()
        .withId(3)
        .withConfirmed()
        .build({ categName: 'Mariage' }),
      new StubEventBuilder()
        .withId(4)
        .withConfirmed()
        .build({ categName: 'Mariage' }),
      new StubEventBuilder()
        .withId(5)
        .withUnConfirmed()
        .build({ categName: 'Baptême' }),
      new StubEventBuilder()
        .withId(6)
        .withConfirmed()
        .build({ categName: 'Mariage' }),
    ]),
  },
];
