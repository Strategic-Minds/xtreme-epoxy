"use client";

import { useMemo, useState } from "react";
import { chartBoards } from "./FinishVisualizer";

export function XpsVisualizerPreview() {
  const [boardId, setBoardId] = useState(chartBoards[0].id);
  const board = useMemo(() => chartBoards.find((item) => item.id === boardId) || chartBoards[0], [boardId]);

  return (
    <section className="xps-visualizer-preview" aria-label="Floor visualizer preview">
      <div className="xps-visualizer-head">
        <span className="section-kicker">Visualizer</span>
        <h2>Use the same color charts as the homepage.</h2>
        <p>
          The visualizer now uses the exact chart set from the XPS homepage so the customer sees one matching finish system
          from start to finish.
        </p>
      </div>

      <div className="xps-visualizer-shell">
        <aside className="xps-visualizer-panel">
          {chartBoards.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`xps-visualizer-tab ${boardId === item.id ? "active" : ""}`}
              onClick={() => setBoardId(item.id)}
            >
              <strong>{item.title}</strong>
              <span>{item.subtitle}</span>
            </button>
          ))}
        </aside>

        <div className="xps-visualizer-stage">
          <div className="xps-visualizer-room">
            <img className="xps-visualizer-chart" src={board.image} alt={board.alt} />
            <div className="xps-visualizer-popup">
              <span>{board.title}</span>
            </div>
          </div>
          <div className="xps-visualizer-swatch-row">
            {chartBoards.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`xps-visualizer-swatch ${boardId === item.id ? "active" : ""}`}
                onClick={() => setBoardId(item.id)}
              >
                <span style={{ backgroundImage: `url(${item.image})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
