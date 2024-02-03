import { Nunito } from 'next/font/google';
import "./globals.css";
import NavBar from './components/navbar/NavBar';
import Modal from './components/modals/Modal';
import RegisterModal from './components/modals/RegisterModal';
import ToastProvider from './providers/ToastProvider';

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
        <RegisterModal />
        <ToastProvider />
      </body>
    </html>
  );
}
