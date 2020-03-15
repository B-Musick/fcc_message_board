'use strict';

var express     = require('express');
var bodyParser  = require('body-parser');
var expect      = require('chai').expect;
var cors        = require('cors');

var apiRoutes         = require('./routes/api.js');
var fccTestingRoutes  = require('./routes/fcctesting.js');
var runner            = require('./test-runner');

var app = express();

// Packages added
var mongoose = require('mongoose');
let helmet = require('helmet');
let dotenv = require('dotenv');
var bcrypt = require('bcrypt');

let Thread = require('./models/Thread');
let Board = require('./models/Board');
let Reply = require('./models/Reply')

app.set('view engine', 'ejs'); // Dont have to add .ejs to files

// Configurations added

app.use(helmet.frameguard({ action: "sameorigin" }));
app.use(helmet.dnsPrefetchControl());

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({origin: '*'})); //For FCC testing purposes only

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();
mongoose.connect('mongodb://localhost:27017/fcc_message_board',{ useNewUrlParser: true, useUnifiedTopology: true})

// CONNECT TO MONGODB ATLAS DATABASE - pass URI key to connect
// mongoose.connect(process.env.DATABASE, {
//   userNewUrlParser: true,
//   useCreateIndex: true
// }).then(async () => {
//   console.log("Connected to DB!");
//   await Stock.collection.drop();
// }).catch(err => {
//   console.log("Error: ", err.message);
// });

/**************** Index page (static HTML) *******************
 * Can create a new thread from here
 * Or enter the currently existing thread
*/
app.get('/',(req, res)=> {
    Thread.find({}, (err, threads) => { err ? res.json(err) : res.render('index', { threads }); })
  });

app.route('/b/:board')
  .get((req, res)=> {
    Board.findOne({name:req.params.board}).populate('threads').exec((err,foundBoard)=>{
      // Replace all the id's of the thread with actual threads (populate)
      err ? res.json('Couldnt load thread'):res.render('board',{board:foundBoard, threads:foundBoard.threads})
    })
  });

app.route('/b/:board/:threadid')
  .get(function (req, res) {
    Thread.findById({_id:req.params.threadid}).populate('replies').exec((err, foundThread)=>{
      console.log(foundThread.replies)
      err ? res.json(err): res.render('thread',{thread:foundThread})
    })
  });



//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API 
apiRoutes(app);

//Sample Front-end

    
//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

//Start our server and tests!
app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port " + process.env.PORT);
  if(process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch(e) {
        var error = e;
          console.log('Tests are not valid:');
          console.log(error);
      }
    }, 1500);
  }
});

module.exports = app; //for testing
