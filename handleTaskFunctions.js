const project_id = "ziemaytausoul",
    keyFilename = "./ZieMayTauSoul-fec5572fa40b.json";
const path = require("path");

exports.uploadData = function (dir_name, collection = "") {
    const fs = require("fs");
    const {
        Firestore
    } = require('@google-cloud/firestore');
    var promise = new Promise(function (resolve, reject) {
        fs.readdir(`./${dir_name}`, function (error, files) {
            if (error) reject(error);
            const firestore = new Firestore({
                projectId: project_id,
                keyFilename: keyFilename
            });
            files.forEach(function (file) {
                if (path.extname(file).match(".json")) {
                    fs.readFile(`./${dir_name}/${file}`.toString(), function (readF_error, data) {
                        if (readF_error) reject(readF_error);
                        const data_obj = JSON.parse(data);
                        for (const obj_key in data_obj) {
                            let doc_content = data_obj[obj_key];
                            firestore.collection(path.basename(file, ".json")).doc(obj_key).set(doc_content).then(documentReference => {
                                console.log(documentReference.writeTime);
                            }).catch(firestore_error => {
                                console.error(firestore_error);
                            });
                        }
                        resolve("success");
                    });
                }
            });
        });
    });
    return promise;
}

module.exports.updateData = function (newData, collection = "") {
    const {
        Firestore
    } = require('@google-cloud/firestore');
    const firestore = new Firestore({
        projectId: project_id,
        keyFilename: keyFilename
    });
    let processing_data = null;
    if (typeof newData == "string") {
        processing_data = JSON.parse(newData);
    } else {
        processing_data = newData;
    }
    let collection_path = firestore.collection(collection);
    for (const key in processing_data) {
        if (processing_data.hasOwnProperty(key)) {
            let document_path = collection_path.doc(key);
            document_path.update(processing_data[key]).then((result) => {
                if (callback) {
                    callback(true, result);
                } else {
                    console.log(result.writeTime);
                }
            }).catch((error) => {
                if (callback) {
                    callback(false, error);
                } else {
                    console.error(error);
                }
            }).finally((data) => {
                if (data && callback) {
                    callback(true, data);
                } else if (data && !callback) {
                    console.log(data);
                } else if (!data && callback) {
                    callback(true, "Done");
                } else {
                    console.log("Done");
                }
            });
        }
    }
}

module.exports.getModuleData = function (birth_year, birth_month, birth_day, birth_time, tim_gone) {
    const {
        Firestore
    } = require('@google-cloud/firestore');
    const firestore = new Firestore({
        projectId: project_id,
        keyFilename: keyFilename
    });
    let stars = new Object();
    const collection_ref = firestore.collection("stars");
    let key = {
        "by_year": birth_year,
        "by_month": birth_month,
        "by_day": birth_day,
        "by_time": birth_time,
        "by_tim_gone": tim_gone
    };

    var promise = new Promise(function (resolve, reject) {
        collection_ref.get().then(results => {
            results.docs.forEach(items => {
                let item = items.data();
                let doc_id = items.id;
                for (const star in item) {
                    stars[star] = new Object();
                    if (typeof item[star][key[doc_id]] != "undefined") {
                        stars[star]["position"] = item[star][key[doc_id]];
                    }
                    if (item[star].hasOwnProperty("findingPosition")) {
                        stars[star]["findingPosition"] = item[star]["findingPosition"];
                    }
                }
            });
            resolve(stars);
        }).catch(error => {
            reject(error);
        });
    });
    return promise;
}

module.exports.StarNameTranslation = function () {
    const {
        Firestore
    } = require("@google-cloud/firestore");

    const firestore = new Firestore({
        projectId: project_id,
        keyFilename: keyFilename
    });
    var promise = new Promise(function (resolve, reject) {
        firestore.collection("data_convertion").doc("star_name_translation").get().then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        });
    });

    return promise;
}