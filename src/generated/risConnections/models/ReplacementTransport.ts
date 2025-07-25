/**
 * RIS::Connections
 * ## Info  * powered by [DB Reisendeninformation](https://db-planet.deutschebahn.com/pages/reisendeninformation/apps/content/willkommen) * member of the [RIS-API](https://db.de/ris-api) family, the building kit for traveller information * for details check out [RIS::Connections](https://api-portal.hub.db.de/db/apis/product/ris-connections) in the DB API Portal  ## Capabilities  Provides a list of connections [Anschlüsse] for an arrival [Ankunft] of a journey [Fahrt], e.g. departures [Abfahrten] of other journeys at the stop place [Haltestelle] of the arrival within a given period.  * connection leaving from other stop places [Haltestellen] of the same group [Umstiegsbereich] (e.g. \'Frankfurt Hoch\' and \'Frankfurt Tief\' within the same station \'Frankfurt Hbf\') for example can be included * connections are classified whether they are based on predefined connections [Plananschlüsse] or based on time information * disposition status (e.g. waiting / not waiting) is included * connection evaluation [Anschlussbewertung] (e.g. safe, critical or impossible) is available for different types of travellers [Personae] * disruptions [Störungen] for connections and stop-place [Haltestelle]  The connection evaluation is based on  * the current information on forecast times and platforms of the arriving journey * the current information on forecast times and platforms for the connecting journeys * transfer times [Umstiegszeiten] within stop place (group) [Haltestelle (Umstiegsbereich)] based on real indoor routing information, differentiating barrier-free routes for travellers with reduced mobility [MER] * transfer times within stop place (group) [Haltestelle (Umstiegsbereich)] from official guidelines [Konzernrichtlinie] in case no indoor routing is available  Please note that the service also provides an information on whether the connection would have been reachable based on scheduled-times or not.  Connecting journeys are suppressed if  * all remaining stops of connecting journey can be reached in the same time or faster with remaining stops of arriving journey and * all remaining stops of connecting journey are preceding stops of the arriving journey  [Restlaufwegprüfung] * preceding stops of arriving journey are a subset of preceding stops of connecting journey [Vorlaufprüfung] * remaining stops of journeys are identical (fastest safe connection will remain) * journey occurs multiple times in list (this may happen due to departures of the same journey at different stop-places [Haltestellen] of a stop place group [Umstiegsbereich]; \'safest\' connection will remain)  Details on the logic can be found within the [RIS-API documentation space](https://ris.gitpages.tech.rz.db.de/risapi/documentation/04_Bausteine/030_RIS_Connections.html).  ## Limitations / Known Issues  * journeys are limited to 22h ahead  ## Getting Started  * visit our [documentation](https://ris-api.gitpages.tech.rz.db.de), learn how to [get started with openapi](https://developer-docs.deutschebahn.com/doku/apis/openapi.html) or how to [get started with asyncapi](https://developer-docs.deutschebahn.com/doku/apis/asyncapi.html) and check out our [coding-examples](https://developer-docs.deutschebahn.com/doku/apis) * bounty hunter, bug finder or just idea creator, we are thirsty to hear from you - get in touch with us by using [DB AnwenderEcho](https://anwenderecho.extranet.deutschebahn.com/ris-api/) or write an [email](mailto:ris-api@deutschebahn.com)  ## Changelog  <details>  ### 1.17.1  #### Added  * added `journeyDescription` and `categoryInternal` to all transport-objects (`TransportPublicDestination`)  ### 1.16.8  #### Changed  * fixed wrong length for `arrivalOrDepartureID`, `departureID` and `arrivalID` from `10` to `12`  </details> 
 *
 * OpenAPI spec version: 1.17.1.6
 * Contact: ris-fachbetrieb@deutschebahn.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { HttpFile } from '../http/http';

/**
* Replacement transport [Ersatzverkehr] information, in case transport is a rail replacement transport [Schienenersatzverkehr (SEV)] or emergency bus service [Busnotverkehr]. Indicates that this transport is a replacement transport.
*/
export class ReplacementTransport {
    /**
    * Real type of replacement transport that may differ from sales perspective (for instance a \'REGIONAL_TRAIN\' is usuallay replaced by a \'BUS\'). Possible values are: - HIGH_SPEED_TRAIN (High speed train [Hochgeschwindigkeitszug] like ICE or TGV etc.) - INTERCITY_TRAIN (Inter city train [Intercityzug]) - INTER_REGIONAL_TRAIN (Inter regional train [Interregiozug]) - REGIONAL_TRAIN (Regional train [Regionalzug]) - CITY_TRAIN (City train [S-Bahn]) - SUBWAY (Subway [U-Bahn]) - TRAM (Tram [Strassenbahn]) - BUS (Bus [Bus]) - FERRY (Ferry [Faehre]) - SHUTTLE (Shuttle [Ruftaxi]) - FLIGHT (Flight [Flug]) - UNKNOWN (Unknown)
    */
    'realType': string;

    static readonly discriminator: string | undefined = undefined;

    static readonly mapping: {[index: string]: string} | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "realType",
            "baseName": "realType",
            "type": "string",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return ReplacementTransport.attributeTypeMap;
    }

    public constructor() {
    }
}
