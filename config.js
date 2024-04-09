require("dotenv").config();
var config = {
  development: {
    app: {
      port: 51600,
      modellerForm: "http://localhost:51501/modellerService/form/content",
      clusterIp: "http://ifs.svc.io",
      notifyMgr: "http://localhost:51603/app",
    },
    kafka: {
      host: "151.106.39.195",
      port: "9092",
    },
    cassandra: {
      host: "151.106.39.195",
      port: "9042",
      datacenter: "datacenter1",
      keyspace: "k1",
      username: "",
      password: "",
    },
  },
  production: {
    app: {
      port: 51600,
      modellerForm: "http://151.106.32.163:51501/modellerService/form/content",
      clusterIp: "http://ifs.svc.io",
      notifyMgr: "http://ns3172713.ip-151-106-32.eu:51603/app",
    },
    kafka: {
      host: "151.106.32.163",
      port: "9092",
    },
    cassandra: {
      host: "151.106.39.195",
      port: "9042",
      datacenter: "datacenter1",
      keyspace: "k1",
      username: "admin",
      password: "Qaz#3wsx",
    },
  },
  colo: {
    app: {
      port: process.env.COLO_PORT,
      modellerForm: process.env.COLO_MODELLER_FORM,
      clusterIp: process.env.COLO_MODELLER_KUBE_CLUSTER_IP,
      notifyMgr: process.env.COLO_NOTIFICATION_MGR,
    },
    kafka: {
      host: process.env.COLO_KAFKA_URL,
      port: process.env.COLO_KAFKA_PORT,
    },
    cassandra: {
      host: process.env.COLO_CASSANDRA_HOST,
      port: process.env.COLO_CASSANDRA_PORT,
      datacenter: process.env.COLO_CASSANDRA_DATACENTER,
      keyspace: process.env.COLO_CASSANDRA_KEYSPACE,
      username: process.env.COLO_CASSANDRA_USERNAME,
      password: process.env.COLO_CASSANDRA_PASSWORD,
    },
  },
  uat: {
    app: {
      port: 51600,
      modellerForm: "http://151.106.39.195:51501/modellerService/form/content",
      clusterIp: "http://ifs.svc.io",
      notifyMgr: "http://151.106.39.195:51603/app",
    },
    kafka: {
      host: "151.106.39.195",
      port: "9092",
    },
    cassandra: {
      host: "151.106.39.195",
      port: "9042",
      datacenter: "datacenter1",
      keyspace: "k2",
      username: "admin",
      password: "Qaz#3wsx",
    },
  },
};

module.exports = config;
