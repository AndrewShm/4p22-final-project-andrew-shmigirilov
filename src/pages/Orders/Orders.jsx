import axios from 'axios';
import React from 'react';
import Card from '../../components/Card/Card';
import styles from './Orders.module.scss'

function Orders() {
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('https://637ddb309c2635df8f90d2c8.mockapi.io/orders');
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
      } catch (error) {
        alert('Ошибка при запросе заказов');
      }
    })();
  }, []);

  return (
    <div className={styles.content}>
      <div className={styles.contentHeadingBlock}>
        <h1>Мои заказы</h1>
      </div>
      <div className={styles.contentItems}>
        { orders.map((item, index) => (
            <Card
              key={ index }
              favorited={true}
              { ...item }
            />
          )) }
      </div>
    </div>
  );
}

export default Orders;
