
import { useState, useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { generateRandomStars, majorConstellations } from '@/lib/celestialData';
import { cn } from '@/lib/utils';

interface StarChartProps {
  interactive?: boolean;
  className?: string;
  birthDetails?: {
    day: string;
    month: string;
    year: string;
    hour: string;
    minute: string;
    city: string;
    country: string;
    timezone: string;
  };
  astrologyOptions?: {
    displayAspects: boolean;
    displayMinorAspects: boolean;
    displayLilithAspects: boolean;
    displayAsteroidAspects: boolean;
    showNumerology: boolean;
    showSunSign: boolean;
    showMoonSign: boolean;
    showChineseZodiac: boolean;
    showDailyHoroscope: boolean;
    showMonthlyHoroscope: boolean;
    showYearlyHoroscope: boolean;
  };
}

const StarChart = ({ interactive = true, className, birthDetails, astrologyOptions }: StarChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<any[]>([]);
  const [dimensions, setDimensions] = useState({ width: 800, height: 800 });
  const [tooltip, setTooltip] = useState<{ visible: boolean; x: number; y: number; content: string }>({ 
    visible: false, x: 0, y: 0, content: "" 
  });
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  // Effect for initial setup and window resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
        
        // Generate random background stars
        const starCount = isMobile ? 200 : 500;
        setStars(generateRandomStars(starCount, width, height));
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, [isMobile]);

  // Handle mouse down for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!interactive) return;
    
    setIsDragging(true);
    setDragStart({ 
      x: e.clientX - position.x, 
      y: e.clientY - position.y 
    });
  };

  // Handle mouse move for dragging and tooltips
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && interactive) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  // Handle mouse up to end dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle wheel for zooming
  const handleWheel = (e: React.WheelEvent) => {
    if (!interactive) return;
    
    e.preventDefault();
    const delta = e.deltaY * -0.01;
    const newZoom = Math.min(Math.max(zoom + delta, 0.5), 3);
    setZoom(newZoom);
  };

  // Handle star hover for tooltip
  const handleStarHover = (star: any) => {
    if (!interactive) return;
    
    setTooltip({
      visible: true,
      x: star.x * zoom + position.x,
      y: star.y * zoom + position.y,
      content: `${star.name} (Magnitude: ${star.magnitude})`
    });
  };

  // Handle star mouse leave to hide tooltip
  const handleStarLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  // Scale factor for constellation positioning
  const scaleFactor = Math.min(dimensions.width, dimensions.height) / 100;

  return (
    <div 
      ref={containerRef} 
      className={cn(
        "relative overflow-hidden rounded-full bg-night-deep border border-constellation/30",
        className
      )}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      style={{ cursor: interactive ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
    >
      {/* Background stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className={`star ${star.class} ${star.twinkle}`}
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            animationDelay: star.delay
          }}
        />
      ))}

      {/* SVG for constellations */}
      <svg 
        width="100%" 
        height="100%" 
        style={{ 
          transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
          transformOrigin: 'center',
          transition: isDragging ? 'none' : 'transform 0.1s ease-out'
        }}
      >
        {/* Draw constellation lines */}
        {majorConstellations.map((constellation) => (
          <g key={constellation.id}>
            {constellation.lines.map((line, index) => (
              <line
                key={`${constellation.id}-line-${index}`}
                x1={constellation.stars[line[0]].x * scaleFactor}
                y1={constellation.stars[line[0]].y * scaleFactor}
                x2={constellation.stars[line[1]].x * scaleFactor}
                y2={constellation.stars[line[1]].y * scaleFactor}
                className="constellation-line"
              />
            ))}
          </g>
        ))}

        {/* Draw constellation stars */}
        {majorConstellations.map((constellation) => (
          <g key={`${constellation.id}-stars`}>
            {constellation.stars.map((star, index) => (
              <circle
                key={`${constellation.id}-star-${index}`}
                cx={star.x * scaleFactor}
                cy={star.y * scaleFactor}
                r={(5 - star.magnitude) * 0.8}
                fill="white"
                className="cursor-pointer hover:fill-celestial-blue transition-colors duration-200"
                onMouseEnter={() => handleStarHover(star)}
                onMouseLeave={handleStarLeave}
              />
            ))}
          </g>
        ))}
      </svg>

      {/* Star name tooltip */}
      {tooltip.visible && (
        <div
          className="star-tooltip absolute z-10 pointer-events-none"
          style={{
            left: `${tooltip.x + 10}px`,
            top: `${tooltip.y + 10}px`
          }}
        >
          {tooltip.content}
        </div>
      )}

      {/* Constellation names (only show when not dragging) */}
      {!isDragging && majorConstellations.map((constellation) => {
        // Find center point of constellation
        const centerX = constellation.stars.reduce((sum, star) => sum + star.x, 0) / constellation.stars.length;
        const centerY = constellation.stars.reduce((sum, star) => sum + star.y, 0) / constellation.stars.length;
        
        return (
          <div
            key={`${constellation.id}-label`}
            className="absolute pointer-events-none text-constellation/80 text-sm font-serif italic"
            style={{
              left: `${centerX * scaleFactor * zoom + position.x}px`,
              top: `${centerY * scaleFactor * zoom + position.y + 15}px`,
              transform: 'translate(-50%, -50%)',
              textShadow: '0 0 4px rgba(0,0,0,0.8)'
            }}
          >
            {constellation.name}
          </div>
        );
      })}

      {/* Birth details overlay */}
      {birthDetails && (birthDetails.day || birthDetails.month || birthDetails.year) && (
        <div className="absolute top-4 left-4 bg-night-deep/80 backdrop-blur-sm rounded-lg p-3 border border-constellation/30">
          <div className="text-sm font-serif text-celestial-blue mb-2">Personal Sky Chart</div>
          <div className="text-xs text-constellation/80 space-y-1">
            {birthDetails.day && birthDetails.month && birthDetails.year && (
              <div>Birth: {birthDetails.day}/{birthDetails.month}/{birthDetails.year}</div>
            )}
            {birthDetails.hour && birthDetails.minute && (
              <div>Time: {birthDetails.hour}:{birthDetails.minute}</div>
            )}
            {birthDetails.city && (
              <div>Location: {birthDetails.city}</div>
            )}
          </div>
        </div>
      )}

      {/* Astrology options overlay */}
      {astrologyOptions && Object.values(astrologyOptions).some(option => option) && (
        <div className="absolute top-4 right-4 bg-night-deep/80 backdrop-blur-sm rounded-lg p-3 border border-constellation/30">
          <div className="text-sm font-serif text-celestial-purple mb-2">Active Readings</div>
          <div className="text-xs text-constellation/80 space-y-1">
            {astrologyOptions.displayAspects && <div>• Major Aspects</div>}
            {astrologyOptions.displayMinorAspects && <div>• Minor Aspects</div>}
            {astrologyOptions.displayLilithAspects && <div>• Lilith/North Node</div>}
            {astrologyOptions.displayAsteroidAspects && <div>• Asteroids</div>}
            {astrologyOptions.showSunSign && <div>• Sun Sign</div>}
            {astrologyOptions.showMoonSign && <div>• Moon Sign</div>}
            {astrologyOptions.showChineseZodiac && <div>• Chinese Zodiac</div>}
            {astrologyOptions.showNumerology && <div>• Numerology</div>}
          </div>
        </div>
      )}

      {/* Interactive controls help text */}
      {interactive && (
        <div className="absolute bottom-4 right-4 text-xs text-constellation/70 bg-night-deep/70 px-3 py-1 rounded-full backdrop-blur-sm">
          {isMobile ? "Pinch to zoom, drag to move" : "Scroll to zoom, drag to move"}
        </div>
      )}
    </div>
  );
};

export default StarChart;
