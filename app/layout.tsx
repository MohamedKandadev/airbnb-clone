import { Nunito } from 'next/font/google';
import "./globals.css";
import NavBar from './components/navbar/NavBar';

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
