const express = require('express');
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser');
const cookie = require("cookie-session");
const finding_position = require("./data_collections/finding_position/finding_position.js");
const handleTaskFunctions = require("./handleTaskFunctions.js");
const setting_background = require("./setting_background.js");
const {
    Firestore
} = require('@google-cloud/firestore');
const data_convertion = require("./data_collections/data_convertion.json");
const tim_gone_of_12Sections = require("./data_collections/tim_gone_of_twelve_sections");

/**Environment setting**/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookie({
    name: "birth_information",
    keys: ["key1", "key2"]
}));
app.use(express.static(__dirname + '/public'));

app.set("port", process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render("index.ejs");
});

app.get('/uploadData', function (req, res) {
    handleTaskFunctions.uploadData("data_collections").then(result => {
        res.json(result);
    }).catch(error => {
        res.send(error);
    });
});

app.get('/updateData', function (req, res) {
    res.status(200).render("index");
});

app.post('/createModule', function (req, res) {
    try {


        if (req.session.isPopulated) {
            req.session = null;
        }

        req.session["birth_year"] = req.body.year ? req.body.year : "5";
        req.session["birth_month"] = req.body.month ? req.body.month : "5";
        req.session["birth_day"] = req.body.day ? req.body.day : "5";
        req.session["birth_time"] = req.body.time ? req.body.time : "5";
        req.session["tim_gone"] = req.body.tim_gone ? data_convertion["number_to_tim_gone"][req.body.tim_gone] : "five";
        console.log(req.session);
        let reference_data = finding_position.defineSection(req.session.birth_month, req.session.birth_time);

        reference_data.birth_year = req.session["birth_year"];
        reference_data.birth_month = req.session["birth_month"];
        reference_data.birth_day = req.session["birth_day"];
        reference_data.birth_time = req.session["birth_time"];
        reference_data.tim_gone = req.session["tim_gone"];
        reference_data.twelveTimGone = tim_gone_of_12Sections[reference_data.tim_gone];

        setting_background.getTypeOfModule(reference_data.twelveTimGone[reference_data.life_point.toString()], reference_data.life_point.toString())
            .then(result_type_of_module => {
                reference_data.type_of_module = result_type_of_module;
                reference_data.type_of_people = finding_position.getTypeOfPeople((req.body.gender != null ? req.body.gender : "0"), reference_data.tim_gone);

                handleTaskFunctions.getModuleData(reference_data.birth_year, reference_data.birth_month, reference_data.birth_day, reference_data.birth_time, reference_data.tim_gone)
                    .then(function (result) {

                        let star_name_translation = data_convertion["star_name_translation"];

                        for (const star in result) {

                            if (star_name_translation.hasOwnProperty(star)) {

                                if (result[star].hasOwnProperty("findingPosition")) {
                                    let [params] = Object.values(result[star].findingPosition);
                                    let func = finding_position[Object.keys(result[star].findingPosition)];
                                    let params_toPass = new Array();
                                    for (let i = 0; i < params.length; i++) {
                                        if (typeof params[i] == "object") {
                                            if (params[i].hasOwnProperty("positionOf")) {
                                                params_toPass[i] = result[params[i].positionOf]["position"];
                                            }
                                        } else {
                                            params_toPass[i] = reference_data[params[i]];
                                        }
                                    }

                                    delete result[star].findingPosition;
                                    let result_fromFindingPosition = func.apply(this, params_toPass);

                                    for (const r_result in result_fromFindingPosition) {
                                        result[r_result] = result_fromFindingPosition[r_result];
                                    }

                                    if (star_name_translation[star].hasOwnProperty("stars")) {
                                        star_name_translation[star]["stars"].forEach(element => {
                                            const key = Object.keys(element);
                                            result[key]["metaData"] = element[key];
                                        });
                                        delete result[star];
                                    } else {
                                        result[star]["metaData"] = star_name_translation[star];
                                    }

                                } else {
                                    result[star]["metaData"] = star_name_translation[star];
                                }

                                // if (result[star] !== "undefined") {

                                // } else {
                                //     const stars_metaData = star_name_translation[star]["stars"];
                                //     console.log("stars_metaData: ",star_name_translation[star]);
                                //     stars_metaData.forEach(element => {
                                //         const [key] = Object.keys(element);
                                //         result[key]["metaData"] = element[key];
                                //     });
                                // }
                            }
                        }
                        /** Prepare ten_years **/
                        const temp_ten_years = setting_background.settingInternvalForTenYears(reference_data.type_of_module, reference_data.type_of_people, reference_data.life_point);
                        for (const year in temp_ten_years) {
                            if (temp_ten_years.hasOwnProperty(year)) {
                                result[year] = temp_ten_years[year];
                            }
                        }
                        /** Prepare character **/
                        const temp_character = setting_background.defineTimGoneOfTwelveSections(reference_data.tim_gone);
                        for (const charac in temp_character) {
                            if (temp_character.hasOwnProperty(charac)) {
                                result[charac] = temp_character[charac];
                            }
                        }

                        /** Prepare position**/
                        const temp_twelveSections = finding_position.defineSection(reference_data.birth_month, reference_data.birth_time);
                        const twelveSections_trans = data_convertion["point_name"];
                        for (const position in temp_twelveSections) {
                            if (temp_twelveSections.hasOwnProperty(position)) {
                                result[position] = {
                                    "position": temp_twelveSections[position]
                                };
                                result[position]["metaData"] = twelveSections_trans[position];
                            }
                        }

                        /** Prepare type_of_module **/

                        /** Prepare type_of_people**/

                        res.status(200).jsonp(result);
                        //res.status(200).render("index");
                    }, function (error) {
                        res.status(500).end(error);
                    }).catch(error => {
                        console.error("Index.js -> /createModule.handleTaskFunction.getTypeOfModule.getModuleData\n", error)
                    });
            }).catch(error => {
                console.error("Index.js -> /createModule.handleTaskFunction.getTypeOfModule\n", error);
            });
    } catch (error) {
        res.status(500).end(error);
    }
});

app.listen(app.get("port"), function () {
    console.log("Server is listening on: ", app.get("port"));
});