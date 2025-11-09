import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/IKzHtP5ThSO83edK/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/70 pointer-events-none" />
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-start justify-end px-6 pb-14 text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold leading-tight sm:text-5xl"
        >
          Split expenses, settle instantly
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-3 max-w-xl text-base text-white/85 sm:text-lg"
        >
          Track shared transactions with friends, roommates, or teams — clear balances with a tap.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 flex gap-3"
        >
          <a href="#split" className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 shadow-lg transition hover:shadow-xl">
            Start a split
          </a>
          <a href="#summary" className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white/90 backdrop-blur-sm">
            View summary
          </a>
        </motion.div>
      </div>
    </section>
  );
}
