import React, { useState, useEffect } from 'react';
import { Beaker, Droplets, Calculator } from 'lucide-react';

const MixingRatioCalculator = () => {
  const [ratioA, setRatioA] = useState('1');
  const [ratioB, setRatioB] = useState('4');
  const [totalVolume, setTotalVolume] = useState('500');
  const [volumeA, setVolumeA] = useState(0);
  const [volumeB, setVolumeB] = useState(0);
  const [unit, setUnit] = useState('ml');
  const [productUnit, setProductUnit] = useState('ml');
  const [waterUnit, setWaterUnit] = useState('ml');

  // Calculate volumes whenever inputs change
  useEffect(() => {
    const a = parseFloat(ratioA) || 0;
    const b = parseFloat(ratioB) || 0;
    const total = parseFloat(totalVolume) || 0;
    
    if (a > 0 && b > 0 && total > 0) {
      const totalParts = a + b;
      
      // Convert input volume to ml for calculations
      let totalInMl = total;
      if (unit === 'oz') {
        totalInMl = total * 29.5735; // oz to ml
      } else if (unit === 'L') {
        totalInMl = total * 1000; // L to ml
      } else if (unit === 'gal') {
        totalInMl = total * 3785.41; // US gal to ml
      }
      
      // Calculate component volumes in ml
      const aInMl = (a / totalParts) * totalInMl;
      const bInMl = (b / totalParts) * totalInMl;
      
      setVolumeA(aInMl);
      setVolumeB(bInMl);
    } else {
      setVolumeA(0);
      setVolumeB(0);
    }
  }, [ratioA, ratioB, totalVolume, unit]);

  // Helper function to convert ml to target unit with proper rounding
  const convertFromMl = (mlValue, targetUnit) => {
    if (targetUnit === 'ml') {
      return Math.round(mlValue);
    } else if (targetUnit === 'oz') {
      return Math.round((mlValue / 29.5735) * 10) / 10;
    } else if (targetUnit === 'L') {
      return Math.round((mlValue / 1000) * 100) / 100;
    } else if (targetUnit === 'gal') {
      return Math.round((mlValue / 3785.41) * 100) / 100;
    }
    return mlValue;
  };

  const clearAll = () => {
    setRatioA('1');
    setRatioB('4');
    setTotalVolume('500');
  };

  const getPercentageA = () => {
    const a = parseFloat(ratioA) || 0;
    const b = parseFloat(ratioB) || 0;
    const total = a + b;
    return total > 0 ? Math.round((a / total) * 100) : 0;
  };

  const getPercentageB = () => {
    const a = parseFloat(ratioA) || 0;
    const b = parseFloat(ratioB) || 0;
    const total = a + b;
    return total > 0 ? Math.round((b / total) * 100) : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 p-2 sm:p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Beaker className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Mixing Ratio Calculator</h1>
          </div>
          <p className="text-sm sm:text-base text-gray-300">Perfect mixing ratios for automotive detailing products</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          {/* Input Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/20">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Setup Your Mix
            </h2>
            
            {/* Ratio Input */}
            <div className="mb-4 sm:mb-6">
              <label className="block text-xs sm:text-sm font-medium text-gray-200 mb-2 sm:mb-3">
                Mixing Ratio (Product : Water)
              </label>
              <div className="flex items-center gap-2 sm:gap-3">
                <input
                  type="number"
                  value={ratioA}
                  onChange={(e) => setRatioA(e.target.value)}
                  className="w-16 sm:w-20 px-2 sm:px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm sm:text-base"
                  placeholder="1"
                  min="0"
                  step="0.1"
                />
                <span className="text-white text-lg sm:text-xl font-bold">:</span>
                <input
                  type="number"
                  value={ratioB}
                  onChange={(e) => setRatioB(e.target.value)}
                  className="w-16 sm:w-20 px-2 sm:px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm sm:text-base"
                  placeholder="4"
                  min="0"
                  step="0.1"
                />
              </div>
            </div>

            {/* Total Volume Input */}
            <div className="mb-4 sm:mb-6">
              <label className="block text-xs sm:text-sm font-medium text-gray-200 mb-2 sm:mb-3">
                Total Volume Needed
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={totalVolume}
                  onChange={(e) => setTotalVolume(e.target.value)}
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent text-base sm:text-lg"
                  placeholder="500"
                  min="0"
                />
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="px-2 sm:px-3 py-2 sm:py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm sm:text-base"
                  style={{color: 'white'}}
                >
                  <option value="ml" style={{color: 'black', backgroundColor: 'white'}}>ml</option>
                  <option value="oz" style={{color: 'black', backgroundColor: 'white'}}>oz</option>
                  <option value="L" style={{color: 'black', backgroundColor: 'white'}}>L</option>
                  <option value="gal" style={{color: 'black', backgroundColor: 'white'}}>US Gal</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/20">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 flex items-center gap-2">
              <Droplets className="w-4 h-4" />
              Your Mix
            </h2>

            {/* Visual Ratio Bar */}
            <div className="mb-4 sm:mb-6">
              <div className="flex h-6 sm:h-8 rounded-lg overflow-hidden bg-white/10">
                <div 
                  className="bg-blue-500 flex items-center justify-center text-white text-xs sm:text-sm font-semibold"
                  style={{ width: `${getPercentageA()}%` }}
                >
                  {getPercentageA() > 15 ? `${getPercentageA()}%` : ''}
                </div>
                <div 
                  className="bg-green-500 flex items-center justify-center text-white text-xs sm:text-sm font-semibold"
                  style={{ width: `${getPercentageB()}%` }}
                >
                  {getPercentageB() > 15 ? `${getPercentageB()}%` : ''}
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-300 mt-1">
                <span>Product ({getPercentageA()}%)</span>
                <span>Water ({getPercentageB()}%)</span>
              </div>
            </div>

            {/* Results Display */}
            <div className="space-y-4">
              <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-blue-300 text-sm font-medium">Product Amount</div>
                  <select
                    value={productUnit}
                    onChange={(e) => setProductUnit(e.target.value)}
                    className="px-2 py-1 bg-white/20 border border-white/30 rounded text-white text-xs focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    style={{color: 'white'}}
                  >
                    <option value="ml" style={{color: 'black', backgroundColor: 'white'}}>ml</option>
                    <option value="oz" style={{color: 'black', backgroundColor: 'white'}}>oz</option>
                    <option value="L" style={{color: 'black', backgroundColor: 'white'}}>L</option>
                    <option value="gal" style={{color: 'black', backgroundColor: 'white'}}>US Gal</option>
                  </select>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white">
                  {convertFromMl(volumeA, productUnit)} {productUnit}
                </div>
              </div>

              <div className="text-center text-white text-xl font-bold">+</div>

              <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-green-300 text-sm font-medium">Water Amount</div>
                  <select
                    value={waterUnit}
                    onChange={(e) => setWaterUnit(e.target.value)}
                    className="px-2 py-1 bg-white/20 border border-white/30 rounded text-white text-xs focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    style={{color: 'white'}}
                  >
                    <option value="ml" style={{color: 'black', backgroundColor: 'white'}}>ml</option>
                    <option value="oz" style={{color: 'black', backgroundColor: 'white'}}>oz</option>
                    <option value="L" style={{color: 'black', backgroundColor: 'white'}}>L</option>
                    <option value="gal" style={{color: 'black', backgroundColor: 'white'}}>US Gal</option>
                  </select>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white">
                  {convertFromMl(volumeB, waterUnit)} {waterUnit}
                </div>
              </div>

              <div className="border-t border-white/20 pt-4">
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <div className="text-gray-300 text-sm font-medium mb-1">Total Mixture</div>
                  <div className="text-xl sm:text-2xl font-bold text-white">
                    {totalVolume} {unit}
                  </div>
                </div>
              </div>
            </div>

            {/* Current Ratio Display */}
            <div className="mt-6 text-center">
              <div className="inline-block bg-white/10 rounded-lg px-4 py-2 border border-white/20">
                <span className="text-gray-300 text-sm">Current Ratio: </span>
                <span className="text-white font-bold text-lg">{ratioA}:{ratioB}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Clear Button */}
        <div className="text-center mt-4 sm:mt-6 md:mt-8">
          <button
            onClick={clearAll}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg transition-all duration-200 font-medium text-sm sm:text-base"
          >
            Reset Calculator
          </button>
        </div>

        {/* Usage Tips */}
        <div className="mt-4 sm:mt-6 md:mt-8 bg-white/5 backdrop-blur-lg rounded-lg p-3 sm:p-4 border border-white/10">
          <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">💡 Detailing Tips</h3>
          <div className="text-gray-300 text-xs sm:text-sm space-y-1">
            <p>• Always add product to water, not water to product</p>
            <p>• Start with weaker ratios and increase strength as needed</p>
            <p>• Test on inconspicuous areas first</p>
            <p>• Use distilled water for best results</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MixingRatioCalculator;
