import { LazyMotion, domAnimation } from 'framer-motion'
import Hero from './components/Hero'
import Capabilities from './components/Capabilities'
import Approach from './components/Approach'
import Examples from './components/Examples'
import Contact from './components/Contact'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

// Parked, not deleted — re-add below to bring either back:
//   <Integrations />  "Works with what you use." (its logos now close Capabilities)
//   <Process />       "Three steps. No mystery." — also restore the nav link
export default function App() {
  return (
    /*
     * `m` components plus the DOM animation feature set, instead of the full
     * `motion` bundle. `strict` throws if a plain `motion.*` creeps back in,
     * which would silently pull the full bundle again.
     */
    <LazyMotion features={domAnimation} strict>
      <div className="font-inter">
        <main>
          <Hero />
          <Capabilities />
          <Examples />
          <Approach />
          <Contact />
          <FAQ />
        </main>
        <Footer />
      </div>
    </LazyMotion>
  )
}
