
/*
 * GET home page.
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost');
var conn = mongoose.connection;

conn.once('open', function() {
  console.log('connected!');
});

var Admin = mongoose.mongo.Admin;
var admin = new Admin(conn.db);

exports.index = function(req, res){
  admin.listDatabases(function(err, dbs) {
    console.log(dbs);
    res.render('index', { title: 'Express', dbs: dbs.databases});
  });
};
