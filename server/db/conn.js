const { MongoClient } = require("mongodb");
const dbConnStr = process.env.ATLAS_URI;
const client = new MongoClient(dbConnStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var _db;

module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err, db) {
            if (db) {
                _db = db.db("employees");
                console.log("Successfully connected to MongoDB.");
            }
            
            return callback(err);
        });
    },
    
    getDb: function () {
        return _db;
    },
};