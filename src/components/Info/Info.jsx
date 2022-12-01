import React from 'react'
import { AppContext } from '../../App';
import styles from './Info.module.scss'

export const Info = ({title, image, description}) => {
    const { setCartOpened } = React.useContext(AppContext)

  return (
    <div className={styles.cartEmpty}>
        <img src={image} alt='EmptyCart'/>
        <h2>{title}</h2>
        <p>{description}</p>
        <button onClick={() => setCartOpened(false) } className={styles.greenButton}>
            <img src='img/arrow.svg' alt='Arrow'/>Вернуться назад
        </button>
    </div>
  )
}

export default Info;