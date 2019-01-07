/** HTTP status codes */
export class StatusCode {

    /**  */
    static _0 = 0; // Unknown Error

    /** 2xx Success */
    static _200 = 200; // OK
    static _201 = 201; // Created
    static _202 = 202; // Accepted
    static _203 = 203; // Non-Authoritative Information (since HTTP/1.1)
    static _204 = 204; // No Content (The server successfully processed the request and is not returning any content.)
    static _205 = 205; // Reset Content

    /** 4xx Client errors */
    static _400 = 400; // Bad Request (The server cannot or will not process the request due to an apparent client error)
    static _401 = 401; // Unauthorized
    static _402 = 402; // Payment Required
    static _403 = 403; // Forbidden
    static _404 = 404; // Not Found
    static _405 = 405; // Method Not Allowed

    /** 5xx Server errors */
    static _500 = 500; // Internal Server Error
    static _501 = 501; // Not Implemented
    static _502 = 502; // Bad Gateway
    static _503 = 503; // Service Unavailable
    static _504 = 504; // Gateway Timeout
    static _505 = 505; // HTTP Version Not Supported
    static _506 = 506; // Variant Also Negotiates
    static _507 = 507; // Insufficient Storage
}

