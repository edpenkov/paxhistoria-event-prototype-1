import { useState } from 'react'
import './App.css'

const TONE_SUFFIXES = ['tone-a', 'tone-b', 'tone-c', 'tone-d']

/** Inclusive last event index (0-based). Seven events → indices 0–6. */
const LAST_EVENT_INDEX = 6

/** Placeholder body heights (px) per active event — only the inner stub uses these. */
const EXPANDED_STUB_MIN_HEIGHT_PX = [80, 140, 220, 110, 190, 150, 200]

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleNext = () => {
    setActiveIndex((i) => Math.min(i + 1, LAST_EVENT_INDEX))
  }

  const nextDisabled = activeIndex >= LAST_EVENT_INDEX

  return (
    <div className="prototype">
      <div className="map-layer" aria-hidden="true">
        <img className="map-layer__img" src="/map-background.png" alt="" decoding="async" />
      </div>

      <div className="reviewPanel">
        <header className="reviewPanel__header">
          <h1 className="reviewPanel__title">Review events</h1>
          <p className="reviewPanel__subtitle">Jan 1–8, 2016 • Round 3 → 4</p>
        </header>

        <div className="timelineArea">
          <div className="frameStack">
            {Array.from({ length: activeIndex }, (_, i) => (
              <div
                key={`event-${i}-collapsed`}
                className={`eventFrame eventFrame--collapsed eventFrame--${TONE_SUFFIXES[i % TONE_SUFFIXES.length]}`}
              >
                <div className="eventContent">Event {i + 1} (collapsed)</div>
              </div>
            ))}
            <div
              key={`event-${activeIndex}-expanded`}
              className={`eventFrame eventFrame--expanded eventFrame--${TONE_SUFFIXES[activeIndex % TONE_SUFFIXES.length]}`}
            >
              <div className="eventContent">
                <span className="eventContent__label">Event {activeIndex + 1} (full)</span>
                <div
                  className="eventContent__stub"
                  style={{
                    minHeight: EXPANDED_STUB_MIN_HEIGHT_PX[activeIndex],
                  }}
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </div>

        <footer className="reviewPanel__footer">
          <div className="reviewPanel__footerSlot reviewPanel__footerSlot--left">
            <span className="reviewPanel__footerIcon" aria-hidden />
            <span className="reviewPanel__footerLabel">Intervene</span>
          </div>
          <button
            type="button"
            className="reviewPanel__footerSlot reviewPanel__footerSlot--primary"
            onClick={handleNext}
            disabled={nextDisabled}
          >
            Next Event
            <span className="reviewPanel__footerChevron" aria-hidden>
              ›
            </span>
          </button>
        </footer>
      </div>
    </div>
  )
}
