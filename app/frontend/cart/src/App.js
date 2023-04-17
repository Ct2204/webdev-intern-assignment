import './App.css';
import logo from '../src/assets/nike.png'
import {RiDeleteBin5Line} from 'react-icons/ri'
import { BsCheckLg } from 'react-icons/bs'

import { useEffect,useState } from 'react';
import data from '../src/data/shoes.json'


function App() {

  const { shoes } = data

  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([])


  useEffect(() => {
    
    setProducts(shoes)

    const saveCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]')
    setCartItems(saveCartItems)
    
  },[])

  

  useEffect(() => {
    localStorage.setItem('cartItems',JSON.stringify(cartItems))
  },[cartItems])



  const handleAddToCart = (productId) => {
      const product = products.find((item) => item.id === productId);
     
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      setProducts(
        products.map((product) => {
          if (product.id === productId) {
            return { ...product, added: true };
          }
          return product;
        })
      );
  };
  console.log(products)

  cartItems.forEach(item => console.log(item.added))

  const handleRemoveFromCart = (productId) => {
    const newCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(newCartItems);
    setProducts(
      products.map((product) => {
        if (product.id === productId) {
          return { ...product, added: false };
        }
        return product;
      }))

  };

  const handleIncreaseQuantity = (productId) => {
    const newCartItems = cartItems.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(newCartItems);
  };

  const handleDecreaseQuantity = (productId) => {
    const cartItem = cartItems.find((item) => item.id === productId);

    if (cartItem && cartItem.quantity > 1) {
      const newCartItems = cartItems.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      setCartItems(newCartItems);
    } else {
      handleRemoveFromCart(productId);
    }
  };

  const getTotalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  

  
 


  return (
   
    <div className="container">
      <div className="product">
        <img className='logo-img' src={logo} alt="logo" />
        <h1 className='product-title'>Our Products</h1>
       
        
        <div className='abc'>
        {products && products.map((shoesProduct,index) => (
          <div className='product-container' key={shoesProduct.id}>
            
           <div  style={{backgroundColor:shoesProduct.color}} className='product-img_container'>
           <img  className='product-img' src={shoesProduct.image} alt="anh" />
           </div>
             <h3 className='product-name'>{shoesProduct.name }</h3>
             <p className='product-description'>{shoesProduct.description }</p>
           <div className='product-container-footer'>
              <span className='product-price'><h3>{`$${shoesProduct.price}`}</h3></span>
              
              {
                  shoesProduct.added ? (<button className='product-check-btn'>{<BsCheckLg />}</button>) : (
                    <button className='product-btn' onClick={() => {
                      handleAddToCart(shoesProduct.id)
                     }}>Add To Cart</button>  
                  )
              }
             

             
           </div>
           </div>
        ) 
        )}
        </div>
      </div>
      
              
      
      {cartItems.length === 0 ? (
        <div className="cart">
        <img className='logo-img' src={logo} alt="logo" />
          <div className='cart-header'>
              <h1 className='cart-title'>Your Cart</h1>
            <h1 className='cart-total--price'>{`$${getTotalPrice}` }</h1>
          </div>
          <div className='cart-container'>
            <div>
             
            Your cart is empty
              </div>
            </div>
          </div>
      ) : (
        <div className="cart">
        <img className='logo-img' src={logo} alt="logo" />
          <div className='cart-header'>
              <h1 className='cart-title'>Your Cart</h1>
              <h1 className='cart-total--price'>{`$${getTotalPrice}` }</h1>
          </div>
            <div className='cart-container'>
              {cartItems.map((cart,index) => (
                <div className='cart-content__container'>
                  <div style={{ backgroundColor: cart.color }} className='cart-image'>
                  <img className='product-cart-img' src={cart.image} alt={cart.name} />
                  </div>
                  <div className='cart-container__function'>
                    <h3 className='cart-name'>{cart.name}</h3>
                    <h3 className='cart-price'>{`$${cart.price}`}</h3>
                    <div className='cart-function'>
                    <div className="cartInput">
                        <button onClick={() => {
                          handleDecreaseQuantity(cart.id)
                        }} >-</button>
                        
                        <span>{cart.quantity}</span>
                        <button onClick={() => {
                          handleIncreaseQuantity(cart.id)
                        }} >+</button>
                      </div>
                      <div>
                        <button className='remove-btn' onClick={() => {
                          handleRemoveFromCart(cart.id)
                        }}>{<RiDeleteBin5Line/> }</button>
                    </div>
                      
                    </div>
                  </div>
                </div>
              )
             )}
            </div>
          </div>
      )}


      
      </div>
 
  );
}

export default App;
