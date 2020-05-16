function LocateStar(module) {
  
    for (const data in module) {

        if (module.hasOwnProperty(data)) {

            const star = module[data];
            
            const node_id = `${star.position}_${star.metaData[1]}`;

        }
    }
}