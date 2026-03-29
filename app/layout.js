import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata = {
  title: {
    default: 'MejoraMiBarrio — Peticiones ciudadanas en tu barrio',
    template: '%s — MejoraMiBarrio',
  },
  description: 'Firma peticiones ciudadanas para mejorar tu barrio en España. Presiona a tu ayuntamiento con la fuerza de tus vecinos.',
  metadataBase: new URL('https://mejoramibarrio.es'),
  openGraph: {
    siteName: 'MejoraMiBarrio',
    locale: 'es_ES',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'MejoraMiBarrio',
  url: 'https://mejoramibarrio.es',
  description: 'Plataforma de peticiones ciudadanas para mejorar los barrios de España.',
  areaServed: { '@type': 'Country', name: 'España' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${jakarta.variable} h-full`}>
      <body className="min-h-full">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  )
}
