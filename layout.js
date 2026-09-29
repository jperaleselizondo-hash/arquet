import './globals.css'

export const metadata = {
  title: 'Arquet — Where business logic becomes software.',
  description: 'Custom operational software for B2B companies that have outgrown spreadsheets, disconnected tools, and manual workflows.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
