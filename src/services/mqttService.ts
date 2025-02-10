import mqtt, { MqttClient } from "mqtt";

let client: MqttClient | null = null;

export const connectMQTT = (brokerUrl: string): void => {
  client = mqtt.connect(brokerUrl);

  client.on("connect", () => {
    console.log("Connected to MQTT broker");
  });

  client.on("message", (topic: string, message: Buffer) => {
    console.log(`Received message on topic ${topic}: ${message.toString()}`);
  });

  client.on("error", (error: Error) => {
    console.error("MQTT connection error: ", error);
  });
};

export const subscribeToTopic = (topic: string): void => {
  if (client) {
    client.subscribe(topic, (err?: Error | null) => {
      if (err) {
        console.error(`Error subscribing to topic ${topic}: `, err);
      } else {
        console.log(`Subscribed to topic ${topic}`);
      }
    });
  }
};

export const unsubscribeFromTopic = (topic: string): void => {
  if (client) {
    client.unsubscribe(topic, (err?: Error) => {
      if (err) {
        console.error(`Error unsubscribing from topic ${topic}: `, err);
      } else {
        console.log(`Unsubscribed from topic ${topic}`);
      }
    });
  }
};

export const disconnectMQTT = (): void => {
  if (client) {
    client.end();
  }
};
