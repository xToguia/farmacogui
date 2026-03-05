import { PharmacyProvider } from '../context/PharmacyContext';
import '../styles/globals.css';

export const metadata = {
  title: 'PharmaSys - Sistema de Gestão Farmacêutica',
  description: 'Sistema completo de gestão para farmácias',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <PharmacyProvider>
          {children}
        </PharmacyProvider>
      </body>
    </html>
  );
}
