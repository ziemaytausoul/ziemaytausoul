function POSTRequestWithJSON(url, data, callback) {
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        dataType: "json",
        success: callback(result, status, xhr, "success"),
        error: callback(error, status, xhr, "fail")
    });
}

function GETRequest(url, callback) {
    $.ajax({
        type: "GET",
        url: url,
        success: callback(result, status, xhr, "success"),
        error: callback(xhr, status, error, "fail")
    });
}