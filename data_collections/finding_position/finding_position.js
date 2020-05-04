const fs = require('fs');
const data_convertion = require(__dirname.replace('finding_position', 'data_convertion.json'));
const preparation_for_stars = require(__dirname.replace('finding_position', 'preparation_for_stars.json'));
module.exports.findForSing = function (startPointForSing, birth_time) {
    return isNaN(startPointForSing) ? 0 : parseInt(startPointForSing) + parseInt(birth_time);
}

module.exports.findLinSing = function (startPointLinSing, birth_time) {
    return isNaN(startPointLinSing) ? 0 : parseInt(startPointLinSing) + parseInt(birth_time);
}

module.exports.findSwunKong = function (tim_gone, birth_year) {
    var number_tim_gone = parseInt(tim_gone);
    birth_year = parseInt(birth_year);
    for (let temp_tim_gone = number_tim_gone; temp_tim_gone <= 10; temp_tim_gone++) {
        birth_year = birth_year == 12 ? 1 : birth_year + 1;
    }
    return birth_year;
}

module.exports.findTimChoi = function (life_point, birth_year) {
    birth_year = parseInt(birth_year);
    life_point = parseInt(life_point);
    for (let steps = 1; steps < birth_year; steps++) {
        life_point = life_point == 12 ? 1 : life_point++;
    }
    return life_point;
}

module.exports.findTimSoul = function (anatomy_point, birth_year) {
    birth_year = parseInt(birth_year);
    anatomy_point = parseInt(anatomy_point);
    for (let steps = 1; steps < birth_year; steps++) {
        anatomy_point = anatomy_point == 12 ? 1 : anatomy_point++;
    }
    return anatomy_point;
}

module.exports.findTimShoin = function (travel_point, type_of_people) {
    let tim_shoin = 0;
    travel_point = parseInt(travel_point);
    if (type_of_people == "01" || type_of_people == "10") {
        tim_shoin = travel_point == 12 ? 1 : travel_point + 1;
    } else if (type_of_people == "11" || type_of_people == "00") {
        tim_shoin = travel_point == 1 ? 12 : travel_point - 1;
    }
    return tim_shoin;
}

module.exports.findTimSze = function (travel_point, type_of_people) {
    let tim_sze = 0;
    travel_point = parseInt(travel_point);
    if (type_of_people == "01" || type_of_people == "10") {
        tim_sze = travel_point == 12 ? 1 : travel_point + 1;
    } else if (type_of_people == "11" || type_of_people == "00") {
        tim_sze = travel_point == 1 ? 12 : travel_point - 1;
    }
    return tim_sze;
}

module.exports.findTaiFu = function (positionOf_men_kog) {
    let tai_fu = positionOf_men_kog;
    for (let steps = 0; steps < 2; steps++) {
        tai_fu = tai_fu == 12 ? 1 : tai_fu + 1;
    }
    return tai_fu;
}

module.exports.findFungGau = function (positionOf_men_kog) {
    let fung_kau = positionOf_men_kog;
    for (let steps = 0; steps < 2; steps++) {
        fung_kau = fung_kau == 1 ? 12 : fung_kau - 1;
    }
    return fung_kau;
}

module.exports.findSanTai = function (positionOf_joe_fu, birth_day) {
    let san_tai = positionOf_joe_fu;
    for (let steps = 0; steps < birth_day; steps++) {
        san_tai = san_tai == 12 ? 1 : san_tai + 1;
    }
    return san_tai;
}

module.exports.findBapZoi = function (positionOf_yo_bei, birth_day) {
    let bap_zoi = positionOf_yo_bei;
    for (let steps = 0; steps < birth_day; steps++) {
        bap_zoi = bap_zoi == 12 ? 1 : bap_zoi + 1;
    }
    return bap_zoi;
}

module.exports.findYanKwong = function (positionOf_men_cheong, birth_day) {
    let yan_kwong = positionOf_men_cheong;
    for (let steps = 1; steps < birth_day; steps++) {
        yan_kwong = yan_kwong == 12 ? 1 : yan_kwong + 1;
    }
    return yan_kwong;
}

module.exports.findTimKwui = function (positionOf_men_kog, birth_day) {
    let tim_kwui = positionOf_men_kog;
    for (let steps = 0; steps < birth_day; steps++) {
        tim_kwui = tim_kwui == 12 ? 1 : tim_kwui + 1;
    }
    return tim_kwui;
}

module.exports.findTaiSoiTwelveStars = function (birth_year) {
    let birth_year_number = parseInt(birth_year);
    let tai_soi_twelve_stars = new Array();
    tai_soi_twelve_stars = data_convertion["star_name_translation"]["tai_soi_twelve_stars"]["stars"];
    
    let tai_soi = Object.keys(tai_soi_twelve_stars[0]);

    let result = new Object();
    result[tai_soi] = {"position" : birth_year_number};

    for (let steps = 1; steps < tai_soi_twelve_stars.length; steps++) {
        birth_year_number = birth_year_number == 12 ? 1 : birth_year_number + 1;

        let result_key = Object.keys(tai_soi_twelve_stars[steps]);

        result[result_key] = {"position" : birth_year_number};
    }
    return result;
}

module.exports.findBouSiTwelveStars = function (positionOf_luk_chen, type_of_people) {
    let luk_chen = parseInt(positionOf_luk_chen);
    let bou_si_twelve_stars = data_convertion["star_name_translation"]["bou_si_twelve_stars"]["stars"];
    let result = new Array();
    let obj = new Object();
    obj[Object.keys(bou_si_twelve_stars[0])[0]] = luk_chen;
    result.push(obj);
    if (type_of_people == "01" || type_of_people == "10") {
        for (let steps = 1; steps < bou_si_twelve_stars.length; steps++) {
            const result_key = Object.keys(bou_si_twelve_stars[steps]);
            luk_chen = luk_chen == 1 ? 12 : luk_chen - 1;
            const result_obj = new Object();
            result_obj[result_key] = luk_chen;
            result.push(result_obj);
        }
    } else if (type_of_people == "00" || type_of_people == "11") {
        for (let steps = 1; steps < bou_si_twelve_stars.length; steps++) {
            const result_key = Object.keys(bou_si_twelve_stars[steps]);
            luk_chen = luk_chen == 12 ? 1 : luk_chen + 1;
            const result_obj = new Object();
            result_obj[result_key] = luk_chen;
            result.push(result_obj);
        }
    }
    return result;
}

//figure out the position of twelve sections
module.exports.defineSection = function (birth_month, birth_time) {
    let birth_month_number = parseInt(birth_month);
    let birth_time_number = parseInt(birth_time);
    let life_point = 3,
        anatomy_point = 3;
    for (let step = 0; step < birth_month_number; step++) {
        life_point = life_point == 12 ? 1 : life_point + 1;
        anatomy_point = anatomy_point == 12 ? 1 : anatomy_point + 1;
    }

    for (let step = 0; step < birth_time_number; step++) {
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

module.exports.getTypeOfPeople = function (typeOf_people, tim_gone) {
    return data_convertion["type_of_tim_gone"][tim_gone] + typeOf_people;
}

module.exports.findForteenMainStars = function (birth_day, type_of_module) {
    const zie_may_start_point = preparation_for_stars["zie_may_start_point"][type_of_module];
    const num_birth_day = parseInt(birth_day);
    const num_type_of_module = data_convertion.type_of_module[type_of_module];
    const zie_may_end_point = num_birth_day >= num_type_of_module ? (num_birth_day % num_type_of_module == 0 ? 3 : (num_birth_day / num_type_of_module) + zie_may_start_point + 1 > 12 ? (num_birth_day / num_type_of_module) + zie_may_start_point + 1 - 12 : (num_birth_day / num_type_of_module) + zie_may_start_point + 1) : num_type_of_module;
    const tim_foo_start_point = preparation_for_stars.tim_foo_start_point[zie_may_end_point.toString()];
    //console.log("findForteenMainStars: ", num_birth_day, num_type_of_module);
    return {
        "zie_may": zie_may_end_point,
        "tim_gey": zie_may_end_point == 1 ? 12 : zie_may_end_point - 1,
        "tai_yueng": zie_may_end_point > 3 ? zie_may_end_point - 3 : zie_may_end_point - 3 + 12,
        "mau_koo": zie_may_end_point > 4 ? zie_may_end_point - 4 : zie_may_end_point - 4 + 12,
        "tim_toun": zie_may_end_point > 5 ? zie_may_end_point - 5 : zie_may_end_point - 5 + 12,
        "lin_zaen": zie_may_end_point > 8 ? zie_may_end_point - 8 : zie_may_end_point - 8 + 12,
        "tim_foo": tim_foo_start_point,
        "tai_yian": tim_foo_start_point == 12 ? 1 : tim_foo_start_point + 1,
        "tam_long": tim_foo_start_point > 10 ? tim_foo_start_point + 2 - 12 : tim_foo_start_point + 2,
        "guoy_moon": tim_foo_start_point > 9 ? tim_foo_start_point + 3 - 12 : tim_foo_start_point + 3,
        "tim_sueng": tim_foo_start_point > 8 ? tim_foo_start_point + 4 - 12 : tim_foo_start_point + 4,
        "tim_leung": tim_foo_start_point > 7 ? tim_foo_start_point + 5 - 12 : tim_foo_start_point + 5,
        "chey_sa": tim_foo_start_point > 6 ? tim_foo_start_point + 6 - 12 : tim_foo_start_point + 6,
        "pob_gaun": tim_foo_start_point > 2 ? tim_foo_start_point + 10 - 12 : tim_foo_start_point + 10
    }
}

module.exports.findTwelveCheongSun = function (type_of_module, type_of_people) {
    const start_point = preparation_for_stars.twelve_cheong_sun_start_point[type_of_module];
    if (type_of_people == "01" || type_of_people == "10") {
        return {
            "cheong_sun": start_point,
            "moo_yau": start_point == 1 ? 12 : start_point - 1,
            "kwun_tai": start_point > 2 ? start_point - 2 : start_point - 2 + 12,
            "lin_kwun": start_point > 3 ? start_point - 3 : start_point - 3 + 12,
            "tai_mon": start_point > 4 ? start_point - 4 : start_point - 4 + 12,
            "soi": start_point > 5 ? start_point - 5 : start_point - 5 + 12,
            "bang": start_point > 6 ? start_point - 6 : start_point - 6 + 12,
            "say": start_point > 7 ? start_point - 7 : start_point - 7 + 12,
            "mou": start_point > 8 ? start_point - 8 : start_point - 8 + 12,
            "chue": start_point > 9 ? start_point - 9 : start_point - 9 + 12,
            "toi": start_point > 10 ? start_point - 10 : start_point - 10 + 12,
            "yeung": start_point > 11 ? start_point - 11 : start_point - 11 + 12
        }
    } else if (type_of_people == "11" || type_of_people == "00") {
        return {
            "cheong_sun": start_point,
            "moo_yau": start_point == 12 ? 1 : start_point + 1,
            "kwun_tai": start_point < 11 ? start_point + 2 : start_point + 2 - 12,
            "lin_kwun": start_point < 10 ? start_point + 3 : start_point + 3 - 12,
            "tai_mon": start_point < 9 ? start_point + 4 : start_point + 4 - 12,
            "soi": start_point < 8 ? start_point + 5 : start_point + 5 - 12,
            "bang": start_point < 6 ? start_point + 6 : start_point + 6 - 12,
            "say": start_point < 7 ? start_point + 7 : start_point + 7 - 12,
            "mou": start_point < 8 ? start_point + 8 : start_point + 8 - 12,
            "chue": start_point < 9 ? start_point + 9 : start_point + 9 - 12,
            "toi": start_point < 10 ? start_point + 10 : start_point + 10 - 12,
            "yeung": start_point < 11 ? start_point + 11 : start_point + 11 - 12
        }
    }
}