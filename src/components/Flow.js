import { useEffect, useRef } from "react";
import engine from "../flow/FlowEngine";
import "./Flow.css";

/* The persistent field. Mounted once, lives behind everything. */
export default function Flow() {
  const ref = useRef(null);

  useEffect(() => {
    engine.init(ref.current);
    return () => engine.destroy();
  }, []);

  return (
    <div className="flow" aria-hidden="true">
      <canvas ref={ref} className="flow__canvas" />
      <div className="flow__vignette" />
    </div>
  );
}
