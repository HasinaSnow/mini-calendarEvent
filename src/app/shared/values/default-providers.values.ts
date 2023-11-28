import { LocalStorageEventGateway } from 'src/app/core/adapters/Local Storage/local-storage-event.gateway';
import { LocalStorageCategoryGateway } from 'src/app/core/adapters/Local Storage/local-storge-category.gateway';
import { InMemoryCategGateway } from 'src/app/core/adapters/in-memory-categ.gateway';
import { InMemoryEventGateway } from 'src/app/core/adapters/in-memory-event.gateway';
import { StubCategoryBuilder } from 'src/app/core/models/builder/category.builder';
import { StubEventBuilder } from 'src/app/core/models/builder/event.builder';
import { ICategory } from 'src/app/core/models/category.model';
import { IEvent } from 'src/app/core/models/event.model';
import { CategGateway } from 'src/app/core/ports/categ.gateway';
import { EventGateway } from 'src/app/core/ports/event.gateway';

const defaultCategsValues: ICategory[] = [
  new StubCategoryBuilder()
    .withId(1)
    .withName('Mariage')
    .withColor('#f1f1f1')
    .withInfos('lorem mariage ...')
    .build(),
  new StubCategoryBuilder()
    .withId(2)
    .withName('Fiancaille')
    .withColor('#b2b2b2')
    .withInfos('lorem fiancaille ...')
    .build(),
  new StubCategoryBuilder()
    .withId(3)
    .withName('Sortie de promition')
    .withColor('#323232')
    .withInfos('lorem sortie de promotion ...')
    .build(),
  new StubCategoryBuilder()
    .withId(4)
    .withName('Baptême')
    .withColor('#343234')
    .withInfos('lorem baptême ...')
    .build(),
]

const defaultEventsValues: IEvent[] = [
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
]

export const DEFAULT_IN_MEMORY_PROVIDERS = [
  {
    provide: CategGateway,
    useValue: new InMemoryCategGateway().withCategs(defaultCategsValues),
  },
  {
    provide: EventGateway,
    useValue: new InMemoryEventGateway().withEvents(defaultEventsValues),
  },
];

export const DEFAULT_LOCAL_STORAGE_PROVIDERS = [
  {
    provide: CategGateway,
    useValue: new LocalStorageCategoryGateway(),
  },
  {
    provide: EventGateway,
    useValue: new LocalStorageEventGateway()
  }
]
