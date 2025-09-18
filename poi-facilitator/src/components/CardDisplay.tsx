import React, { useState } from 'react';
import type { Card } from '../data/cards';
import { useTranslation } from '../hooks/useTranslation';

interface CardDisplayProps {
  card: Card;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'compact' | 'detailed' | 'stack';
  showTitle?: boolean;
  showDescription?: boolean;
  showThemes?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  isSelected?: boolean;
  isExpanded?: boolean;
  loading?: boolean;
}

export function CardDisplay({
  card,
  size = 'md',
  variant = 'default',
  showTitle = true,
  showDescription = true,
  showThemes = false,
  onClick,
  className = '',
  style,
  isSelected = false,
  isExpanded = false,
  loading = false
}: CardDisplayProps) {
  const { getDirectionClasses } = useTranslation();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-20 h-28',
    md: 'w-32 h-44',
    lg: 'w-40 h-56',
    xl: 'w-48 h-64'
  };

  const baseClasses = `
    relative rounded-lg overflow-hidden shadow-md transition-all duration-300 cursor-pointer
    ${sizeClasses[size]}
    ${isSelected ? 'ring-4 ring-primary-500 ring-opacity-75 scale-105' : ''}
    ${isExpanded ? 'z-20 scale-110 shadow-xl' : 'hover:scale-105 hover:shadow-lg'}
    ${onClick ? 'cursor-pointer' : 'cursor-default'}
    ${className}
  `;

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const renderCardContent = () => {
    if (variant === 'compact') {
      return (
        <div className={baseClasses} onClick={onClick} style={style}>
          {/* Image */}
          <div className="relative w-full h-full">
            {!imageLoaded && (
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} animate-pulse`} />
            )}
            
            {!imageError ? (
              <img
                src={card.image}
                alt={card.title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={handleImageLoad}
                onError={handleImageError}
                loading="lazy"
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${card.gradient} flex items-center justify-center`}>
                <div className="text-white text-center p-2">
                  <div className="text-lg font-bold mb-1">{card.title}</div>
                  {size !== 'sm' && (
                    <div className="text-xs opacity-90">{card.category}</div>
                  )}
                </div>
              </div>
            )}

            {/* Overlay for title (only if image loaded and not error) */}
            {imageLoaded && !imageError && showTitle && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                <div className="text-white text-xs font-medium text-center">
                  {card.title}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (variant === 'detailed') {
      return (
        <div className={`${baseClasses} flex flex-col`} onClick={onClick} style={style}>
          {/* Image Section */}
          <div className="relative flex-1">
            {!imageLoaded && (
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} animate-pulse`} />
            )}
            
            {!imageError ? (
              <img
                src={card.image}
                alt={card.title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={handleImageLoad}
                onError={handleImageError}
                loading="lazy"
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${card.gradient} flex items-center justify-center`}>
                <div className="text-white text-center p-4">
                  <div className="text-xl font-bold mb-2">{card.title}</div>
                  <div className="text-sm opacity-90">{card.category}</div>
                </div>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="bg-white p-3 space-y-2">
            {showTitle && (
              <h3 className="font-semibold text-sm text-neutral-900 line-clamp-1">
                {card.title}
              </h3>
            )}
            
            {showDescription && (
              <p className="text-xs text-neutral-600 line-clamp-2">
                {card.description}
              </p>
            )}

            {showThemes && card.themes.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {card.themes.slice(0, 3).map((theme, index) => (
                  <span
                    key={index}
                    className="px-1.5 py-0.5 bg-primary-100 text-primary-700 text-xs rounded"
                  >
                    {theme}
                  </span>
                ))}
                {card.themes.length > 3 && (
                  <span className="text-xs text-neutral-500">+{card.themes.length - 3}</span>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    // Default variant
    return (
      <div className={baseClasses} onClick={onClick} style={style}>
        <div className="relative w-full h-full">
          {!imageLoaded && (
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} animate-pulse`} />
          )}
          
          {!imageError ? (
            <img
              src={card.image}
              alt={card.title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${card.gradient} flex items-center justify-center`}>
              <div className="text-white text-center p-4">
                <div className="text-lg font-bold mb-1">{card.title}</div>
                <div className="text-sm opacity-90">{card.category}</div>
              </div>
            </div>
          )}

          {/* Title overlay */}
          {imageLoaded && !imageError && showTitle && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <div className="text-white">
                <div className="font-semibold text-sm mb-1">{card.title}</div>
                {showDescription && size !== 'sm' && (
                  <div className="text-xs opacity-90 line-clamp-2">{card.description}</div>
                )}
              </div>
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>
    );
  };

  return renderCardContent();
}

// Card Back Component for when cards are face down
export function CardBack({ 
  size = 'md', 
  className = '', 
  onClick,
  style 
}: { 
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}) {
  const sizeClasses = {
    sm: 'w-20 h-28',
    md: 'w-32 h-44', 
    lg: 'w-40 h-56',
    xl: 'w-48 h-64'
  };

  return (
    <div 
      className={`
        relative rounded-lg overflow-hidden shadow-md transition-all duration-300
        ${sizeClasses[size]}
        ${onClick ? 'cursor-pointer hover:scale-105 hover:shadow-lg' : ''}
        ${className}
      `}
      onClick={onClick}
      style={style}
    >
      <img
        src="/cards/back.png"
        alt="Card back"
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
}

// Card Stack Component for displaying multiple cards
export function CardStack({
  cards,
  maxVisible = 5,
  size = 'md',
  onClick,
  className = ''
}: {
  cards: Card[];
  maxVisible?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: (card: Card, index: number) => void;
  className?: string;
}) {
  const visibleCards = cards.slice(0, maxVisible);
  
  return (
    <div className={`relative ${className}`}>
      {visibleCards.map((card, index) => (
        <div
          key={card.id}
          className="absolute"
          style={{
            left: `${index * 8}px`,
            top: `${index * 4}px`,
            transform: `rotate(${index * 2}deg)`,
            zIndex: maxVisible - index
          }}
        >
          <CardDisplay
            card={card}
            size={size}
            variant="compact"
            onClick={() => onClick?.(card, index)}
          />
        </div>
      ))}
      
      {cards.length > maxVisible && (
        <div 
          className="absolute text-xs text-neutral-600 font-medium"
          style={{
            left: `${maxVisible * 8 + 20}px`,
            top: `${maxVisible * 4 + 10}px`
          }}
        >
          +{cards.length - maxVisible} more
        </div>
      )}
    </div>
  );
}
