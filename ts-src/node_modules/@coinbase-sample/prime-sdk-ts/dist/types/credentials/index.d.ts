export declare class CoinbasePrimeCredentials {
    private accessKey;
    private secretKey;
    private passphrase;
    constructor(key?: string, secret?: string, passphrase?: string);
    generateAuthHeaders(requestMethod: string, uri: string, body: string): Record<string, string>;
}
