var express = require("express");

//setup express server and port

var app = express();

var PORT = process.env.PORT || 8080;

//handle data parsing

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//routing

//require = ("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

//listener

app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
});