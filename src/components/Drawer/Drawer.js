import React from 'react';
import Info from '../Info/Info';
import axios from 'axios';
import { useCart } from '../../hooks/useCart';
import styles from './Drawer.module.scss';

function Drawer({ onClose, onRemove, items = [] }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  const onClickOrder = async () => {
    try {
      const {data} = await axios.post('https://637ddb309c2635df8f90d2c8.mockapi.io/orders', {
        items: cartItems
      });
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://637ddb309c2635df8f90d2c8.mockapi.io/cart/' + item.id)
        await delay(1000)
      }
    } catch (error) {
      alert('Не удалось создать заказ:(');
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.drawer}>
        <h2 className={styles.drawerHeading}>Корзина
          <img onClick={ onClose } className={styles.removeButton} src='img/btn-remove.svg' alt='Close'/>
        </h2>

        { items.length > 0 ? (
          <div className={styles.cartFull}>
            <div className={styles.items}>
              { items.map((obj) => (
                <div key={obj.id} className={styles.cartItem}>
                  <img className={styles.cartSneakersLogo} src={ obj.imageUrl } alt='Sneakers'/>
                  <div className={styles.cartSneakersTextBlock}>
                    <p className={styles.cartSneakersText}>{ obj.title }</p>
                    <b>{ obj.price } руб.</b>
                  </div>
                  <img onClick={() => onRemove(obj.id)} className={styles.removeButton} src='img/btn-remove.svg' alt='Remove'/>
                </div>
              ))}
            </div>
            <div className={styles.cartTotalBlock}>
              <ul>
                <li>
                  <span>Итого</span>
                  <div></div>
                  <b>{totalPrice} руб. </b>
                </li>
                <li>
                  <span>Налог 13%:</span>
                  <div></div>
                  <b>{Math.round(totalPrice / 100 * 13)} руб. </b>
                </li>
              </ul>
              <button onClick={onClickOrder} className={styles.greenButton}>Оформить заказ</button>
            </div>
          </div>
        ) : (
          <Info 
            title={ isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
            description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок чтобы сделать заказ"}
            image={isOrderComplete ? "img/complete-order.jpg" : "img/empty-cart.jpg"}
          />)
        }

      </div>
    </div>
  );
}

export default Drawer;
