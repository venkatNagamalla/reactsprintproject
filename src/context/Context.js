import React from 'react'

const Context = React.createContext({
    cartList : [],
    removeAllCartItems: () => {},
    addItem : () => {},
    removeItem:()=>{},
    address: {},
    addDoorNo : () => {},
    addStreet : () => {},
    addLandmark : () => {},
    addPincode: () => {}

})

export default Context