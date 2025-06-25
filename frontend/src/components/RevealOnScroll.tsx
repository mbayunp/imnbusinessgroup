import React, { useRef, useEffect, useState } from 'react';

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  threshold?: number;
  animationType?: 'slide-up' | 'fade-in';
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ 
  children, 
  delay = 0, 
  threshold = 0.1,
  animationType = 'slide-up'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(domRef.current as Element);
        }
      },
      {
        threshold,
      }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  const animationClasses = {
    'slide-up': `transform transition-all duration-700 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
    }`,
    'fade-in': `transition-all duration-700 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`,
  };

  return (
    <div
      ref={domRef}
      className={`${animationClasses[animationType]}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default RevealOnScroll;
