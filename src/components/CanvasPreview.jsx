import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { hexToRgba, rgbaToString } from '../utils/colorUtils';

const CanvasPreview = forwardRef(function CanvasPreview({ width, height, color, alpha }, ref) {
  const canvasRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getCanvas: () => canvasRef.current,
    toDataURL: (format = 'image/png', quality = 1) => {
      return canvasRef.current?.toDataURL(format, quality);
    },
    toBlob: (format = 'image/png', quality = 1) => {
      return new Promise((resolve) => {
        canvasRef.current?.toBlob(resolve, format, quality);
      });
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    if (alpha > 0) {
      const rgba = hexToRgba(color, alpha);
      if (rgba) {
        ctx.fillStyle = rgbaToString(rgba);
        ctx.fillRect(0, 0, width, height);
      }
    }
  }, [width, height, color, alpha]);

  const maxPreviewSize = 400;
  const scale = Math.min(maxPreviewSize / width, maxPreviewSize / height, 1);
  const previewWidth = width * scale;
  const previewHeight = height * scale;

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative rounded-lg overflow-hidden shadow-lg"
        style={{
          width: previewWidth,
          height: previewHeight,
          backgroundImage:
            'linear-gradient(45deg, #e0e0e0 25%, transparent 25%), linear-gradient(-45deg, #e0e0e0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e0e0e0 75%), linear-gradient(-45deg, transparent 75%, #e0e0e0 75%)',
          backgroundSize: '16px 16px',
          backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: previewWidth,
            height: previewHeight,
          }}
          className="block"
        />
      </div>
      <div className="text-sm text-gray-500 text-center">
        Preview ({Math.round(scale * 100)}% of actual size)
      </div>
    </div>
  );
});

export default CanvasPreview;
