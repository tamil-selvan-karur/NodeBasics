const express = require('express'); // importing express module
const Joi = require('joi'); // importing joi module
const app = express(); // creating a object for express module. This return a class refernce to app.
app.use(express.json()); // this is to use json functionalities in express application
const logger = require('./logger');
app.use(logger);
app.use(express.static('public'));
const config = require('config');

/* Pug implementation */

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/templateDemo', (req, res) => {
    res.render('index', { title: 'First Pug', heading: 'This is a template heading' });
})

if (app.get('env') === 'deveopment') {
    console.log("Development mode");
}
console.log("Name : " + config.get('name'));
console.log("Mail server : " + config.get('mail.host'));
console.log("Mail Password : " + process.env.app_password);

// console.log("Password : "+ config.get('mail.password'));
/*  all solutions array
    This should be replaced with the data in database */
const solutions = [
    {
        solution_display_order: 1,
        solution_title: "DATA INGESTION PIPELINE",
        solution_desc: [
            "Acquiring data from varied sources in different" +
            "frequencies has been an ongoing challenge in the industry. " +
            "Real-time decisioning has become essential business needs these" +
            " days and this means business user need the data in an accurate and timely manner",

            "There is an influx of open source technologies and new products available to" +
            "handle these challenges. So much these technologies enables the business," +
            "its always a challenge to choose and integrate the technologies" +
            "and build an overall solution.",

            "DIP, our Data Ingestion Pipeline is a plug-and-play framework which makes" +
            " data acquisition simple. This framework allows users to pick the source, " +
            "target and the technology underneath and we lay the pipeline to move the data" +
            " from point A to point B. Streaming or batch, HDFS or database... you pick the " + "choice and we do the pipeline.",

            "The platform is build using core data management architecture principles which" +
            " includes key features like user interface, logging and orchestration."

        ]

    },
    {
        solution_display_order: 2,
        solution_title: "INTERNET OF THINGS",
        solution_desc: [
            "Devices, wearables, sensors... would be integral part of the" +
            " digitally connected world we live. Whether it is mineral mining" +
            " or smart buildings or patient monitoring, data needs " +
            "to be collected, processed and monitored in a timely manner" +
            " to support real - time monitoring or alerting or any kind of dynamic decision making.",

            "It’s a science to provision data from the devices, integrate," +
            " cleanse, store and build insights from it.From edge computing" +
            " to analytics, we provide E2E IOT solutions. Our solutions are" +
            " built onfundamental data management principles and supports the" +
            " basic essentials like scalability,portability, usability and performance."
        ]

    }
]

/*  all offering array
    This should be replaced with the data in database */

const offerings = [
    {
        offering_title: "DATA PIPELINE",
        offering_desc: [
            "Creating services and workflows for Ingesting, Processing and Moving your data between systems or" +
            "devices to cloud and/or on-premise data sources"
        ],
        offering_display_order: 1
    },
    {
        offering_title: "DATA MIGRATION",
        offering_desc: [
            "Moving your Data, Applications from legacy to next gen platform, " +
            "one format to another, or one location to another"
        ],
        offering_display_order: 2
    },
    {
        offering_title: "DATA QUALITY",
        offering_desc: [
            "Validating, Profiling and Checking to improve the fitness of the data you use for decision making"
        ],
        offering_display_order: 3
    },
    {
        offering_title: "DATA ARCHITECTURE",
        offering_desc: [
            "Creating a blueprint to outline the definition, structure and documentation" +
            " of structured/unstructured data for your business."
        ],
        offering_display_order: 4
    },
    {
        offering_title: "DATA GOVERNANCE",
        offering_desc: [
            "Implementing procedures and policies for creating " +
            "governance workflow to explain and discover yourdata, " +
            "provide data provenance for managing data security and privacy."
        ],
        offering_display_order: 5
    },
    {
        offering_title: "EDGE IT",
        offering_desc: [
            "Integrating Things and performing smart decisioning on" +
            "data at a sensor, network switch, or any other edge device" +
            "instead of sending data back to a centralized" +
            "store for decision making"
        ],
        offering_display_order: 6
    },
    {
        offering_title: "ANALYTICS",
        offering_desc: [
            "Presenting the technical information in ways that are easy to" +
            " understand, through interactive visualizations for data insights from cognitive computing."
        ],
        offering_display_order: 7
    },
    {
        offering_title: "OPERATIONALIZE ML MODEL",
        offering_desc: [
            "Presenting the technical information in ways that are easy to understand, through interactive" +
            " visualizations for data insights from cognitive computing."
        ],
        offering_display_order: 8
    }

]

/*  all current openings array
    This should be replaced with the data in database */

const currentOpenings = [
    {
        job_title: "Senior ETL Developer",
        job_desc: "Current opening job description goes here",

    },
    {
        job_title: "Senior JAVA Developer",
        job_desc: "Current opening job description goes here",

    },
]

// API of the / 
app.get('/', (req, res) => {
    res.send('Hello world! after changing');
})


// API to get all the available solutions. this return a list of solutions
app.get('/api/solutions', (req, res) => {
    const responseData = {
        success: 1,
        solutions: solutions
    }
    res.send(responseData);
})


// API to get solution of the given solution display order. This return a solution for the given source order.
/* app.get('/api/solutions/:solutionOrder', (req, res) => {
    let solution = solutions.find(s => s.solution_display_order === parseInt(req.params.solutionOrder));
    if (!solution) {
        res.status(404).send('Solution with the given order is not found');
    }
    else {
        res.send(solution);
    }
}) */

// API to get all the offerings. This return a list os offerings.
app.get('/api/offerings', (req, res) => {
    const responseData = {
        success: 1,
        offerings: offerings
    }
    res.send(responseData);
})

//API to get all the curent openings. This return a list of current openings
app.get('/api/careers/current-openings', (req, res) => {
    const responseData = {
        success: 1,
        current_openings: currentOpenings
    }
    res.send(responseData);
})

// API to get the posts of blog for the given year and month. This feature is yet to be implemented.
app.get('/api/blog/posts/:year/:month', (req, res) => {
    res.send(req.query);
})


// POST methods 


// API to store a new solution to the database. This takes a solution object and write it to the database.
app.post('/api/solutions', (req, res) => {

    const schema = {
        solution_title: Joi.string().required(),
        solution_desc: Joi.array().required(),
        solution_display_order: Joi.number().required()
    };
    var result = Joi.validate(req.body, schema);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const solution = {
        solution_title: req.body.solution_title,
        solution_desc: req.body.solution_desc,
        solution_display_order: parseInt(req.body.solution_display_order)
    };

    solutions.push(solution);
    res.send(solutions);
})


// API to store a new offering to the database. This takes a offering object and write it to the database.
app.post('/api/offerings', (req, res) => {

    const schema = {
        offering_title: Joi.string().required(),
        offering_desc: Joi.array().required(),
        offering_display_order: Joi.number().required()
    };
    var result = Joi.validate(req.body, schema);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const offering = {
        offering_title: req.body.offering_title,
        offering_desc: req.body.offering_desc,
        offering_display_order: parseInt(req.body.offering_display_order)
    };

    offerings.push(offering);
    res.send(offerings);
})

// API to store a new current-opening to the database. This takes a current-opening object and write it to the database.
app.post('/api/careers/current-openings', (req, res) => {

    const schema = {
        job_title: Joi.string().required(),
        job_desc: Joi.string().required(),
    };
    var result = Joi.validate(req.body, schema);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const currentOpening = {
        job_title: req.body.job_title,
        job_desc: req.body.job_desc
    };

    currentOpenings.push(currentOpening);
    res.send(currentOpenings);
})

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
        success: 1,
        data: {
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
    let label = '20190314' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();;
    var newData = {
        success: 1,
        data: {
            label: label,
            newAcc: randomAcc,
            newGPS: randomGPS,
            newGyro: randomGyro
        }
    }
    res.send(newData);
})

var fs = require("fs");
app.get('/api/video', function (req, res) {
    const path = 'assets/videos/ads/' + req.query.video_id + '.' + req.query.video_type;
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
        console.log("range is: ", range);
        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10)
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize - 1
        const chunksize = (end - start) + 1
        const file = fs.createReadStream(path, { start, end })
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(200, head)
        fs.createReadStream(path).pipe(res)
    }
});


app.get('/api/videos/:gateway_id', (req, res) => {
    let data = {
        videos: [
            {
                video_id: 100,
                video_url: "http://localhost:3000/api/video?video_id=100",
                video_type: "mp4"
            },
            {
                video_id: 101,
                video_url: "http://localhost:3000/api/video?video_id=101",
                video_type: "mp4"
            },
            {
                video_id: 103,
                video_url: "http://localhost:3000/api/video?video_id=103",
                video_type: "mp4"
            },
            {
                video_id: 105,
                video_url: "http://localhost:3000/api/video?video_id=105",
                video_type: "mp4"
            },
            {
                video_id: 106,
                video_url: "http://localhost:3000/api/video?video_id=106",
                video_type: "mp4"
            }
        ]
    }
    res.send(data);
})

app.get('/api/learn/:year/:month', (req, res) => {
    let queryParams = {
        1: req.params
    }
    res.send(queryParams);
})