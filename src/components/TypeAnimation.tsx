import React, {
  useState,
  useEffect,
  forwardRef,
  type ElementType,
} from "react";

type SequenceItem = string | number;

const DefaultSpeed = 100;

interface TypeAnimationProps {
  sequence: SequenceItem[];
  repeat?: number;
  speed?: number;
  deletionSpeed?: number;
  wrapper?: ElementType;
  cursor?: boolean;
}

const TypeAnimation = forwardRef<HTMLElement, TypeAnimationProps>(
  (
    {
      sequence,
      repeat = Infinity,
      speed = DefaultSpeed,
      deletionSpeed = DefaultSpeed / 2,
      wrapper = "span",
      cursor = true,
    },
    ref
  ) => {
    const [step, setStep] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopCount, setLoopCount] = useState(0);

    useEffect(() => {
      if (step >= sequence.length) {
        if (repeat === Infinity || loopCount + 1 < repeat) {
          setStep(0);
          setLoopCount((c) => c + 1);
        }
        return;
      }

      const current = sequence[step];

      if (typeof current === "string") {
        if (!isDeleting) {
          if (charIndex <= current.length) {
            const timeout = setTimeout(() => {
              setText(current.slice(0, charIndex + 1));
              setCharIndex((prev) => prev + 1);
            }, speed);
            return () => clearTimeout(timeout);
          } else {
            // Done typing, wait before deleting
            const delay = setTimeout(() => {
              setIsDeleting(true);
              setCharIndex(current.length - 1);
            }, 1000); // pause before delete
            return () => clearTimeout(delay);
          }
        } else {
          if (charIndex >= 0) {
            const timeout = setTimeout(() => {
              setText(current.slice(0, charIndex));
              setCharIndex((prev) => prev - 1);
            }, deletionSpeed);
            return () => clearTimeout(timeout);
          } else {
            // Done deleting, go to next step
            setIsDeleting(false);
            setStep((prev) => prev + 1);
          }
        }
      } else if (typeof current === "number") {
        const timeout = setTimeout(() => {
          setStep((prev) => prev + 1);
        }, current);
        return () => clearTimeout(timeout);
      }
    }, [
      step,
      charIndex,
      isDeleting,
      sequence,
      speed,
      deletionSpeed,
      repeat,
      loopCount,
    ]);

    const Wrapper = wrapper;

    return (
      <Wrapper ref={ref}>
        {text}
        {cursor && <span className="animate-pulse">|</span>}
      </Wrapper>
    );
  }
);

export default TypeAnimation;
