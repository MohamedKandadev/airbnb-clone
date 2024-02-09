import { Nunito } from 'next/font/google';
import "./globals.css";
import NavBar from './components/navbar/NavBar';
import Modal from './components/modals/Modal';
import RegisterModal from './components/modals/RegisterModal';
import ToastProvider from './providers/ToastProvider';
import LoginModal from './components/modals/LoginModal';
import getCurrentUser from './actions/getCurrentUser';
import RentModal from './components/modals/RentModal';
import ClientOnly from './components/ui/ClientOnly';

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
        <ClientOnly >
          <NavBar currentUser={currenUser} />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <ToastProvider />
        </ClientOnly>
        <div className="pt-20 pb-28">
          {children}
        </div>
      </body>
    </html>
  );
}
