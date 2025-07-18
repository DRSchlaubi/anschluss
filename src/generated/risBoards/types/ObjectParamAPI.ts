import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration, ConfigurationOptions } from '../configuration'
import type { Middleware } from '../middleware';

import { Administration } from '../models/Administration';
import { BoardPublicArrival } from '../models/BoardPublicArrival';
import { BoardPublicDeparture } from '../models/BoardPublicDeparture';
import { CodeShare } from '../models/CodeShare';
import { DirectionInfo } from '../models/DirectionInfo';
import { DisruptionCommunicationDescription } from '../models/DisruptionCommunicationDescription';
import { DisruptionCommunicationEmbeddedLegacy } from '../models/DisruptionCommunicationEmbeddedLegacy';
import { ErrorDetail } from '../models/ErrorDetail';
import { ErrorResponse } from '../models/ErrorResponse';
import { JourneyType } from '../models/JourneyType';
import { MessageAttributeLegacy } from '../models/MessageAttributeLegacy';
import { MessageLegacy } from '../models/MessageLegacy';
import { MessageType } from '../models/MessageType';
import { ReplacementTransport } from '../models/ReplacementTransport';
import { SortKeyTime } from '../models/SortKeyTime';
import { StopArrival } from '../models/StopArrival';
import { StopAtStopPlace } from '../models/StopAtStopPlace';
import { StopAtStopPlacePrio } from '../models/StopAtStopPlacePrio';
import { StopDeparture } from '../models/StopDeparture';
import { StopPlaceEmbedded } from '../models/StopPlaceEmbedded';
import { TimeType } from '../models/TimeType';
import { TransportPublicDestination } from '../models/TransportPublicDestination';
import { TransportPublicDestinationPortionWorking } from '../models/TransportPublicDestinationPortionWorking';
import { TransportPublicDestinationVia } from '../models/TransportPublicDestinationVia';
import { TransportPublicOrigin } from '../models/TransportPublicOrigin';
import { TransportPublicOriginVia } from '../models/TransportPublicOriginVia';
import { TransportType } from '../models/TransportType';

import { ObservableBoardsApi } from "./ObservableAPI";
import { BoardsApiRequestFactory, BoardsApiResponseProcessor} from "../apis/BoardsApi";

export interface BoardsApiBoardArrivalRequest {
    /**
     * list of eva numbers of stations [Bahnhofe] to get board for (maximum of 10 numbers are allowed)
     * Defaults to: undefined
     * @type Array&lt;string&gt;
     * @memberof BoardsApiboardArrival
     */
    evaNumbers: Array<string>
    /**
     * start time for board as fully qualified datetime (ISO8601 with timezone / offset, for instance yyyy-MM-ddTHH:mm:ssZ), if omitted current time will be used (max of 7 days in the past is allowed)
     * Defaults to: undefined
     * @type Date
     * @memberof BoardsApiboardArrival
     */
    timeStart?: Date
    /**
     * end time for board as fully qualified datetime (ISO8601 with timezone / offset, for instance yyyy-MM-ddTHH:mm:ssZ), if omitted start time plus 30 minutes will be used (max of 12h is allowed for time span)
     * Defaults to: undefined
     * @type Date
     * @memberof BoardsApiboardArrival
     */
    timeEnd?: Date
    /**
     * should all stations of group the requested eva numbers belong to (for instance a request to \&#39;FFM Hoch\&#39; would also return \&#39;FFM tief\&#39;) be included
     * Defaults to: true
     * @type boolean
     * @memberof BoardsApiboardArrival
     */
    includeStationGroup?: boolean
    /**
     * include messages [Meldungen / Freitexte] and disruptions [Störungen], if false no messages and disruption information will be returned
     * Defaults to: true
     * @type boolean
     * @memberof BoardsApiboardArrival
     */
    includeMessagesDisruptions?: boolean
    /**
     * filter for transport types that should be returned, if omitted all types of transport are returned
     * Defaults to: undefined
     * @type Array&lt;TransportType&gt;
     * @memberof BoardsApiboardArrival
     */
    filterTransports?: Array<TransportType>
    /**
     * limits amount of via stops per transport (limitation doesn\&#39;t apply to additional and canceled stops), if omitted all via stops are returned, if zero no via stops are returned
     * Defaults to: undefined
     * @type number
     * @memberof BoardsApiboardArrival
     */
    maxViaStops?: number
    /**
     * limits amount of results per transport type, if omitted no truncation is applied
     * Defaults to: undefined
     * @type number
     * @memberof BoardsApiboardArrival
     */
    maxTransportsPerType?: number
    /**
     * define sorting order, if omitted sorting is by TIME - TIME (Sorting based on best known time information ie real before preview before schedule) - TIME_SCHEDULE (Sorting based on schedule time)
     * Defaults to: undefined
     * @type SortKeyTime
     * @memberof BoardsApiboardArrival
     */
    sortBy?: SortKeyTime
}

export interface BoardsApiBoardDepartureRequest {
    /**
     * list of eva numbers of stations [Bahnhöfe] to get board for (maximum of 10 numbers are allowed)
     * Defaults to: undefined
     * @type Array&lt;string&gt;
     * @memberof BoardsApiboardDeparture
     */
    evaNumbers: Array<string>
    /**
     * start time for board as fully qualified datetime (ISO8601 with timezone / offset, for instance yyyy-MM-ddTHH:mm:ssZ), if omitted current time will be used (max of 7 days in the past is allowed)
     * Defaults to: undefined
     * @type Date
     * @memberof BoardsApiboardDeparture
     */
    timeStart?: Date
    /**
     * end time for board as fully qualified datetime (ISO8601 with timezone / offset, for instance yyyy-MM-ddTHH:mm:ssZ), if omitted start time plus 30 minutes will be used (max of 12h is allowed for time span)
     * Defaults to: undefined
     * @type Date
     * @memberof BoardsApiboardDeparture
     */
    timeEnd?: Date
    /**
     * should all stations of group the requested eva numbers belong to (for instance a request to \&#39;FFM Hoch\&#39; would also return \&#39;FFM tief\&#39;) be included
     * Defaults to: true
     * @type boolean
     * @memberof BoardsApiboardDeparture
     */
    includeStationGroup?: boolean
    /**
     * include messages [Meldungen / Freitexte] and disruptions [Störungen], if false no messages and disruption information will be returned
     * Defaults to: true
     * @type boolean
     * @memberof BoardsApiboardDeparture
     */
    includeMessagesDisruptions?: boolean
    /**
     * filter for transport types that should be returned, if omitted all types of transport are returned
     * Defaults to: undefined
     * @type Array&lt;TransportType&gt;
     * @memberof BoardsApiboardDeparture
     */
    filterTransports?: Array<TransportType>
    /**
     * limits amount of via stops per transport (limitation doesn\&#39;t apply to additional and canceled stops), if omitted all via stops are returned, if zero no via stops are returned
     * Defaults to: undefined
     * @type number
     * @memberof BoardsApiboardDeparture
     */
    maxViaStops?: number
    /**
     * limits amount of results per transport type, if omitted no truncation is applied
     * Defaults to: undefined
     * @type number
     * @memberof BoardsApiboardDeparture
     */
    maxTransportsPerType?: number
    /**
     * define sorting order, if omitted sorting is by TIME - TIME (Sorting based on best known time information ie real before preview before schedule) - TIME_SCHEDULE (Sorting based on schedule time)
     * Defaults to: undefined
     * @type SortKeyTime
     * @memberof BoardsApiboardDeparture
     */
    sortBy?: SortKeyTime
}

export class ObjectBoardsApi {
    private api: ObservableBoardsApi

    public constructor(configuration: Configuration, requestFactory?: BoardsApiRequestFactory, responseProcessor?: BoardsApiResponseProcessor) {
        this.api = new ObservableBoardsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Returns an arrival board [Ankunftstafel] for all public transports [Öffentliche Verkehre].
     * @param param the request object
     */
    public boardArrivalWithHttpInfo(param: BoardsApiBoardArrivalRequest, options?: ConfigurationOptions): Promise<HttpInfo<BoardPublicArrival>> {
        return this.api.boardArrivalWithHttpInfo(param.evaNumbers, param.timeStart, param.timeEnd, param.includeStationGroup, param.includeMessagesDisruptions, param.filterTransports, param.maxViaStops, param.maxTransportsPerType, param.sortBy,  options).toPromise();
    }

    /**
     * Returns an arrival board [Ankunftstafel] for all public transports [Öffentliche Verkehre].
     * @param param the request object
     */
    public boardArrival(param: BoardsApiBoardArrivalRequest, options?: ConfigurationOptions): Promise<BoardPublicArrival> {
        return this.api.boardArrival(param.evaNumbers, param.timeStart, param.timeEnd, param.includeStationGroup, param.includeMessagesDisruptions, param.filterTransports, param.maxViaStops, param.maxTransportsPerType, param.sortBy,  options).toPromise();
    }

    /**
     * Returns a departure board [Abfahrtstafel] for all public transports [Öffentliche Verkehre].
     * @param param the request object
     */
    public boardDepartureWithHttpInfo(param: BoardsApiBoardDepartureRequest, options?: ConfigurationOptions): Promise<HttpInfo<BoardPublicDeparture>> {
        return this.api.boardDepartureWithHttpInfo(param.evaNumbers, param.timeStart, param.timeEnd, param.includeStationGroup, param.includeMessagesDisruptions, param.filterTransports, param.maxViaStops, param.maxTransportsPerType, param.sortBy,  options).toPromise();
    }

    /**
     * Returns a departure board [Abfahrtstafel] for all public transports [Öffentliche Verkehre].
     * @param param the request object
     */
    public boardDeparture(param: BoardsApiBoardDepartureRequest, options?: ConfigurationOptions): Promise<BoardPublicDeparture> {
        return this.api.boardDeparture(param.evaNumbers, param.timeStart, param.timeEnd, param.includeStationGroup, param.includeMessagesDisruptions, param.filterTransports, param.maxViaStops, param.maxTransportsPerType, param.sortBy,  options).toPromise();
    }

}
