function CopyStars(section) {
    let real_section = section.replace("_copyStar", "");
    for (let position = 1; position <= 12; position++) {
        if (!($(`#${real_section}_${position}_main`).children(".main").length)) {
            if (position < 7) {
                $(`#${real_section}_${position + 6}_main`).children(".main").clone().addClass("main_copy").appendTo(`#${real_section}_${position}_main`);
            } else {
                $(`#${real_section}_${position - 6}_main`).children(".main").clone().addClass("main_copy").appendTo(`#${real_section}_${position}_main`);
            }
        }
    }
    UpdateBtnStarCopy(section);
}

function ClearStarsCopied(section) {
    let real_section = section.replace("_copyStar", "");
    for (let position = 1; position <= 12; position++) {
        let main_copy = $(`#${real_section}_${position}_main`).children(".main_copy")
        if (main_copy.length) {
            for (const child of main_copy) {
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