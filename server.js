var express = require("express");
var bodyParser = require("body-parser");
var MongoClient = require("mongodb").MongoClient;
var plotly = require("plotly")("firog","JKngYeX62gv2kLQTwJ4K");
var app = express();

var dbURL = 'mongodb://localhost:27017/db';
var db;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect(dbURL,(err,database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(5000, () => {
    console.log("listening on port 5000");
    console.log("DB on "+dbURL);
  });
});

app.get('/', (req,res) => {
  db.collection('points').find().toArray(function(err, results){
    if (err) return console.log(err);
    res.render("index.ejs", {points:results});
  });
});



app.get('/total', (req,res) => {
  var ollesum = {sum:0};

  db.collection("points").find({name: "olle"}).toArray(function(err, results) {
    if (err) return console.log(err);
    var ivanasum = {sum:0};
    for (var i=0; i < results.length; i++){
      ollesum.sum = ollesum.sum + parseInt(results[i].quote);
    }

    console.log(ollesum.sum);
    res.render("total.ejs",{val:ollesum.sum});
  });
  console.log(ollesum.sum);
});

app.post('/points', (req, res) => {
  if (req.body.name == "" || req.body.quote == "") {
    console.log("no point");
    return res.send("No point");
  }
  if (isNaN(req.body.point)) {
    return res.send("Enter a number");
  }
  var date = new Date().toString();
  req.body.date = date;
  db.collection('points').save(req.body, (err, result) => {
    if (err) return console.log(err);
    // console.log("Saved " + req.body.name+ "to database");
    res.redirect('/');
  });
});


function getSum(person) {
  db.collection("points").find({name: person}).toArray(function(err, results){
    if (err) return console.log(err);
    var who = {sum:0};
    for (var i=0; i < results.length; i++) {
      who.sum = who.sum + parseInt(results[i].quote);
    }
    console.log("in function " + who.sum)
    return who.sum;
  })
}


// var data = [
//   {
//     x: ["giraffes", "orangutans"],
//     y: [20, 14, 23],
//     type: "bar"
//   }
// ];
// var graphOptions = {filename: "basic-bar", fileopt: "overwrite"};
// plotly.plot(data, graphOptions, function (err, msg) {
//     console.log(msg);
// });
