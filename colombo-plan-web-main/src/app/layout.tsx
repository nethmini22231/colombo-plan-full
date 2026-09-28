import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from '../components/clientLayout';

export const metadata: Metadata = {
  title: 'The Colombo Plan',
  description: 'Regional intergovernmental organisation for socio-economic development across Asia and the Pacific.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}