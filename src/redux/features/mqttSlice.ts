import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FuelTank {
  name: string;
  capacity: string;
  status: string;
  lastTransaction: string;
}

interface CarUsage {
  name: string;
  usage: number;
}

interface FuelUsage {
  name: string;
  value: number;
  color: string;
}

interface MqttState {
  fuelTanks: FuelTank[];
  carUsageData: CarUsage[];
  fuelUsageData: FuelUsage[];
}

const initialState: MqttState = {
  fuelTanks: [],
  carUsageData: [],
  fuelUsageData: [],
};

const mqttSlice = createSlice({
  name: "mqtt",
  initialState,
  reducers: {
    updateFuelTanks: (state, action: PayloadAction<FuelTank[]>) => {
      state.fuelTanks = action.payload;
    },
    updateCarUsage: (state, action: PayloadAction<CarUsage[]>) => {
      state.carUsageData = action.payload;
    },
    updateFuelUsage: (state, action: PayloadAction<FuelUsage[]>) => {
      state.fuelUsageData = action.payload;
    },
  },
});

export const { updateFuelTanks, updateCarUsage, updateFuelUsage } =
  mqttSlice.actions;
export default mqttSlice.reducer;
