import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem, faCompass } from '@fortawesome/free-solid-svg-icons';
import ImgWrapper from '@/components/imgWrapper';
import data from '@/assets/staticData/header.json';
import '@/assets/style/pages/header.scss';

export default function Header() {
  const RenderNavLink = (_data) => _data.map((link, index) => {
    switch (index) {
      case 0:
        return (
          <NavLink to={link.to} key={link.title} className="p-3 text-nav">
            <FontAwesomeIcon icon={faGem} />
            {link.title}
          </NavLink>
        );
      case 1:
        return (
          <NavLink
            to={link.to}
            key={link.title}
            className="p-3 text-nav d-inline-flex"
          >
            <FontAwesomeIcon icon={faCompass} />
            {link.title}
            <div className="ml-1 px-1 bg-primary normal-radius text-white font-size-2 ASTRO__signUp">
                報名優惠中
            </div>
          </NavLink>
        );
      default:
        return (
          <NavLink to={link.to} key={link.title} className="p-3 text-nav">
            {link.title}
          </NavLink>
        );
    }
  });
  return (
    <header className="container-fluid d-flex align-items-center flex-nowrap">
      <Link className="px-3 py-1" to="/">
        <ImgWrapper fileName="logo.png" path="header/" />
      </Link>
      <nav className="ml-auto d-inline-flex">
        {data ? RenderNavLink(data) : null}
      </nav>
    </header>
  );
}
