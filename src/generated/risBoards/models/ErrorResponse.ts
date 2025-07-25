/**
 * RIS::Boards
 * ## Info  * powered by [DB Reisendeninformation](https://db-planet.deutschebahn.com/pages/reisendeninformation/apps/content/willkommen) * member of the [RIS-API](https://db.de/ris-api) family, the building kit for traveller information * for details check out [RIS::Boards](https://api-portal.hub.db.de/db/apis/product/ris-boards) in the DB API Portal  ## Capabilities  Provides a list of transports [Verkehrsmittel] departing / arriving at a particular stop-place [Haltestelle] and optional all other stop places-belonging to the same stop-place group [vertrieblicher Umsteigebereich] within a specific time window:  * departures [Abfahrten] or arrivals [Ankünfte] (depending on board) with schedule [Soll] and forecast [Vorschau] times and platforms [Plattform / Gleis / Bussteig etc.] * disruptions [Störungen] for departure stop-place * information that are given for each transport are     * journey origin [Starthalt] and destination [Zielhalt]     * cancelled stops [Haltausfall], additional stops [Zusatzhalt], cancelled additional stops [zurückgenommene Zusatzhalte] additional textual information [Freitexte] and possible restrictions on       changing passengers [Fahrgastwechsel] and on demand stops [Bedarfshalte]     * references to other transports representing replacement [Ersatz], relief [Entlastung], travels with [Vereinigung] including separatation at [Trennung in] and continuation [Durchbindung]     * list of via stops including their display priorities [Via-Halte]     * disruptions [Störungen] for particular departure of journey     * information on replacement transports [SEV]     * journeys message [Freitexte / Verspätungsbegründung] and direction-texts [Richtungstexte]  ## Limitations / Known Issues  * journeys are limited to 22h ahead  ## Getting Started  * visit our [documentation](https://ris-api.gitpages.tech.rz.db.de), learn how to [get started with openapi](https://developer-docs.deutschebahn.com/doku/apis/openapi.html) or how   to [get started with asyncapi](https://developer-docs.deutschebahn.com/doku/apis/asyncapi.html) and check out our [coding-examples](https://developer-docs.deutschebahn.com/doku/apis) * bounty hunter, bug finder or just idea creator, we are thirsty to hear from you - get in touch with us by using [DB AnwenderEcho](https://anwenderecho.extranet.deutschebahn.com/ris-api/) or write   an [email](mailto:ris-api@deutschebahn.com)  ## Changelog  <details>  ### 1.5.1  #### Added  * added `journeyDescription` and `categoryInternal` to all transport-objects (`TransportPublic`)  ### 1.4.7  #### Changed  * fixed wrong length for `arrivalOrDepartureID`, `departureID` and `arrivalID` from `10` to `12`  </details> 
 *
 * OpenAPI spec version: 1.5.1.1
 * Contact: ris-fachbetrieb@deutschebahn.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { ErrorDetail } from '../models/ErrorDetail';
import { HttpFile } from '../http/http';

/**
* API error object according to RFC7807.
*/
export class ErrorResponse {
    /**
    * Detailed information for error.
    */
    'detail': string;
    /**
    * Unique code that identifies error.
    */
    'errorCode'?: string;
    /**
    * List of detailed errors in case multiple errors have lead to the surrounding error.
    */
    'errors'?: Array<ErrorDetail>;
    /**
    * Unique identifier for instance that raised the error.
    */
    'instanceId'?: string;
    /**
    * Http status for error origin.
    */
    'status'?: string;
    /**
    * Common description of error.
    */
    'title': string;

    static readonly discriminator: string | undefined = undefined;

    static readonly mapping: {[index: string]: string} | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "detail",
            "baseName": "detail",
            "type": "string",
            "format": ""
        },
        {
            "name": "errorCode",
            "baseName": "errorCode",
            "type": "string",
            "format": ""
        },
        {
            "name": "errors",
            "baseName": "errors",
            "type": "Array<ErrorDetail>",
            "format": ""
        },
        {
            "name": "instanceId",
            "baseName": "instanceId",
            "type": "string",
            "format": ""
        },
        {
            "name": "status",
            "baseName": "status",
            "type": "string",
            "format": ""
        },
        {
            "name": "title",
            "baseName": "title",
            "type": "string",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return ErrorResponse.attributeTypeMap;
    }

    public constructor() {
    }
}
