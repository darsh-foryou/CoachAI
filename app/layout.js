import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from "@clerk/themes";
import { FaInstagram, FaWhatsapp, FaLinkedin, FaGithub } from "react-icons/fa"; // Importing icons
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Career Coach",
  description: "AI Career Coach: Empowering your professional journey with personalized guidance and insights",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* Header */}
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />
            <footer className="bg-muted/50 py-12">
              <div className="container mx-auto px-4 text-center text-gray-200">
                <p>Made with ❤️ by DarshilModi</p>
                <div className="flex justify-center space-x-6 mt-4">
                  <a href="https://www.instagram.com/darshil_modii" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="w-6 h-6 hover:text-primary transition-colors" />
                  </a>
                  <a href="https://wa.me/3157461195" target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp className="w-6 h-6 hover:text-primary transition-colors" />
                  </a>
                  <a href="https://www.linkedin.com/in/modi-darshil" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="w-6 h-6 hover:text-primary transition-colors" />
                  </a>
                  <a href="https://github.com/darsh-foryou" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="w-6 h-6 hover:text-primary transition-colors" />
                  </a>
                </div>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
