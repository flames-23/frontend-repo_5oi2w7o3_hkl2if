import { motion } from 'framer-motion';
import { Rocket, Users, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    icon: Users,
    title: 'Add people',
    desc: 'List everyone involved and what they paid or their weight.'
  },
  {
    icon: Rocket,
    title: 'Compute split',
    desc: 'We calculate fair balances instantly with a clear summary.'
  },
  {
    icon: CheckCircle2,
    title: 'Settle up',
    desc: 'Follow the suggested payments — you’re done in seconds.'
  }
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center text-3xl font-bold text-white"
      >
        How it works
      </motion.h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white backdrop-blur-sm"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-blue-500 text-white">
              <s.icon size={22} />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-white/70">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
