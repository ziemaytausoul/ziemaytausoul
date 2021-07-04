$(document).ready(() => {
  $(window).resize(() => {
    let winWidth = $(window).width();
    let winHeight = $(window).height();
    //$("html").css({"font-size" : (Math.pow(Math.pow(winWidth,2) + Math.pow(winHeight,2),0.5) / Math.pow(Math.pow(1672,2) + Math.pow(1297,2),0.5)) + "px" })
    //$(document).css({"font-size" : (Math.pow(Math.pow(winWidth,2) + Math.pow(winHeight,2),0.5) / Math.pow(Math.pow(1672,2) + Math.pow(1297,2),0.5))});
    $("html").css({ "font-size": "1vmin" });
  });
});
var section_list = $(document).find("section");
const template_obj = getTemplate();

function createModule() {
  $("#submitBtn").prop("disabled", true);
  var time = $("#time").children("option:selected").val();
  var day = "";
  var month = "";
  var year = "";
  var tim_gone = "";
  var c_year = "";
  var gender = $("#gender").children("option:selected").val();

  section_list.each(function (index, elem) {
    EmbedTemplate(elem.id);
  });
  console.log($("#dateType").children("option:selected").val());
  if ($("#dateType").children("option:selected").val() == "1") {
    $.ajax({
      //url: `https://ziemaytausoul.azurewebsites.net/api/DateTransformation/GetLunarDate?year=${$("#year").val()}&month=${$("#month").val()}&day=${$("#day").val()}`,
      url: `${window.location.origin}/getLunarDate`,
      method: "POST",
      data: {
        year: $("#year").val(),
        month: $("#month").val(),
        day: $("#day").val(),
      },
      success: function (result, status, xhr) {
        //console.log(result, xhr);
        //var transformed_date = result["result"];
        //var date_arr = transformed_date.split("_");
        var timGoneNzodiac = result["GanZhiYear"].split("_");
        var date_arr = new Array(
          result["lunarYear"],
          result["lunarMonth"],
          result["lunarDay"],
          timGoneNzodiac[0],
          timGoneNzodiac[1]
        );
        if (date_arr) {
          c_year = date_arr[0];
          month = date_arr[1];
          day = date_arr[2];
          tim_gone = date_arr[3];
          year = date_arr[4];
          /*console.log("day: ", day, "month: ", month, "year: ", year, "tim_gone: ",
                        tim_gone,
                        "time: ", time, "c_year: ", c_year, "gender: ", gender);*/
          getModulData();
        } else {
          console.log(status);
        }
      },
      error: function (xhr, status, error) {
        console.log(xhr.status);
        console.log(error);
      },
    });
  } else {
    $.ajax({
      //url: `https://ziemaytausoul.azurewebsites.net/api/DateTransformation/GetLunarDate?year=${$("#year").val()}&month=${$("#month").val()}&day=${$("#day").val()}`,
      url: `${window.location.origin}/getLunarYear`,
      method: "POST",
      data: {
        year: $("#year").val(),
      },
      success: function (result, status, xhr) {
        //console.log(result);
        var timGoneNzodiac = result.split("_");
        if (timGoneNzodiac) {
          c_year = $("#year").val();
          month = $("#month").val();
          day = $("#day").val();
          tim_gone = timGoneNzodiac[0];
          year = timGoneNzodiac[1];
          /*console.log("day: ", day, "month: ", month, "year: ", year, "tim_gone: ",
                        tim_gone,
                        "time: ", time, "c_year: ", c_year, "gender: ", gender);*/
          getModulData();
        } else {
          console.log(status);
        }
      },
      error: function (xhr, status, error) {
        console.log(xhr.status);
        console.log(error);
      },
    });
  }

  function getModulData() {
    $.ajax({
      url: `${window.location.origin}/createModule`,
      method: "POST",
      data: JSON.stringify({
        tim_gone: tim_gone,
        year: year,
        month: month,
        day: day,
        time: time,
        c_year: c_year,
        gender: gender,
      }),
      dataType: "json",
      contentType: "application/json;charset=utf-8",
      success: function (result, status, xhr) {
        /*let people_type = result["first_sec"]["people_type"];
                switch(people_type) {
                    case "陽女" :
                    sessionStorage.setItem("type_of_people", "10")
                    break;
                    case "陽男" :
                    sessionStorage.setItem("type_of_people", "11")
                    break;
                    case "陰女" :
                    sessionStorage.setItem("type_of_people", "00")
                    break;
                    default:
                    sessionStorage.setItem("type_of_people", "01")
                    break;
                }*/

        LocateStar(result);
        $("#submitBtn").prop("disabled", false);
      },
      error: function (xhr, status, error) {
        console.log(xhr.status);
        console.log(error);
        $("#submitBtn").prop("disabled", false);
      },
    });
  }
}

function LocateStar(module) {
  $.each(module, function (sec_name, section_content) {
    $.each(section_content, function (star, details) {
      const node_id = `${details.position}_${details.metaData[1]}`;
      const template = template_obj[details.metaData[1]];
      /*console.log(
                `#${sec_name}_${node_id} : ${details.metaData[0]} : ${details.metaData[1]}`);*/
      $(`#${sec_name}_${node_id}`).append(
        `${template["front_begin"]}${template["front_end"]}${details.metaData[0]}${template["end"]}`
      );
    });
    switch (sec_name) {
      case "first_sec":
        $(`#${sec_name}_510_module_type`).text("天盤");
        break;
      case "second_sec":
        $(`#${sec_name}_510_module_type`).text("地盤");
        break;
      default:
        $(`#${sec_name}_510_module_type`).text("人盤");
        break;
    }
  });
  OrderingStars("first_sec", "2");
}
