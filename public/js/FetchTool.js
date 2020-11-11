module.exports.POSTRequestWithJSON = function (url, data) {
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        dataType: "json",
        success: function (result, status, xhr) {
            return {
                "res": "success",
                "xhr": xhr,
                "status": status,
                "result": result
            }
        },
        error: function (xhr, status, error) {
            return {
                "res": "fail",
                "xhr": xhr,
                "status": status,
                "error": error
            }
        }
    });
}

module.exports.GETRequest = function (url) {
    $.ajax({
        type: "GET",
        url: url,
        success: function (result, status, xhr) {
            return {
                "res": "success",
                "xhr": xhr,
                "status": status,
                "result": result
            }
        },
        error: function (xhr, status, error) {
            return {
                "res": "fail",
                "xhr": xhr,
                "status": status,
                "error": error
            }
        }
    });
}