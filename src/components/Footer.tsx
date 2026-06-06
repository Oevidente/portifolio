export function Footer() {
  return (
    <footer id="contato" className="w-full max-w-[1024px] mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center border-t border-white/5 gap-6 mt-12 mb-6">
      <div className="flex gap-6">
        <a href="#" className="text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">Behance</a>
        <a href="#" className="text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">Dribbble</a>
        <a href="mailto:andreluiz1902@gmail.com" className="text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">Instagram</a>
      </div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-white/20 text-center md:text-right">
        © {new Date().getFullYear()} André Luiz — Crafted with Purpose
      </div>
    </footer>
  );
}
