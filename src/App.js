import Topbar from "./components/Topbar";
import Hero from "./sections/Hero";
import Manifesto from "./sections/Manifesto";
import Systems from "./sections/Systems";
import SpecSheet from "./sections/SpecSheet";
import Cobalt from "./sections/Cobalt";
import Canton from "./sections/Canton";
import Proof from "./sections/Proof";
import Coda from "./sections/Coda";

export default function App() {
  return (
    <>
      <Topbar />
      <main>
        <Hero />
        <Manifesto />
        <Systems />
        <SpecSheet />
        <Cobalt />
        <Canton />
        <Proof />
        <Coda />
      </main>
    </>
  );
}
