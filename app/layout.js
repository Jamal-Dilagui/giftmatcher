import Footer from "./_components/footer";
import Header from "./_components/header";
import "./globals.css";
import SessionProviderWrapper from "./_components/SessionProvider";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-pink-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
        <SessionProviderWrapper>
          <Header/>
            {children}
          <Footer/>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
