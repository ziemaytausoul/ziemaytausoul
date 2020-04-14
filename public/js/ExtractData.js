function first_tier(module) {
    let result = new Object();
    for (const data in module) {
        if (module.hasOwnProperty(data)) {
            const star = module[data];
            //checking if star has property metaData.
            if (Object.keys(star).includes("metaData") && Array.isArray(star.metaData)) {
                if (star.metaData[1] === "first_tier") {
                    result[data] = star;
                }
            }
        }
    }
    return result;
}