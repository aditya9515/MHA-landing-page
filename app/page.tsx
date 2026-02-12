import Hero from "@/components/Hero"
import Security from "@/components/Security"
import ChatPreview from "@/components/ChatPreview"
import Signup from "@/components/Signup"
import Reviews from "@/components/Reviews"
import { Header } from "@/components/header-2"
import { FeatureDemo } from "@/components/new_features"
import KnowMoreAboutMe from "@/components/knowmore"
import AnimatedNumberCountDownDemo from "@/components/countdown"




export default function Home() { 
  return ( 
  <>
  <Header />
  {/* <Navbar />  */}
  {/* <BackgroundPaths /> */}
  <section id="hero">
    <Hero />
  </section>

  <section id="security">
    <Security />
  </section>

  <section id="chat-preview">
    <ChatPreview />
  </section>

  <section id="new features">
    <FeatureDemo />
  </section>

  <section id="new features">
    <AnimatedNumberCountDownDemo />
  </section>

  <section id="signup">
    <Signup />
  </section>
  <section id="KnowMoreAboutMe">
    <KnowMoreAboutMe />
  </section>

  <section id="reviews">
    <Reviews />
  </section>
  </> 
  ) 
}
