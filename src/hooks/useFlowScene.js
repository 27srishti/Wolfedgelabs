import { useEffect, useRef } from "react";
import engine from "../flow/FlowEngine";

/**
 * Attach to a section. When the section crosses the middle band of the
 * viewport, the Flow eases toward that scene's parameters. This is what
 * keeps the whole page inside one evolving system: sections re-tune the
 * field, they never replace it.
 */
export default function useFlowScene(scene) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) engine.setScene(scene);
        });
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [scene]);

  return ref;
}
