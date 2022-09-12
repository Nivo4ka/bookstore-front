import React, { useCallback, useEffect, useState, useRef } from 'react';
import { StyledSlider } from './MultiRangeSlider.styles';

interface IProps {
  onChange: (options: { min: number; max: number}) => void;
  min: number;
  max: number;
  values: { min: number; max: number};
}

const MultiRangeSlider: React.FC<IProps> = ({ min, max, onChange, values }) => {
  const [minVal, setMinVal] = useState(values.min);
  const [maxVal, setMaxVal] = useState(values.max);
  const minValRef = useRef(values.min);
  const maxValRef = useRef(values.max);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <StyledSlider>
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        step="0.1"
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        className="thumb thumb--left"
        style={{ zIndex: minVal > max - 100 ? '5' : undefined }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        step="0.1"
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className="thumb thumb--right"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <p className="slider__left-value">{`$ ${minVal}`}</p>
        <p className="slider__right-value">{`$ ${maxVal}`}</p>
      </div>
    </StyledSlider>
  );
};

export default MultiRangeSlider;
