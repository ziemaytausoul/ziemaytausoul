const html_template = getTemplate();
let copy_star_flag = false;
const position_id = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戍", "亥"];
const dateType = {
    "year": "年",
    "month": "月",
    "day": "日"
};

function CopyStars(section) {
    let real_section = section.replace("_copyStar", "");
    for (let position = 1; position <= 12; position++) {
        if (!($(`#${real_section}_${position}_main`).children(".main").length)) {
            if (position < 7) {
                $(`#${real_section}_${position + 6}_main`).children(".main").clone().addClass("main_copy").appendTo(`#${real_section}_${position}_main`);
                $(`#${real_section}_${position + 6}_moon`).children(".moon").clone().addClass("moon_copy").appendTo(`#${real_section}_${position}_moon`);
                $(`#${real_section}_${position + 6}_first_tier`).children(".first_tier").clone().addClass("first_tier_copy").appendTo(`#${real_section}_${position}_first_tier`);
                $(`#${real_section}_${position + 6}_second_tier`).children(".second_tier").clone().addClass("second_tier_copy").appendTo(`#${real_section}_${position}_second_tier`);
            } else {
                $(`#${real_section}_${position - 6}_main`).children(".main").clone().addClass("main_copy").appendTo(`#${real_section}_${position}_main`);
                $(`#${real_section}_${position - 6}_moon`).children(".moon").clone().addClass("moon_copy").appendTo(`#${real_section}_${position}_moon`);
                $(`#${real_section}_${position - 6}_first_tier`).children(".first_tier").clone().addClass("first_tier_copy").appendTo(`#${real_section}_${position}_first_tier`);
                $(`#${real_section}_${position - 6}_second_tier`).children(".second_tier").clone().addClass("second_tier_copy").appendTo(`#${real_section}_${position}_second_tier`);
            }
        }
    }
    copy_star_flag = true;
    UpdateBtnStarCopy(section);
}

function ClearStarsCopied(section) {
    let real_section = section.replace("_copyStar", "");
    for (let position = 1; position <= 12; position++) {
        let main_copy = $(`#${real_section}_${position}_main`).children(".main_copy");
        if (main_copy.length) {
            const moon_copy = $(`#${real_section}_${position}_moon`).children(".moon_copy");
            const first_tier = $(`#${real_section}_${position}_first_tier`).children(".first_tier_copy");
            const second_tier = $(`#${real_section}_${position}_second_tier`).children(".second_tier_copy");
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
    let zodiac_tenYear = pattern.exec(section) == null ? 0 : pattern.exec(section)[0];
    let real_section = section.replace(/_[0-9]+_character/, "");
    POSTRequestWithJSON("/fetchMovingStarsTenYear", {
        "tim_gone": timGone_tenYear,
        "zodiac": zodiac_tenYear
    }, function (result, status, xhr, indication) {
        if (indication === "success") {
            ClearMovingStars(real_section, "tenYear");
            LocateMovingStar(result, "tenYear", real_section);
        } else if (indication === "fail") {
            console.log("fail", status, xhr, result);
        }
    });
}

function MovingStars(section, ele) {
    console.log(section, ele);
}

function MovingStarFormAppear(component, type) {
    const section = $(component).parents("section").prop("id");
    const date = `<option selected>一${dateType[type]}</option><option>數${dateType[type]}</option>`;
    $(`#${section}_movingstars_period`).empty().append(date);
    $(`#${section}_movingstars_form > input[type='submit']`).click(MovingStars(section, this));
    $(`#${section}_movingstars_form`).show();
}

function LocateMovingStar(result, type, section) {
    for (const star in result) {
        if (result.hasOwnProperty(star)) {
            const single_star = result[star];
            const node_id = `${single_star["position"]}_${single_star["metaData"][1]}`;
            const template = html_template[single_star["metaData"][1]];
            $(`#${section}_${node_id}`).append(`${template["front_begin"]} id="${star}_${section}_${single_star["position"]}_${type}"${template["front_end"]}${single_star["metaData"][0]}${template["end"]}`);
            if (copy_star_flag) {
                let position = parseInt(single_star["position"]);
                if (position < 7) {
                    if ($(`div#${section}_${position + 6}_main > div.main_copy`).length > 0) {
                        const elem_id = `${star}_${section}_${position + 6}_${type}`;
                        $(`${template["front_begin"]} id="${elem_id}"${template["front_end"]}${single_star["metaData"][0]}${template["end"]}`).addClass(`${single_star["metaData"][1]}_copy`).appendTo(`#${section}_${`${position + 6}_${single_star["metaData"][1]}`}`);
                    }
                } else {
                    if ($(`div#${section}_${position - 6}_main > div.main_copy`).length > 0) {
                        const elem_id = `${star}_${section}_${position - 6}_${type}`;
                        $(`${template["front_begin"]} id="${elem_id}"${template["front_end"]}${single_star["metaData"][0]}${template["end"]}`).addClass(`${single_star["metaData"][1]}_copy`).appendTo(`#${section}_${`${position - 6}_${single_star["metaData"][1]}`}`);
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