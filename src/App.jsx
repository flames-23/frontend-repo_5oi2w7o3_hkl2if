import { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import Hero from './components/Hero';
import SplitCalculator from './components/SplitCalculator';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="min-h-screen bg-neutral-950 selection:bg-white selection:text-neutral-900">
      <SplashScreen show={showSplash} onFinish={() => setShowSplash(false)} />

      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/30 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 text-white">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-orange-500 to-blue-500" />
            <span className="font-semibold">SplitFlow</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-white/80 md:flex">
            <a href="#split" className="hover:text-white">Split</a>
            <a href="#summary" className="hover:text-white">Summary</a>
            <a href="#" className="rounded-full bg-white px-3 py-1.5 font-medium text-neutral-900">Get started</a>
          </nav>
        </div>
      </header>

      <main>
        <Hero />
        <SplitCalculator />
        <HowItWorks />
      </main>

      <Footer />
    </div>
  );
}
