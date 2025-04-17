import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg border-b border-gray-800">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center group">
            <Image 
              src="/logo-on-chess-text.png" 
              alt="OnChess Logo" 
              width={140} 
              height={40} 
              className="h-10 w-auto transform transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="font-medium text-gray-100 hover:text-blue-400 transition-all duration-200 relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/blog" className="font-medium text-gray-100 hover:text-blue-400 transition-all duration-200 relative group">
            Blog
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="bg-transparent border border-blue-500 hover:bg-blue-500/20 px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-md hover:shadow-blue-500/20">
            Login
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-md hover:shadow-blue-600/40">
            Register
          </button>
        </div>
      </div>
    </header>
  );
}