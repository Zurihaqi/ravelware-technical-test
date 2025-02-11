export interface FuelTank {
  name: string;
  capacity: string;
  status: string;
  lastTransaction: string;
}

function FuelTankCard({ tank }: { tank: FuelTank }) {
  const [current, total] = tank.capacity
    .split(" / ")
    .map((num) => parseFloat(num));

  const fillPercentage = (current / total) * 100;

  let barColor = "bg-green-600";
  if (fillPercentage < 20) {
    barColor = "bg-red-600";
  } else if (fillPercentage < 60) {
    barColor = "bg-yellow-500";
  }

  return (
    <div
      className={`p-4 rounded-lg ${barColor} min-w-[250px] max-w-[300px] mx-2`}
    >
      <div className="flex items-start gap-4">
        {/* Fuel Tank Bar */}
        <div className="w-10 h-24 bg-gray-800 border-2 border-gray-600 rounded-lg relative overflow-hidden">
          <div
            className={`absolute bottom-0 w-full rounded-lg transition-all duration-500 ${barColor}`}
            style={{ height: `${fillPercentage}%` }}
          />
        </div>

        {/* Fuel Tank Info */}
        <div className="flex-1">
          <h3 className="text-white font-bold">{tank.name}</h3>
          <p className="text-white/80 text-sm">{tank.capacity}</p>
          <p className="text-white mt-4 font-bold">Status: {tank.status}</p>
          <p className="text-white/60 text-xs mt-2">
            Last transaction: {tank.lastTransaction}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FuelTankCard;
