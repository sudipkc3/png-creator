import { useState } from 'react';
import { Link2, Link2Off, RotateCcw } from 'lucide-react';
import { sizePresets } from '../utils/presets';

const MIN_SIZE = 1;
const MAX_SIZE = 8192;

export default function DimensionInput({
  width,
  height,
  onWidthChange,
  onHeightChange,
  aspectLocked,
  onAspectLockChange,
}) {
  const [activeCategory, setActiveCategory] = useState('social');

  const aspectRatio = width / height;

  const handleWidthChange = (newWidth) => {
    const clampedWidth = Math.min(Math.max(newWidth, MIN_SIZE), MAX_SIZE);
    onWidthChange(clampedWidth);
    if (aspectLocked) {
      const newHeight = Math.round(clampedWidth / aspectRatio);
      onHeightChange(Math.min(Math.max(newHeight, MIN_SIZE), MAX_SIZE));
    }
  };

  const handleHeightChange = (newHeight) => {
    const clampedHeight = Math.min(Math.max(newHeight, MIN_SIZE), MAX_SIZE);
    onHeightChange(clampedHeight);
    if (aspectLocked) {
      const newWidth = Math.round(clampedHeight * aspectRatio);
      onWidthChange(Math.min(Math.max(newWidth, MIN_SIZE), MAX_SIZE));
    }
  };

  const handlePresetSelect = (preset) => {
    onWidthChange(preset.width);
    onHeightChange(preset.height);
  };

  const handleSwapDimensions = () => {
    const tempWidth = width;
    onWidthChange(height);
    onHeightChange(tempWidth);
  };

  const categories = [
    { id: 'social', label: 'Social Media' },
    { id: 'devices', label: 'Devices' },
    { id: 'common', label: 'Common' },
    { id: 'documents', label: 'Documents' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Width (px)</label>
          <input
            type="number"
            value={width}
            onChange={(e) => handleWidthChange(parseInt(e.target.value) || MIN_SIZE)}
            min={MIN_SIZE}
            max={MAX_SIZE}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col items-center gap-1 pb-2">
          <button
            onClick={() => onAspectLockChange(!aspectLocked)}
            title={aspectLocked ? 'Unlock aspect ratio' : 'Lock aspect ratio'}
            className={`p-2 rounded-lg transition-colors ${
              aspectLocked
                ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {aspectLocked ? <Link2 className="w-5 h-5" /> : <Link2Off className="w-5 h-5" />}
          </button>
          <button
            onClick={handleSwapDimensions}
            title="Swap dimensions"
            className="p-2 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Height (px)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => handleHeightChange(parseInt(e.target.value) || MIN_SIZE)}
            min={MIN_SIZE}
            max={MAX_SIZE}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="text-sm text-gray-500 text-center">
        Aspect Ratio: {(width / height).toFixed(2)} : 1
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Size Presets</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
          {sizePresets[activeCategory]?.map((preset) => (
            <button
              key={preset.name}
              onClick={() => handlePresetSelect(preset)}
              className={`px-3 py-2 text-sm text-left rounded-lg border transition-colors ${
                width === preset.width && height === preset.height
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="font-medium truncate">{preset.name}</div>
              <div className="text-xs text-gray-500">
                {preset.width} × {preset.height}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
