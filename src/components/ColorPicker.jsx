import { useState, useEffect } from 'react';
import { colorPresets } from '../utils/presets';
import { isValidHex, normalizeHex } from '../utils/colorUtils';
import { Pipette } from 'lucide-react';

export default function ColorPicker({ color, alpha, onColorChange, onAlphaChange }) {
  const [hexInput, setHexInput] = useState(color);
  const [recentColors, setRecentColors] = useState(() => {
    const saved = localStorage.getItem('recentColors');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    setHexInput(color);
  }, [color]);

  const handleHexChange = (e) => {
    const value = e.target.value;
    setHexInput(value);

    if (isValidHex(value)) {
      onColorChange(normalizeHex(value));
    }
  };

  const handleHexBlur = () => {
    if (isValidHex(hexInput)) {
      const normalized = normalizeHex(hexInput);
      setHexInput(normalized);
      addToRecentColors(normalized);
    } else {
      setHexInput(color);
    }
  };

  const handleColorSelect = (hex) => {
    if (hex === '#TRANSPARENT') {
      onAlphaChange(0);
      return;
    }
    onColorChange(hex);
    setHexInput(hex);
    addToRecentColors(hex);
  };

  const addToRecentColors = (hex) => {
    if (hex === '#TRANSPARENT') return;
    const updated = [hex, ...recentColors.filter(c => c !== hex)].slice(0, 8);
    setRecentColors(updated);
    localStorage.setItem('recentColors', JSON.stringify(updated));
  };

  const handleNativeColorPicker = (e) => {
    const hex = e.target.value.toUpperCase();
    onColorChange(hex);
    setHexInput(hex);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="color"
            value={color}
            onChange={handleNativeColorPicker}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div
            className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer shadow-inner"
            style={{
              backgroundColor: alpha === 0 ? 'transparent' : color,
              backgroundImage: alpha === 0
                ? 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)'
                : 'none',
              backgroundSize: '8px 8px',
              backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
            }}
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Hex Color</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={hexInput}
              onChange={handleHexChange}
              onBlur={handleHexBlur}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              placeholder="#000000"
            />
            <Pipette className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Opacity: {Math.round(alpha * 100)}%
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={alpha}
          onChange={(e) => onAlphaChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Preset Colors</label>
        <div className="grid grid-cols-7 gap-2">
          {colorPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => handleColorSelect(preset.hex)}
              title={preset.name}
              className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-110 ${
                color === preset.hex ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
              }`}
              style={{
                backgroundColor: preset.hex === '#TRANSPARENT' ? 'transparent' : preset.hex,
                backgroundImage: preset.hex === '#TRANSPARENT'
                  ? 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)'
                  : 'none',
                backgroundSize: '6px 6px',
                backgroundPosition: '0 0, 0 3px, 3px -3px, -3px 0px',
              }}
            />
          ))}
        </div>
      </div>

      {recentColors.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Recent Colors</label>
          <div className="flex gap-2 flex-wrap">
            {recentColors.map((hex, index) => (
              <button
                key={`${hex}-${index}`}
                onClick={() => handleColorSelect(hex)}
                className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-110 ${
                  color === hex ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
                }`}
                style={{ backgroundColor: hex }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
