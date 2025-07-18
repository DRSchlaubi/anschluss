// TODO: better import syntax?
import {BaseAPIRequestFactory, RequiredError, COLLECTION_FORMATS} from './baseapi';
import {Configuration} from '../configuration';
import {RequestContext, HttpMethod, ResponseContext, HttpFile, HttpInfo} from '../http/http';
import {ObjectSerializer} from '../models/ObjectSerializer';
import {ApiException} from './exception';
import {canConsumeForm, isCodeInRange} from '../util';
import {SecurityAuthentication} from '../auth/auth';


import { ConnectionArrival } from '../models/ConnectionArrival';
import { ErrorResponse } from '../models/ErrorResponse';
import { SortKeyTime } from '../models/SortKeyTime';
import { TransportType } from '../models/TransportType';

/**
 * no description
 */
export class ConnectionsApiRequestFactory extends BaseAPIRequestFactory {

    /**
     * Returns connecting transports [Anschlussoptionen] for a transport arriving at a particular stop [Haltestelle] with individual connection information [Anschlussbewertung].
     * @param journeyID id of journey [FahrtID]
     * @param arrivalID id of arrival [AnkunftID]
     * @param timeSlot time slot in minutes starting at arrivaltime of the requested arrivalID, in which the connections depart from the station (group) of the arrival, if omitted defaults to 30 minutes (max of 12h is allowed for time span)
     * @param includeStationGroup should all stations of group the requested eva numbers belong to (for instance a request to \&#39;FFM Hoch\&#39; would also return \&#39;FFM tief\&#39;) be included
     * @param includeMessagesDisruptions include messages [Meldungen / Freitexte] and disruptions [Stoerungen], if false no messages and disruption information will be returned
     * @param onlyPossibleConnections indicates whether only possible connections should be returned, if false also impossible connections (connect time too short or connection in the past due to delays) are returned
     * @param filterTransports filter for transport types that should be returned, if ommitted all types of transport are returned
     * @param maxViaStops limits amount of via stops per transport (limitation doesn\&#39;t apply to additional and canceled stops), if ommitted all via stops are returned, if zero no via stops are returned
     * @param maxTransports limits amount of results, if ommitted no truncation is applied
     * @param sortBy define sorting order, if omitted sorting is by TIME - TIME (Sorting based on best known time information ie real before preview before schedule) - TIME_SCHEDULE (Sorting based on schedule time)
     * @param includeContractualKnowledge include additional information in order to apply so called \&#39;Vertragswissen\&#39; at consumer side, defaults to false and will be removed in later versions
     */
    public async connectionsArrival(journeyID: string, arrivalID: string, timeSlot?: number, includeStationGroup?: boolean, includeMessagesDisruptions?: boolean, onlyPossibleConnections?: boolean, filterTransports?: Array<TransportType>, maxViaStops?: number, maxTransports?: number, sortBy?: SortKeyTime, includeContractualKnowledge?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'journeyID' is not null or undefined
        if (journeyID === null || journeyID === undefined) {
            throw new RequiredError("ConnectionsApi", "connectionsArrival", "journeyID");
        }


        // verify required parameter 'arrivalID' is not null or undefined
        if (arrivalID === null || arrivalID === undefined) {
            throw new RequiredError("ConnectionsApi", "connectionsArrival", "arrivalID");
        }











        // Path Params
        const localVarPath = '/byarrival/{journeyID}/{arrivalID}'
            .replace('{' + 'journeyID' + '}', encodeURIComponent(String(journeyID)))
            .replace('{' + 'arrivalID' + '}', encodeURIComponent(String(arrivalID)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (timeSlot !== undefined) {
            requestContext.setQueryParam("timeSlot", ObjectSerializer.serialize(timeSlot, "number", "int32"));
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
        if (onlyPossibleConnections !== undefined) {
            requestContext.setQueryParam("onlyPossibleConnections", ObjectSerializer.serialize(onlyPossibleConnections, "boolean", ""));
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
        if (maxTransports !== undefined) {
            requestContext.setQueryParam("maxTransports", ObjectSerializer.serialize(maxTransports, "number", "int32"));
        }

        // Query Params
        if (sortBy !== undefined) {
            requestContext.setQueryParam("sortBy", ObjectSerializer.serialize(sortBy, "SortKeyTime", ""));
        }

        // Query Params
        if (includeContractualKnowledge !== undefined) {
            requestContext.setQueryParam("includeContractualKnowledge", ObjectSerializer.serialize(includeContractualKnowledge, "boolean", ""));
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

export class ConnectionsApiResponseProcessor {

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to connectionsArrival
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async connectionsArrivalWithHttpInfo(response: ResponseContext): Promise<HttpInfo<ConnectionArrival >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ConnectionArrival = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ConnectionArrival", ""
            ) as ConnectionArrival;
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
            const body: ConnectionArrival = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ConnectionArrival", ""
            ) as ConnectionArrival;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

}
