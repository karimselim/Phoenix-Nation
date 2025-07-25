import React, { useRef, useEffect, useState } from 'react';
import { Container, CardsStack, SkillsTitle } from './styles';
import TarotCard from './TarotCard';
import { skillCards, categoryNames } from './SkillCards';
import {
  animateDesktop,
  animateMobile,
  animateCardFlip,
  animateShowTitle,
} from './animations';
import gsap from 'gsap';

const SkillsShowcase = ({ cardRefsRef, stackRefRef }) => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const titleRef = useRef(null);
  const containerRef = useRef(null);

  const addCardRef = (el, i) => {
    cardRefsRef.current[i] = el;
  };

  const handleCardClick = (index, stackOrder, event) => {
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    } else {
    }
    setSelectedCards(prev => {
      const alreadySelected = prev.includes(index);
      const newList = alreadySelected
        ? [...prev.filter(i => i !== index), index]
        : [...prev, index];
      if (!alreadySelected) {
        const card = cardRefsRef.current[index];
        if (card) {
          const cardInner = card.querySelector('.card-inner');
          if (cardInner) {
            animateCardFlip(card, cardInner, index, stackOrder, titleRef);
          } else {
          }
        } else {
        }
      }
      return newList;
    });
  };

  useEffect(() => {
    setIsClient(true);
    setIsDesktop(window.innerWidth > 768);

    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isClient && containerRef.current) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              if (isDesktop) {
                animateDesktop(
                  cardRefsRef,
                  stackRefRef,
                  skillCards,
                  categoryNames,
                  isClient,
                  () => {
                    setIsAnimationComplete(true);
                  }
                );
              } else {
                animateMobile(cardRefsRef, () => {
                  setIsAnimationComplete(true);
                });
              }
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [isClient, isDesktop, cardRefsRef, stackRefRef]);

  useEffect(() => {
    if (isAnimationComplete && titleRef.current) {
      animateShowTitle(titleRef);
    }
  }, [isAnimationComplete]);

  return (
    <Container ref={containerRef}>
      <CardsStack ref={stackRefRef}>
        {skillCards.map((skill, i) => (
          <TarotCard
            key={skill.title}
            iconSrc={skill.iconSrc}
            title={skill.title}
            isSelected={selectedCards.includes(i)}
            zIndex={
              selectedCards.includes(i) ? 1000 + selectedCards.indexOf(i) : i
            }
            onClick={event => handleCardClick(i, selectedCards.length, event)}
            onTouchEnd={event =>
              handleCardClick(i, selectedCards.length, event)
            }
            ref={el => addCardRef(el, i)}
          />
        ))}
      </CardsStack>
      <SkillsTitle ref={titleRef}>Skills</SkillsTitle>
    </Container>
  );
};

export default SkillsShowcase;
