import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelectedOffer } from '../lib/selectedOffer';

export default function StickyCTA() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedOffer = useSelectedOffer();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const logoRef = useRef<HTMLSpanElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number | null>(null);
  const angleRef = useRef(0);
  const velocityRef = useRef(0);
  const phaseRef = useRef<'idle' | 'spinning' | 'settling'>('idle');
  const settleStartRef = useRef(0);
  const settleFromRef = useRef(0);
  const settleToRef = useRef(0);
  const settleDurationRef = useRef(900);
  const prefersReducedMotionRef = useRef(false);
  const [motionState, setMotionState] = useState<'idle' | 'active' | 'settling'>('idle');
  const logoClassName = [
    'sticky-cta__logo-image',
    selectedOffer ? `sticky-cta__logo-image--${selectedOffer}` : '',
  ]
    .filter(Boolean)
    .join(' ');

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => {
      prefersReducedMotionRef.current = mediaQuery.matches;
    };

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);

    return () => {
      mediaQuery.removeEventListener('change', updatePreference);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const applyTransform = (scale: number, angle: number) => {
    if (!logoRef.current) {
      return;
    }

    logoRef.current.style.transform = `scale(${scale}) rotateY(${angle}deg)`;
  };

  const stopAnimationLoop = () => {
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    lastFrameTimeRef.current = null;
  };

  const animate = (time: number) => {
    const previousTime = lastFrameTimeRef.current ?? time;
    const deltaTime = Math.min((time - previousTime) / 1000, 0.04);
    lastFrameTimeRef.current = time;

    if (prefersReducedMotionRef.current) {
      if (phaseRef.current === 'spinning') {
        applyTransform(1.08, 0);
        animationFrameRef.current = window.requestAnimationFrame(animate);
        return;
      }

      applyTransform(1, 0);
      phaseRef.current = 'idle';
      setMotionState('idle');
      stopAnimationLoop();
      return;
    }

    if (phaseRef.current === 'spinning') {
      const targetVelocity = 860;
      velocityRef.current += (targetVelocity - velocityRef.current) * Math.min(1, deltaTime * 5);
      angleRef.current += velocityRef.current * deltaTime;
      applyTransform(1.12, angleRef.current);
      animationFrameRef.current = window.requestAnimationFrame(animate);
      return;
    }

    if (phaseRef.current === 'settling') {
      const progress = Math.min(
        (time - settleStartRef.current) / settleDurationRef.current,
        1,
      );
      const easedProgress = 1 - (1 - progress) ** 3;
      angleRef.current =
        settleFromRef.current +
        (settleToRef.current - settleFromRef.current) * easedProgress;
      const scale = 1.12 - 0.12 * easedProgress;

      applyTransform(scale, angleRef.current);

      if (progress >= 1) {
        angleRef.current = 0;
        velocityRef.current = 0;
        phaseRef.current = 'idle';
        setMotionState('idle');
        applyTransform(1, 0);
        stopAnimationLoop();
        return;
      }

      animationFrameRef.current = window.requestAnimationFrame(animate);
      return;
    }

    applyTransform(1, 0);
    stopAnimationLoop();
  };

  const ensureAnimationLoop = () => {
    if (animationFrameRef.current !== null) {
      return;
    }

    animationFrameRef.current = window.requestAnimationFrame(animate);
  };

  const startSpin = () => {
    if (prefersReducedMotionRef.current) {
      setMotionState('active');
      applyTransform(1.06, 0);
      return;
    }

    phaseRef.current = 'spinning';
    setMotionState('active');
    ensureAnimationLoop();
  };

  const stopSpin = () => {
    if (prefersReducedMotionRef.current) {
      setMotionState('idle');
      applyTransform(1, 0);
      return;
    }

    if (phaseRef.current === 'idle') {
      return;
    }

    const normalizedAngle = ((angleRef.current % 360) + 360) % 360;
    const remainingAngle = (360 - normalizedAngle) % 360;
    const extraTurns =
      velocityRef.current > 680 ? 720 : velocityRef.current > 320 ? 360 : 0;

    phaseRef.current = 'settling';
    settleStartRef.current = performance.now();
    settleFromRef.current = angleRef.current;
    settleToRef.current = angleRef.current + remainingAngle + extraTurns;
    settleDurationRef.current =
      velocityRef.current > 680 ? 1900 : velocityRef.current > 320 ? 1450 : 1100;
    setMotionState('settling');
    ensureAnimationLoop();
  };

  const scrollToForm = () => {
    const contactForm = document.getElementById('devis-cyber');

    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (location.pathname === '/' && location.hash === '#devis-cyber') {
      return;
    }

    navigate('/#devis-cyber');
  };

  return (
    <div className="sticky-cta animate-slide-up">
      <button
        ref={buttonRef}
        type="button"
        onClick={scrollToForm}
        onMouseEnter={startSpin}
        onMouseLeave={stopSpin}
        onFocus={startSpin}
        onBlur={stopSpin}
        className={[
          'sticky-cta__button',
          motionState === 'active' ? 'sticky-cta__button--active' : '',
          motionState === 'settling' ? 'sticky-cta__button--settling' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-label="Acceder au formulaire de devis cyber"
      >
        <span
          ref={logoRef}
          className="sticky-cta__logo-scene"
          aria-hidden="true"
        >
          <span className="sticky-cta__logo-face sticky-cta__logo-face--front">
            <img
              src="/brand-assets/logo-cropped-384.png"
              alt=""
              aria-hidden="true"
              className={logoClassName}
            />
          </span>
          <span className="sticky-cta__logo-face sticky-cta__logo-face--back">
            <img
              src="/brand-assets/logo-cropped-384.png"
              alt=""
              aria-hidden="true"
              className={logoClassName}
            />
          </span>
        </span>
      </button>
    </div>
  );
}
