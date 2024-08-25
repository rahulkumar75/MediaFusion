class ApiResponse {
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

export { ApiResponse }

// learn more about status code 
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Statusclass ApiResponse {
