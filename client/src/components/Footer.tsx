export default function Footer() {
  return (
    <footer className="bg-card border-t border-slate-700 py-6 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0">
            <span className="text-slate-400 text-sm">© {new Date().getFullYear()} SecureVault. All operations performed locally.</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-slate-400 hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition">
              Terms of Use
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition">
              About
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
