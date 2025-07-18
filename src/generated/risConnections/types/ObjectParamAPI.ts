import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration, ConfigurationOptions } from '../configuration'
import type { Middleware } from '../middleware';

import { Administration } from '../models/Administration';
import { CodeShare } from '../models/CodeShare';
import { ConnectionArrival } from '../models/ConnectionArrival';
import { ConnectionEvaluationLegacy } from '../models/ConnectionEvaluationLegacy';
import { ConnectionPlatformHint } from '../models/ConnectionPlatformHint';
import { ConnectionSource } from '../models/ConnectionSource';
import { ConnectionStatus } from '../models/ConnectionStatus';
import { ContractualKnowledge } from '../models/ContractualKnowledge';
import { DirectionInfo } from '../models/DirectionInfo';
import { DispositionStatus } from '../models/DispositionStatus';
import { DispositionType } from '../models/DispositionType';
import { DisruptionCommunicationDescription } from '../models/DisruptionCommunicationDescription';
import { DisruptionCommunicationEmbeddedLegacy } from '../models/DisruptionCommunicationEmbeddedLegacy';
import { ErrorDetail } from '../models/ErrorDetail';
import { ErrorResponse } from '../models/ErrorResponse';
import { JourneyType } from '../models/JourneyType';
import { MessageAttributeLegacy } from '../models/MessageAttributeLegacy';
import { MessageLegacy } from '../models/MessageLegacy';
import { MessageType } from '../models/MessageType';
import { PersonaType } from '../models/PersonaType';
import { ReplacementTransport } from '../models/ReplacementTransport';
import { SortKeyTime } from '../models/SortKeyTime';
import { StopAtStopPlace } from '../models/StopAtStopPlace';
import { StopAtStopPlacePrio } from '../models/StopAtStopPlacePrio';
import { StopDepartureConnect } from '../models/StopDepartureConnect';
import { StopPlaceEmbedded } from '../models/StopPlaceEmbedded';
import { TimeType } from '../models/TimeType';
import { TransportPublicDestination } from '../models/TransportPublicDestination';
import { TransportPublicDestinationPortionWorking } from '../models/TransportPublicDestinationPortionWorking';
import { TransportPublicDestinationVia } from '../models/TransportPublicDestinationVia';
import { TransportType } from '../models/TransportType';

import { ObservableConnectionsApi } from "./ObservableAPI";
import { ConnectionsApiRequestFactory, ConnectionsApiResponseProcessor} from "../apis/ConnectionsApi";

export interface ConnectionsApiConnectionsArrivalRequest {
    /**
     * id of journey [FahrtID]
     * Defaults to: undefined
     * @type string
     * @memberof ConnectionsApiconnectionsArrival
     */
    journeyID: string
    /**
     * id of arrival [AnkunftID]
     * Defaults to: undefined
     * @type string
     * @memberof ConnectionsApiconnectionsArrival
     */
    arrivalID: string
    /**
     * time slot in minutes starting at arrivaltime of the requested arrivalID, in which the connections depart from the station (group) of the arrival, if omitted defaults to 30 minutes (max of 12h is allowed for time span)
     * Defaults to: undefined
     * @type number
     * @memberof ConnectionsApiconnectionsArrival
     */
    timeSlot?: number
    /**
     * should all stations of group the requested eva numbers belong to (for instance a request to \&#39;FFM Hoch\&#39; would also return \&#39;FFM tief\&#39;) be included
     * Defaults to: true
     * @type boolean
     * @memberof ConnectionsApiconnectionsArrival
     */
    includeStationGroup?: boolean
    /**
     * include messages [Meldungen / Freitexte] and disruptions [Stoerungen], if false no messages and disruption information will be returned
     * Defaults to: true
     * @type boolean
     * @memberof ConnectionsApiconnectionsArrival
     */
    includeMessagesDisruptions?: boolean
    /**
     * indicates whether only possible connections should be returned, if false also impossible connections (connect time too short or connection in the past due to delays) are returned
     * Defaults to: true
     * @type boolean
     * @memberof ConnectionsApiconnectionsArrival
     */
    onlyPossibleConnections?: boolean
    /**
     * filter for transport types that should be returned, if ommitted all types of transport are returned
     * Defaults to: undefined
     * @type Array&lt;TransportType&gt;
     * @memberof ConnectionsApiconnectionsArrival
     */
    filterTransports?: Array<TransportType>
    /**
     * limits amount of via stops per transport (limitation doesn\&#39;t apply to additional and canceled stops), if ommitted all via stops are returned, if zero no via stops are returned
     * Defaults to: undefined
     * @type number
     * @memberof ConnectionsApiconnectionsArrival
     */
    maxViaStops?: number
    /**
     * limits amount of results, if ommitted no truncation is applied
     * Defaults to: undefined
     * @type number
     * @memberof ConnectionsApiconnectionsArrival
     */
    maxTransports?: number
    /**
     * define sorting order, if omitted sorting is by TIME - TIME (Sorting based on best known time information ie real before preview before schedule) - TIME_SCHEDULE (Sorting based on schedule time)
     * Defaults to: undefined
     * @type SortKeyTime
     * @memberof ConnectionsApiconnectionsArrival
     */
    sortBy?: SortKeyTime
    /**
     * include additional information in order to apply so called \&#39;Vertragswissen\&#39; at consumer side, defaults to false and will be removed in later versions
     * Defaults to: false
     * @type boolean
     * @memberof ConnectionsApiconnectionsArrival
     */
    includeContractualKnowledge?: boolean
}

export class ObjectConnectionsApi {
    private api: ObservableConnectionsApi

    public constructor(configuration: Configuration, requestFactory?: ConnectionsApiRequestFactory, responseProcessor?: ConnectionsApiResponseProcessor) {
        this.api = new ObservableConnectionsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Returns connecting transports [Anschlussoptionen] for a transport arriving at a particular stop [Haltestelle] with individual connection information [Anschlussbewertung].
     * @param param the request object
     */
    public connectionsArrivalWithHttpInfo(param: ConnectionsApiConnectionsArrivalRequest, options?: ConfigurationOptions): Promise<HttpInfo<ConnectionArrival>> {
        return this.api.connectionsArrivalWithHttpInfo(param.journeyID, param.arrivalID, param.timeSlot, param.includeStationGroup, param.includeMessagesDisruptions, param.onlyPossibleConnections, param.filterTransports, param.maxViaStops, param.maxTransports, param.sortBy, param.includeContractualKnowledge,  options).toPromise();
    }

    /**
     * Returns connecting transports [Anschlussoptionen] for a transport arriving at a particular stop [Haltestelle] with individual connection information [Anschlussbewertung].
     * @param param the request object
     */
    public connectionsArrival(param: ConnectionsApiConnectionsArrivalRequest, options?: ConfigurationOptions): Promise<ConnectionArrival> {
        return this.api.connectionsArrival(param.journeyID, param.arrivalID, param.timeSlot, param.includeStationGroup, param.includeMessagesDisruptions, param.onlyPossibleConnections, param.filterTransports, param.maxViaStops, param.maxTransports, param.sortBy, param.includeContractualKnowledge,  options).toPromise();
    }

}
