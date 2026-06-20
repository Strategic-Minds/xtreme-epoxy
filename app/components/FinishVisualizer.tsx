import { getActiveColorChartBoards } from "./color-chart-manifest";

export const chartBoards = getActiveColorChartBoards();

export function FinishVisualizer() {
  return (
    <section className="xps-flake-chart-section" id="color-chart" aria-label="Epoxy color charts">
      <div className="xps-custom-color-note">
        <strong>Don&apos;t see your color?</strong>
        <span>Contact us, we have many other custom colors perfect for you!</span>
      </div>
      <div className="xps-chart-board">
        <div className="xps-chart-board-grid">
          {chartBoards.map((board) => (
            <article className="xps-chart-frame" key={board.id}>
              <div className="xps-chart-copy">
                <h2>{board.title}</h2>
                <p>{board.subtitle}</p>
              </div>
              <div className="xps-chart-image-shell" data-chart={board.id}>
                <img src={board.image} alt={board.alt} />
              </div>
            </article>
          ))}
        </div>
        <p className="xps-chart-disclaimer">
          Due to computer screen differences, some colors may slightly differ in person, and especially when sealer is applied which may give it a &quot;wet look&quot; which enriches the color.
        </p>
      </div>
    </section>
  );
}
