import { Nunito } from 'next/font/google';
import "./globals.css";
import NavBar from './components/navbar/NavBar';
import Modal from './components/modals/Modal';
import RegisterModal from './components/modals/RegisterModal';
import ToastProvider from './providers/ToastProvider';
import LoginModal from './components/modals/LoginModal';
import getCurrentUser from './actions/getCurrentUser';
import RentModal from './components/modals/RentModal';

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currenUser = await getCurrentUser(); 
  return (
    <html lang="en">
      <body className={font.className}>
        <NavBar currentUser={currenUser} />
        {children}
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <ToastProvider />
      </body>
    </html>
  );
}
