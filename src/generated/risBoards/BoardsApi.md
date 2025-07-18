# .BoardsApi

All URIs are relative to *https://apis.deutschebahn.com/db-api-marketplace/apis/ris-boards-netz/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**boardArrival**](BoardsApi.md#boardArrival) | **GET** /public/arrivals/{evaNumbers} | 
[**boardDeparture**](BoardsApi.md#boardDeparture) | **GET** /public/departures/{evaNumbers} | 


# **boardArrival**
> BoardPublicArrival boardArrival()

Returns an arrival board [Ankunftstafel] for all public transports [Öffentliche Verkehre].

### Example


```typescript
import { createConfiguration, BoardsApi } from '';
import type { BoardsApiBoardArrivalRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BoardsApi(configuration);

const request: BoardsApiBoardArrivalRequest = {
    // list of eva numbers of stations [Bahnhofe] to get board for (maximum of 10 numbers are allowed)
  evaNumbers: [
    "evaNumbers_example",
  ],
    // start time for board as fully qualified datetime (ISO8601 with timezone / offset, for instance yyyy-MM-ddTHH:mm:ssZ), if omitted current time will be used (max of 7 days in the past is allowed) (optional)
  timeStart: new Date('1970-01-01T00:00:00.00Z'),
    // end time for board as fully qualified datetime (ISO8601 with timezone / offset, for instance yyyy-MM-ddTHH:mm:ssZ), if omitted start time plus 30 minutes will be used (max of 12h is allowed for time span) (optional)
  timeEnd: new Date('1970-01-01T00:00:00.00Z'),
    // should all stations of group the requested eva numbers belong to (for instance a request to \'FFM Hoch\' would also return \'FFM tief\') be included (optional)
  includeStationGroup: true,
    // include messages [Meldungen / Freitexte] and disruptions [Störungen], if false no messages and disruption information will be returned (optional)
  includeMessagesDisruptions: true,
    // filter for transport types that should be returned, if omitted all types of transport are returned (optional)
  filterTransports: [
    "HIGH_SPEED_TRAIN",
  ],
    // limits amount of via stops per transport (limitation doesn\'t apply to additional and canceled stops), if omitted all via stops are returned, if zero no via stops are returned (optional)
  maxViaStops: 1,
    // limits amount of results per transport type, if omitted no truncation is applied (optional)
  maxTransportsPerType: 1,
    // define sorting order, if omitted sorting is by TIME - TIME (Sorting based on best known time information ie real before preview before schedule) - TIME_SCHEDULE (Sorting based on schedule time) (optional)
  sortBy: "TIME",
};

const data = await apiInstance.boardArrival(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **evaNumbers** | **Array&lt;string&gt;** | list of eva numbers of stations [Bahnhofe] to get board for (maximum of 10 numbers are allowed) | defaults to undefined
 **timeStart** | [**Date**] | start time for board as fully qualified datetime (ISO8601 with timezone / offset, for instance yyyy-MM-ddTHH:mm:ssZ), if omitted current time will be used (max of 7 days in the past is allowed) | (optional) defaults to undefined
 **timeEnd** | [**Date**] | end time for board as fully qualified datetime (ISO8601 with timezone / offset, for instance yyyy-MM-ddTHH:mm:ssZ), if omitted start time plus 30 minutes will be used (max of 12h is allowed for time span) | (optional) defaults to undefined
 **includeStationGroup** | [**boolean**] | should all stations of group the requested eva numbers belong to (for instance a request to \&#39;FFM Hoch\&#39; would also return \&#39;FFM tief\&#39;) be included | (optional) defaults to true
 **includeMessagesDisruptions** | [**boolean**] | include messages [Meldungen / Freitexte] and disruptions [Störungen], if false no messages and disruption information will be returned | (optional) defaults to true
 **filterTransports** | **Array&lt;TransportType&gt;** | filter for transport types that should be returned, if omitted all types of transport are returned | (optional) defaults to undefined
 **maxViaStops** | [**number**] | limits amount of via stops per transport (limitation doesn\&#39;t apply to additional and canceled stops), if omitted all via stops are returned, if zero no via stops are returned | (optional) defaults to undefined
 **maxTransportsPerType** | [**number**] | limits amount of results per transport type, if omitted no truncation is applied | (optional) defaults to undefined
 **sortBy** | **SortKeyTime** | define sorting order, if omitted sorting is by TIME - TIME (Sorting based on best known time information ie real before preview before schedule) - TIME_SCHEDULE (Sorting based on schedule time) | (optional) defaults to undefined


### Return type

**BoardPublicArrival**

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

# **boardDeparture**
> BoardPublicDeparture boardDeparture()

Returns a departure board [Abfahrtstafel] for all public transports [Öffentliche Verkehre].

### Example


```typescript
import { createConfiguration, BoardsApi } from '';
import type { BoardsApiBoardDepartureRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BoardsApi(configuration);

const request: BoardsApiBoardDepartureRequest = {
    // list of eva numbers of stations [Bahnhöfe] to get board for (maximum of 10 numbers are allowed)
  evaNumbers: [
    "evaNumbers_example",
  ],
    // start time for board as fully qualified datetime (ISO8601 with timezone / offset, for instance yyyy-MM-ddTHH:mm:ssZ), if omitted current time will be used (max of 7 days in the past is allowed) (optional)
  timeStart: new Date('1970-01-01T00:00:00.00Z'),
    // end time for board as fully qualified datetime (ISO8601 with timezone / offset, for instance yyyy-MM-ddTHH:mm:ssZ), if omitted start time plus 30 minutes will be used (max of 12h is allowed for time span) (optional)
  timeEnd: new Date('1970-01-01T00:00:00.00Z'),
    // should all stations of group the requested eva numbers belong to (for instance a request to \'FFM Hoch\' would also return \'FFM tief\') be included (optional)
  includeStationGroup: true,
    // include messages [Meldungen / Freitexte] and disruptions [Störungen], if false no messages and disruption information will be returned (optional)
  includeMessagesDisruptions: true,
    // filter for transport types that should be returned, if omitted all types of transport are returned (optional)
  filterTransports: [
    "HIGH_SPEED_TRAIN",
  ],
    // limits amount of via stops per transport (limitation doesn\'t apply to additional and canceled stops), if omitted all via stops are returned, if zero no via stops are returned (optional)
  maxViaStops: 1,
    // limits amount of results per transport type, if omitted no truncation is applied (optional)
  maxTransportsPerType: 1,
    // define sorting order, if omitted sorting is by TIME - TIME (Sorting based on best known time information ie real before preview before schedule) - TIME_SCHEDULE (Sorting based on schedule time) (optional)
  sortBy: "TIME",
};

const data = await apiInstance.boardDeparture(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **evaNumbers** | **Array&lt;string&gt;** | list of eva numbers of stations [Bahnhöfe] to get board for (maximum of 10 numbers are allowed) | defaults to undefined
 **timeStart** | [**Date**] | start time for board as fully qualified datetime (ISO8601 with timezone / offset, for instance yyyy-MM-ddTHH:mm:ssZ), if omitted current time will be used (max of 7 days in the past is allowed) | (optional) defaults to undefined
 **timeEnd** | [**Date**] | end time for board as fully qualified datetime (ISO8601 with timezone / offset, for instance yyyy-MM-ddTHH:mm:ssZ), if omitted start time plus 30 minutes will be used (max of 12h is allowed for time span) | (optional) defaults to undefined
 **includeStationGroup** | [**boolean**] | should all stations of group the requested eva numbers belong to (for instance a request to \&#39;FFM Hoch\&#39; would also return \&#39;FFM tief\&#39;) be included | (optional) defaults to true
 **includeMessagesDisruptions** | [**boolean**] | include messages [Meldungen / Freitexte] and disruptions [Störungen], if false no messages and disruption information will be returned | (optional) defaults to true
 **filterTransports** | **Array&lt;TransportType&gt;** | filter for transport types that should be returned, if omitted all types of transport are returned | (optional) defaults to undefined
 **maxViaStops** | [**number**] | limits amount of via stops per transport (limitation doesn\&#39;t apply to additional and canceled stops), if omitted all via stops are returned, if zero no via stops are returned | (optional) defaults to undefined
 **maxTransportsPerType** | [**number**] | limits amount of results per transport type, if omitted no truncation is applied | (optional) defaults to undefined
 **sortBy** | **SortKeyTime** | define sorting order, if omitted sorting is by TIME - TIME (Sorting based on best known time information ie real before preview before schedule) - TIME_SCHEDULE (Sorting based on schedule time) | (optional) defaults to undefined


### Return type

**BoardPublicDeparture**

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


