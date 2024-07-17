export const Footer = () => {
  return (
    <footer>
      <div className="flex items-center justify-center gap-1 py-6">
        <img src="./shield.svg" alt="shield" />
        <span className="text-sm text-[#B2B2B2] font-semibold">Pagamento 100% seguro via:</span>
        <img className="mb-[3px]" src="./footer-logo.svg" alt="logo" />
      </div>
    </footer>
  )
}