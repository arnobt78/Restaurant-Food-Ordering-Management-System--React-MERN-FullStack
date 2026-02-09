import { useState, useRef, useEffect } from "react";

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="relative w-full">
      {isLoading && (
        <div
          className="absolute inset-0 w-full max-h-[600px] bg-muted animate-pulse rounded-none"
          aria-hidden="true"
        />
      )}
      <img
        ref={imgRef}
        src="/hero.png"
        alt="BigHungers hero banner"
        className={`w-full max-h-[600px] object-cover transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        loading="eager"
        fetchPriority="high"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

export default Hero;
