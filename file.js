const fs = require('fs')

fs.readFile('./data.json', 'utf8' , (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    const res = JSON.parse(data);
    const result = res.services.map((item, index) => {
        const elem = {...item};
        
        if (index < 252) {
            elem.isDirectory = true;
            elem.parent = null;
        } else if (index < 504) {
            elem.isDirectory = true;
            elem.parent = res.services[index - 250].id;
        } else {
            elem.isDirectory = false;
            elem.parent = res.services[index - 250].id;
        }
        return elem;
    });
    res.services = result;
    fs.writeFile('./res.json', JSON.stringify(res), (err, data) => {

    })
})