import Hero from './components/Hero'
import Capabilities from './components/Capabilities'
import Approach from './components/Approach'
import Examples from './components/Examples'
import Contact from './components/Contact'
import Footer from './components/Footer'

// Parked, not deleted — re-add below to bring either back:
//   <Integrations />  "Works with what you use." (its logos now close Capabilities)
//   <Process />       "Three steps. No mystery." — also restore the nav link
export default function App() {
  return (
    <div className="font-inter">
      <main>
        <Hero />
        <Capabilities />
        <Approach />
        <Examples />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
