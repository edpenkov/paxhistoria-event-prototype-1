import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

const TONE_SUFFIXES = ['tone-a', 'tone-b', 'tone-c', 'tone-d']

/** Inclusive last event index (0-based). Seven events → indices 0–6. */
const LAST_EVENT_INDEX = 6

/** Placeholder body heights (px) per active event — only the inner stub uses these. */
const EXPANDED_STUB_MIN_HEIGHT_PX = [80, 140, 220, 110, 190, 150, 200]

/** Label + gaps above stub; aligns activeViewport with ExpandedEventBody layout. */
const EXPANDED_LAYER_EXTRA_MIN_PX = 48

function toneClassForIndex(index) {
  return TONE_SUFFIXES[index % TONE_SUFFIXES.length]
}

/** Collapsed row: fixed 74px height via CSS; one DOM node per prior event index. */
function CollapsedEventRow({ eventIndex, isEntering, onEnteringAnimationEnd }) {
  return (
    <div
      className={`eventFrame eventFrame--collapsed${isEntering ? ' eventFrame--collapsed-entering' : ''} eventFrame--${toneClassForIndex(eventIndex)}`}
      onAnimationEnd={isEntering ? onEnteringAnimationEnd : undefined}
    >
      <div className="eventContent">Event {eventIndex + 1} (collapsed)</div>
    </div>
  )
}

/** Label + stub for one expanded event index (shared by static view and transition layers). */
function ExpandedEventBody({ eventIndex }) {
  return (
    <>
      <span className="eventContent__label">Event {eventIndex + 1} (full)</span>
      <div
        className="eventContent__stub"
        style={{ minHeight: EXPANDED_STUB_MIN_HEIGHT_PX[eventIndex] }}
        aria-hidden
      />
    </>
  )
}

/** Expanded card for the active index; animates content inside activeViewport only. */
function ExpandedActiveEvent({ eventIndex }) {
  const [currentIndex, setCurrentIndex] = useState(eventIndex)
  const [prevIndex, setPrevIndex] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const lastCommittedIndexRef = useRef(eventIndex)

  useEffect(() => {
    if (eventIndex === lastCommittedIndexRef.current) return
    const previous = lastCommittedIndexRef.current
    lastCommittedIndexRef.current = eventIndex
    setPrevIndex(previous)
    setCurrentIndex(eventIndex)
    setIsAnimating(true)
  }, [eventIndex])

  const handleIncomingAnimationEnd = useCallback((e) => {
    if (e.target !== e.currentTarget) return
    if (e.animationName !== 'expanded-active-in') return
    setPrevIndex(null)
    setIsAnimating(false)
  }, [])

  const showTransitionLayers = isAnimating && prevIndex !== null

  return (
    <div className={`eventFrame eventFrame--expanded eventFrame--${toneClassForIndex(currentIndex)}`}>
      <div className="expandedActiveEvent">
        {showTransitionLayers ? (
          <>
            <div
              className={`expandedActiveEvent__layer expandedActiveEvent__layer--outgoing eventFrame eventFrame--expanded eventFrame--${toneClassForIndex(prevIndex)}`}
            >
              <div className="eventContent">
                <ExpandedEventBody eventIndex={prevIndex} />
              </div>
            </div>
            <div
              className={`expandedActiveEvent__layer expandedActiveEvent__layer--incoming eventFrame eventFrame--expanded eventFrame--${toneClassForIndex(currentIndex)}`}
              onAnimationEnd={handleIncomingAnimationEnd}
            >
              <div className="eventContent">
                <ExpandedEventBody eventIndex={currentIndex} />
              </div>
            </div>
          </>
        ) : (
          <div className="expandedActiveEvent__single">
            <div className="eventContent">
              <ExpandedEventBody eventIndex={currentIndex} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [enteringCollapsedIndex, setEnteringCollapsedIndex] = useState(null)

  const handleCollapsedEnterAnimationEnd = useCallback((e) => {
    if (e.target !== e.currentTarget) return
    if (e.animationName !== 'collapsed-row-enter-opacity') return
    setEnteringCollapsedIndex(null)
  }, [])

  const handleNext = () => {
    setActiveIndex((prev) => {
      const next = Math.min(prev + 1, LAST_EVENT_INDEX)
      if (next > prev) {
        setEnteringCollapsedIndex(prev)
      }
      return next
    })
  }

  const nextDisabled = activeIndex >= LAST_EVENT_INDEX

  const activeViewportHeightPx =
    EXPANDED_STUB_MIN_HEIGHT_PX[activeIndex] + EXPANDED_LAYER_EXTRA_MIN_PX

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
            <div className="historyStack">
              {Array.from({ length: activeIndex }, (_, i) => (
                <CollapsedEventRow
                  key={`collapsed-${i}`}
                  eventIndex={i}
                  isEntering={enteringCollapsedIndex === i}
                  onEnteringAnimationEnd={handleCollapsedEnterAnimationEnd}
                />
              ))}
            </div>
            <div
              className="activeViewport"
              style={{ '--active-viewport-height': `${activeViewportHeightPx}px` }}
            >
              <ExpandedActiveEvent eventIndex={activeIndex} />
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
