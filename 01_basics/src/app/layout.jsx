import Link from "next/link";
import "./globals.css";

const navItems = [
  {
    item: 'Home',
    href: '/'
  },
  {
    item: 'Contact',
    href: '/contact'
  },
  {
    item: 'Blog',
    href: '/blog'
  },
  {
    item: 'Todo',
    href: `/todos/${Math.ceil(Math.random() * 100)}`
  }
]


function Header() {
  return (
    <nav className="flex gap-4">
      {
        navItems.map((navItem) => (
          <Link href={navItem.href}
          key={navItem.item}
          className="py-2 px-4 text-blue-500 hover:text-blue-600 transition-colors duration-300"
          >
          {navItem.item}
          </Link>
        ))
      }
    </nav>
  )
}

function Footer() {
  return (
    <footer>
      Footer
    </footer>
  )
}



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        
      >
        <Header />
        <main className="w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
