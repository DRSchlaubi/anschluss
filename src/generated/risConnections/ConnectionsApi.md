# .ConnectionsApi

All URIs are relative to *https://apis.deutschebahn.com/db-api-marketplace/apis/ris-connections-netz/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**connectionsArrival**](ConnectionsApi.md#connectionsArrival) | **GET** /byarrival/{journeyID}/{arrivalID} | 


# **connectionsArrival**
> ConnectionArrival connectionsArrival()

Returns connecting transports [Anschlussoptionen] for a transport arriving at a particular stop [Haltestelle] with individual connection information [Anschlussbewertung].

### Example


```typescript
import { createConfiguration, ConnectionsApi } from '';
import type { ConnectionsApiConnectionsArrivalRequest } from '';

const configuration = createConfiguration();
const apiInstance = new ConnectionsApi(configuration);

const request: ConnectionsApiConnectionsArrivalRequest = {
    // id of journey [FahrtID]
  journeyID: "journeyID_example",
    // id of arrival [AnkunftID]
  arrivalID: "arrivalID_example",
    // time slot in minutes starting at arrivaltime of the requested arrivalID, in which the connections depart from the station (group) of the arrival, if omitted defaults to 30 minutes (max of 12h is allowed for time span) (optional)
  timeSlot: 1,
    // should all stations of group the requested eva numbers belong to (for instance a request to \'FFM Hoch\' would also return \'FFM tief\') be included (optional)
  includeStationGroup: true,
    // include messages [Meldungen / Freitexte] and disruptions [Stoerungen], if false no messages and disruption information will be returned (optional)
  includeMessagesDisruptions: true,
    // indicates whether only possible connections should be returned, if false also impossible connections (connect time too short or connection in the past due to delays) are returned (optional)
  onlyPossibleConnections: true,
    // filter for transport types that should be returned, if ommitted all types of transport are returned (optional)
  filterTransports: [
    "HIGH_SPEED_TRAIN",
  ],
    // limits amount of via stops per transport (limitation doesn\'t apply to additional and canceled stops), if ommitted all via stops are returned, if zero no via stops are returned (optional)
  maxViaStops: 1,
    // limits amount of results, if ommitted no truncation is applied (optional)
  maxTransports: 1,
    // define sorting order, if omitted sorting is by TIME - TIME (Sorting based on best known time information ie real before preview before schedule) - TIME_SCHEDULE (Sorting based on schedule time) (optional)
  sortBy: "TIME",
    // include additional information in order to apply so called \'Vertragswissen\' at consumer side, defaults to false and will be removed in later versions (optional)
  includeContractualKnowledge: false,
};

const data = await apiInstance.connectionsArrival(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **journeyID** | [**string**] | id of journey [FahrtID] | defaults to undefined
 **arrivalID** | [**string**] | id of arrival [AnkunftID] | defaults to undefined
 **timeSlot** | [**number**] | time slot in minutes starting at arrivaltime of the requested arrivalID, in which the connections depart from the station (group) of the arrival, if omitted defaults to 30 minutes (max of 12h is allowed for time span) | (optional) defaults to undefined
 **includeStationGroup** | [**boolean**] | should all stations of group the requested eva numbers belong to (for instance a request to \&#39;FFM Hoch\&#39; would also return \&#39;FFM tief\&#39;) be included | (optional) defaults to true
 **includeMessagesDisruptions** | [**boolean**] | include messages [Meldungen / Freitexte] and disruptions [Stoerungen], if false no messages and disruption information will be returned | (optional) defaults to true
 **onlyPossibleConnections** | [**boolean**] | indicates whether only possible connections should be returned, if false also impossible connections (connect time too short or connection in the past due to delays) are returned | (optional) defaults to true
 **filterTransports** | **Array&lt;TransportType&gt;** | filter for transport types that should be returned, if ommitted all types of transport are returned | (optional) defaults to undefined
 **maxViaStops** | [**number**] | limits amount of via stops per transport (limitation doesn\&#39;t apply to additional and canceled stops), if ommitted all via stops are returned, if zero no via stops are returned | (optional) defaults to undefined
 **maxTransports** | [**number**] | limits amount of results, if ommitted no truncation is applied | (optional) defaults to undefined
 **sortBy** | **SortKeyTime** | define sorting order, if omitted sorting is by TIME - TIME (Sorting based on best known time information ie real before preview before schedule) - TIME_SCHEDULE (Sorting based on schedule time) | (optional) defaults to undefined
 **includeContractualKnowledge** | [**boolean**] | include additional information in order to apply so called \&#39;Vertragswissen\&#39; at consumer side, defaults to false and will be removed in later versions | (optional) defaults to false


### Return type

**ConnectionArrival**

### Authorization

[ClientSecret](README.md#ClientSecret), [ClientID](README.md#ClientID)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/vnd.de.db.ris+json, application/problem+json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Success |  * Cache-Control - Controls whether and how long response can be cached by consumers, defaults to \&#39;no-cache, no-store\&#39;. <br>  |
**400** | Bad request |  -  |
**500** | Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


