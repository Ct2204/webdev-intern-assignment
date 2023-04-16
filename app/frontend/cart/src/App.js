import './App.css';
import logo from '../src/assets/nike.png'
import {RiDeleteBin5Line} from 'react-icons/ri'
import { BsCheckLg } from 'react-icons/bs'
import { useId } from 'react';

import { useEffect,useState } from 'react';
import data from '../src/data/shoes.json'


function App() {

  const { shoes } = data
  
  // const a = shoes.map((item,index) => {
  //   return {
  //     id: item.id,
  //     name: item.name,
  //     image:item.image,
  //     description: item.description,
  //     color: item.color,
  //     quantity:1,
  //   }
  // })
  // console.log(a)
  
  
  const [cartItem,setCartItem] = useState([])
  const [count, setCount] = useState(1)
  


  const addToCartHanler = (product,id) => {
    cartItem.push(product)
    setCartItem([...cartItem]) 
    document.getElementsByClassName('product-btn')[id].classList.add('hide')
    document.getElementsByClassName('product-check-btn')[id].classList.add('display')
  }

  const removeProductHander = (product) => {
    cartItem.splice(product,1)
    setCartItem([...cartItem])
    // document.getElementsByClassName('product-btn')[id].classList.add('display')
    // document.getElementsByClassName('product-check-btn')[id].classList.add('hide')
    
  }

  const totalPrice = cartItem.reduce((acc,cart)=>acc + cart.price ,0 )
  
  
  const addProduct = (id) => { 
    setCount(count + 1)
    
  }
  const minusProduct = (id) => {
    
    setCount(count - 1)
    
  }
  


  return (
   
    <div className="container">
      <div className="product">
        <img className='logo-img' src={logo} alt="logo" />
        <h1 className='product-title'>Our Products</h1>
       
        
        <div className='abc'>
        {shoes && shoes.map((shoesProduct,index) => (
          <div className='product-container' key={shoesProduct.id}>
            
           <div  style={{backgroundColor:shoesProduct.color}} className='product-img_container'>
           <img  className='product-img' src={shoesProduct.image} alt="anh" />
           </div>
             <h3 className='product-name'>{shoesProduct.name }</h3>
             <p className='product-description'>{shoesProduct.description }</p>
           <div className='product-container-footer'>
               <span className='product-price'><h3>{`${shoesProduct.price}` }</h3></span>
              <button className='product-btn' onClick={() => {
                addToCartHanler(shoesProduct,index)
              }}>Add To Cart</button>
              <button className='product-check-btn'>{<BsCheckLg/> }</button>
           </div>
           </div>
        ) 
        )}
        </div>
      </div>
      

      
      {cartItem.length === 0 ? (
        <div className="cart">
        <img className='logo-img' src={logo} alt="logo" />
          <div className='cart-header'>
              <h1 className='cart-title'>Your Cart</h1>
            <h1 className='cart-total--price'>{`$${totalPrice}` }</h1>
          </div>
          <div className='cart-container'>
            <div>
            {console.log(cartItem.length)}  
            Your cart is empty
              </div>
            </div>
          </div>
      ) : (
        <div className="cart">
        <img className='logo-img' src={logo} alt="logo" />
          <div className='cart-header'>
              <h1 className='cart-title'>Your Cart</h1>
              <h1 className='cart-total--price'>{`$${totalPrice}` }</h1>
          </div>
            <div className='cart-container'>
              {cartItem.map((cart,index) => (
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
                          minusProduct(cart.id)
                        }} >-</button>
                        
                        <span>{count}</span>
                        <button onClick={() => {
                          addProduct(cart.id)
                        }} >+</button>
                      </div>
                      <div>
                        <button className='remove-btn' onClick={() => {
                          removeProductHander(cart)
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
