import { RequestContext } from "../http/http";

/**
 * Interface authentication schemes.
 */
export interface SecurityAuthentication {
    /*
     * @return returns the name of the security authentication as specified in OAI
     */
    getName(): string;

    /**
     * Applies the authentication scheme to the request context
     *
     * @params context the request context which should use this authentication scheme
     */
    applySecurityAuthentication(context: RequestContext): void | Promise<void>;
}

export interface TokenProvider {
  getToken(): Promise<string> | string;
}

/**
 * Applies apiKey authentication to the request context.
 */
export class ClientIDAuthentication implements SecurityAuthentication {
    /**
     * Configures this api key authentication with the necessary properties
     *
     * @param apiKey: The api key to be used for every request
     */
    public constructor(private apiKey: string) {}

    public getName(): string {
        return "ClientID";
    }

    public applySecurityAuthentication(context: RequestContext) {
        context.setHeaderParam("DB-Client-ID", this.apiKey);
    }
}

/**
 * Applies apiKey authentication to the request context.
 */
export class ClientSecretAuthentication implements SecurityAuthentication {
    /**
     * Configures this api key authentication with the necessary properties
     *
     * @param apiKey: The api key to be used for every request
     */
    public constructor(private apiKey: string) {}

    public getName(): string {
        return "ClientSecret";
    }

    public applySecurityAuthentication(context: RequestContext) {
        context.setHeaderParam("DB-Api-Key", this.apiKey);
    }
}


export type AuthMethods = {
    "default"?: SecurityAuthentication,
    "ClientID"?: SecurityAuthentication,
    "ClientSecret"?: SecurityAuthentication
}

export type ApiKeyConfiguration = string;
export type HttpBasicConfiguration = { "username": string, "password": string };
export type HttpBearerConfiguration = { tokenProvider: TokenProvider };
export type OAuth2Configuration = { accessToken: string };
export type HttpSignatureConfiguration = unknown; // TODO: Implement

export type AuthMethodsConfiguration = {
    "default"?: SecurityAuthentication,
    "ClientID"?: ApiKeyConfiguration,
    "ClientSecret"?: ApiKeyConfiguration
}

/**
 * Creates the authentication methods from a swagger description.
 *
 */
export function configureAuthMethods(config: AuthMethodsConfiguration | undefined): AuthMethods {
    let authMethods: AuthMethods = {}

    if (!config) {
        return authMethods;
    }
    authMethods["default"] = config["default"]

    if (config["ClientID"]) {
        authMethods["ClientID"] = new ClientIDAuthentication(
            config["ClientID"]
        );
    }

    if (config["ClientSecret"]) {
        authMethods["ClientSecret"] = new ClientSecretAuthentication(
            config["ClientSecret"]
        );
    }

    return authMethods;
}