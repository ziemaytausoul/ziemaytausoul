const data_convertion = require("./data_collections/data_convertion.json");
const project_id = "ziemaytausoul",
    keyFilename = "./ZieMayTauSoul-fec5572fa40b.json";
const fs = require("fs");
module.exports.defineTimGoneOfTwelveSections = function (tim_gone) {
    let result = new Object();
    try {
        const twelveSections = require("./data_collections/tim_gone_of_twelve_sections");
        const zodiac = require("./data_collections/data_convertion")["number_to_zodiac"];
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

module.exports.settingInternvalForTenYears = function (type_of_module, type_of_people, positionOf_life_point) {
    let result = new Object();
    let data = JSON.parse(fs.readFileSync("./data_collections/interval_for_ten_years.json", {
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