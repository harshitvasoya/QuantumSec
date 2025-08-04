// src/components/ThreatStatsSidebar.jsx
import React from "react";

const ThreatStatsSidebar = () => {
  return (
    <div className="absolute right-0 top-0 z-10 w-[300px] bg-black bg-opacity-60 text-white h-full p-4 backdrop-blur">
      <h2 className="text-lg font-bold border-b border-gray-500 pb-2 mb-4">LIVE CYBER THREAT MAP</h2>

      <section className="mb-4">
        <h3 className="font-semibold text-sm text-cyan-400">Top Attackers</h3>
        <ul className="text-xs pl-2 mt-1 space-y-1">
          <li>🇺🇸 United States — 60%</li>
          <li>🇫🇷 France — 16%</li>
          <li>🇳🇱 Netherlands — 10%</li>
          <li>🇩🇪 Germany — 8%</li>
          <li>🇬🇧 UK — 6%</li>
        </ul>
      </section>

      <section className="mb-4">
        <h3 className="font-semibold text-sm text-cyan-400">Top Attacked</h3>
        <ul className="text-xs pl-2 mt-1 space-y-1">
          <li>🇺🇸 United States — 26%</li>
          <li>🇨🇭 Switzerland — 26%</li>
          <li>🇨🇦 Canada — 18%</li>
          <li>🇯🇵 Japan — 17%</li>
          <li>🇮🇳 India — 13%</li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-sm text-cyan-400">Top Attack Vectors</h3>
        <ul className="text-xs pl-2 mt-1 space-y-1">
          <li>TCP Flood — 86%</li>
          <li>Low & Slow Attack — 5%</li>
          <li>UDP Flood — 5%</li>
          <li>IP Flood — 2%</li>
          <li>ICMP Flood — 2%</li>
        </ul>
      </section>
    </div>
  );
};

export default ThreatStatsSidebar;
