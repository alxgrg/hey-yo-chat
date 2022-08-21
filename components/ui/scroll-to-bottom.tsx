import { useEffect, useRef } from 'react';

const ScrollToBottom = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = elementRef.current;
    node?.scrollIntoView({ behavior: 'smooth' });
  });
  return <div ref={elementRef} />;
};

export default ScrollToBottom;
