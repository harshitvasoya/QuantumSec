import React, { useState, useEffect, useCallback } from 'react';
import Globe from 'react-globe.gl';

// --- Configuration & Mock Data ---
const MOCK_ATTACK_INTERVAL_MS = 1500; // Generate a new attack every 1.5 seconds
const MAX_ARCS_ON_GLOBE = 20; // To keep the globe from getting too cluttered

const ATTACK_VECTORS = [
  'TCP Flood', 'UDP Flood', 'ICMP Flood', 
  'DNS Flood', 'Low and Slow Attack', 'Exploits', 'Data Theft'
];

const COUNTRIES = [
  { name: 'United States', lat: 39.8283, lng: -98.5795, code: 'US' },
  { name: 'China', lat: 35.8617, lng: 104.1954, code: 'CN' },
  { name: 'Russia', lat: 61.5240, lng: 105.3188, code: 'RU' },
  { name: 'Germany', lat: 51.1657, lng: 10.4515, code: 'DE' },
  { name: 'United Kingdom', lat: 55.3781, lng: -3.4360, code: 'GB' },
  { name: 'France', lat: 46.6033, lng: 1.8883, code: 'FR' },
  { name: 'India', lat: 20.5937, lng: 78.9629, code: 'IN' },
  { name: 'Brazil', lat: -14.2350, lng: -51.9253, code: 'BR' },
  { name: 'Canada', lat: 56.1304, lng: -106.3468, code: 'CA' },
  { name: 'Australia', lat: -25.2744, lng: 133.7751, code: 'AU' },
  { name: 'Japan', lat: 36.2048, lng: 138.2529, code: 'JP' },
  { name: 'Netherlands', lat: 52.1326, lng: 5.2913, code: 'NL' },
  { name: 'Switzerland', lat: 46.8182, lng: 8.2275, code: 'CH' }
];

// --- Helper Functions ---
const getInitialCounts = () => ({
  attackers: {},
  attacked: {},
  vectors: {}
});

const getTopN = (counts, n = 5) => {
  const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
  return Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, n)
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / total) * 100)
    }));
};

// --- React Component ---
const LiveThreatMap = () => {
  const [arcsData, setArcsData] = useState([]);
  const [counts, setCounts] = useState(getInitialCounts());
  const [intervalOption, setIntervalOption] = useState('1hour');

  const topAttackers = getTopN(counts.attackers);
  const topAttacked = getTopN(counts.attacked);
  const topVectors = getTopN(counts.vectors, 7);
  
  // This function generates a new attack and updates all stats
  const generateAttack = useCallback(() => {
    const srcIndex = Math.floor(Math.random() * COUNTRIES.length);
    let destIndex;
    do {
      destIndex = Math.floor(Math.random() * COUNTRIES.length);
    } while (srcIndex === destIndex); // Ensure source and destination are different

    const srcCountry = COUNTRIES[srcIndex];
    const destCountry = COUNTRIES[destIndex];
    const vector = ATTACK_VECTORS[Math.floor(Math.random() * ATTACK_VECTORS.length)];

    // Update arcs on the globe
    const newArc = {
      startLat: srcCountry.lat,
      startLng: srcCountry.lng,
      endLat: destCountry.lat,
      endLng: destCountry.lng,
      color: [ `rgba(255, 77, 77, 0.8)`, `rgba(0, 255, 255, 0.8)` ], // Red to Cyan
    };
    setArcsData(currentArcs => [newArc, ...currentArcs.slice(0, MAX_ARCS_ON_GLOBE - 1)]);

    // Update statistics
    setCounts(prevCounts => {
      const newAttackers = { ...prevCounts.attackers };
      const newAttacked = { ...prevCounts.attacked };
      const newVectors = { ...prevCounts.vectors };

      newAttackers[srcCountry.name] = (newAttackers[srcCountry.name] || 0) + 1;
      newAttacked[destCountry.name] = (newAttacked[destCountry.name] || 0) + 1;
      newVectors[vector] = (newVectors[vector] || 0) + 1;

      return { attackers: newAttackers, attacked: newAttacked, vectors: newVectors };
    });
  }, []);

  // Effect to run the simulation
  useEffect(() => {
    const simulation = setInterval(generateAttack, MOCK_ATTACK_INTERVAL_MS);
    return () => clearInterval(simulation);
  }, [generateAttack]);

  // Handler to reset stats when dropdown changes
  const handleIntervalChange = (e) => {
    setIntervalOption(e.target.value);
    setCounts(getInitialCounts()); // Reset stats
    setArcsData([]); // Clear globe
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: '#000411' }}>
      
      {/* --- Right Side Statistics Panel --- */}
      <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 1,
          width: '300px',
          background: 'rgba(0, 0, 0, 0.75)',
          color: '#fff',
          padding: '20px',
          borderRadius: '8px',
          fontFamily: 'monospace',
          border: '1px solid rgba(0, 255, 255, 0.3)'
        }}>
          <h2 style={{ textAlign: 'center', margin: '0 0 10px 0', color: '#00ffff', fontSize: '1.1em', letterSpacing: '2px' }}>LIVE CYBER THREAT MAP</h2>
          <select value={intervalOption} onChange={handleIntervalChange} style={{width: '100%', background: '#111', color: '#fff', border: '1px solid #555', padding: '8px', marginBottom: '20px'}}>
              <option value="1hour">STATISTICS INTERVAL: 1 Hour</option>
              <option value="24hours">STATISTICS INTERVAL: 24 Hours</option>
          </select>

          {/* Top Attackers */}
          <div style={{marginBottom: '20px'}}>
              <h3 style={{color: '#ff4d4d', margin: '0 0 10px 0', fontSize: '0.9em'}}>TOP ATTACKERS</h3>
              {topAttackers.map(item => (
                  <div key={item.name} style={{fontSize: '0.8em', marginBottom: '5px'}}>
                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                          <span>{item.name}</span><span>{item.percentage}%</span>
                      </div>
                      <div style={{background: '#444', height: '4px', width: '100%', borderRadius: '2px'}}>
                          <div style={{background: '#ff4d4d', height: '4px', width: `${item.percentage}%`, borderRadius: '2px', transition: 'width 0.5s ease-in-out'}}></div>
                      </div>
                  </div>
              ))}
          </div>

          {/* Top Attacked */}
          <div style={{marginBottom: '20px'}}>
              <h3 style={{color: '#00ffff', margin: '0 0 10px 0', fontSize: '0.9em'}}>TOP ATTACKED</h3>
              {topAttacked.map(item => (
                  <div key={item.name} style={{fontSize: '0.8em', marginBottom: '5px'}}>
                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                          <span>{item.name}</span><span>{item.percentage}%</span>
                      </div>
                      <div style={{background: '#444', height: '4px', width: '100%', borderRadius: '2px'}}>
                          <div style={{background: '#00ffff', height: '4px', width: `${item.percentage}%`, borderRadius: '2px', transition: 'width 0.5s ease-in-out'}}></div>
                      </div>
                  </div>
              ))}
          </div>

          {/* Top Vectors */}
          <div>
              <h3 style={{color: '#ffff00', margin: '0 0 10px 0', fontSize: '0.9em'}}>TOP NETWORK VECTORS</h3>
              {topVectors.map(item => (
                  <div key={item.name} style={{fontSize: '0.8em', display: 'flex', justifyContent: 'space-between', marginBottom: '2px'}}>
                      <span>{item.name}</span><span>{item.percentage}%</span>
                  </div>
              ))}
          </div>
      </div>
      
      {/* --- Globe Component --- */}
      <Globe
        backgroundColor="#000411"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        arcsData={arcsData}
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={0.8}
        arcDashAnimateTime={2500}
        arcStroke={0.3}
      />
    </div>
  );
};

export default LiveThreatMap;