type HeaderProps = {
  title: string;
  message: string;
};

export function Header({ title, message }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="brand">
        <img
          className="logo"
          src="/pixell-river-logo.png"
          alt="Pixell River Financial logo"
        />
        <div>
          <h1>{title}</h1>
          <p className="greeting">{message}</p>
        </div>
      </div>
    </header>
  );
}
