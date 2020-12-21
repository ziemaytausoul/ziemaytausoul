function POSTRequestWithJSON(url, data, callback) {
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        dataType: "json",
        success: function (result, status, xhr) {
            callback(result, status, xhr, "success");
        },
        error: function (result, status, xhr) {
            callback(result, status, xhr, "fail");
        }
    });
}

function GETRequest(url, callback) {
    $.ajax({
        type: "GET",
        url: url,
        success: function (result, status, xhr) {
            callback(result, status, xhr, "success")
        },
        error: function (xhr, status, result) {
            callback(xhr, status, result, "fail")
        }
    });
}