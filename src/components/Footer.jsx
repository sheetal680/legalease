export default function Footer() {
  return (
    <footer className="w-full bg-[#1e3a5f] px-4 py-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-blue-200">
        <span>© {new Date().getFullYear()} LegalEase. Built for Indian legal professionals.</span>
        <span>
          Made with ♥ by{' '}
          <a
            href="https://www.filesure.in/company/arshit-technologies-private-limited/U62013TS2025PTC195098?tab=about"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#c9a84c] hover:text-[#e0c070] font-semibold transition-colors"
          >
            ARSHIT TECHNOLOGIES PRIVATE LIMITED
          </a>
        </span>
      </div>
    </footer>
  )
}
