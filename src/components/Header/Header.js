import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import styles from './Header.module.scss'

function Header(props) {
  const { totalPrice } = useCart();

  return (
    <header className={styles.header}>
      <Link to=''>
        <div className={styles.headerLeft}>
          <img src='img/logo.png' alt='Logotype'/>
          <div>
            <h3 className={styles.headerLeftHeading}>Innopol sneakers</h3>
            <p className={styles.headerLeftText}>Покупай обувь с умом</p>
          </div>
        </div>
      </Link>
      <ul className={styles.headerRight}>
        <li onClick={ props.onClickCart } className='header-right__cart cu-p'>
          <img src='img/cart.svg' alt='Cart'/>
          <span>{totalPrice} руб.</span>
        </li>
        <li>
          <Link to='favorites'>
            <img src='img/heart.svg' alt='Favorites'/>
          </Link>
        </li>
        <li>
          <Link to='orders'>
            <img src='img/user.svg' alt='User'/>
          </Link>
        </li>
        <li onClick={ props.onClickPhone }>
          <Link to='feedback'>
            <img src='img/phone.png' alt='Feedback'/>
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
