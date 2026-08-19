import { Helmet } from "react-helmet-async";
import { Preloader } from "@/components/layout/Preloader";
import { Nav } from "@/components/layout/Nav";
import { SectionRail } from "@/components/layout/SectionRail";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Works } from "@/components/sections/Works";
import { Process } from "@/components/sections/Process";
import { Craft } from "@/components/sections/Craft";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Aachal Rannaware — Interior Designer</title>
        <meta
          name="description"
          content="Aachal Rannaware is an interior designer in Maharashtra, India, specializing in residential space planning, material selection, and 3D visualization — from AutoCAD draft to photoreal render."
        />
      </Helmet>

      <Preloader />
      <Nav />
      <SectionRail />

      <main id="main-content">
        <Hero />
        <Manifesto />
        <Works />
        <Process />
        <Craft />
        <About />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
