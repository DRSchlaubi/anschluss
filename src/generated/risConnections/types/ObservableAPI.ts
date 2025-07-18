import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration, ConfigurationOptions, mergeConfiguration } from '../configuration'
import type { Middleware } from '../middleware';
import { Observable, of, from } from '../rxjsStub';
import {mergeMap, map} from  '../rxjsStub';
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

import { ConnectionsApiRequestFactory, ConnectionsApiResponseProcessor} from "../apis/ConnectionsApi";
export class ObservableConnectionsApi {
    private requestFactory: ConnectionsApiRequestFactory;
    private responseProcessor: ConnectionsApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: ConnectionsApiRequestFactory,
        responseProcessor?: ConnectionsApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new ConnectionsApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new ConnectionsApiResponseProcessor();
    }

    /**
     * Returns connecting transports [Anschlussoptionen] for a transport arriving at a particular stop [Haltestelle] with individual connection information [Anschlussbewertung].
     * @param journeyID id of journey [FahrtID]
     * @param arrivalID id of arrival [AnkunftID]
     * @param [timeSlot] time slot in minutes starting at arrivaltime of the requested arrivalID, in which the connections depart from the station (group) of the arrival, if omitted defaults to 30 minutes (max of 12h is allowed for time span)
     * @param [includeStationGroup] should all stations of group the requested eva numbers belong to (for instance a request to \&#39;FFM Hoch\&#39; would also return \&#39;FFM tief\&#39;) be included
     * @param [includeMessagesDisruptions] include messages [Meldungen / Freitexte] and disruptions [Stoerungen], if false no messages and disruption information will be returned
     * @param [onlyPossibleConnections] indicates whether only possible connections should be returned, if false also impossible connections (connect time too short or connection in the past due to delays) are returned
     * @param [filterTransports] filter for transport types that should be returned, if ommitted all types of transport are returned
     * @param [maxViaStops] limits amount of via stops per transport (limitation doesn\&#39;t apply to additional and canceled stops), if ommitted all via stops are returned, if zero no via stops are returned
     * @param [maxTransports] limits amount of results, if ommitted no truncation is applied
     * @param [sortBy] define sorting order, if omitted sorting is by TIME - TIME (Sorting based on best known time information ie real before preview before schedule) - TIME_SCHEDULE (Sorting based on schedule time)
     * @param [includeContractualKnowledge] include additional information in order to apply so called \&#39;Vertragswissen\&#39; at consumer side, defaults to false and will be removed in later versions
     */
    public connectionsArrivalWithHttpInfo(journeyID: string, arrivalID: string, timeSlot?: number, includeStationGroup?: boolean, includeMessagesDisruptions?: boolean, onlyPossibleConnections?: boolean, filterTransports?: Array<TransportType>, maxViaStops?: number, maxTransports?: number, sortBy?: SortKeyTime, includeContractualKnowledge?: boolean, _options?: ConfigurationOptions): Observable<HttpInfo<ConnectionArrival>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.connectionsArrival(journeyID, arrivalID, timeSlot, includeStationGroup, includeMessagesDisruptions, onlyPossibleConnections, filterTransports, maxViaStops, maxTransports, sortBy, includeContractualKnowledge, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.connectionsArrivalWithHttpInfo(rsp)));
            }));
    }

    /**
     * Returns connecting transports [Anschlussoptionen] for a transport arriving at a particular stop [Haltestelle] with individual connection information [Anschlussbewertung].
     * @param journeyID id of journey [FahrtID]
     * @param arrivalID id of arrival [AnkunftID]
     * @param [timeSlot] time slot in minutes starting at arrivaltime of the requested arrivalID, in which the connections depart from the station (group) of the arrival, if omitted defaults to 30 minutes (max of 12h is allowed for time span)
     * @param [includeStationGroup] should all stations of group the requested eva numbers belong to (for instance a request to \&#39;FFM Hoch\&#39; would also return \&#39;FFM tief\&#39;) be included
     * @param [includeMessagesDisruptions] include messages [Meldungen / Freitexte] and disruptions [Stoerungen], if false no messages and disruption information will be returned
     * @param [onlyPossibleConnections] indicates whether only possible connections should be returned, if false also impossible connections (connect time too short or connection in the past due to delays) are returned
     * @param [filterTransports] filter for transport types that should be returned, if ommitted all types of transport are returned
     * @param [maxViaStops] limits amount of via stops per transport (limitation doesn\&#39;t apply to additional and canceled stops), if ommitted all via stops are returned, if zero no via stops are returned
     * @param [maxTransports] limits amount of results, if ommitted no truncation is applied
     * @param [sortBy] define sorting order, if omitted sorting is by TIME - TIME (Sorting based on best known time information ie real before preview before schedule) - TIME_SCHEDULE (Sorting based on schedule time)
     * @param [includeContractualKnowledge] include additional information in order to apply so called \&#39;Vertragswissen\&#39; at consumer side, defaults to false and will be removed in later versions
     */
    public connectionsArrival(journeyID: string, arrivalID: string, timeSlot?: number, includeStationGroup?: boolean, includeMessagesDisruptions?: boolean, onlyPossibleConnections?: boolean, filterTransports?: Array<TransportType>, maxViaStops?: number, maxTransports?: number, sortBy?: SortKeyTime, includeContractualKnowledge?: boolean, _options?: ConfigurationOptions): Observable<ConnectionArrival> {
        return this.connectionsArrivalWithHttpInfo(journeyID, arrivalID, timeSlot, includeStationGroup, includeMessagesDisruptions, onlyPossibleConnections, filterTransports, maxViaStops, maxTransports, sortBy, includeContractualKnowledge, _options).pipe(map((apiResponse: HttpInfo<ConnectionArrival>) => apiResponse.data));
    }

}
