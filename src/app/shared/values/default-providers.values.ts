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

const DATE_REF = new Date()

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
    .withName('Sortie de promotion')
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
    .withDate(new Date(DATE_REF.getFullYear(), DATE_REF.getMonth(), 12))
    .withConfirmed()
    .build({ categName: 'Mariage' }),
  new StubEventBuilder()
    .withId(2)
    .withDate(new Date(DATE_REF.getFullYear(), DATE_REF.getMonth(), 12))
    .withUnConfirmed()
    .build({ categName: 'Baptême' }),
  new StubEventBuilder()
    .withId(3)
    .withDate(new Date(DATE_REF.getFullYear(), DATE_REF.getMonth(), 22))
    .withConfirmed()
    .build({ categName: 'Mariage' }),
  new StubEventBuilder()
    .withId(4)
    .withDate(new Date(DATE_REF.getFullYear(), DATE_REF.getMonth(), 24))
    .withConfirmed()
    .build({ categName: 'Fiançaille' }),
  new StubEventBuilder()
    .withId(5)
    .withDate(new Date(DATE_REF.getFullYear(), DATE_REF.getMonth(), 24))
    .withUnConfirmed()
    .build({ categName: 'Baptême' }),
  new StubEventBuilder()
    .withId(6)
    .withDate(new Date(DATE_REF.getFullYear(), DATE_REF.getMonth(), 24))
    .withConfirmed()
    .build({ categName: 'Sortie de promotion' }),
    new StubEventBuilder()
    .withId(6)
    .withDate(new Date(DATE_REF.getFullYear(), DATE_REF.getMonth(), 28))
    .withConfirmed()
    .build({ categName: 'Fiançaille' }),
  new StubEventBuilder()
    .withId(6)
    .withDate(new Date(DATE_REF.getFullYear(), DATE_REF.getMonth() + 1, 24))
    .withConfirmed()
    .build({ categName: 'Fiançaille' }),
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
    useValue: new LocalStorageCategoryGateway().withCategs(defaultCategsValues),
  },
  {
    provide: EventGateway,
    useValue: new LocalStorageEventGateway().withEvents(defaultEventsValues)
  }
]
