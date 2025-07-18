'use server'

const startStation = "8002198";
const changeStation = "8005927";
const destinationStation = "8004185";

import {
    ConnectionsApi,
    ConnectionStatus,
    createConfiguration as createConnectionsConfiguration
} from "@/generated/risConnections";
import {
    // @ts-expect-error TS2305
    BoardsApi,
    createConfiguration as createBoardsConfiguration,
    ServerConfiguration,
    // @ts-expect-error TS2305
    StopDeparture
} from "@/generated/risBoards";

const boardsServer = new ServerConfiguration("https://apis.deutschebahn.com/db/apis/ris-boards/v1", {})
const boardsAuth = {
    ClientID: process.env.DB_BOARDS_CLIENT_ID,
    ClientSecret: process.env.DB_BOARDS_API_KEY
};

const connectionsServer = new ServerConfiguration("https://apis.deutschebahn.com/db/apis/ris-connections/v1", {})
const connectionsAuth = {
    ClientID: process.env.DB_TRANSPORTS_CLIENT_ID,
    ClientSecret: process.env.DB_TRANSPORTS_API_KEY,
}

const boardsConfiguration = createBoardsConfiguration({
    baseServer: boardsServer,
    authMethods: boardsAuth
});

const connectionsConfiguration = createConnectionsConfiguration({
    baseServer: connectionsServer,
    authMethods: connectionsAuth
});

const boards = new BoardsApi(boardsConfiguration);
const connections = new ConnectionsApi(connectionsConfiguration);

export type ConnectionInfo = {
    departureTransport?: MinimalTransport,
    destinationTransport?: MinimalTransport,
    status: ConnectionStatus
}

export type MinimalTransport = {
    displayName: string,
    departureTime: Date,
    journeyId: string
}

export async function checkConnection(): Promise<ConnectionInfo> {
    const departures: Array<StopDeparture> = (await boards.boardDeparture([startStation], Date())).departures
    const nextDepartureToDestination: StopDeparture | undefined = departures.find(departure => {
        return departure.transport.destination.evaNumber === changeStation
    });
    if (!nextDepartureToDestination) {
        console.log("No departure found to destination station");
        return Promise.resolve({status: ConnectionStatus.Unknown})
    }
    console.log("Next departure to destination station: " + nextDepartureToDestination.transport.number);

    const availableConnections = await connections.connectionsArrival(
        nextDepartureToDestination.journeyID,
        `${changeStation}_A_1`
    );

    const nextRelevantConnection = availableConnections.connections?.find(connection => {
        const vias = connection.transport.via.map(via => via.evaNumber);
        return vias.includes(destinationStation);
    });

    const status = nextRelevantConnection?.connectionStatusByPersona?.[0].status ?? ConnectionStatus.Impossible;
    let connectionData: MinimalTransport | undefined;
    if (nextRelevantConnection) {
        connectionData = {
            displayName: nextRelevantConnection.transport.journeyDescription,
            departureTime: nextRelevantConnection.time,
            journeyId: nextRelevantConnection.journeyID
        };
    }

    return Promise.resolve({
        status: status,
        departureTransport: {
            displayName: nextDepartureToDestination.transport.journeyDescription,
            departureTime: nextDepartureToDestination.time,
            journeyId: nextDepartureToDestination.journeyID
        },
        destinationTransport: connectionData
    });
}
