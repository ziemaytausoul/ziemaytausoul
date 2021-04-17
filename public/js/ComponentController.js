const html_template = getTemplate();
const html_others = getOthers();
let copy_star_flag = false;
const position_id = [
  "子",
  "丑",
  "寅",
  "卯",
  "辰",
  "巳",
  "午",
  "未",
  "申",
  "酉",
  "戍",
  "亥",
];
const dateType = {
  year: "年",
  month: "月",
  day: "日",
};

function CopyStars(section) {
  let real_section = section.replace("_copyStar", "");
  for (let position = 1; position <= 12; position++) {
    if (!$(`#${real_section}_${position}_main`).children(".main").length) {
      if (position < 7) {
        $(`#${real_section}_${position + 6}_main`)
          .children(".main")
          .clone()
          .addClass("main_copy")
          .appendTo(`#${real_section}_${position}_main`);
        $(`#${real_section}_${position + 6}_moon`)
          .children(".moon")
          .clone()
          .addClass("moon_copy")
          .appendTo(`#${real_section}_${position}_moon`);
        $(`#${real_section}_${position + 6}_moon`)
          .children(".m_moon")
          .clone()
          .addClass("m_moon_copy")
          .appendTo(`#${real_section}_${position}_moon`);
        $(`#${real_section}_${position + 6}_first_tier`)
          .children(".first_tier")
          .clone()
          .addClass("first_tier_copy")
          .appendTo(`#${real_section}_${position}_first_tier`);
        $(`#${real_section}_${position + 6}_second_tier`)
          .children(".second_tier")
          .clone()
          .addClass("second_tier_copy")
          .appendTo(`#${real_section}_${position}_second_tier`);
      } else {
        $(`#${real_section}_${position - 6}_main`)
          .children(".main")
          .clone()
          .addClass("main_copy")
          .appendTo(`#${real_section}_${position}_main`);
        $(`#${real_section}_${position - 6}_moon`)
          .children(".moon")
          .clone()
          .addClass("moon_copy")
          .appendTo(`#${real_section}_${position}_moon`);
        $(`#${real_section}_${position - 6}_moon`)
          .children(".m_moon")
          .clone()
          .addClass("m_moon_copy")
          .appendTo(`#${real_section}_${position}_moon`);
        $(`#${real_section}_${position - 6}_first_tier`)
          .children(".first_tier")
          .clone()
          .addClass("first_tier_copy")
          .appendTo(`#${real_section}_${position}_first_tier`);
        $(`#${real_section}_${position - 6}_second_tier`)
          .children(".second_tier")
          .clone()
          .addClass("second_tier_copy")
          .appendTo(`#${real_section}_${position}_second_tier`);
      }
    }
  }
  copy_star_flag = true;
  UpdateBtnStarCopy(section);
}

function ClearStarsCopied(section) {
  let real_section = section.replace("_copyStar", "");
  for (let position = 1; position <= 12; position++) {
    let main_copy = $(`#${real_section}_${position}_main`).children(
      ".main_copy"
    );
    if (main_copy.length) {
      const moon_copy = $(`#${real_section}_${position}_moon`).children(
        ".moon_copy"
      );
      const first_tier = $(`#${real_section}_${position}_first_tier`).children(
        ".first_tier_copy"
      );
      const second_tier = $(
        `#${real_section}_${position}_second_tier`
      ).children(".second_tier_copy");
      for (const child of main_copy) {
        child.remove();
      }
      for (const child of moon_copy) {
        child.remove();
      }
      for (const child of first_tier) {
        child.remove();
      }
      for (const child of second_tier) {
        child.remove();
      }
    }
  }
  copy_star_flag = false;
  UpdateBtnStarCopy(section);
}

function UpdateBtnStarCopy(section) {
  if ($(`#${section}`).text() == "借星") {
    $(`#${section}`).text("取消借星");
    $(`#${section}`).attr("onclick", "ClearStarsCopied(this.id)");
  } else {
    $(`#${section}`).text("借星");
    $(`#${section}`).attr("onclick", "CopyStars(this.id)");
  }
}

function MovingStarsTenYear(section, text) {
  var pattern = /[0-9]+/;
  let timGone_tenYear = text.trim().slice(0, 1);
  let zodiac_tenYear =
    pattern.exec(section) == null ? 0 : pattern.exec(section)[0];
  let real_section = section.replace(/_[0-9]+_character/, "");
  POSTRequestWithJSON(
    `${window.location.origin}/fetchMovingStarsTenYear`, {
      tim_gone: timGone_tenYear,
      zodiac: zodiac_tenYear,
    },
    function (result, status, xhr, indication) {
      if (indication === "success") {
        ClearMovingStars(real_section, "tenYear");
        LocateMovingStar(result, "tenYear", real_section);
      } else if (indication === "fail") {
        console.log("fail", status, xhr, result);
      }
    }
  );
}

function MovingStarFormAppear(component, type) {
  const section = $(component).parents("section").prop("id");
  /*const date = `<option selected>一${dateType[type]}</option><option>數${dateType[type]}</option>`;
    $(`#${section}_movingstars_period`).empty().append(date);*/
  $(`#${section}_movingstars_submit`).attr(
    "onclick",
    `MovingStarsSettle("${section}", "${type}", "${$(component).prop("id")}")`
  );
  $(`#${section}_movingstars_cancel`).attr(
    "onclick",
    `CancelMovingStarsSettle("${section}")`
  );
  $(`#${section}_MovingStarsYear`).prop("disabled", true);
  $(`#${section}_MovingStarsMonth`).prop("disabled", true);
  $(`#${section}_MovingStarsDay`).prop("disabled", true);
  $(`#${section}_moving_year`).val("");
  $(`#${section}_moving_month`).val("");
  $(`#${section}_moving_day`).val("");
  switch (type) {
    case "year":
      $(`#${section}_movingstars_container_year`).show();
      $(`#${section}_movingstars_container_month`).hide();
      $(`#${section}_movingstars_container_day`).hide();
      break;
    case "month":
      $(`#${section}_movingstars_container_year`).show();
      $(`#${section}_movingstars_container_month`).show();
      $(`#${section}_movingstars_container_day`).hide();
      break;
    default:
      $(`#${section}_movingstars_container_year`).show();
      $(`#${section}_movingstars_container_month`).show();
      $(`#${section}_movingstars_container_day`).show();
      break;
  }
  $(`#${section}_movingstars_form`).show();
}

function MovingStarsSettle(section, type, id) {
  /*let moving_day, moving_month, moving_year;
  switch (type) {
    case "year":
      moving_year = $(`#${section}_moving_year`).val().replace(/\s+/g, "");
      break;
    case "month":
      moving_year = $(`#${section}_moving_year`).val().replace(/\s+/g, "");
      moving_month = $(`#${section}_moving_month`).val().replace(/\s+/g, "");
      break;
    default:
      moving_year = $(`#${section}_moving_year`).val().replace(/\s+/g, "");
      moving_month = $(`#${section}_moving_month`).val().replace(/\s+/g, "");
      moving_day = $(`#${section}_moving_day`).val().replace(/\s+/g, "");
      break;
  }*/
  $(`#${section}_movingstars_form`).hide();
  let day = $(`#${section}_moving_day`).val().replace(/\s+/g, ""),
    month = $(`#${section}_moving_month`).val().replace(/\s+/g, ""),
    year = $(`#${section}_moving_year`).val().replace(/\s+/g, ""),
    data = {},
    url = ``;
  if (type === "day") {
    data["day"] = day;
    data["month"] = month;
    data["year"] = year;
    url = `${window.location.origin}/getLunarDay`;
  } else if (type === "month") {
    data["month"] = month;
    data["year"] = year;
    url = `${window.location.origin}/getLunarMonth`;
  } else if (type === "year") {
    data["year"] = year;
    url = `${window.location.origin}/getLunarYear`;
  }

  POSTRequestWithJSON(url, data, function (result, status, xhr, indication) {
    if (indication === "success") {
      var pattern = /_/;
      let [timGone, zodiac] = result.split(pattern);
      POSTRequestWithJSON(
        `${window.location.origin}/fetchMovingStarsTenYear`, {
          tim_gone: timGone,
          zodiac: zodiac,
        },
        function (result_stars, status_stars, xhr_stars, indication_stars) {
          try {
            if (indication_stars === "success") {
              ClearMovingStars(section, type);
              LocateMovingStar(result_stars, type, section);
            } else if (indication_stars === "fail") {
              console.log("fail", status_stars, xhr_stars, result_stars);
            }
          } catch (e) {
            console.log(e);
          }
          $(`#${section}_MovingStarsYear`).prop("disabled", false);
          $(`#${section}_MovingStarsMonth`).prop("disabled", false);
          $(`#${section}_MovingStarsDay`).prop("disabled", false);
        }
      );
    } else if (indication === "fail") {
      $(`#${section}_MovingStarsYear`).prop("disabled", false);
      $(`#${section}_MovingStarsMonth`).prop("disabled", false);
      $(`#${section}_MovingStarsDay`).prop("disabled", false);
      console.log("fail", status, xhr, result);
    }
  });
}

function CancelMovingStarsSettle(section) {
  $(`#${section}_MovingStarsYear`).prop("disabled", false);
  $(`#${section}_MovingStarsMonth`).prop("disabled", false);
  $(`#${section}_MovingStarsDay`).prop("disabled", false);
  $(`#${section}_movingstars_form`).hide();
}

function LocateMovingStar(result, type, section) {
  for (const star in result) {
    if (result.hasOwnProperty(star)) {
      const single_star = result[star];
      const node_id = `${single_star["position"]}_${single_star["metaData"][1]}`;
      let template;
      if (single_star["metaData"][1] === "moon") {
        template = html_template["m_moon"];
      }
      /*else if (single_star["metaData"][1] === "") {
             template = html_template["m_moon"];
           }*/
      let html_node = `${template["front_begin"]} id="${star}_${section}_${single_star["position"]}_${type}"${template["front_end"]}${single_star["metaData"][0]}${html_others[type]}${template["end"]}`;
      $(html_node).appendTo(`#${section}_${node_id}`);
      if (copy_star_flag) {
        let position = parseInt(single_star["position"]);
        if (position < 7) {
          if (
            $(`div#${section}_${position + 6}_main > div.main_copy`).length > 0
          ) {
            const elem_id = `${star}_${section}_${position + 6}_${type}`;
            $(html_node)
              .addClass(`${single_star["metaData"][1]}_copy`)
              .attr("id", elem_id)
              .appendTo(
                `#${section}_${`${position + 6}_${single_star["metaData"][1]}`}`
              );
          }
        } else {
          if (
            $(`div#${section}_${position - 6}_main > div.main_copy`).length > 0
          ) {
            const elem_id = `${star}_${section}_${position - 6}_${type}`;
            $(html_node)
              .addClass(`${single_star["metaData"][1]}_copy`)
              .attr("id", elem_id)
              .appendTo(
                `#${section}_${`${position - 6}_${single_star["metaData"][1]}`}`
              );
          }
        }
      }
    }
  }
}

function ClearMovingStars(section, type) {
  for (let position = 0; position <= 12; position++) {
    $(`div[id*='_${section}_${position}_${type}']`).remove();
  }
}