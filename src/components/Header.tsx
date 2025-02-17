import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="w-full px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/milestones-icon.svg"
              alt="Milestones"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
          </Link>

          {/* Navigation and More Finn Button */}
          <div className="flex items-center space-x-8">
            <a
              href="https://finn-morris.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#ffcb3c] hover:bg-[#ffd65c] transition-colors"
            >
              More Finn
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}