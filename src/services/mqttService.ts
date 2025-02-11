import mqtt, { MqttClient } from "mqtt";
import { store } from "../redux/store";
import {
  updateFuelTanks,
  updateCarUsage,
  updateFuelUsage,
} from "../redux/features/mqttSlice";

interface Tank {
  name: string;
  current_stock: number;
  maxium_stock: number;
  status: string;
  updated_at: string;
}

interface Fuel {
  name: string;
  usage: number;
}

let client: MqttClient | null = null;

const onMessageReceived = (topic: string, message: Buffer): void => {
  const payload = message.toString();
  console.log(`Received message on topic ${topic}: ${payload}`);

  try {
    const parsedMessage = JSON.parse(payload);

    const fuelUsageColors = [
      "#FF0000", // Red
      "#FF7F00", // Orange
      "#FFFF00", // Yellow
      "#00FF00", // Green
      "#0000FF", // Blue
      "#4B0082", // Indigo
      "#8B00FF", // Violet
    ];

    let colorIndex = 1;

    switch (topic) {
      case "test/realtime":
        store.dispatch(
          updateFuelTanks(
            parsedMessage.map((tank: Tank) => ({
              name: tank.name,
              capacity: `${tank.current_stock} / ${tank.maxium_stock} L`,
              status: tank.status.toUpperCase(),
              lastTransaction: new Date(tank.updated_at).toLocaleTimeString(),
            }))
          )
        );
        break;

      case "test/top-5-car-usage":
        store.dispatch(updateCarUsage(parsedMessage));
        break;

      case "test/fuel-usage":
        store.dispatch(
          updateFuelUsage(
            parsedMessage.map((fuel: Fuel) => {
              const color = fuelUsageColors[colorIndex];

              colorIndex = (colorIndex + 1) % fuelUsageColors.length;

              return {
                name: fuel.name,
                value: fuel.usage,
                color: color,
              };
            })
          )
        );
        break;

      default:
        console.warn("Unhandled MQTT topic:", topic);
    }
  } catch (error) {
    console.error("Error parsing MQTT message:", error);
  }
};

export const connectMQTT = (): void => {
  client = mqtt.connect(
    `wss://${import.meta.env.VITE_MQTT_HOST}:${
      import.meta.env.VITE_WS_PORT
    }/mqtt`,
    {
      username: import.meta.env.VITE_MQTT_USERNAME,
      password: import.meta.env.VITE_MQTT_PASSWORD,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30_000,
    }
  );

  client.on("connect", () => {
    console.log("Connected to MQTT broker");
  });

  client.on("message", onMessageReceived);

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
