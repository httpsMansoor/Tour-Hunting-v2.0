// app/layout.js
import { Analytics } from "@vercel/analytics/next"
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";

export const metadata = {
  title: 'Nomadic Travel',
  description: 'Explore beautiful travel destinations.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-800">
          {/* Navigation Bar */}
      <Navbar />
        {children}
        <ToastContainer position="top-right" autoClose={3000} />
        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
