import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Certificates from "@/components/sections/Certificates";
import Contact from "@/components/sections/Contact";
import Container from "@/components/ui/Container";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="home" className="flex flex-col">
        <Hero />
        <Container as="section" id="skills" data-section>
          <Skills />
        </Container>
        <Container as="section" id="projects" data-section>
          <Projects />
        </Container>
        <Container as="section" id="experience" data-section>
          <Experience />
        </Container>
        <Container as="section" id="certificates" data-section>
          <Certificates />
        </Container>
        <Container as="section" id="contact" data-section>
          <Contact />
        </Container>
      </main>
      <Footer />
    </>
  );
}
