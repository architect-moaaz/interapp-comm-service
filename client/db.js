let cassandra = require("cassandra-driver");

const checkNodeEnv = require("../configService");

var config = checkNodeEnv();

const {
  cassandra: { host, port, datacenter, keyspace, username, password },
} = config;

// Replace 'Username' and 'Password' with the username and password from your cluster settings
let authProvider = new cassandra.auth.PlainTextAuthProvider(username, password);
// Replace the PublicIPs with the IP addresses of your clusters
let contactPoints = [host + ":" + port];
// Replace DataCenter with the name of your data center, for example: 'AWS_VPC_US_EAST_1'
let localDataCenter = datacenter;
console.log("Cassandra at ::", contactPoints);
console.log("Keyspace", keyspace);

module.exports.fetchHostAndPort = function (workspace, app) {
  return new Promise(function (resolve, reject) {
    let client = new cassandra.Client({
      contactPoints: contactPoints,
      authProvider: authProvider,
      localDataCenter: localDataCenter,
      keyspace: keyspace,
    });

    // Define and execute the queries
    let query =
      "SELECT host, port, appdisplayname FROM " +
      keyspace +
      ".service_register WHERE workspace = ? and app = ? GROUP by workspace, app";
    let _query = client
      .execute(query, [workspace, app])
      .then((result) => {
        resolve(result.rows);
      })
      .catch((err) => {
        reject(err);
      });
    Promise.all([_query]).finally(() => {
      client.shutdown();
      console.log("Client has been closed");
    });
    //  Promise.allSettled([_query]).finally(() => { client.shutdown(); console.log("Client has been closed"); });
  });
};
