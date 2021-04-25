const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const cookie = require("cookie-session");
const finding_position = require("./data_collections/finding_position/finding_position.js");
const handleTaskFunctions = require("./Utility/handleTaskFunctions.js");
const setting_background = require("./Utility/setting_background.js");
const tim_gone_of_12Sections = require("./data_collections/tim_gone_of_twelve_sections");
const data_convertion = require("./data_collections/data_convertion.json");
const calendar_convertor = require("./Utility/LunarCalendar.js");
/**Environment setting**/
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  cookie({
    name: "birth_information",
    keys: ["key1", "key2"],
  })
);
app.use(express.static(__dirname + "/public"));
app.use(
  cors({
    origin: "*",
  })
);

app.set("port", process.env.PORT || 3000);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("index.ejs");
});

app.get("/uploadData", function (req, res) {
  handleTaskFunctions
    .uploadData("data_collections")
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get("/updateData", function (req, res) {
  res.status(200).render("index");
});

app.post("/getLunarDate", function (req, res) {
  res
    .status(200)
    .jsonp(
      calendar_convertor.solarToLunar(
        req.body.year,
        req.body.month,
        req.body.day
      )
    );
});

app.post("/getLunarYear", function (req, res) {
  res
    .status(200)
    .jsonp(calendar_convertor.getLunarYear(parseInt(req.body.year, 10), 1));
});

app.post("/getLunarMonth", function (req, res) {
  res
    .status(200)
    .jsonp(
      calendar_convertor.getLunarMonth(
        parseInt(req.body.year, 10),
        parseInt(req.body.month, 10),
        1
      )
    );
});

app.post("/getLunarDay", function (req, res) {
  /*console.log(
    calendar_convertor.getLunarDay(
      parseInt(req.body.year, 10),
      parseInt(req.body.month, 10) - 1,
      parseInt(req.body.day, 10)
    )
  );*/
  res
    .status(200)
    .jsonp(
      calendar_convertor.getLunarDay(
        parseInt(req.body.year, 10),
        parseInt(req.body.month, 10) - 1,
        parseInt(req.body.day, 10)
      )
    );
});

app.post("/fetchMovingStarsTenYear", function (req, res) {
  const movingStars = require("./data_collections/moving_stars.json");
  let tim_gone = "";
  if (req.body.tim_gone) {
    if (
      Object.keys(data_convertion["traChin_to_tim_gone"]).includes(
        req.body.tim_gone
      )
    ) {
      tim_gone =
        data_convertion["traChin_to_tim_gone"][req.body.tim_gone.trim()];
    } else if (
      Object.keys(data_convertion["number_to_tim_gone"]).includes(
        req.body.tim_gone.trim()
      )
    ) {
      tim_gone =
        data_convertion["number_to_tim_gone"][req.body.tim_gone.trim()];
    }
  }
  const zodiac = req.body.zodiac ? req.body.zodiac : null;
  const data = {
    tim_gone: tim_gone,
    zodiac: zodiac,
  };
  //console.log(data);
  let result = {};
  try {
    for (const condition in movingStars) {
      const stars = movingStars[condition];
      for (const moving_star in stars) {
        const position = stars[moving_star][data[condition]];
        result[moving_star] = {
          position: position,
          metaData: data_convertion["star_name_translation"][moving_star],
        };
      }
    }
    if (result) {
      res.status(200).jsonp(result);
    } else {
      res.status(500).jsonp("Bad_Result: " + result);
    }
  } catch (error) {
    console.log(error);
    res.status(500).jsonp(error);
  }
});

app.post("/createModule", function (req, res) {
  try {
    if (req.session.isPopulated) {
      req.session = null;
    }

    req.session["birth_year"] = req.body.year ? req.body.year : "5";
    req.session["birth_month"] = req.body.month ? req.body.month : "5";
    req.session["birth_day"] = req.body.day ? req.body.day : "5";
    req.session["birth_time"] = req.body.time ? req.body.time : "5";
    req.session["tim_gone"] = req.body.tim_gone ?
      data_convertion["number_to_tim_gone"][req.body.tim_gone] :
      "five";
    req.session["lunar_year"] = req.body.c_year ? req.body.c_year : "0";

    let reference_data = finding_position.defineSection(
      req.session.birth_month,
      req.session.birth_time
    );

    reference_data.birth_year = req.session["birth_year"];
    reference_data.birth_month = req.session["birth_month"];
    reference_data.birth_day = req.session["birth_day"];
    reference_data.birth_time = req.session["birth_time"];
    reference_data.tim_gone = req.session["tim_gone"];
    reference_data.lunar_year = req.session["lunar_year"];
    reference_data.twelveTimGone =
      tim_gone_of_12Sections[reference_data.tim_gone];

    setting_background
      .getAge(
        reference_data.lunar_year,
        reference_data.birth_month,
        reference_data.birth_day
      )
      .then(
        (result_Age) => {
          reference_data.age = result_Age;
          setting_background
            .getTypeOfModule(
              reference_data.twelveTimGone[
                reference_data.life_point.toString()
              ],
              reference_data.life_point.toString()
            )
            .then((result_type_of_module) => {
              reference_data.type_of_module = result_type_of_module;
              reference_data.type_of_people = finding_position.getTypeOfPeople(
                req.body.gender != null ? req.body.gender : "0",
                reference_data.tim_gone
              );

              handleTaskFunctions
                .getModuleData(
                  reference_data.birth_year,
                  reference_data.birth_month,
                  reference_data.birth_day,
                  reference_data.birth_time,
                  reference_data.tim_gone
                )
                .then(
                  function (result) {
                    let star_name_translation =
                      data_convertion["star_name_translation"];

                    for (const star in result) {
                      if (star_name_translation.hasOwnProperty(star)) {
                        if (result[star].hasOwnProperty("findingPosition")) {
                          let [params] = Object.values(
                            result[star].findingPosition
                          );
                          let func =
                            finding_position[
                              Object.keys(result[star].findingPosition)
                            ];
                          let params_toPass = new Array();
                          for (let i = 0; i < params.length; i++) {
                            if (typeof params[i] == "object") {
                              if (params[i].hasOwnProperty("positionOf")) {
                                params_toPass[i] =
                                  result[params[i].positionOf]["position"];
                              }
                            } else {
                              params_toPass[i] = reference_data[params[i]];
                            }
                          }

                          delete result[star].findingPosition;
                          let result_fromFindingPosition = func.apply(
                            this,
                            params_toPass
                          );

                          for (const r_result in result_fromFindingPosition) {
                            result[r_result] =
                              result_fromFindingPosition[r_result];
                          }

                          if (
                            star_name_translation[star].hasOwnProperty("stars")
                          ) {
                            star_name_translation[star]["stars"].forEach(
                              (element) => {
                                const key = Object.keys(element);
                                result[key]["metaData"] = [...element[key]];
                              }
                            );
                            delete result[star];
                          } else {
                            result[star]["metaData"] = [
                              ...star_name_translation[star],
                            ];
                          }
                        } else {
                          result[star]["metaData"] = [
                            ...star_name_translation[star],
                          ];
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
                    const temp_ten_years = setting_background.settingInternvalForTenYears(
                      reference_data.type_of_module,
                      reference_data.type_of_people,
                      reference_data.life_point
                    );
                    for (const year in temp_ten_years) {
                      if (temp_ten_years.hasOwnProperty(year)) {
                        result[year] = temp_ten_years[year];
                      }
                    }
                    /** Prepare character **/
                    const temp_character = setting_background.defineTimGoneOfTwelveSections(
                      reference_data.tim_gone
                    );
                    for (const charac in temp_character) {
                      if (temp_character.hasOwnProperty(charac)) {
                        result[charac] = temp_character[charac];
                      }
                    }

                    /** Prepare position**/
                    const temp_twelveSections = finding_position.defineSection(
                      reference_data.birth_month,
                      reference_data.birth_time
                    );
                    const twelveSections_trans = data_convertion["point_name"];
                    for (const position in temp_twelveSections) {
                      if (temp_twelveSections.hasOwnProperty(position)) {
                        result[position] = {
                          position: temp_twelveSections[position],
                          metaData: twelveSections_trans[
                            position
                          ] /** Expected return value: ["<star's Chinese name>", "<tier>"] **/ ,
                        };
                      }
                    }

                    /** Prepare type_of_module **/
                    result["module_level"] = {
                      position: "510",
                      metaData: [
                        data_convertion["five_elements"][
                          reference_data.type_of_module
                        ] +
                        data_convertion["chinese_numbers"][
                          data_convertion["type_of_module"][
                            reference_data.type_of_module
                          ]
                        ],
                        "span_module_level",
                      ],
                    };
                    /** Prepare normal_year**/
                    result["normal_year"] = {
                      position: "510",
                      metaData: [reference_data.lunar_year, "span_normal_year"],
                    };
                    /** Prepare lunar_year **/
                    result["lunar_year"] = {
                      position: "510",
                      metaData: [
                        `${
                          data_convertion["tim_gone_to_traChin"][
                            reference_data.tim_gone
                          ]
                        }${
                          data_convertion["number_to_zodiac"][
                            reference_data.birth_year
                          ]
                        }`,
                        "span_lunar_year",
                      ],
                    };
                    /** Prepare lunar_month **/
                    result["lunar_month"] = {
                      position: "510",
                      metaData: [
                        reference_data.birth_month,
                        "span_lunar_month",
                      ],
                    };
                    /** Prepare lunar_day **/
                    result["lunar_day"] = {
                      position: "510",
                      metaData: [reference_data.birth_day, "span_lunar_day"],
                    };
                    /** Prepare lunar_time **/
                    result["lunar_time"] = {
                      position: "510",
                      metaData: [
                        data_convertion["number_to_zodiac"][
                          reference_data.birth_time
                        ],
                        "span_lunar_time",
                      ],
                    };
                    /** Prepare perople_type **/
                    result["people_type"] = {
                      position: "510",
                      metaData: [
                        data_convertion["people_type_conversion"][
                          reference_data.type_of_people
                        ],
                        "people_type",
                      ],
                    };
                    /** Prepare module_core **/
                    result["module_core"] = {
                      position: "510",
                      metaData: [
                        setting_background.getModulecore(
                          reference_data.birth_year
                        ),
                        "span_module_core",
                      ],
                    };
                    /** Prepare anatomy_core **/
                    result["anatomy_core"] = {
                      position: "510",
                      metaData: [
                        setting_background.getAnatomyCore(
                          reference_data.birth_year
                        ),
                        "span_anatomy_core",
                      ],
                    };

                    /** Prepare age **/
                    result["age"] = {
                      position: "510",
                      metaData: [reference_data.age, "span_age"],
                    };

                    /** Prepare year data **/
                    result["ten_years_positioning"] = {
                      position: "510",
                      metaData: [
                        setting_background.settingTenYearsLiving(
                          reference_data.age,
                          reference_data.type_of_module,
                          reference_data.type_of_people,
                          setting_background.defineTimGoneOfTwelveSections(
                            reference_data.tim_gone
                          ),
                          result["life_point"]["position"]
                        ),
                        "span_ten_years_positioning",
                      ],
                    };

                    /** Prepare four changes **/
                    let matchMain_kwun = result["kwun"]["position"];
                    let matchMain_gav = result["gav"]["position"];
                    let matchMain_luc = result["luc"]["position"];
                    let matchMain_fol = result["fol"]["position"];
                    result[matchMain_kwun][
                      "metaData"
                    ][0] = `${result[matchMain_kwun]["metaData"][0]}${result["kwun"]["metaData"][0]}`;
                    result[matchMain_gav][
                      "metaData"
                    ][0] = `${result[matchMain_gav]["metaData"][0]}${result["gav"]["metaData"][0]}`;
                    result[matchMain_luc][
                      "metaData"
                    ][0] = `${result[matchMain_luc]["metaData"][0]}${result["luc"]["metaData"][0]}`;
                    result[matchMain_fol][
                      "metaData"
                    ][0] = `${result[matchMain_fol]["metaData"][0]}${result["fol"]["metaData"][0]}`;

                    /*var first_sec = new Object();
                    var second_sec = new Object();
                    var third_sec = new Object();*/

                    /*for (const key in result) {
                      const position = result[key]["position"];
                      let first_sec_metaData = new Array();
                      let second_sec_metaData = new Array();
                      let third_sec_metaData = new Array();
                      first_sec_metaData = [...result[key]["metaData"]];
                      second_sec_metaData = [...result[key]["metaData"]];
                      third_sec_metaData = [...result[key]["metaData"]];

                      first_sec[key] = {
                        position: position,
                        metaData: first_sec_metaData,
                      };
                      second_sec[key] = {
                        position: position,
                        metaData: second_sec_metaData,
                      };
                      third_sec[key] = {
                        position: position,
                        metaData: third_sec_metaData,
                      };
                    }*/
                    const result_str = JSON.stringify(result);

                    result = {
                      first_sec: JSON.parse(result_str),
                      second_sec: JSON.parse(result_str),
                      third_sec: JSON.parse(result_str),
                    };
                    var anatomyPoint_position =
                      result["first_sec"]["anatomy_point"].position;
                    var thoughtPoint_position =
                      result["first_sec"]["thought_point"].position;
                    finding_position.AdjustTwelveSections(
                      result,
                      anatomyPoint_position,
                      "second_sec"
                    );

                    setting_background
                      .getTypeOfModule(
                        reference_data.twelveTimGone[anatomyPoint_position],
                        anatomyPoint_position
                      )
                      .then((typeOfModule_secondSec) => {
                        result["second_sec"]["module_level"]["metaData"][0] =
                          data_convertion["five_elements"][
                            typeOfModule_secondSec
                          ] +
                          data_convertion["chinese_numbers"][
                            data_convertion["type_of_module"][
                              typeOfModule_secondSec
                            ]
                          ];
                        finding_position.AdjustTwelveCheongSun(
                          result,
                          typeOfModule_secondSec,
                          reference_data.type_of_people,
                          "second_sec"
                        );
                        finding_position.AdjustMainStars(
                          result,
                          typeOfModule_secondSec,
                          reference_data.birth_day,
                          "second_sec"
                        );
                        setting_background.adjustInternvalForTenYears(
                          result,
                          typeOfModule_secondSec,
                          reference_data.type_of_people,
                          anatomyPoint_position,
                          "second_sec"
                        );
                        setting_background.adjustTenYearsLiving(
                          result,
                          reference_data.age,
                          reference_data.type_of_module,
                          reference_data.type_of_people,
                          setting_background.defineTimGoneOfTwelveSections(
                            reference_data.tim_gone
                          ),
                          "second_sec"
                        );
                        finding_position.adjustTimSze(
                          result,
                          result["second_sec"]["travel_point"]["position"],
                          reference_data.type_of_people,
                          "second_sec"
                        );
                        finding_position.adjustTimShoin(
                          result,
                          result["second_sec"]["travel_point"]["position"],
                          reference_data.type_of_people,
                          "second_sec"
                        );

                        finding_position.AdjustTwelveSections(
                          result,
                          thoughtPoint_position,
                          "third_sec"
                        );
                        setting_background
                          .getTypeOfModule(
                            reference_data.twelveTimGone[thoughtPoint_position],
                            thoughtPoint_position
                          )
                          .then((typeOfModule_thirdSec) => {
                            result["third_sec"]["module_level"]["metaData"][0] =
                              data_convertion["five_elements"][
                                typeOfModule_thirdSec
                              ] +
                              data_convertion["chinese_numbers"][
                                data_convertion["type_of_module"][
                                  typeOfModule_thirdSec
                                ]
                              ];
                            finding_position.AdjustTwelveCheongSun(
                              result,
                              typeOfModule_thirdSec,
                              reference_data.type_of_people,
                              "third_sec"
                            );
                            finding_position.AdjustMainStars(
                              result,
                              typeOfModule_thirdSec,
                              reference_data.birth_day,
                              "third_sec"
                            );
                            setting_background.adjustInternvalForTenYears(
                              result,
                              typeOfModule_thirdSec,
                              reference_data.type_of_people,
                              thoughtPoint_position,
                              "third_sec"
                            );
                            setting_background.adjustTenYearsLiving(
                              result,
                              reference_data.age,
                              reference_data.type_of_module,
                              reference_data.type_of_people,
                              setting_background.defineTimGoneOfTwelveSections(
                                reference_data.tim_gone
                              ),
                              "third_sec"
                            );
                            finding_position.adjustTimSze(
                              result,
                              result["third_sec"]["travel_point"]["position"],
                              reference_data.type_of_people,
                              "third_sec"
                            );
                            finding_position.adjustTimShoin(
                              result,
                              result["third_sec"]["travel_point"]["position"],
                              reference_data.type_of_people,
                              "third_sec"
                            );
                            //console.log(req.baseUrl);
                            res.header(
                              "Access-Control-Allow-Origin",
                              req.baseUrl
                            );
                            res.status(200).jsonp(result);
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  },
                  function (error) {
                    console.log(error);
                    res.status(500).end(JSON.stringify(error));
                  }
                )
                .catch((error) => {
                  console.error(
                    "Index.js -> /handleTaskFunction.getModuleData\n",
                    error
                  );
                });
            })
            .catch((error) => {
              console.error(
                "Index.js -> /createModule.setting_background.getTypeOfModule\n",
                error
              );
            });
        },
        function (error) {
          console.log(error);
          res.status(500).end(JSON.stringify(error));
        }
      )
      .catch((error) => {
        console.error("Index.js -> /handleTaskFunction.getAge\n", error);
      });
  } catch (error) {
    res.status(500).end(JSON.stringify(error));
  }
});

app.listen(app.get("port"), function () {
  console.log("Server is listening on: ", app.get("port"));
});