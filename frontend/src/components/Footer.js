function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer__author">&copy; {year}. Mesto Russia</p>
    </footer>
  );
}

export default Footer;
