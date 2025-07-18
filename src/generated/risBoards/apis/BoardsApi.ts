// TODO: better import syntax?
import {BaseAPIRequestFactory, RequiredError, COLLECTION_FORMATS} from './baseapi';
import {Configuration} from '../configuration';
import {RequestContext, HttpMethod, ResponseContext, HttpFile, HttpInfo} from '../http/http';
import {ObjectSerializer} from '../models/ObjectSerializer';
import {ApiException} from './exception';
import {canConsumeForm, isCodeInRange} from '../util';
import {SecurityAuthentication} from '../auth/auth';


import { BoardPublicArrival } from '../models/BoardPublicArrival';
import { BoardPublicDeparture } from '../models/BoardPublicDeparture';
import { ErrorResponse } from '../models/ErrorResponse';
import { SortKeyTime } from '../models/SortKeyTime';
import { TransportType } from '../models/TransportType';

/**
 * no description
 */
export class BoardsApiRequestFactory extends BaseAPIRequestFactory {

    /**
     * Returns an arrival board [Ankunftstafel] for all public transports [Öffentliche Verkehre].
     * @param evaNumbers list of eva numbers of stations [Bahnhofe] to get board for (maximum of 10 numbers are allowed)
     * @param timeStart start time for board as fully qualified datetime (ISO8601 with timezone / offset, for instance yyyy-MM-ddTHH:mm:ssZ), if omitted current time will be used (max of 7 days in the past is allowed)
     * @param timeEnd end time for board as fully qualified datetime (ISO8601 with timezone / offset, for instance yyyy-MM-ddTHH:mm:ssZ), if omitted start time plus 30 minutes will be used (max of 12h is allowed for time span)
     * @param includeStationGroup should all stations of group the requested eva numbers belong to (for instance a request to \&#39;FFM Hoch\&#39; would also return \&#39;FFM tief\&#39;) be included
     * @param includeMessagesDisruptions include messages [Meldungen / Freitexte] and disruptions [Störungen], if false no messages and disruption information will be returned
     * @param filterTransports filter for transport types that should be returned, if omitted all types of transport are returned
     * @param maxViaStops limits amount of via stops per transport (limitation doesn\&#39;t apply to additional and canceled stops), if omitted all via stops are returned, if zero no via stops are returned
     * @param maxTransportsPerType limits amount of results per transport type, if omitted no truncation is applied
     * @param sortBy define sorting order, if omitted sorting is by TIME - TIME (Sorting based on best known time information ie real before preview before schedule) - TIME_SCHEDULE (Sorting based on schedule time)
     */
    public async boardArrival(evaNumbers: Array<string>, timeStart?: Date, timeEnd?: Date, includeStationGroup?: boolean, includeMessagesDisruptions?: boolean, filterTransports?: Array<TransportType>, maxViaStops?: number, maxTransportsPerType?: number, sortBy?: SortKeyTime, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'evaNumbers' is not null or undefined
        if (evaNumbers === null || evaNumbers === undefined) {
            throw new RequiredError("BoardsApi", "boardArrival", "evaNumbers");
        }










        // Path Params
        const localVarPath = '/public/arrivals/{evaNumbers}'
            .replace('{' + 'evaNumbers' + '}', encodeURIComponent(String(evaNumbers)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (timeStart !== undefined) {
            requestContext.setQueryParam("timeStart", ObjectSerializer.serialize(timeStart, "Date", "date-time"));
        }

        // Query Params
        if (timeEnd !== undefined) {
            requestContext.setQueryParam("timeEnd", ObjectSerializer.serialize(timeEnd, "Date", "date-time"));
        }

        // Query Params
        if (includeStationGroup !== undefined) {
            requestContext.setQueryParam("includeStationGroup", ObjectSerializer.serialize(includeStationGroup, "boolean", ""));
        }

        // Query Params
        if (includeMessagesDisruptions !== undefined) {
            requestContext.setQueryParam("includeMessagesDisruptions", ObjectSerializer.serialize(includeMessagesDisruptions, "boolean", ""));
        }

        // Query Params
        if (filterTransports !== undefined) {
            const serializedParams = ObjectSerializer.serialize(filterTransports, "Array<TransportType>", "");
            for (const serializedParam of serializedParams) {
                requestContext.appendQueryParam("filterTransports", serializedParam);
            }
        }

        // Query Params
        if (maxViaStops !== undefined) {
            requestContext.setQueryParam("maxViaStops", ObjectSerializer.serialize(maxViaStops, "number", "int32"));
        }

        // Query Params
        if (maxTransportsPerType !== undefined) {
            requestContext.setQueryParam("maxTransportsPerType", ObjectSerializer.serialize(maxTransportsPerType, "number", "int32"));
        }

        // Query Params
        if (sortBy !== undefined) {
            requestContext.setQueryParam("sortBy", ObjectSerializer.serialize(sortBy, "SortKeyTime", ""));
        }


        let authMethod: SecurityAuthentication | undefined;
        // Apply auth methods
        authMethod = _config.authMethods["ClientSecret"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        // Apply auth methods
        authMethod = _config.authMethods["ClientID"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        
        const defaultAuth: SecurityAuthentication | undefined = _config?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Returns a departure board [Abfahrtstafel] for all public transports [Öffentliche Verkehre].
     * @param evaNumbers list of eva numbers of stations [Bahnhöfe] to get board for (maximum of 10 numbers are allowed)
     * @param timeStart start time for board as fully qualified datetime (ISO8601 with timezone / offset, for instance yyyy-MM-ddTHH:mm:ssZ), if omitted current time will be used (max of 7 days in the past is allowed)
     * @param timeEnd end time for board as fully qualified datetime (ISO8601 with timezone / offset, for instance yyyy-MM-ddTHH:mm:ssZ), if omitted start time plus 30 minutes will be used (max of 12h is allowed for time span)
     * @param includeStationGroup should all stations of group the requested eva numbers belong to (for instance a request to \&#39;FFM Hoch\&#39; would also return \&#39;FFM tief\&#39;) be included
     * @param includeMessagesDisruptions include messages [Meldungen / Freitexte] and disruptions [Störungen], if false no messages and disruption information will be returned
     * @param filterTransports filter for transport types that should be returned, if omitted all types of transport are returned
     * @param maxViaStops limits amount of via stops per transport (limitation doesn\&#39;t apply to additional and canceled stops), if omitted all via stops are returned, if zero no via stops are returned
     * @param maxTransportsPerType limits amount of results per transport type, if omitted no truncation is applied
     * @param sortBy define sorting order, if omitted sorting is by TIME - TIME (Sorting based on best known time information ie real before preview before schedule) - TIME_SCHEDULE (Sorting based on schedule time)
     */
    public async boardDeparture(evaNumbers: Array<string>, timeStart?: Date, timeEnd?: Date, includeStationGroup?: boolean, includeMessagesDisruptions?: boolean, filterTransports?: Array<TransportType>, maxViaStops?: number, maxTransportsPerType?: number, sortBy?: SortKeyTime, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'evaNumbers' is not null or undefined
        if (evaNumbers === null || evaNumbers === undefined) {
            throw new RequiredError("BoardsApi", "boardDeparture", "evaNumbers");
        }










        // Path Params
        const localVarPath = '/public/departures/{evaNumbers}'
            .replace('{' + 'evaNumbers' + '}', encodeURIComponent(String(evaNumbers)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (timeStart !== undefined) {
            requestContext.setQueryParam("timeStart", ObjectSerializer.serialize(timeStart, "Date", "date-time"));
        }

        // Query Params
        if (timeEnd !== undefined) {
            requestContext.setQueryParam("timeEnd", ObjectSerializer.serialize(timeEnd, "Date", "date-time"));
        }

        // Query Params
        if (includeStationGroup !== undefined) {
            requestContext.setQueryParam("includeStationGroup", ObjectSerializer.serialize(includeStationGroup, "boolean", ""));
        }

        // Query Params
        if (includeMessagesDisruptions !== undefined) {
            requestContext.setQueryParam("includeMessagesDisruptions", ObjectSerializer.serialize(includeMessagesDisruptions, "boolean", ""));
        }

        // Query Params
        if (filterTransports !== undefined) {
            const serializedParams = ObjectSerializer.serialize(filterTransports, "Array<TransportType>", "");
            for (const serializedParam of serializedParams) {
                requestContext.appendQueryParam("filterTransports", serializedParam);
            }
        }

        // Query Params
        if (maxViaStops !== undefined) {
            requestContext.setQueryParam("maxViaStops", ObjectSerializer.serialize(maxViaStops, "number", "int32"));
        }

        // Query Params
        if (maxTransportsPerType !== undefined) {
            requestContext.setQueryParam("maxTransportsPerType", ObjectSerializer.serialize(maxTransportsPerType, "number", "int32"));
        }

        // Query Params
        if (sortBy !== undefined) {
            requestContext.setQueryParam("sortBy", ObjectSerializer.serialize(sortBy, "SortKeyTime", ""));
        }


        let authMethod: SecurityAuthentication | undefined;
        // Apply auth methods
        authMethod = _config.authMethods["ClientSecret"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        // Apply auth methods
        authMethod = _config.authMethods["ClientID"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        
        const defaultAuth: SecurityAuthentication | undefined = _config?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

}

export class BoardsApiResponseProcessor {

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to boardArrival
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async boardArrivalWithHttpInfo(response: ResponseContext): Promise<HttpInfo<BoardPublicArrival >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: BoardPublicArrival = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "BoardPublicArrival", ""
            ) as BoardPublicArrival;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: ErrorResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ErrorResponse", ""
            ) as ErrorResponse;
            throw new ApiException<ErrorResponse>(response.httpStatusCode, "Bad request", body, response.headers);
        }
        if (isCodeInRange("500", response.httpStatusCode)) {
            const body: ErrorResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ErrorResponse", ""
            ) as ErrorResponse;
            throw new ApiException<ErrorResponse>(response.httpStatusCode, "Error", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: BoardPublicArrival = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "BoardPublicArrival", ""
            ) as BoardPublicArrival;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to boardDeparture
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async boardDepartureWithHttpInfo(response: ResponseContext): Promise<HttpInfo<BoardPublicDeparture >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: BoardPublicDeparture = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "BoardPublicDeparture", ""
            ) as BoardPublicDeparture;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: ErrorResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ErrorResponse", ""
            ) as ErrorResponse;
            throw new ApiException<ErrorResponse>(response.httpStatusCode, "Bad request", body, response.headers);
        }
        if (isCodeInRange("500", response.httpStatusCode)) {
            const body: ErrorResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ErrorResponse", ""
            ) as ErrorResponse;
            throw new ApiException<ErrorResponse>(response.httpStatusCode, "Error", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: BoardPublicDeparture = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "BoardPublicDeparture", ""
            ) as BoardPublicDeparture;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

}
