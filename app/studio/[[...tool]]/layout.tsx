export const metadata = {
  title: 'ezeikel.dev Studio',
  description: 'Content management for ezeikel.dev',
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
