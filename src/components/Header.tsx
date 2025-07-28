"use client";

import Link from 'next/link';

const Header = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();

    if (targetId === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      return;
    }

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const elementHeight = targetElement.offsetHeight;
      const viewportHeight = window.innerHeight;
      const offsetPosition = elementPosition - (viewportHeight / 2) + (elementHeight / 2);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header>
      <div className="container">
        <h1>
          <Link href="/">ARONA</Link>
        </h1>
        <nav>
          <ul>
            <li><a href="#" onClick={(e) => handleScroll(e, 'home')}>Home</a></li>
            <li><a href="#about" onClick={(e) => handleScroll(e, 'about')}>About</a></li>
            <li><a href="#projects" onClick={(e) => handleScroll(e, 'projects')}>Projects</a></li>
            <li><a href="#updates" onClick={(e) => handleScroll(e, 'updates')}>Updates</a></li>
            <li><a href="#contact" onClick={(e) => handleScroll(e, 'contact')}>Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;