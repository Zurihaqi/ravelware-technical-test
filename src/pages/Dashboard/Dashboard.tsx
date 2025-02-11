import { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Slider, { CustomArrowProps } from "react-slick";
import { connectMQTT, subscribeToTopic } from "../../services/mqttService";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FuelTankCard from "./components/FuelTankCard";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

function NextArrow(props: CustomArrowProps) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} before:content-[''] z-10`}
      onClick={onClick}
    />
  );
}

function PrevArrow(props: CustomArrowProps) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} before:content-[''] z-10`}
      onClick={onClick}
    />
  );
}

export default function Dashboard() {
  const fuelTanks = useSelector((state: RootState) => state.mqtt.fuelTanks);
  const carUsageData = useSelector(
    (state: RootState) => state.mqtt.carUsageData
  );
  const fuelUsageData = useSelector(
    (state: RootState) => state.mqtt.fuelUsageData
  );

  const totalValue = fuelUsageData.reduce(
    (total, fuel) => total + fuel.value,
    0
  );

  useEffect(() => {
    connectMQTT();
    subscribeToTopic("test/realtime");
    subscribeToTopic("test/top-5-car-usage");
    subscribeToTopic("test/fuel-usage");
  }, []);

  return (
    <div className="w-full space-y-8">
      <h1 className="text-3xl text-center font-bold">
        REALTIME FUEL TANK STATUS
      </h1>

      {/* Fuel tanks carousel */}
      <div className="w-full px-4">
        {fuelTanks.length > 0 ? (
          <Slider {...sliderSettings} className="bg-[#232442] p-2 rounded-lg">
            {fuelTanks.map((tank, index) => (
              <FuelTankCard key={index} tank={tank} />
            ))}
          </Slider>
        ) : (
          <p className="text-center text-3xl bg-[#232442] rounded-lg p-2">
            Awaiting data...
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Top 5 Car Usage Chart */}
        <div className="bg-[#232442] p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-6">
            TOP 5 CAR USAGE THIS MONTH
          </h2>
          {carUsageData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={carUsageData}>
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Bar dataKey="usage" fill="#4ade80" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-3xl bg-[#232442] rounded-lg p-2">
              Awaiting data...
            </p>
          )}
        </div>

        {/* Fuel Usage Chart */}
        <div className="bg-[#232442] p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-6">
            FUEL USAGE THIS MONTH
          </h2>
          {fuelUsageData.length > 0 ? (
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart width={400} height={400}>
                  <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={fuelUsageData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {fuelUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              {/* Fuel Usage Table */}
              <table className="table-auto mt-4 border-collapse border border-gray-300 text-white">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">
                      Fuel Name
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Ratio %
                    </th>
                    <th className="border border-gray-300 px-4 py-2">Jumlah</th>
                  </tr>
                </thead>
                <tbody>
                  {fuelUsageData.map((fuel, index) => {
                    const percentage = (
                      (fuel.value / totalValue) *
                      100
                    ).toFixed(2);
                    return (
                      <tr key={index}>
                        <td className="border border-gray-300 px-4 py-2">
                          <div className="flex items-center gap-2">
                            <span
                              style={{ backgroundColor: fuel.color }}
                              className="w-4 h-4 rounded-full"
                            ></span>
                            {fuel.name}
                          </div>
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {percentage}%
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {fuel.value}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-3xl bg-[#232442] rounded-lg p-2">
              Awaiting data...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
