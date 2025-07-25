import React, { useState, forwardRef } from 'react';
import {
  CardContainer,
  CardInner,
  CardFace,
  CardBack,
  CardTitle,
  SubTitle,
  Description,
} from './styles';

const TarotCard = forwardRef(
  (
    { iconSrc, title, isSelected, zIndex, onClick, description, subtitle },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleInteraction = event => {
      if (event && typeof event.preventDefault === 'function') {
        event.preventDefault();
      }
      if (onClick) {
        onClick(event);
      }
    };

    const handleMouseEnter = () => {
      if (!isSelected && window.innerWidth > 768) {
        setIsHovered(true);
      }
    };

    const handleMouseLeave = () => {
      if (!isSelected && window.innerWidth > 768) {
        setIsHovered(false);
      }
    };

    return (
      <CardContainer
        ref={ref}
        style={{
          zIndex,
          touchAction: 'manipulation',
          userSelect: 'none',
        }}
        onClick={handleInteraction}
        onTouchStart={e => {
          handleInteraction(e);
        }}
        onTouchEnd={handleInteraction}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CardInner
          className="card-inner"
          style={{
            transform:
              isSelected || isHovered ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          <CardFace
            style={{
              backgroundImage: iconSrc ? `url(${iconSrc})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <CardBack />
        </CardInner>
      </CardContainer>
    );
  }
);

export default TarotCard;
