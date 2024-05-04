import React, { useEffect, useState } from "react";

interface TextAnimationProps {
  texts: string[];
  onFinishAnimation: () => void;
}

const TextAnimation: React.FC<TextAnimationProps> = ({
  texts,
  onFinishAnimation,
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (texts[currentTextIndex]) {
      const timer = setInterval(() => {
        if (currentLetterIndex < texts[currentTextIndex].length) {
          setDisplayText(
            (prevText) => prevText + texts[currentTextIndex][currentLetterIndex]
          );
          setCurrentLetterIndex((prevIndex) => prevIndex + 1);
        } else {
          clearInterval(timer);
          setDisplayText((prevText) => prevText + "\n");
          setCurrentTextIndex((prevIndex) => prevIndex + 1);
          setCurrentLetterIndex(0);
        }
      }, 10);

      return () => clearInterval(timer);
    }
  }, [currentTextIndex, currentLetterIndex, texts]);

  useEffect(() => {
    if (currentTextIndex === texts.length) {
      onFinishAnimation();
    }
  }, [currentTextIndex, texts, onFinishAnimation]);

  return <div className="terminal__line__animation">{displayText}</div>;
};

export default TextAnimation;
