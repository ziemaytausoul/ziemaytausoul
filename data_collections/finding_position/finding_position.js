const {
    exception
} = require('console');
const fs = require('fs');
const {
    start
} = require('repl');
const data_convertion = require(__dirname.replace('finding_position', 'data_convertion.json'));
const preparation_for_stars = require(__dirname.replace('finding_position', 'preparation_for_stars.json'));

/** 火星 **/
module.exports.findForSing = function (startPointForSing, birth_time) {
    if (isNaN(startPointForSing)) {
        throw exception("findForSing: not a number");
    }
    let forSing_position = parseInt(startPointForSing, 10);
    birth_time = parseInt(birth_time, 10);
    for (let step = 0; step < birth_time; step++) {
        forSing_position += step;
    }
    return {
        "for_sing": {
            "position": forSing_position
        }
    };
}

/** 鈴星 **/
module.exports.findLinSing = function (startPointLinSing, birth_time) {
    if (isNaN(startPointLinSing)) {
        throw exception("findForSing: not a number");
    }
    let linSing_position = parseInt(startPointLinSing, 10);
    birth_time = parseInt(birth_time, 10);
    for (let step = 0; step < birth_time; step++) {
        linSing_position += step;
    }
    return {
        "lin_sing": {
            "position": linSing_position
        }
    };
}

/** 旬空(正) **/
module.exports.findSwunKongMain = function (tim_gone, birth_year) {
    var number_tim_gone = data_convertion["tim_gone_to_number"][tim_gone];
    birth_year = parseInt(birth_year);

    for (let temp_tim_gone = number_tim_gone; temp_tim_gone <= 10; temp_tim_gone++) {
        birth_year = birth_year == 12 ? 1 : birth_year + 1;
    }
    return {
        "swun_kong_main": {
            "position": birth_year
        }
    };
}

/** 旬空(傍) **/
module.exports.findSwunKongSub = function (tim_gone, birth_year) {
    var number_tim_gone = data_convertion["tim_gone_to_number"][tim_gone];
    birth_year = parseInt(birth_year);

    for (let temp_tim_gone = number_tim_gone; temp_tim_gone <= 10; temp_tim_gone++) {
        birth_year = birth_year == 12 ? 1 : birth_year + 1;
    }
    return {
        "swun_kong_sub": {
            "position": birth_year + 1
        }
    };
}

/** 天才 **/
module.exports.findTimChoi = function (life_point, birth_year) {
    birth_year = parseInt(birth_year);
    life_point = parseInt(life_point);
    for (let steps = 1; steps < birth_year; steps++) {
        life_point = life_point == 12 ? 1 : life_point++;
    }
    return {
        "tim_choi": {
            "position": life_point
        }
    };
}

/** 天壽 **/
module.exports.findTimSoul = function (anatomy_point, birth_year) {
    birth_year = parseInt(birth_year);
    anatomy_point = parseInt(anatomy_point);
    for (let steps = 1; steps < birth_year; steps++) {
        anatomy_point = anatomy_point == 12 ? 1 : anatomy_point++;
    }
    return {
        "tim_soul": {
            "position": anatomy_point
        }
    };
}

/** 天傷 **/
module.exports.findTimShoin = function (travel_point, type_of_people) {
    let tim_shoin = 0;
    travel_point = parseInt(travel_point);
    if (type_of_people == "01" || type_of_people == "10") {
        tim_shoin = travel_point == 12 ? 1 : travel_point + 1;
    } else if (type_of_people == "11" || type_of_people == "00") {
        tim_shoin = travel_point == 1 ? 12 : travel_point - 1;
    }
    return {
        "tim_shoin": {
            "position": tim_shoin
        }
    };
}

/** 天使 **/
module.exports.findTimSze = function (travel_point, type_of_people) {
    let tim_sze = 0;
    travel_point = parseInt(travel_point);
    if (type_of_people == "11" || type_of_people == "00") {
        tim_sze = travel_point == 12 ? 1 : travel_point + 1;
    } else if (type_of_people == "01" || type_of_people == "10") {
        tim_sze = travel_point == 1 ? 12 : travel_point - 1;
    }
    return {
        "tim_sze": {
            "position": tim_sze
        }
    };
}

/** 台輔 **/
module.exports.findTaiFu = function (positionOf_men_kog) {
    let tai_fu = positionOf_men_kog;
    for (let steps = 0; steps < 2; steps++) {
        tai_fu = tai_fu == 12 ? 1 : tai_fu + 1;
    }
    return {
        "tai_fu": {
            "position": tai_fu
        }
    };
}

/** 封誥 **/
module.exports.findFungGau = function (positionOf_men_kog) {
    let fung_gau = positionOf_men_kog;
    for (let steps = 0; steps < 2; steps++) {
        fung_gau = fung_gau == 1 ? 12 : fung_gau - 1;
    }
    return {
        "fung_gau": {
            "position": fung_gau
        }
    };
}

/** 三台 **/
module.exports.findSanTai = function (positionOf_joe_fu, birth_day) {
    let san_tai = positionOf_joe_fu;
    for (let steps = 0; steps < birth_day; steps++) {
        san_tai = san_tai == 12 ? 1 : san_tai + 1;
    }
    return {
        "san_tai": {
            "position": san_tai
        }
    };
}

/** 八座 **/
module.exports.findBapZoi = function (positionOf_yo_bei, birth_day) {
    let bap_zoi = positionOf_yo_bei;
    for (let steps = 0; steps < birth_day; steps++) {
        bap_zoi = bap_zoi == 12 ? 1 : bap_zoi + 1;
    }
    return {
        "bap_zoi": {
            "position": bap_zoi
        }
    };
}

/** 恩光 **/
module.exports.findYanKwong = function (positionOf_men_cheong, birth_day) {
    let yan_kwong = positionOf_men_cheong;
    for (let steps = 1; steps < birth_day; steps++) {
        yan_kwong = yan_kwong == 12 ? 1 : yan_kwong + 1;
    }
    return {
        "yan_kwong": {
            "position": yan_kwong
        }
    };
}

/** 天貴 **/
module.exports.findTimKwui = function (positionOf_men_kog, birth_day) {
    let tim_kwui = positionOf_men_kog;
    for (let steps = 0; steps < birth_day; steps++) {
        tim_kwui = tim_kwui == 12 ? 1 : tim_kwui + 1;
    }
    return {
        "tim_kwui": {
            "position": tim_kwui
        }
    };
}

/** 太歲十二神 **/
module.exports.findTaiSoiTwelveStars = function (birth_year) {
    let birth_year_number = parseInt(birth_year);
    let tai_soi_twelve_stars = new Array();
    tai_soi_twelve_stars = data_convertion["star_name_translation"]["tai_soi_twelve_stars"]["stars"];

    let [tai_soi] = Object.keys(tai_soi_twelve_stars[0]);

    let result = new Object();
    result[tai_soi] = {
        "position": birth_year_number
    };

    for (let steps = 1; steps < tai_soi_twelve_stars.length; steps++) {
        birth_year_number = birth_year_number == 12 ? 1 : birth_year_number + 1;

        let [result_key] = Object.keys(tai_soi_twelve_stars[steps]);

        result[result_key] = {
            "position": birth_year_number
        };
    }
    return result;
}

/** 博士十二神 **/
module.exports.findBouSiTwelveStars = function (positionOf_luk_chen, type_of_people) {
    let luk_chen = parseInt(positionOf_luk_chen);
    let bou_si_twelve_stars = data_convertion["star_name_translation"]["bou_si_twelve_stars"]["stars"];

    let result = new Object();
    result[Object.keys(bou_si_twelve_stars[0])[0]] = {
        "position": luk_chen
    };

    if (type_of_people == "01" || type_of_people == "10") {
        for (let steps = 1; steps < bou_si_twelve_stars.length; steps++) {
            const [result_key] = Object.keys(bou_si_twelve_stars[steps]);
            luk_chen = luk_chen == 1 ? 12 : luk_chen - 1;
            result[result_key] = {
                "position": luk_chen
            };
        }
    } else if (type_of_people == "00" || type_of_people == "11") {
        for (let steps = 1; steps < bou_si_twelve_stars.length; steps++) {
            const [result_key] = Object.keys(bou_si_twelve_stars[steps]);
            luk_chen = luk_chen == 12 ? 1 : luk_chen + 1;
            result[result_key] = {
                "position": luk_chen
            };
        }
    }
    return result;
}

/** 十二宮 **/
module.exports.defineSection = function (birth_month, birth_time) {
    let birth_month_number = parseInt(birth_month);
    let birth_time_number = parseInt(birth_time);
    let life_point = 3,
        anatomy_point = 3;
    for (let step = 1; step < birth_month_number; step++) {
        life_point = life_point == 12 ? 1 : life_point + 1;
        anatomy_point = anatomy_point == 12 ? 1 : anatomy_point + 1;
    }

    for (let step = 1; step < birth_time_number; step++) {
        life_point = life_point == 1 ? 12 : life_point - 1;
        anatomy_point = anatomy_point == 12 ? 1 : anatomy_point + 1;
    }

    return {
        "life_point": life_point,
        "parent_point": life_point + 1 > 12 ? life_point + 1 - 12 : life_point + 1,
        "thought_point": life_point + 2 > 12 ? life_point + 2 - 12 : life_point + 2,
        "housing_point": life_point + 3 > 12 ? life_point + 3 - 12 : life_point + 3,
        "career_point": life_point + 4 > 12 ? life_point + 4 - 12 : life_point + 4,
        "friendship_point": life_point + 5 > 12 ? life_point + 5 - 12 : life_point + 5,
        "travel_point": life_point + 6 > 12 ? life_point + 6 - 12 : life_point + 6,
        "illness_point": life_point + 7 > 12 ? life_point + 7 - 12 : life_point + 7,
        "possession_point": life_point + 8 > 12 ? life_point + 8 - 12 : life_point + 8,
        "posterity_point": life_point + 9 > 12 ? life_point + 9 - 12 : life_point + 9,
        "marriage_point": life_point + 10 > 12 ? life_point + 10 - 12 : life_point + 10,
        "sibling_point": life_point + 11 > 12 ? life_point + 11 - 12 : life_point + 11,
        "anatomy_point": anatomy_point
    };

}

/** 人的類別 **/
module.exports.getTypeOfPeople = function (typeOf_people, tim_gone) {
    return data_convertion["type_of_tim_gone"][tim_gone] + typeOf_people;
}

/** 十四主星 **/
module.exports.findForteenMainStars = function (birth_day, type_of_module) {
    const zie_may_start_point = preparation_for_stars["zie_may_start_point"][type_of_module];
    const num_birth_day = parseInt(birth_day);
    const num_type_of_module = data_convertion.type_of_module[type_of_module];
    let zie_may_end_point = 0;

    if (num_birth_day >= num_type_of_module) {
        if (num_birth_day % num_type_of_module == 0) {
            zie_may_end_point = 2 + parseInt(num_birth_day / num_type_of_module, 10);
        } else {
            zie_may_end_point = zie_may_start_point + parseInt(num_birth_day / num_type_of_module, 10);
        }
    } else {
        zie_may_end_point = zie_may_start_point + num_birth_day;
    }

    if (zie_may_end_point > 12) {
        zie_may_end_point -= 12;
    }
    const tim_foo_start_point = preparation_for_stars.tim_foo_start_point[zie_may_end_point.toString()];

    return {
        "zie_may": {
            "position": zie_may_end_point
        },
        "tim_gey": {
            "position": zie_may_end_point == 1 ? 12 : zie_may_end_point - 1
        },
        "tai_yueng": {
            "position": zie_may_end_point > 3 ? zie_may_end_point - 3 : zie_may_end_point - 3 + 12
        },
        "mau_koo": {
            "position": zie_may_end_point > 4 ? zie_may_end_point - 4 : zie_may_end_point - 4 + 12
        },
        "tim_toun": {
            "position": zie_may_end_point > 5 ? zie_may_end_point - 5 : zie_may_end_point - 5 + 12
        },
        "lin_zaen": {
            "position": zie_may_end_point > 8 ? zie_may_end_point - 8 : zie_may_end_point - 8 + 12
        },
        "tim_foo": {
            "position": tim_foo_start_point
        },
        "tai_yian": {
            "position": tim_foo_start_point == 12 ? 1 : tim_foo_start_point + 1
        },
        "tam_long": {
            "position": tim_foo_start_point > 10 ? tim_foo_start_point + 2 - 12 : tim_foo_start_point + 2
        },
        "guoy_moon": {
            "position": tim_foo_start_point > 9 ? tim_foo_start_point + 3 - 12 : tim_foo_start_point + 3
        },
        "tim_sueng": {
            "position": tim_foo_start_point > 8 ? tim_foo_start_point + 4 - 12 : tim_foo_start_point + 4
        },
        "tim_leung": {
            "position": tim_foo_start_point > 7 ? tim_foo_start_point + 5 - 12 : tim_foo_start_point + 5
        },
        "chey_sa": {
            "position": tim_foo_start_point > 6 ? tim_foo_start_point + 6 - 12 : tim_foo_start_point + 6
        },
        "pob_gaun": {
            "position": tim_foo_start_point > 2 ? tim_foo_start_point + 10 - 12 : tim_foo_start_point + 10
        }
    }
}

/** 十二長生 **/
module.exports.findTwelveCheongSun = function (type_of_module, type_of_people) {
    const start_point = preparation_for_stars.twelve_cheong_sun_start_point[type_of_module];
    let result = {
        "cheong_sun": {
            "position": ""
        },
        "moo_yau": {
            "position": ""
        },
        "kwun_tai": {
            "position": ""
        },
        "lin_kwun": {
            "position": ""
        },
        "tai_mon": {
            "position": ""
        },
        "soi": {
            "position": ""
        },
        "bang": {
            "position": ""
        },
        "say": {
            "position": ""
        },
        "mou": {
            "position": ""
        },
        "chue": {
            "position": ""
        },
        "toi": {
            "position": ""
        },
        "yeung": {
            "position": ""
        }
    };
    if (type_of_people == "01" || type_of_people == "10") {
        result["cheong_sun"]["position"] = start_point;
        result["moo_yau"]["position"] = start_point == 1 ? 12 : start_point - 1;
        result["kwun_tai"]["position"] = start_point > 2 ? start_point - 2 : start_point - 2 + 12;
        result["lin_kwun"]["position"] = start_point > 3 ? start_point - 3 : start_point - 3 + 12;
        result["tai_mon"]["position"] = start_point > 4 ? start_point - 4 : start_point - 4 + 12;
        result["soi"]["position"] = start_point > 5 ? start_point - 5 : start_point - 5 + 12;
        result["bang"]["position"] = start_point > 6 ? start_point - 6 : start_point - 6 + 12;
        result["say"]["position"] = start_point > 7 ? start_point - 7 : start_point - 7 + 12;
        result["mou"]["position"] = start_point > 8 ? start_point - 8 : start_point - 8 + 12;
        result["chue"]["position"] = start_point > 9 ? start_point - 9 : start_point - 9 + 12;
        result["toi"]["position"] = start_point > 10 ? start_point - 10 : start_point - 10 + 12;
        result["yeung"]["position"] = start_point > 11 ? start_point - 11 : start_point - 11 + 12;
    } else if (type_of_people == "11" || type_of_people == "00") {
        result["cheong_sun"]["position"] = start_point;
        result["moo_yau"]["position"] = start_point == 12 ? 1 : start_point + 1;
        result["kwun_tai"]["position"] = start_point < 11 ? start_point + 2 : start_point + 2 - 12;
        result["lin_kwun"]["position"] = start_point < 10 ? start_point + 3 : start_point + 3 - 12;
        result["tai_mon"]["position"] = start_point < 9 ? start_point + 4 : start_point + 4 - 12;
        result["soi"]["position"] = start_point < 8 ? start_point + 5 : start_point + 5 - 12;
        result["bang"]["position"] = start_point < 7 ? start_point + 6 : start_point + 6 - 12;
        result["say"]["position"] = start_point < 6 ? start_point + 7 : start_point + 7 - 12;
        result["mou"]["position"] = start_point < 5 ? start_point + 8 : start_point + 8 - 12;
        result["chue"]["position"] = start_point < 4 ? start_point + 9 : start_point + 9 - 12;
        result["toi"]["position"] = start_point < 3 ? start_point + 10 : start_point + 10 - 12;
        result["yeung"]["position"] = start_point < 2 ? start_point + 11 : start_point + 11 - 12;
    }
    return result;
}

/** 子斗 **/
module.exports.findZieDau = function (birth_month, birth_time) {
    let positionOf_ZieDau = 1;
    for (let step = 0; step < parseInt(birth_month, 10); step++) {
        positionOf_ZieDau = positionOf_ZieDau - 1 < 1 ? 12 : positionOf_ZieDau - 1;
    }

    for (let step = 0; step < parseInt(birth_time, 10); step++) {
        positionOf_ZieDau = positionOf_ZieDau + 1 > 12 ? 1 : positionOf_ZieDau + 1;
    }
    return {
        "zie_dau": {
            "position": positionOf_ZieDau
        }
    };
}

/** 人/地盤-十二宮 **/
module.exports.AdjustTwelveSections = function (FirstSec_Result, StartPoint, Section) {
    const pointsName = Object.keys(data_convertion["point_name"]);
    const newLifePoint = StartPoint;
    let nextPoint = 0;
    pointsName.forEach(name => {
        if (name != "anatomy_point") {
            FirstSec_Result[Section][name].position = nextPoint + newLifePoint > 12 ? nextPoint + newLifePoint - 12 : nextPoint + newLifePoint;
            nextPoint++;
        }
    });
}

/** 人/地盤-十二長生 **/
module.exports.AdjustTwelveCheongSun = function (FirstSec_Result, typeOfModule, typeOfPeople, Section) {
    let cheongSun = this.findTwelveCheongSun(typeOfModule, typeOfPeople);
    for (const key in cheongSun) {
        if (cheongSun.hasOwnProperty(key)) {
            FirstSec_Result[Section][key]["position"] = cheongSun[key]["position"];
        }
    }
}

/** 人/地盤-十四星 **/
module.exports.AdjustMainStars = function (FirstSec_Result, typeOfModule, birth_day, Section) {
    const mainStars = this.findForteenMainStars(birth_day, typeOfModule);
    for (const key in mainStars) {
        if (mainStars.hasOwnProperty(key)) {
            FirstSec_Result[Section][key]["position"] = mainStars[key]["position"];
        }
    }
}

/** 人/地盤 - 天使 **/
module.exports.adjustTimSze = function (Result, travel_point, type_of_people, Section) {
    let tim_sze = 0;
    travel_point = parseInt(travel_point, 10);
    if (type_of_people == "11" || type_of_people == "00") {
        tim_sze = travel_point == 12 ? 1 : travel_point + 1;
    } else if (type_of_people == "01" || type_of_people == "10") {
        tim_sze = travel_point == 1 ? 12 : travel_point - 1;
    }
    Result[Section]["tim_sze"]["position"] = tim_sze;
}

/** 人/地盤 - 天傷 **/
module.exports.adjustTimShoin = function (Result, travel_point, type_of_people, Section) {
    let tim_shoin = 0;
    travel_point = parseInt(travel_point, 10);
    if (type_of_people == "01" || type_of_people == "10") {
        tim_shoin = travel_point == 12 ? 1 : travel_point + 1;
    } else if (type_of_people == "11" || type_of_people == "00") {
        tim_shoin = travel_point == 1 ? 12 : travel_point - 1;
    }
    Result[Section]["tim_shoin"]["position"] = tim_shoin;
}