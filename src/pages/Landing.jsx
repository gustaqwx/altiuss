import Header from '../features/landing/Header'
import Hero from '../features/landing/Hero'
import BentoCompetencies from '../features/landing/BentoCompetencies'
import Benefits from '../features/landing/Benefits'
import Pricing from '../features/pricing/Pricing'
import Roadmap from '../features/landing/Roadmap'
import Footer from '../features/landing/Footer'
import CustomCursor from '../features/landing/CustomCursor'
import { useLandingMotion } from '../features/landing/useLandingMotion'

export default function Landing() {
  useLandingMotion()
  return (
    <>
      <CustomCursor />
      <Header />
      <main id="conteudo">
        <Hero />
        <BentoCompetencies />
        <Roadmap />
        <Benefits />
        <Pricing />
      </main>
      <Footer />
    </>
  )
}