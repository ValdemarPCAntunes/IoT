var sqlite3 = require('sqlite3')
var open = require('sqlite')
open.open({
  filename: 'database.db',
  driver: sqlite3.Database
}).then(async function(db) {
await db.exec(`CREATE TABLE mainTableName(
      id VARCHAR(100) NOT NULL,
      type VARCHAR(50) NOT NULL,
      dateObservedtype VARCHAR(50) NOT NULL,
      dateObservedvalue VARCHAR(50) NOT NULL,
      locationtype VARCHAR(50) NOT NULL,
      locationvaluetype VARCHAR(50) NOT NULL,
      latitude VARCHAR(50) NOT NULL,
      longitude VARCHAR(50) NOT NULL,
      measurandtype VARCHAR(50) NOT NULL,
      measurandstring VARCHAR(50) NOT NULL,
      measurandvalue VARCHAR(50) NOT NULL,
      measurandunitcode VARCHAR(50) NOT NULL,
      measuranddescription VARCHAR(50) NOT NULL,
      tdstype VARCHAR(50) NOT NULL,
      tdsvalue DOUBLE NOT NULL,
      velocitytype VARCHAR(50) NOT NULL,
      velocityvalue VARCHAR(50) NOT NULL,
      velocitymetadataunitcodetype VARCHAR(50) NOT NULL,
      velocitymetadataunitcodevalue VARCHAR(50) NOT NULL,
      tripnumber VARCHAR(50) NOT NULL,
      triptype VARCHAR(50) NOT NULL,
      PRIMARY KEY (id));`).catch(err => console.log('table already created'));

var util = require('util')
var express = require('express');
var app = express();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Just for simply and quick test
app.get('/version', function (req, res) {
   	  data = "FIWARE Consumers demo";
      console.log(data);
      res.end(data);
   
})

app.post('/tripReading', function (req, res) {
      
      statement = "INSERT INTO mainTableName (id,type,dateObservedtype,dateObservedvalue,locationtype,locationvaluetype,latitude,longitude,measurandtype,measurandstring,measurandvalue,measurandunitcode,measuranddescription,tdstype,tdsvalue,velocitytype,velocityvalue,velocitymetadataunitcodetype,velocitymetadataunitcodevalue,tripnumber,triptype)"

      var values = " VALUES ";
      notification = req.body;
      
      for (var i = 0; i < notification.data.length; i++) {
            curr_tuple = "";
            curr_tuple += "\"" + notification.data[i].id + "\",";
            curr_tuple += "\"" + notification.data[i].type + "\",";
            curr_tuple += "\"" + notification.data[i].dateObserved.type + "\",";
            curr_tuple += "\"" + notification.data[i].dateObserved.value + "\",";
            curr_tuple += "\"" + notification.data[i].location.type + "\",";
            curr_tuple += "\"" + notification.data[i].location.value.type + "\",";
            curr_tuple += "\"" + notification.data[i].location.value.coordinates[0] + "\",";
            curr_tuple += "\"" + notification.data[i].location.value.coordinates[1] + "\",";
            curr_tuple += "\"" + notification.data[i].measurand.type + "\",";
            curr_tuple += "\"" + notification.data[i].measurand.value[0] + "\",";
            curr_tuple += "\"" + notification.data[i].measurand.value[1] + "\",";
            curr_tuple += "\"" + notification.data[i].measurand.value[2] + "\",";
            curr_tuple += "\"" + notification.data[i].measurand.value[3] + "\",";
            curr_tuple += "\"" + notification.data[i].tds.type + "\",";
            curr_tuple += "\"" + notification.data[i].tds.value + "\",";
            curr_tuple += "\"" + notification.data[i].velocity.type + "\",";
            curr_tuple += "\"" + notification.data[i].velocity.value + "\",";
            curr_tuple += "\"" + notification.data[i].velocity.metadata.unitcode.type + "\",";
            curr_tuple += "\"" + notification.data[i].velocity.metadata.unitcode.value + "\",";
            curr_tuple += "\"" + notification.data[i].trip.value + "\",";
            curr_tuple += "\"" + notification.data[i].trip.type + "\"";
            values += "(" + curr_tuple + "),";
      }
      values = values.slice(0, -1);

      db.exec(statement + values)

      notification = req.body;
      r = util.format("FIWARE Consumers demo: POST /tripReading: Subs %s",notification.subscriptionId);
      console.log(r)
      //notification.data.forEach(element => console.log(actuateTemperature(element)));
      res.end("recebemos cenas ty");
   
})


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Consumers example app listening at http://%s:%s", host, port)
})

})
