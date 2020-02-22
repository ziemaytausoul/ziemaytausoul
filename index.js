const express = require('express');
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser').urlencoded({
    extended: false
});
const cookie = require("cookie-session");
const finding_position = require("./data_collections/finding_position/finding_position.js");
const handleTaskFunctions = require("./handleTaskFunctions.js");
const setting_background = require("./setting_background.js");
const {
    Firestore
} = require('@google-cloud/firestore');
const data_convertion = require("./data_collections/data_convertion.json");

app.use(cookie({
    name: "birth_information",
    keys: ["key1", "key2"]
}));
app.set('views', './views');
app.set('view engine', 'ejs');

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

app.post('/createModule', bodyParser, function (req, res) {
    if (req.session.isPopulated) {
        req.session = null;
    }

    req.session["birth_year"] = req.body.year ? req.body.year : "5";
    req.session["birth_month"] = req.body.month ? req.body.month : "5";
    req.session["birth_day"] = req.body.day ? req.body.day : "5";
    req.session["birth_time"] = req.body.time ? req.body.time : "5";
    req.session["tim_gone"] = req.body.tim_gone ? req.body.tim_gone : "five";

    let reference_data = finding_position.defineSection(req.session.birth_month, req.session.birth_time);

    reference_data.birth_year = req.session["birth_year"];
    reference_data.birth_month = req.session["birth_month"];
    reference_data.birth_day = req.session["birth_day"];
    reference_data.birth_time = req.session["birth_time"];
    reference_data.tim_gone = req.session["tim_gone"];
    reference_data.twelveTimGone = require("./data_collections/tim_gone_of_twelve_sections")[reference_data.tim_gone];

    setting_background.getTypeOfModule(reference_data.twelveTimGone[reference_data.life_point.toString()], reference_data.life_point).then(result_type_of_module => {
        reference_data.type_of_module = result_type_of_module;
        reference_data.type_of_people = finding_position.getTypeOfPeople((req.body.gender != null ? req.body.gender : "0"), reference_data.tim_gone);
        handleTaskFunctions.getModuleData(reference_data.birth_year, reference_data.birth_month, reference_data.birth_day, reference_data.birth_time, reference_data.tim_gone).then(function (result) {
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
                        result[star].position = func.apply(this, params_toPass);
                    }
                    result[star].metaData = star_name_translation[star];
                }
            }
            result.intervalForTenYears = setting_background.settingInternvalForTenYears(reference_data.type_of_module, reference_data.type_of_people, reference_data.life_point);
            result.twelveTimGone = reference_data.twelveTimGone;
            result.twelveTimGone.metaData = data_convertion.tim_gone_to_traChin;
            res.status(200).jsonp(result);
            //res.status(200).render("index");
        }, function (error) {
            res.status(500).end(error);
        });
    }).catch(error => {
        console.error("Index.js -> /createModule.handleTaskFunction.getTypeOfModule", error);
    });
});

app.listen(3000);