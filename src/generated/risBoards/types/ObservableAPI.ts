import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration, ConfigurationOptions, mergeConfiguration } from '../configuration'
import type { Middleware } from '../middleware';
import { Observable, of, from } from '../rxjsStub';
import {mergeMap, map} from  '../rxjsStub';
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

import { BoardsApiRequestFactory, BoardsApiResponseProcessor} from "../apis/BoardsApi";
export class ObservableBoardsApi {
    private requestFactory: BoardsApiRequestFactory;
    private responseProcessor: BoardsApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: BoardsApiRequestFactory,
        responseProcessor?: BoardsApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new BoardsApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new BoardsApiResponseProcessor();
    }

    /**
     * Returns an arrival board [Ankunftstafel] for all public transports [Öffentliche Verkehre].
     * @param evaNumbers list of eva numbers of stations [Bahnhofe] to get board for (maximum of 10 numbers are allowed)
     * @param [timeStart] start time for board as fully qualified datetime (ISO8601 with timezone / offset, for instance yyyy-MM-ddTHH:mm:ssZ), if omitted current time will be used (max of 7 days in the past is allowed)
     * @param [timeEnd] end time for board as fully qualified datetime (ISO8601 with timezone / offset, for instance yyyy-MM-ddTHH:mm:ssZ), if omitted start time plus 30 minutes will be used (max of 12h is allowed for time span)
     * @param [includeStationGroup] should all stations of group the requested eva numbers belong to (for instance a request to \&#39;FFM Hoch\&#39; would also return \&#39;FFM tief\&#39;) be included
     * @param [includeMessagesDisruptions] include messages [Meldungen / Freitexte] and disruptions [Störungen], if false no messages and disruption information will be returned
     * @param [filterTransports] filter for transport types that should be returned, if omitted all types of transport are returned
     * @param [maxViaStops] limits amount of via stops per transport (limitation doesn\&#39;t apply to additional and canceled stops), if omitted all via stops are returned, if zero no via stops are returned
     * @param [maxTransportsPerType] limits amount of results per transport type, if omitted no truncation is applied
     * @param [sortBy] define sorting order, if omitted sorting is by TIME - TIME (Sorting based on best known time information ie real before preview before schedule) - TIME_SCHEDULE (Sorting based on schedule time)
     */
    public boardArrivalWithHttpInfo(evaNumbers: Array<string>, timeStart?: Date, timeEnd?: Date, includeStationGroup?: boolean, includeMessagesDisruptions?: boolean, filterTransports?: Array<TransportType>, maxViaStops?: number, maxTransportsPerType?: number, sortBy?: SortKeyTime, _options?: ConfigurationOptions): Observable<HttpInfo<BoardPublicArrival>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.boardArrival(evaNumbers, timeStart, timeEnd, includeStationGroup, includeMessagesDisruptions, filterTransports, maxViaStops, maxTransportsPerType, sortBy, _config);
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
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.boardArrivalWithHttpInfo(rsp)));
            }));
    }

    /**
     * Returns an arrival board [Ankunftstafel] for all public transports [Öffentliche Verkehre].
     * @param evaNumbers list of eva numbers of stations [Bahnhofe] to get board for (maximum of 10 numbers are allowed)
     * @param [timeStart] start time for board as fully qualified datetime (ISO8601 with timezone / offset, for instance yyyy-MM-ddTHH:mm:ssZ), if omitted current time will be used (max of 7 days in the past is allowed)
     * @param [timeEnd] end time for board as fully qualified datetime (ISO8601 with timezone / offset, for instance yyyy-MM-ddTHH:mm:ssZ), if omitted start time plus 30 minutes will be used (max of 12h is allowed for time span)
     * @param [includeStationGroup] should all stations of group the requested eva numbers belong to (for instance a request to \&#39;FFM Hoch\&#39; would also return \&#39;FFM tief\&#39;) be included
     * @param [includeMessagesDisruptions] include messages [Meldungen / Freitexte] and disruptions [Störungen], if false no messages and disruption information will be returned
     * @param [filterTransports] filter for transport types that should be returned, if omitted all types of transport are returned
     * @param [maxViaStops] limits amount of via stops per transport (limitation doesn\&#39;t apply to additional and canceled stops), if omitted all via stops are returned, if zero no via stops are returned
     * @param [maxTransportsPerType] limits amount of results per transport type, if omitted no truncation is applied
     * @param [sortBy] define sorting order, if omitted sorting is by TIME - TIME (Sorting based on best known time information ie real before preview before schedule) - TIME_SCHEDULE (Sorting based on schedule time)
     */
    public boardArrival(evaNumbers: Array<string>, timeStart?: Date, timeEnd?: Date, includeStationGroup?: boolean, includeMessagesDisruptions?: boolean, filterTransports?: Array<TransportType>, maxViaStops?: number, maxTransportsPerType?: number, sortBy?: SortKeyTime, _options?: ConfigurationOptions): Observable<BoardPublicArrival> {
        return this.boardArrivalWithHttpInfo(evaNumbers, timeStart, timeEnd, includeStationGroup, includeMessagesDisruptions, filterTransports, maxViaStops, maxTransportsPerType, sortBy, _options).pipe(map((apiResponse: HttpInfo<BoardPublicArrival>) => apiResponse.data));
    }

    /**
     * Returns a departure board [Abfahrtstafel] for all public transports [Öffentliche Verkehre].
     * @param evaNumbers list of eva numbers of stations [Bahnhöfe] to get board for (maximum of 10 numbers are allowed)
     * @param [timeStart] start time for board as fully qualified datetime (ISO8601 with timezone / offset, for instance yyyy-MM-ddTHH:mm:ssZ), if omitted current time will be used (max of 7 days in the past is allowed)
     * @param [timeEnd] end time for board as fully qualified datetime (ISO8601 with timezone / offset, for instance yyyy-MM-ddTHH:mm:ssZ), if omitted start time plus 30 minutes will be used (max of 12h is allowed for time span)
     * @param [includeStationGroup] should all stations of group the requested eva numbers belong to (for instance a request to \&#39;FFM Hoch\&#39; would also return \&#39;FFM tief\&#39;) be included
     * @param [includeMessagesDisruptions] include messages [Meldungen / Freitexte] and disruptions [Störungen], if false no messages and disruption information will be returned
     * @param [filterTransports] filter for transport types that should be returned, if omitted all types of transport are returned
     * @param [maxViaStops] limits amount of via stops per transport (limitation doesn\&#39;t apply to additional and canceled stops), if omitted all via stops are returned, if zero no via stops are returned
     * @param [maxTransportsPerType] limits amount of results per transport type, if omitted no truncation is applied
     * @param [sortBy] define sorting order, if omitted sorting is by TIME - TIME (Sorting based on best known time information ie real before preview before schedule) - TIME_SCHEDULE (Sorting based on schedule time)
     */
    public boardDepartureWithHttpInfo(evaNumbers: Array<string>, timeStart?: Date, timeEnd?: Date, includeStationGroup?: boolean, includeMessagesDisruptions?: boolean, filterTransports?: Array<TransportType>, maxViaStops?: number, maxTransportsPerType?: number, sortBy?: SortKeyTime, _options?: ConfigurationOptions): Observable<HttpInfo<BoardPublicDeparture>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.boardDeparture(evaNumbers, timeStart, timeEnd, includeStationGroup, includeMessagesDisruptions, filterTransports, maxViaStops, maxTransportsPerType, sortBy, _config);
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
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.boardDepartureWithHttpInfo(rsp)));
            }));
    }

    /**
     * Returns a departure board [Abfahrtstafel] for all public transports [Öffentliche Verkehre].
     * @param evaNumbers list of eva numbers of stations [Bahnhöfe] to get board for (maximum of 10 numbers are allowed)
     * @param [timeStart] start time for board as fully qualified datetime (ISO8601 with timezone / offset, for instance yyyy-MM-ddTHH:mm:ssZ), if omitted current time will be used (max of 7 days in the past is allowed)
     * @param [timeEnd] end time for board as fully qualified datetime (ISO8601 with timezone / offset, for instance yyyy-MM-ddTHH:mm:ssZ), if omitted start time plus 30 minutes will be used (max of 12h is allowed for time span)
     * @param [includeStationGroup] should all stations of group the requested eva numbers belong to (for instance a request to \&#39;FFM Hoch\&#39; would also return \&#39;FFM tief\&#39;) be included
     * @param [includeMessagesDisruptions] include messages [Meldungen / Freitexte] and disruptions [Störungen], if false no messages and disruption information will be returned
     * @param [filterTransports] filter for transport types that should be returned, if omitted all types of transport are returned
     * @param [maxViaStops] limits amount of via stops per transport (limitation doesn\&#39;t apply to additional and canceled stops), if omitted all via stops are returned, if zero no via stops are returned
     * @param [maxTransportsPerType] limits amount of results per transport type, if omitted no truncation is applied
     * @param [sortBy] define sorting order, if omitted sorting is by TIME - TIME (Sorting based on best known time information ie real before preview before schedule) - TIME_SCHEDULE (Sorting based on schedule time)
     */
    public boardDeparture(evaNumbers: Array<string>, timeStart?: Date, timeEnd?: Date, includeStationGroup?: boolean, includeMessagesDisruptions?: boolean, filterTransports?: Array<TransportType>, maxViaStops?: number, maxTransportsPerType?: number, sortBy?: SortKeyTime, _options?: ConfigurationOptions): Observable<BoardPublicDeparture> {
        return this.boardDepartureWithHttpInfo(evaNumbers, timeStart, timeEnd, includeStationGroup, includeMessagesDisruptions, filterTransports, maxViaStops, maxTransportsPerType, sortBy, _options).pipe(map((apiResponse: HttpInfo<BoardPublicDeparture>) => apiResponse.data));
    }

}
