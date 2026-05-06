class Response {
    constructor ( status, code, success, message, data, error) {
        this.status = status;
        this.code = code;
        this.success = success;
        this.message = message;
        this.data = data;
        this.error = error;
    }
}

module.exports = {
    //success response
    successResponse: (code, message, data) => {
        return new Response(
            200, code, true, message, data
        );
    },
    //server error
    serverError: (code, message, data, error) => {
        return new Response(
            500, code, false, message, data, error
        );
    },
}