# Ravelware Technical Test Submission

## Description
This project is a front-end application that connects to an MQTT broker to handle real-time data updates and visualizations. It utilizes React, Redux, Tailwind and Recharts to display fuel usage data in charts and tables.

## Features
- Real-time data updates via MQTT
- Fuel usage visualization with pie charts
- Interactive UI with filtering options

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Zurihaqi/ravelware-technical-test.git
   ```
2. Navigate to the project directory:
   ```sh
   cd ravelware-technical-test
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

## Environment Variables
Create a `.env` file in the root directory and add the following variables:

```
VITE_MQTT_HOST=
VITE_MQTT_PORT=
VITE_WS_PORT=
VITE_MQTT_USERNAME=
VITE_MQTT_PASSWORD=
```

Replace the values with your MQTT broker credentials.

## Usage

1. Start the development server:
   ```sh
   npm run dev
   ```
2. Open the application in your browser at `http://localhost:5173`

## Build for Production
To create a production build:
```sh
npm run build
```

