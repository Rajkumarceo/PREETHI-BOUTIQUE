import Link from "next/link";

export default function HeaderTicker() {
  return (
    <div className="bg-sandal-pink text-obsidian text-[11px] font-sans py-2 px-4 sm:px-8 flex justify-between items-center tracking-wider font-medium uppercase border-b border-sandal-dark/20">
      <div className="flex items-center gap-6">
        <Link href="/" className="hover:text-sandal-dark transition-colors">App</Link>
        <Link href="/" className="hover:text-sandal-dark transition-colors">Store Locator</Link>
      </div>
      <div className="hidden sm:flex items-center gap-6">
        <Link href="/track-order" className="hover:text-sandal-dark transition-colors">Track Order</Link>
        <Link href="/about" className="hover:text-sandal-dark transition-colors">Customer Service</Link>
      </div>
    </div>
  );
}
