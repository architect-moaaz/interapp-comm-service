const { Kafka } = require("kafkajs");

// Create a Kafka instance
const kafka = new Kafka({
  clientId: "iac-app-1",
  brokers: ["151.106.39.195:9092"], // Replace with your Kafka broker addresses
});

// Create a Kafka producer
const producer = kafka.producer();

// An async function to send messages
const sendMessage = async (topic, message) => {
  // Connect the producer
  await producer.connect();

  // Send the message to the specified topic
  await producer.send({
    topic: topic,
    messages: [{ value: message }],
  });

  // Disconnect the producer
  await producer.disconnect();
};
var _message = {
  workspace: "Intelliflow",
  app: "",
  allowList: "leave-application=EmployeeLeaveData",
};
// Example usage
const topic = "iac"; // Replace with your topic name
const message = JSON.stringify(_message);

sendMessage(topic, message)
  .then(() => console.log("Message sent successfully"))
  .catch((error) => console.error("Error sending message:", error));
