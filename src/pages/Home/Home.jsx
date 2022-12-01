import React, { useState } from 'react';
import Card from '../../components/Card/Card';
import styles from './Home.module.scss';

function Home({ items, searchValue, setSearchValue, onChangeSearchInput, onAddToFavorite, onAddToCart }) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Number.MAX_VALUE);
  const [searchSizeValue, setSearchSizeValue] = React.useState('');

  const onMinPriceChangeHandler = ({ target }) => {
    const { value } = target;

    setMinPrice(value);
 };

 const onMaxPriceChangeHandler = ({ target }) => {
    const { value } = target;

    setMaxPrice(value || Number.MAX_VALUE);
 };

 const onChangeSearchSizeInput = (event) => {
  setSearchSizeValue(event.target.value);
};

  const renderItems = () => {

    return items
    .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
    .filter(({ price }) => price >= minPrice && price <= maxPrice)
    .filter((item) => item.size.includes(searchSizeValue))
    .map((item, index) => (
      <Card
        key={ index }
        onFavorite={ (obj) => onAddToFavorite(obj) }
        onPlus={ (obj) => onAddToCart(obj) }
        { ...item }
      />
    ))
  }

  return (
    <div className={styles.content}>
      <div className={styles.contentHeadingBlock}>
        <h1>{ searchValue ? `Поиск по запросу: "${ searchValue }"` : 'Все кроссовки' }</h1>
        <div className={styles.searchBlock}>
          <img className={styles.searchImg} src='img/search.svg' alt='Search'/>
          { searchValue && (
            <img
              className={styles.clear}
              onClick={ () => setSearchValue('') }
              src='img/btn-remove.svg'
              alt='Clear'
            />
          ) }
          <input onChange={ onChangeSearchInput } value={ searchValue } placeholder='Поиск...'/>
        </div>
      </div>
      <div className={styles.categories}>
        <div className={styles.searchPriceBlock}>
          <h2>Поиск по цене:</h2>
          <div>
            <input type='text' onInput={onMinPriceChangeHandler} placeholder='От...'/>
            <input type='text' onInput={onMaxPriceChangeHandler} placeholder='До...'/>
          </div>
        </div>
        <div className={styles.searchSizeBlock}>
          <h2>Поиск по размеру:</h2>
          <input type='text' onChange={onChangeSearchSizeInput} value={searchSizeValue} placeholder='Размер...'/>
        </div>
      </div>
      <div className={styles.contentItems}>
        { renderItems() }
      </div>
    </div>
  );
}

export default Home;