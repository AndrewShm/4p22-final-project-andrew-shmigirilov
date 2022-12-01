import React from 'react';
import styles from './Card.module.scss';
import { AppContext } from '../../App';
import CardPopup from '../CardPopup/CardPopup';
import { useState } from 'react';

function Card({ 
  id, 
  title, 
  imageUrl, 
  price, 
  description,
  onFavorite,
  size, 
  onPlus, 
  favorited = false, 
}) {
  const {isItemAdded} = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const obj = { id, parentId: id, title, imageUrl, price };
  const [popup, setPopup] = useState(false)

  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  };

  return (
  <>
    <div className={styles.card}>
      {onFavorite && (
        <div className={styles.favorite} onClick={onClickFavorite}>
          <img src={isFavorite ? 'img/liked.svg' : 'img/unliked.svg'} alt='Unliked' />
        </div>
      )}
      <img src={imageUrl} onClick={() => setPopup(true)} alt='Sneakers' />
      <h5>{title}</h5>
      <div className={styles.cardBottom}>
        <div>
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        {onPlus &&
          <img
            className={styles.plus}
            onClick={onClickPlus}
            src={isItemAdded(id) ? 'img/btn-checked.svg' : 'img/btn-plus.svg'}
            alt='Plus' />}
      </div>
    </div>
    <CardPopup
        id={id}
        title={title}
        image={imageUrl}
        size={size}
        price={price}
        description={description}
        isFavorite={isFavorite}
        onClickFavorite={onClickFavorite}
        onClickPlus={onClickPlus}
        onPlus={onPlus}
        isOpened={popup}
        onPopupClose={() => setPopup(false)} />
  </>
  );
}

export default Card;
