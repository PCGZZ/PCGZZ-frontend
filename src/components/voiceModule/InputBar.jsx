import React from 'react';
import styles from './InputBar.css';

function WaveBar({ height }) {
  return <div className={styles.waveBar} style={{ height: `${height}px` }} />;
}

function InputBar() {
  const waveformData = [8, 14, 16, 14, 10, 10, 10, 14, 10, 16, 10];

  return (
    <section className={styles.audioInputFrame}>
      <div className={styles.audioControlsWrapper}>
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_569_2367)">
            <circle cx="15" cy="15" r="15" fill="#89DFDF" fillOpacity="0.46" />
            <path
              d="M19.9999 19.9999L15 15M15 15L10 10M15 15L20 10M15 15L10 20"
              stroke="#339CAB"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_569_2367">
              <rect width="30" height="30" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <div className={styles.waveform}>
          {waveformData.map((height, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <WaveBar key={`id_wave_${index}`} height={height} />
          ))}
        </div>
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_569_2371)">
            <circle cx="15" cy="15" r="15" fill="#339CAB" />
            <path
              d="M9 15L13.2426 19.2426L21.727 10.7573"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_569_2371">
              <rect width="30" height="30" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </section>
  );
}

export default InputBar;
