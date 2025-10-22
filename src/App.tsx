import { useState, useRef } from 'react';
import { X, Plus, ChevronLeft } from 'lucide-react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  .container-radio {
    --color-pure: #fff;
    --color-primary: #334155;
    --color-secondary: #cbd5e1;
    --muted: #475569;
    background-color: transparent;
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  /* main style */
  .wrap {
    --round: 10px;
    --p-x: 8px;
    --p-y: 4px;
    --w-label: 200px;
    display: flex;
    align-items: center;
    padding: var(--p-y) var(--p-x);
    position: relative;
    background: var(--color-primary);
    border-radius: var(--round);
    max-width: 100%;
    overflow-x: auto;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }

  .wrap input {
    height: 0;
    width: 0;
    position: absolute;
    overflow: hidden;
    display: none;
    visibility: hidden;
  }

  .label {
    cursor: pointer;
    outline: none;
    font-size: 1.25rem;
    letter-spacing: initial;
    font-weight: 700;
    color: var(--color-secondary);
    background: transparent;
    padding: 12px 16px;
    width: var(--w-label);
    min-width: var(--w-label);
    text-decoration: none;
    -webkit-user-select: none;
    user-select: none;
    transition: color 0.25s ease, opacity 0.25s ease;
    outline-offset: -6px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 3;
    -webkit-tap-highlight-color: transparent;
    opacity: 0.5; /* reduced opacity for unselected */
  }

  .label span {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .wrap input[class*="rd-"]:checked + label {
    color: var(--color-pure);
    opacity: 1; /* full opacity when selected */
  }

  .label:hover {
    opacity: 1; /* full opacity on hover */
  }

  .bar {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: absolute;
    transform-origin: 0 0 0;
    height: 100%;
    width: var(--w-label);
    z-index: 0;
    transition: transform 0.5s cubic-bezier(0.33, 0.83, 0.99, 0.98);
  }

  .bar::before,
  .bar::after {
    content: "";
    position: absolute;
    height: 4px;
    width: 100%;
    background: var(--color-secondary);
  }

  .bar::before {
    top: 0;
    border-radius: 0 0 9999px 9999px;
  }

  .bar::after {
    bottom: 0;
    border-radius: 9999px 9999px 0 0;
  }

  .slidebar {
    position: absolute;
    height: calc(100% - (var(--p-y) * 4));
    width: var(--w-label);
    border-radius: calc(var(--round) - var(--p-y));
    background: var(--muted);
    transform-origin: 0 0 0;
    z-index: 0;
    transition: transform 0.5s cubic-bezier(0.33, 0.83, 0.99, 0.98);
  }

  .rd-1:checked ~ .bar,
  .rd-1:checked ~ .slidebar,
  .rd-1 + label:hover ~ .slidebar {
    transform: translateX(0) scaleX(1);
  }

  .rd-2:checked ~ .bar,
  .rd-2:checked ~ .slidebar,
  .rd-2 + label:hover ~ .slidebar {
    transform: translateX(100%) scaleX(1);
  }

  .rd-3:checked ~ .bar,
  .rd-3:checked ~ .slidebar,
  .rd-3 + label:hover ~ .slidebar {
    transform: translateX(200%) scaleX(1);
  }
`;

const PortfolioProfile = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('about');
  const [images, setImages] = useState([
    'https://i.pinimg.com/736x/20/8a/f5/208af563619a1929732961a53ff93835.jpg',
    'https://i.pinimg.com/736x/d5/4a/a2/d54aa2ad624ed5e0dd5f04c08340a4a7.jpg',
    'https://i.pinimg.com/1200x/6c/55/99/6c5599c3c64d53fd2dcf242cd66894e2.jpg',
    'https://i.pinimg.com/736x/91/75/d6/9175d6126c31d6f25c4201610f9eef97.jpg'
  ]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const addImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setImages([...images, newImageUrl]);
    }
  };

  const deleteImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const scrollGallery = (direction: 'left' | 'right') => {
    const container = document.getElementById('gallery-container');
    if (container) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleRadioChange = (tab: 'about' | 'experiences' | 'Recommended') => {
    setActiveTab(tab);
  };

  type TabKey = 'about' | 'experiences' | 'Recommended';
  const tabContent: Record<TabKey, { title: string; content: string }> = {
    about: {
      title: "Hello! I'm Dave, your sales rep here from Salesforce.",
      content: `Senior Sales Representative at Salesforce (2022 - Present)
Leading enterprise client relationships across the APAC region, driving strategic growth, and consistently exceeding revenue targets. Focused on delivering tailored solutions that enhance client success and long-term partnerships.

Built and nurtured strong B2B relationships, surpassing quarterly sales goals by 150%. Collaborated closely with cross-functional teams to implement strategies that maximized client engagement and retention.`
    },
    experiences: {
      title: "Professional Experience",
      content: `Senior Sales Representative at Salesforce (2022 - Present)
Leading enterprise client relationships and driving revenue growth across the APAC region.

Account Manager at StartupHub (2017 - 2019)
Managed a diverse portfolio of 50+ clients, achieving a 95% retention rate. Delivered exceptional client support while identifying opportunities for upselling and business expansion.`
    },
    Recommended: {
      title: "Recommendations",
      content: `"Dave is an exceptional sales professional who consistently delivers results. His client relationships are second to none." - Sarah Johnson, VP Sales

"Working with Dave has been a pleasure. His dedication and expertise have significantly contributed to our success." - Michael Chen, Director

"Dave's strategic approach and deep understanding of our needs made all the difference." - Lisa Anderson, CEO`
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-zinc-900 flex items-center justify-center p-8">
      <div className="w-full max-w-3xl flex flex-col gap-6">
        
        {/* Profile Widget - Top */}
        <div className="bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-600/50 overflow-hidden">
          <div className="p-8">

            {/* Radio Tabs */}
            <div className="mb-6">
              <StyledWrapper>
                <div>
                  <div className="container-radio">
                    <div className="wrap">
                      <input 
                        hidden 
                        className="rd-1" 
                        name="radio" 
                        id="rd-1" 
                        type="radio" 
                        checked={activeTab === 'about'}
                        onChange={() => handleRadioChange('about')}
                      />
                      <label style={{ zIndex: 3 }} className="label" htmlFor="rd-1">
                        <span>About</span>
                      </label>

                      <input 
                        hidden 
                        className="rd-2" 
                        name="radio" 
                        id="rd-2" 
                        type="radio"
                        checked={activeTab === 'experiences'}
                        onChange={() => handleRadioChange('experiences')}
                      />
                      <label style={{ zIndex: 3 }} className="label" htmlFor="rd-2">
                        <span>Experiences</span>
                      </label>

                      <input 
                        hidden 
                        className="rd-3" 
                        name="radio" 
                        id="rd-3" 
                        type="radio"
                        checked={activeTab === 'Recommended'}
                        onChange={() => handleRadioChange('Recommended')}
                      />
                      <label style={{ zIndex: 3 }} className="label" htmlFor="rd-3">
                        <span>Recommended</span>
                      </label>

                      <div className="bar" />
                      <div className="slidebar" />
                    </div>
                  </div>
                </div>
              </StyledWrapper>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white leading-relaxed font-bold">
                {tabContent[activeTab].title}
              </h3>
              <p className="text-base text-gray-300 leading-relaxed whitespace-pre-line">
                {tabContent[activeTab].content}
              </p>
            </div>
          </div>

          {/* Decorative gradient bar */}
          <div className="h-1 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600"></div>
        </div>

        {/* Gallery Widget - Bottom */}
        <div className="bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-600/50 overflow-hidden">
          <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <button
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl transition-all duration-300 shadow-lg text-l font-bold hover:shadow-gray-500/50 hover:scale-105 transform"
                >
                  Gallery
                </button>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={addImage}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl transition-all duration-300 shadow-lg text-sm font-semibold hover:shadow-gray-500/50 hover:scale-105 transform"
                >
                  <Plus size={18} strokeWidth={2.5} />
                  ADD IMAGE
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                
                <div className="flex gap-2">
                  <button
                    onClick={() => scrollGallery('left')}
                    className="w-12 h-12 rounded-xl bg-gray-700 hover:bg-gradient-to-br hover:from-gray-600 hover:to-gray-700 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-gray-500/50 hover:scale-110 transform border border-gray-600"
                  >
                    <ChevronLeft size={25} className="text-white" strokeWidth={10} />
                  </button>
                  <button
                    onClick={() => scrollGallery('right')}
                    className="w-12 h-12 rounded-xl bg-gray-700 hover:bg-gradient-to-br hover:from-gray-600 hover:to-gray-800 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-gray-500/50 hover:scale-110 transform border border-gray-600"
                  >
                    <ChevronLeft size={25} className="text-white rotate-180" strokeWidth={10} />
                  </button>
                </div>
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="relative">
              <div
                id="gallery-container"
                className="flex gap-5 overflow-x-auto pb-4 scroll-smooth px-1"
                style={{ 
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="relative flex-shrink-0 w-80 h-56 group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 rounded-2xl blur-sm opacity-0 group-hover:opacity-75 transition-all duration-300"></div>
                    <img
                      src={img}
                      alt={`Gallery ${index + 1}`}
                      className="relative w-full h-full object-cover rounded-2xl shadow-2xl border-2 border-gray-700 group-hover:border-transparent transition-all duration-300 group-hover:scale-[1.02] transform"
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        e.currentTarget.src = 'https://via.placeholder.com/400x300/1e293b/64748b?text=Image';
                      }}
                    />
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl flex flex-col items-center justify-end pb-6 gap-2">
                      <button
                        onClick={() => deleteImage(index)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl transition-all duration-300 shadow-lg transform translate-y-4 group-hover:translate-y-0 font-semibold"
                      >
                        <X size={18} strokeWidth={2.5} />
                        Delete
                      </button>
                      <div className="text-white text-sm font-medium opacity-80">Image {index + 1} of {images.length}</div>
                    </div>
                    
                    {/* Image number badge */}
                    <div className="absolute top-4 right-4 w-9 h-9 bg-gradient-to-br from-gray-600 to-gray-700 backdrop-blur-sm rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>

              {/* Scroll indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className="w-2 h-2 rounded-full bg-gray-600 hover:bg-gradient-to-r hover:from-gray-500 hover:to-gray-600 transition-all duration-300 cursor-pointer"
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Decorative gradient bar */}
          <div className="h-1.5 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400 shadow-lg"></div>
        </div>
      </div>

      <style>{`
        #gallery-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default PortfolioProfile;