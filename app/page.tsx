import Loader from "@/components/Loader";
import CurtainReveal from "@/components/CurtainReveal";
import BackgroundEffects from "@/components/BackgroundEffects";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import MusicPlayer from "@/components/MusicPlayer";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import Timeline from "@/components/Timeline";
import Gallery from "@/components/Gallery";
import Letter from "@/components/Letter";
import EventInfo from "@/components/EventInfo";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Loader />
      <CurtainReveal />
      <BackgroundEffects />
      <ScrollProgress />
      <Navbar />
      <MusicPlayer />

      <main className="relative z-10">
        <Hero />
        <Countdown />
        <Timeline />
        <Gallery />
        <Letter />
        <EventInfo />
        <Footer />
      </main>
    </>
  );
}
