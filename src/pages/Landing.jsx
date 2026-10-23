import Header from '../features/landing/Header'
import Hero from '../features/landing/Hero'
import Competencies from '../features/landing/Competencies'
import Benefits from '../features/landing/Benefits'
import Pricing from '../features/pricing/Pricing'
import Roadmap from '../features/landing/Roadmap'
import Footer from '../features/landing/Footer'
import { useLandingMotion } from '../features/landing/useLandingMotion'

export default function Landing() {
  useLandingMotion()
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Competencies />
        <Roadmap />
        <Benefits />
        <Pricing />
      </main>
      <Footer />
    </>
  )
}
