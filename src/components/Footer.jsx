export default function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-6 py-12 text-white/70">
      <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm md:flex-row">
        <p>© {new Date().getFullYear()} SplitFlow. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  );
}
