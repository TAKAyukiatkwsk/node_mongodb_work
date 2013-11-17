
/*
 * GET home page.
 */

var mongoose = require('mongoose');

exports.index = function(req, res){
  mongoose.connect('mongodb://localhost');
  var conn = mongoose.connection;

  conn.once('open', function() {
    console.log('connected!');

    var Admin = mongoose.mongo.Admin;
    var admin = new Admin(conn.db);

    admin.listDatabases(function(err, dbs) {
      console.log(dbs);
      res.render('index', { title: 'node MongoDB work', dbs: dbs.databases});
      conn.close();
    });
  });
};

exports.dbs = function(req, res) {
  console.log(req.params.name);
  var conn = mongoose.createConnection('mongodb://localhost/' + req.params.name);
  conn.once('open', function() {
    console.log('connected!');
    conn.db.collectionNames(function(err, items) {
      console.log(items);
      res.render('dbs', { title: req.params.name, collections: items });
      conn.close();
    });
  });
};
