import Topbar from "./components/Topbar";
import Hero from "./sections/Hero";
import Manifesto from "./sections/Manifesto";
import Vault from "./sections/Vault";
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
        <Vault />
        <SpecSheet />
        <Cobalt />
        <Canton />
        <Proof />
        <Coda />
      </main>
    </>
  );
}
