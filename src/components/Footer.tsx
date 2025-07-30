const Footer = () => {
  return (
    <footer>
      <div className="container">
        <p>© {new Date().getFullYear()} <a href="https://github.com/AR-ONA/web" target="_blank">ARONA</a> powered by <a href="https://vercel.com/" target="_blank">Vercel</a></p>
        <p>Images of Blue Archive copyrighted by NEXON GAMES & YOSTAR.</p>
        <p>This website is not affiliated with or endorsed by NEXON GAMES.</p>
        <p>All Roads, One New Answer</p>
      </div>
    </footer>
  );
};

export default Footer;
