export function Footer() {
  return (
    <footer id="contato" className="w-full max-w-[1024px] mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center border-t border-white/5 gap-6 mt-12 mb-6">
      <div className="flex gap-6">
        <a href="#" className="text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">Behance</a>
        <a href="#" className="text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">Dribbble</a>
        <a href="mailto:andreluiz1902@gmail.com" className="text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">Instagram</a>
      </div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-white/20 text-center md:text-right flex items-center justify-center md:justify-end gap-2">
        <span>© {new Date().getFullYear()} André Luiz — Crafted with Purpose</span>
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-white/30 border border-white/5 font-mono">v1.0.8-beta</span>
      </div>
    </footer>
  );
}
