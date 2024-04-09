const { mapping } = require("cassandra-driver");
const request = require("request-promise-native");
const express = require("express");
const app = express();
const _request = require("request");
const rest = require("./client/RestClient");

const cors = require("cors");

const consume = require("./client/kConsumer");
const db = require("./client/db");

var communicationUseCase = function (message) {
  try {
    //from Kafka find workspace and allowlist
    var workspace = "Intelliflow";
    var allowList = message.allowList;
    var data = message.data;
    console.log("Message rcvd ");
    console.log(message.data);

    if (allowList) {
      var appAndContexts = allowList.split(";");
      for (var index in appAndContexts) {
        var appContext = appAndContexts[index];
        var appContextArray = appContext.split("=");
        var app = appContextArray[0];
        var contexts = appContextArray[1];
        console.log("workspace Name found ::: " + workspace);
        console.log("app Name found ::: " + app);
        console.log("route  found ::: " + contexts);
        // for workspace and app find host and port
        db.fetchHostAndPort(workspace, app)
          .then((result) => {
            console.log("result rcvd :: " + JSON.stringify(result));

            console.log(contexts);
            console.log(
              "url created " + `${result[0].host}:${result[0].port}/${contexts}`
            );

            let url = `${result[0].host}:${result[0].port}/${contexts}`;
            //fire and forget
            rest
              .post(url, null, data)
              .then((pData) => {
                console.log("Communication fired successfully");
              })
              .catch((err) => {
                console.log(err);
              });

            // for (var contextIndex in contexts) {
            //   let url = `${result[0].host}:${result[0].port}/${contexts}`;
            //   //fire and forget
            //   rest
            //     .post(url, null, data)
            //     .then((pData) => {
            //       console.log("Communication fired successfully");
            //     })
            //     .catch((err) => {
            //       console.log(err);
            //     });
            // }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  } catch (e) {
    console.log(e);
  }
};

// start the consumer, and log any errors
consume(communicationUseCase).catch((err) => {
  console.error("error in consumer: ", err);
});
