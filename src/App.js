import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header/Header';
import Drawer from './components/Drawer/Drawer';
import Feedback from './pages/Feedback/Feedback';
import Home from './pages/Home/Home';
import Favorites from './pages/Favorites/Favorites';
import Orders from './pages/Orders/Orders';

export const AppContext = React.createContext({});



function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get('https://637ddb309c2635df8f90d2c8.mockapi.io/cart'),
          axios.get('https://637ddb309c2635df8f90d2c8.mockapi.io/favorites'),
          axios.get('https://637ddb309c2635df8f90d2c8.mockapi.io/items'),
        ]);
    
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Ошибка при запросе данных ;(');
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://637ddb309c2635df8f90d2c8.mockapi.io/cart/` + findItem.id);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post('https://637ddb309c2635df8f90d2c8.mockapi.io/cart', obj);
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину');
      console.error(error);
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://637ddb309c2635df8f90d2c8.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Ошибка при удалении из корзины');
      console.error(error);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://637ddb309c2635df8f90d2c8.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
      } else {
        const { data } = await axios.post('https://637ddb309c2635df8f90d2c8.mockapi.io/favorites', obj);
        setFavorites((prev) => [...prev, data])
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты');
      console.error(error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, onAddToFavorite, onAddToCart, setCartOpened, setCartItems }}>
      <div className='wrapper'>
        { cartOpened && 
          <Drawer 
            items={ cartItems } 
            onClose={ () => setCartOpened(false) } 
            onRemove={ onRemoveItem }
          /> 
        }
        
        <Header
          onClickCart={ () => setCartOpened(true) }
        />

        <Routes>
          <Route path='' element={
            <Home
              items={ items }
              cartItems={ cartItems }
              searchValue={ searchValue }
              setSearchValue={ setSearchValue }
              onChangeSearchInput={ onChangeSearchInput }
              onAddToFavorite={ onAddToFavorite }
              onAddToCart={ onAddToCart }
            />
          }
          />
          <Route path='feedback' element={ <Feedback/> }/>
          <Route path='favorites' element={ <Favorites/> }/>
          <Route path='orders' element={ <Orders/> }/>
        </Routes>

      </div>
    </AppContext.Provider>
  );
}

export default App;
