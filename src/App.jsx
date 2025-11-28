import { useState, useRef } from 'react';
import { Toaster } from 'react-hot-toast';
import { Image, Github, Info, X, Linkedin, Twitter, Instagram, Globe, Mail } from 'lucide-react';
import ColorPicker from './components/ColorPicker';
import DimensionInput from './components/DimensionInput';
import CanvasPreview from './components/CanvasPreview';
import DownloadButton from './components/DownloadButton';

function App() {
  const [width, setWidth] = useState(1080);
  const [height, setHeight] = useState(1080);
  const [color, setColor] = useState('#3B82F6');
  const [alpha, setAlpha] = useState(1);
  const [aspectLocked, setAspectLocked] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const canvasRef = useRef(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster position="top-right" />

      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Image className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">PNG Generator</h1>
              <p className="text-sm text-gray-500">Create custom solid-color images</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowAbout(true)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              title="About"
            >
              <Info className="w-5 h-5" />
            </button>
            <a
              href="https://github.com/sudipkc3/png-creator"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 transition-colors"
              title="GitHub Repository"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Dimensions</h2>
              <DimensionInput
                width={width}
                height={height}
                onWidthChange={setWidth}
                onHeightChange={setHeight}
                aspectLocked={aspectLocked}
                onAspectLockChange={setAspectLocked}
              />
            </section>

            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Color</h2>
              <ColorPicker
                color={color}
                alpha={alpha}
                onColorChange={setColor}
                onAlphaChange={setAlpha}
              />
            </section>
          </div>

          <div className="space-y-6">
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Preview</h2>
              <div className="flex justify-center">
                <CanvasPreview
                  ref={canvasRef}
                  width={width}
                  height={height}
                  color={color}
                  alpha={alpha}
                />
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="font-medium">Size:</span> {width} x {height} px
                  </div>
                  <div>
                    <span className="font-medium">Color:</span> {color}
                  </div>
                  <div>
                    <span className="font-medium">Opacity:</span> {Math.round(alpha * 100)}%
                  </div>
                  <div>
                    <span className="font-medium">File size:</span> ~{Math.round((width * height * 4) / 1024)} KB
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Download</h2>
              <DownloadButton
                canvasRef={canvasRef}
                width={width}
                height={height}
                color={color}
              />
            </section>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-6 text-center text-sm text-gray-500">
        <p>
          Built by{' '}
          <a
            href="https://kcsudip.com.np"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-medium"
          >
            Sudip KC
          </a>
          {' '}- Fullstack Developer & UI/UX Designer from Pokhara, Nepal
        </p>
      </footer>

      {showAbout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">About Developer</h2>
                <button
                  onClick={() => setShowAbout(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                  SK
                </div>
                <h3 className="text-xl font-bold text-gray-900">Sudip KC</h3>
                <p className="text-gray-500">Fullstack Developer & UI/UX Designer</p>
                <p className="text-sm text-gray-400 mt-1">Pokhara, Nepal</p>
              </div>

              <p className="text-gray-600 text-center mb-6">
                Creative developer and designer with expertise in React, Django, and UI/UX. Building beautiful and functional web experiences.
              </p>

              <div className="flex justify-center gap-3 mb-6">
                <a
                  href="https://kcsudip.com.np"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Website"
                >
                  <Globe className="w-5 h-5 text-gray-700" />
                </a>
                <a
                  href="https://github.com/sudipkc3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  title="GitHub"
                >
                  <Github className="w-5 h-5 text-gray-700" />
                </a>
                <a
                  href="https://www.linkedin.com/in/kcsudip3/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-gray-700" />
                </a>
                <a
                  href="https://x.com/sudipkc0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  title="X (Twitter)"
                >
                  <Twitter className="w-5 h-5 text-gray-700" />
                </a>
                <a
                  href="https://www.instagram.com/kcsudip3/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Instagram"
                >
                  <Instagram className="w-5 h-5 text-gray-700" />
                </a>
                <a
                  href="mailto:hello@kcsudip.com.np"
                  className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Email"
                >
                  <Mail className="w-5 h-5 text-gray-700" />
                </a>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-semibold text-gray-900 mb-3">Other Projects</h4>
                <div className="space-y-2">
                  <a
                    href="https://tonalist.kcsudip.com.np"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="font-medium text-gray-900">Tonalist</div>
                    <div className="text-sm text-gray-500">Color palette generator with WCAG compliance</div>
                  </a>
                  <a
                    href="https://builderdocs.kcsudip.com.np"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="font-medium text-gray-900">BuilderDocs</div>
                    <div className="text-sm text-gray-500">Documentation builder tool</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
