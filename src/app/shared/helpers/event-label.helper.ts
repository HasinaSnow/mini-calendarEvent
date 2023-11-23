import { IEventLabels } from "src/app/core/models/event.model";
import { CATEG_EVENT_LABEL, CONFIRMED_EVENT_LABEL, CUSTOMER_EVENT_LABEL, DATE_EVENT_LABEL, INFOS_EVENT_LABEL, NOT_CONFIRMED_EVENT_LABEL, PLACE_EVENT_LABEL, TYPE_EVENT_LABEL } from "src/app/shared/values/default-labels.values";

export class EventLabelHelper {
    static getEventLabels(): IEventLabels {
        return {
            dateLabel: DATE_EVENT_LABEL,
            placeLabel: PLACE_EVENT_LABEL,
            typeLabel: TYPE_EVENT_LABEL,
            categLabel: CATEG_EVENT_LABEL,
            customerLabel: CUSTOMER_EVENT_LABEL,
            confirmedLabel: CONFIRMED_EVENT_LABEL,
            notConfirmedLabel: NOT_CONFIRMED_EVENT_LABEL,
            infosLabel:  INFOS_EVENT_LABEL
        }
    }
}