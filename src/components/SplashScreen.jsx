import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen({ show, onFinish }) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => onFinish?.(), 1800);
    return () => clearTimeout(t);
  }, [show, onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950"
        >
          <motion.div
            initial={{ scale: 0.8, rotate: -6, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            className="relative"
          >
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-blue-500 shadow-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-12 w-12 text-white"
              >
                <path d="M2 7.25A3.25 3.25 0 0 1 5.25 4h13.5A3.25 3.25 0 0 1 22 7.25v9.5A3.25 3.25 0 0 1 18.75 20H5.25A3.25 3.25 0 0 1 2 16.75v-9.5Zm3.25-1.75A1.75 1.75 0 0 0 3.5 7.25V9h17V7.25A1.75 1.75 0 0 0 18.75 5.5H5.25ZM20.5 10.5h-17v6.25c0 .966.784 1.75 1.75 1.75h13.5c.966 0 1.75-.784 1.75-1.75V10.5Z" />
              </svg>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-5 text-center text-xl font-semibold tracking-tight text-white"
            >
              SplitFlow
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
