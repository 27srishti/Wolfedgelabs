import Topbar from "./components/Topbar";
import Hero from "./sections/Hero";
import Identity from "./sections/Identity";
import Systems from "./sections/Systems";
import Operations from "./sections/Operations";
import Cobalt from "./sections/Cobalt";
import Canton from "./sections/Canton";
import Orbit from "./sections/Orbit";
import Audiences from "./sections/Audiences";
import Telemetry from "./sections/Telemetry";
import Journey from "./sections/Journey";
import Founder from "./sections/Founder";
import Coda from "./sections/Coda";

export default function App() {
  return (
    <>
      <Topbar />
      <main>
        <Hero />
        <Identity />
        <Systems />
        <Operations />
        <Cobalt />
        <Canton />
        <Orbit />
        <Audiences />
        <Telemetry />
        <Journey />
        <Founder />
        <Coda />
      </main>
    </>
  );
}
