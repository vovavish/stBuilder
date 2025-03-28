export const dynamic = 'force-static'

export default function SlugLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}