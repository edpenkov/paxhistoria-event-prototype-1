import './App.css'

export default function App() {
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
            <div className="eventFrame eventFrame--collapsed eventFrame--tone-a">
              <div className="eventContent">Event 1 (collapsed)</div>
            </div>
            <div className="eventFrame eventFrame--collapsed eventFrame--tone-b">
              <div className="eventContent">Event 2 (collapsed)</div>
            </div>
            <div className="eventFrame eventFrame--collapsed eventFrame--tone-c">
              <div className="eventContent">Event 3 (collapsed)</div>
            </div>
            <div className="eventFrame eventFrame--expanded eventFrame--tone-d">
              <div className="eventContent">Event 3 (full)</div>
            </div>
          </div>
        </div>

        <footer className="reviewPanel__footer">
          <div className="reviewPanel__footerSlot reviewPanel__footerSlot--left">
            <span className="reviewPanel__footerIcon" aria-hidden />
            <span className="reviewPanel__footerLabel">Intervene</span>
          </div>
          <div className="reviewPanel__footerSlot reviewPanel__footerSlot--primary">
            Next Event
            <span className="reviewPanel__footerChevron" aria-hidden>
              ›
            </span>
          </div>
        </footer>
      </div>
    </div>
  )
}
