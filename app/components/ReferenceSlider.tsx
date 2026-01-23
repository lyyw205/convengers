"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import baseStyles from "./reference-slider.module.css";

type ReferenceItem = {
  slug: string;
  title: string;
  category: string;
  image?: string;
};

type ReferenceSliderProps = {
  items: ReferenceItem[];
  hrefPrefix?: string;
  classNames?: typeof baseStyles;
};

export default function ReferenceSlider({
  items,
  hrefPrefix = "/portfolio",
  classNames,
}: ReferenceSliderProps) {
  const styles = classNames ?? baseStyles;
  const trackRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);
  const offsetRef = useRef(0);
  const halfWidthRef = useRef(0);
  const speedRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const draggedRef = useRef(false);

  const duplicated = useMemo(() => {
    if (items.length === 0) {
      return [];
    }
    return [...items, ...items, ...items, ...items];
  }, [items]);

  useEffect(() => {
    if (!trackRef.current) {
      return;
    }

    const updateWidth = () => {
      if (!trackRef.current) {
        return;
      }
      const totalWidth = trackRef.current.scrollWidth;
      halfWidthRef.current = totalWidth / 2;
      speedRef.current = halfWidthRef.current / 160;
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(trackRef.current);

    return () => {
      observer.disconnect();
    };
  }, [duplicated.length]);

  useEffect(() => {
    const step = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (!draggingRef.current) {
        offsetRef.current -= speedRef.current * delta;
        if (offsetRef.current <= -halfWidthRef.current) {
          offsetRef.current += halfWidthRef.current;
        }
      }

      setOffset(offsetRef.current);
      requestAnimationFrame(step);
    };

    const frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);

  const normalizeOffset = () => {
    if (offsetRef.current <= -halfWidthRef.current) {
      offsetRef.current += halfWidthRef.current;
    }
    if (offsetRef.current > 0) {
      offsetRef.current -= halfWidthRef.current;
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }
    draggingRef.current = true;
    draggedRef.current = false;
    lastXRef.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) {
      return;
    }
    const deltaX = event.clientX - lastXRef.current;
    if (Math.abs(deltaX) > 3) {
      draggedRef.current = true;
    }
    offsetRef.current += deltaX;
    normalizeOffset();
    lastXRef.current = event.clientX;
    setOffset(offsetRef.current);
    event.preventDefault();
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
    window.setTimeout(() => {
      draggedRef.current = false;
    }, 0);
  };

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (draggingRef.current || draggedRef.current) {
      event.preventDefault();
    }
  };

  return (
    <div
      className={styles.slider}
      ref={sliderRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div
        className={`${styles.sliderTrack} ${styles.sliderTrackManual}`}
        ref={trackRef}
        style={{ transform: `translateX(${offset}px)` }}
      >
        {duplicated.map((item, index) => (
          <Link
            key={`${item.slug}-${index}`}
            href={`${hrefPrefix}/${item.slug}`}
            className={styles.cardGroup}
            onClick={handleLinkClick}
            scroll={false}
          >
            <article className={`${styles.card} ${styles.cardMedia}`}>
              <div
                className={styles.thumb}
                style={item.image ? { backgroundImage: `url(${item.image})` } : undefined}
              />
            </article>
            <div className={styles.cardFooter}>
              <div className={styles.cardLabel}>{item.category}</div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
