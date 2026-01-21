export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <p>Copyright Pixell River Financial {year}.</p>
    </footer>
  );
}
