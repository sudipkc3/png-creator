import { useState } from 'react';
import { saveAs } from 'file-saver';
import { Download, ChevronDown, Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const formats = [
  { id: 'png', label: 'PNG', mime: 'image/png' },
  { id: 'jpg', label: 'JPG', mime: 'image/jpeg' },
  { id: 'webp', label: 'WebP', mime: 'image/webp' },
];

export default function DownloadButton({ canvasRef, width, height, color }) {
  const [format, setFormat] = useState('png');
  const [quality, setQuality] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const selectedFormat = formats.find((f) => f.id === format);

  const handleDownload = async () => {
    if (!canvasRef.current) {
      toast.error('Canvas not ready');
      return;
    }

    try {
      const blob = await canvasRef.current.toBlob(selectedFormat.mime, quality);
      if (blob) {
        const filename = `image-${width}x${height}-${color.replace('#', '')}.${format}`;
        saveAs(blob, filename);
        toast.success(`Downloaded ${filename}`);
      }
    } catch {
      toast.error('Failed to download image');
    }
  };

  const handleCopyToClipboard = async () => {
    if (!canvasRef.current) {
      toast.error('Canvas not ready');
      return;
    }

    try {
      const blob = await canvasRef.current.toBlob('image/png', 1);
      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        setCopied(true);
        toast.success('Copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleCopyBase64 = async () => {
    if (!canvasRef.current) {
      toast.error('Canvas not ready');
      return;
    }

    try {
      const dataUrl = canvasRef.current.toDataURL(selectedFormat.mime, quality);
      await navigator.clipboard.writeText(dataUrl);
      toast.success('Base64 copied to clipboard!');
    } catch {
      toast.error('Failed to copy Base64');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <span>{selectedFormat.label}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            {isOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                {formats.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      setFormat(f.id);
                      setIsOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                      format === f.id ? 'bg-blue-50 text-blue-700' : ''
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {format !== 'png' && (
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quality: {Math.round(quality * 100)}%
            </label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={quality}
              onChange={(e) => setQuality(parseFloat(e.target.value))}
              className="w-full h-2 mt-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        )}
      </div>

      <button
        onClick={handleDownload}
        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <Download className="w-5 h-5" />
        Download {selectedFormat.label}
      </button>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleCopyToClipboard}
          className="py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          Copy Image
        </button>
        <button
          onClick={handleCopyBase64}
          className="py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Copy className="w-4 h-4" />
          Copy Base64
        </button>
      </div>
    </div>
  );
}
