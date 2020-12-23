const html_template = getTemplate();

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
            ClearMovingStarsTenYears(real_section);
            for (const star in result) {
                if (result.hasOwnProperty(star)) {
                    const single_star = result[star];
                    const node_id = `${single_star["position"]}_${single_star["metaData"][1]}`;
                    const template = html_template[single_star["metaData"][1]];
                    $(`#${real_section}_${node_id}`).append(`${template["front_begin"]} id="${star}_${real_section}_tenYear"${template["front_end"]}${single_star["metaData"][0]}${template["end"]}`);
                }
            }
        } else if (indication === "fail") {
            console.log("fail", status, xhr, result);
        }
    });
}

function ClearMovingStarsTenYears(section) {
    $(`div[id*='_${section}_tenYear']`).remove();
}