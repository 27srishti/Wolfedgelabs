import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar";
import Hero from "./sections/Hero";
import Identity from "./sections/Identity";
import Systems from "./sections/Systems";
import Operations from "./sections/Operations";
import Cobalt from "./sections/Cobalt";
import Telemetry from "./sections/Telemetry";
import About from "./sections/About";
import Coda from "./sections/Coda";

function Home() {
  return (
    <>
      <Hero />
      <Identity />
      <Systems />
      <Operations />
      <Cobalt />
      <Telemetry />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Topbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Coda />
      </main>
    </Router>
  );
}
