const express = require('express'); // importing express module
const Joi = require('joi'); // importing joi module
const app = express(); // creating a object for express module. This return a class refernce to app.
app.use(express.json()); // this is to use json functionalities in express application

app.listen(3000, () => {
    console.log('listening on port 3000...')
})

app.get('/api/temp-data-for-iot', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    let randomTemp = Math.floor(Math.random() * (200 - 0 + 1)) + 0;
    let randomPress = Math.floor(Math.random() * (1000 - 200 + 1)) + 200;
    let randomHum = Math.floor(Math.random() * (100 - 0 + 1)) + 0;
    let randomCo2 = Math.floor(Math.random() * (2000 - 0 + 1)) + 0;
    var date = new Date();
    //let label = 'T'+date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
	let label = '20190314160735';
    var newData = {
		success : 1,
		data : {
			label: label,
			newTemp: randomTemp,
			newPress: randomPress,
			newHum: randomHum,
			newCo2: randomCo2
		}
    }
    res.send(newData);
})

app.get('/api/temp-data-for-iot/mobile', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    let randomAcc = Math.floor(Math.random() * (150 - 0 + 1)) + 0;
    let randomGPS = Math.floor(Math.random() * (350 - 200 + 1)) + 200;
    let randomGyro = Math.floor(Math.random() * (250 - 100 + 1)) + 100;
    var date = new Date();
    //let label = 'T'+date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
	let label = '20190314160735';
    var newData = {
		success : 1,
		data : {
			label: label,
			newAcc: randomAcc,
			newGPS: randomGPS,
			newGyro: randomGyro
		}
    }
    res.send(newData);
})