const plotly = require("plotly")("firog","JKngYeX62gv2kLQTwJ4K");

var data = [
  {
    x: ["giraffes", "orangutans"],
    y: [20, 14, 23],
    type: "bar"
  }
];
var graphOptions = {filename: "basic-bar", fileopt: "overwrite"};
plotly.plot(data, graphOptions, function (err, msg) {
    console.log(msg);
});
