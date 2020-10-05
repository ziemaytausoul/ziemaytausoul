const path_mod = require('path');
const parent_dir = path_mod.join(path_mod.resolve(__dirname, ".."), "data_collections");
const data_convertion = require(path_mod.join(parent_dir, "data_convertion.json"));
const background = require(path_mod.join(parent_dir, "basic_data.json"));
const project_id = "ziemaytausoul",
    keyFilename = "./ziemaytausoul.json";
const fs = require("fs");
const superagent = require('superagent');
const { openDelimiter } = require('ejs');
const express = require('express');
const { resolveSoa } = require('dns');


/** 十二宮的大運天干 **/
module.exports.defineTimGoneOfTwelveSections = function (tim_gone) {
    let result = new Object();
    try {
        const twelveSections = require(path_mod.join(parent_dir, "tim_gone_of_twelve_sections.json"));
        const zodiac = require(path_mod.join(parent_dir, "data_convertion.json"))["number_to_zodiac"];
        const metaData = data_convertion["tim_gone_to_traChin"];
        const raw_data = twelveSections[tim_gone];
        for (const position in raw_data) {
            if (raw_data.hasOwnProperty(position)) {
                const tim_gone = raw_data[position];
                const key = `${tim_gone}_${position}`;
                result[key] = {
                    "position": position
                };
                result[key]["metaData"] = [metaData[tim_gone] + zodiac[position], "character"];
            }
        }
    } catch (error) {
        throw error;
    }
    return result;
}

/** 命盤的局數 **/
module.exports.getTypeOfModule = function (tim_gone, positionOf_life_point) {
    const {
        Firestore
    } = require("@google-cloud/firestore");
    const firestore = new Firestore({
        projectId: project_id,
        keyFilename: keyFilename
    });

    const promise = new Promise(function (resolve, reject) {
        firestore.collection("type_of_module").doc(tim_gone).get().then(result => {
            if (result.exists) {
                resolve(result.get(`${positionOf_life_point}`.toString()));
            } else {
                reject("document doesn't exit");
            }
        }).catch(error => {
            reject(error);
        });
    });
    return promise;
}

/** 十年大運 **/
module.exports.settingInternvalForTenYears = function (type_of_module, type_of_people, positionOf_life_point) {
    let result = new Object();
    let data = JSON.parse(fs.readFileSync(path_mod.join(parent_dir, "interval_for_ten_years.json"), {
        encoding: 'utf-8'
    }));
    let intervals = data.interval[type_of_module];
    switch (type_of_people) {
        case "11", "00":
            for (let steps = 0; steps < intervals.length; steps++) {
                result[steps] = {
                    "position": positionOf_life_point + steps > 12 ? positionOf_life_point + steps - 12 : positionOf_life_point + steps,
                    "metaData": [intervals[steps], "ten_years"]
                }
            }
            return result;
        default:
            for (let steps = 0; steps < intervals.length; steps++) {
                result[steps] = {
                    "position": positionOf_life_point - steps < 1 ? positionOf_life_point - steps + 12 : positionOf_life_point - steps,
                    "metaData": [intervals[steps], "ten_years"]
                }
            }
            return result;
    }
}

/** 現行大運 **/
module.exports.settingTenYearsLiving = function (year_old, type_of_module, type_of_people, tim_gone, positionOf_life_point) {
    let data = JSON.parse(fs.readFileSync(path_mod.join(parent_dir, "interval_for_ten_years.json"), {
        encoding: 'utf-8'
    }));
    let intervals = data.interval[type_of_module];
    for (let steps = 0; steps < intervals.length; steps++) {
        var temp = intervals[steps].split("-");
        if (year_old >= parseInt(temp[0], 10) && year_old <= parseInt(temp[1], 10)) {
            let ten_year_living = '';
            if (type_of_people == '11' || type_of_people == '00') {
                ten_year_living = positionOf_life_point + steps > 12 ? positionOf_life_point + steps - 12 : positionOf_life_point + steps;
            } else {
                ten_year_living = positionOf_life_point - steps < 1 ? positionOf_life_point + steps + 12 : positionOf_life_point - steps;
            }
            for (const key in tim_gone) {
                const string_arr = key.split('_');
                if (string_arr[1] == ten_year_living) { //Check if the value at position of 2 is equal to the value in ten_year_living
                    return tim_gone[key]["metaData"][0];
                }
            }
        }

    }
}

/** 人/地-現行大運 **/
module.exports.adjustTenYearsLiving = function (FirstSec_result, year_old, type_of_module, type_of_people, tim_gone, Section) {
    let data = JSON.parse(fs.readFileSync(path_mod.join(parent_dir, "interval_for_ten_years.json"), {
        encoding: 'utf-8'
    }));
    let positionOf_life_point = FirstSec_result[Section]["life_point"]["position"];
    let intervals = data.interval[type_of_module];
    for (let steps = 0; steps < intervals.length; steps++) {
        var temp = intervals[steps].split("-");
        if (year_old >= parseInt(temp[0], 10) && year_old <= parseInt(temp[1], 10)) {
            let ten_year_living = '';
            if (type_of_people == '11' || type_of_people == '00') {
                ten_year_living = positionOf_life_point + steps > 12 ? positionOf_life_point + steps - 12 : positionOf_life_point + steps;
            } else {
                ten_year_living = positionOf_life_point - steps < 1 ? positionOf_life_point + steps + 12 : positionOf_life_point - steps;
            }
            for (const key in tim_gone) {
                const string_arr = key.split('_');
                if (string_arr[1] == ten_year_living) { //Check if the value at position of 2 is equal to the value in ten_year_living
                    FirstSec_result[Section]["ten_years_positioning"]["metaData"][0] = tim_gone[key]["metaData"][0];
                }
            }
        }

    }
}


/** 人/地盤-十年大運 **/
module.exports.adjustInternvalForTenYears = function (FirstSec_Result, type_of_module, type_of_people, positionOf_life_point, Section) {
    let data = JSON.parse(fs.readFileSync(path_mod.join(parent_dir, "interval_for_ten_years.json"), {
        encoding: 'utf-8'
    }));
    let intervals = data.interval[type_of_module];
    switch (type_of_people) {
        case "11", "00":
            for (let steps = 0; steps < intervals.length; steps++) {
                FirstSec_Result[Section][steps] = {
                    "position": positionOf_life_point + steps > 12 ? positionOf_life_point + steps - 12 : positionOf_life_point + steps,
                    "metaData": [intervals[steps], "ten_years"]
                }
            }
            break;
        default:
            for (let steps = 0; steps < intervals.length; steps++) {
                FirstSec_Result[Section][steps] = {
                    "position": positionOf_life_point - steps < 1 ? positionOf_life_point - steps + 12 : positionOf_life_point - steps,
                    "metaData": [intervals[steps], "ten_years"]
                }
            }
            break;
    }
}

/** 年歲 **/
module.exports.getAge = async function (birth_year, birth_month, birth_day) {

    let date_obj = new Date();
    let now_day = '';
    let now_month = '';
    let now_year = '';
    let result;
    await getDate(date_obj.getFullYear(), date_obj.getMonth(), date_obj.getDay()).then(value => {
        result = JSON.parse(value)["result"].split("_");
    });
    now_year = parseInt(result[0], 10);
    now_month = parseInt(result[1], 10);
    now_day = parseInt(result[2], 10);

    if (now_month >= parseInt(birth_month, 10)) {
        if (now_day >= parseInt(birth_day, 10)) {
            return now_year - parseInt(birth_year, 10);
        }
    }
    return now_year - parseInt(birth_year, 10) - 1;

}

/** 命主 **/
module.exports.getModulecore = function (birth_year) {
    return background["module_core"][birth_year];
}

/** 身主 **/
module.exports.getAnatomyCore = function (birth_year) {
    return background["anatomy_core"][birth_year];
}

/**
 * support function - Get lunar date
 * @param {*} year 
 * @param {*} month 
 * @param {*} day 
 */
const getDate = async function (year, month, day) {
    const path = `https://ziemaytausoul.azurewebsites.net/api/DateTransformation/GetLunarDate?year=${year}&month=${month}&day=${day}`;
    let now_date = await superagent.get(path);
    return now_date.text;
}