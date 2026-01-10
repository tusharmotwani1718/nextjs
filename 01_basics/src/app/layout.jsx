import "./globals.css";


function Header() {
  return (
    <nav>
      Header
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
