
import {useState} from 'react'

import {Routes , Route} from 'react-router-dom'
import Headers from './components/Headers'
import Home from './components/Home'
import Login from './components/Login'
import About from './components/About'
import ProtectedRoutes from './components/ProtectedRoutes'
import ProductDetails from './components/ProductDetails'
import Cart from './components/Cart'
import Context from './context/Context'
import './App.css'




const App = () => {

    const [cartList,setCartList] = useState([])
    const [address, setAddress] = useState({
        doorNo: "",
        street: "",
        landmark: "",
        pincode: "",
      });

      const handleDoorNo = (e) => setAddress(prevState => ({...prevState,doorNo: e.target.value}))

      const handleStreet = (e) => setAddress(prevState => ({...prevState,street: e.target.value}))
      const handleLandmark = (e) => setAddress(prevState => ({...prevState,landmark: e.target.value}))
      const handlePincode = (e) => setAddress(prevState => ({...prevState,pincode: e.target.value}))



    const addItemInToCart = (product) => {
        setCartList(prevState => {
            const cartProduct = prevState.find((eachProduct) => eachProduct.id === product.id);
    
            if (cartProduct) {
                return prevState.map((eachProduct) => {
                    if (eachProduct.id === product.id) {
                        const updatedQuantity = eachProduct.quantity + product.quantity;
                        return { ...eachProduct, quantity: updatedQuantity };
                    }
                    return eachProduct;
                });
            } else {
                return [...prevState, product];
            }
        });
    };

    const removeItemFromCart = (id) => {
        const filteredList = cartList.filter((eachItem) => eachItem.id !== id)
        setCartList(filteredList)
    }
    const removeAllItems = () => setCartList([])

  return  <Context.Provider value={{
          cartList,
          removeItem: removeItemFromCart,
          addItem: addItemInToCart,
          removeAllCartItems : removeAllItems,
          address: address,
          addDoorNo:handleDoorNo,
          addLandmark:handleLandmark,
          addStreet:handleStreet,
          addPincode:handlePincode,

    }} >
        <main className="px-2 py-3 md:px-10 md:py-5">
        <Headers/>
        <Routes>
           <Route exact path="/" element={<Home/>}/>
           <Route exact path="/login" element={<Login/>}/>
           <Route element={<ProtectedRoutes/>}>
              <Route exact path="/cart" element={<Cart/>}/>
              <Route exact path="/about" element={<About/>}/>
              <Route exact path="/product/:id" element={<ProductDetails/>}/>
           </Route>
        </Routes>
    </main>
    </Context.Provider>
}

export default App