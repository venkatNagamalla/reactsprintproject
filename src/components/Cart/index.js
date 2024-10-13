import { useState } from "react";
import { Link } from "react-router-dom";
import { FaLessThan } from "react-icons/fa";
import Context from "../../context/Context";
import "./index.css";

const Cart = () => {
  const [paymentCard, setPaymentCard] = useState(false);
  const [paymentBar, setPaymentBar] = useState(false);
  const [confirm,setConfirm] = useState(false)
  const [addressPop, SetAddressPop] = useState(false);

  return (
    <Context.Consumer>
      {(value) => {
        const {
          cartList,
          addDoorNo,
          addStreet,
          addLandmark,
          addPincode,
          removeItem,
          address,
          removeAllCartItems,
        } = value;

        const renderNoCartItems = () => (
          <div className="flex flex-col justify-center h-[80vh] items-center">
            <img
              className="w-[50%] md:w-[20%]"
              src="https://img.freepik.com/free-vector/empty-concept-illustration_114360-1253.jpg?t=st=1728650723~exp=1728654323~hmac=4e83e394b81fd07bd21af3be5df0f6a538b074fa9ba813fe65ee14ce28ffe035&w=740"
              alt="cart empty"
            />
            <p className="text-2xl mb-4">No items are Added</p>
            <Link to="/">
              <button
                type="button"
                className="bg-blue-500 text-white py-2 rounded-md px-3"
              >
                Go and find products
              </button>
            </Link>
          </div>
        );


        const renderCartItems = () => (
          <div className="flex flex-col">
            <h1 className="text-center text-3xl mt-2 font-bold mb-4 underline">
              Cart Items
            </h1>
            <button
              type="button"
              className="self-start bg-black px-1 py-1 text-sm w-[85px] mr-8 mt-4 rounded-sm text-white"
              onClick={removeAllCartItems}
            >
              Remove All
            </button>
            <ul className=" border-t border-[#0003] flex flex-col mt-4 pt-4 justify-center items-center">
              {cartList.map((eachItem) => {
                const { id, image, title, price, quantity } = eachItem;

                return (
                  <li
                    className="w-[90%] border border-[#0003] py-4 mt-0 md:w-[80%]  mb:h-[210px] mb-6 flex "
                    key={eachItem.id}
                  >
                    <div className="flex justify-center items-start w-[20%] md:w-[100px]">
                      <img className="w-[80%]" src={image} alt={`image${id}`} />
                    </div>

                    <div className="w-[80%] md:flex md:justify-between md:items-start ml-10">
                      <div>
                        <h1 className="font-[500] text-md">{title}</h1>
                        <p className="font-[500] mt-2">
                          Price:{" "}
                          <span
                            type="button"
                            className="text-orange-500 text-xl"
                          >
                            {price * quantity}
                          </span>
                          $
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(id)}
                        className="border md:ml-4 text-sm h-[28px] mt-1  w-[80px] border-black"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        );

        const handleAddressPop = () => SetAddressPop(!addressPop);

        const handlePaymentBar = () => setPaymentBar(!paymentBar);

        const addressResult = () =>
          address.doorNo !== "" &&
          address.pincode !== "" &&
          address.street !== "" &&
          address.landmark !== ""
            ? true
            : false;

        const getTotalBill = () => {
          let totalBill = 0;
          cartList.map(
            (eachItem) => (totalBill += eachItem.quantity * eachItem.price)
          );
          return totalBill;
        };

        const handleOrder = () => setConfirm(!confirm)

        const handlePaymentCard = () => {
            if(addressResult()){
              setPaymentCard(!paymentCard);
            }
            else{
               SetAddressPop(!addressPop)
            }
        }


        const displayAddress = () => (
          <>
            <h3 className="mb-6 text-xl text-center font-[500]">Address</h3>
            <p className="font-[450] mb-2 text-sm ">
              Door No: <span className="font-[300]">{address.doorNo}</span>
            </p>
            <p className="font-[450] mb-2 text-sm text-ellipsis">
              Street: <span className="font-[300]">{address.street}</span>
            </p>
            <p className="font-[450] mb-2 text-sm text-ellipsis">
              Landmark: <span className="font-[300]">{address.landmark}</span>
            </p>
            <p className="font-[450] mb-2 text-sm">
              Pincode: <span className="font-[300]">{address.pincode}</span>
            </p>
          </>
        );

        const displayAddressButton = () => (
          <button
            type="button"
            onClick={handleAddressPop}
            className="border border-black w-[100%] h-8 mt-2"
          >
            {addressResult() ? "Edit" : "Enter Address"}
          </button>
        );

        const paymentCardSetUp = paymentBar ? "openCard" : "closeCard";

        const renderSidePaymentCardBar = () => (
          <div
            className={`fixed trans ${paymentCardSetUp}  flex items-center bg-[#edebebdd]  h-[100%] w-[85%] md:w-[40%] py-4  px-0  bottom-0`}
          >
            <button
              type="button"
              onClick={handlePaymentBar}
              className="border border-black bg-white relative left-[-60px] flex justify-center items-center w-16 h-[150px]"
            >
              <FaLessThan/>
            </button>

            <div className="h-[100%] relative left-[-20px] w-[110%] flex flex-col justify-center items-center">
              <div className="bg-white mt-5 px-2 h-[40%]  py-2 w-[100%] overflow-hidden flex flex-col">
                {displayAddress()}
                {displayAddressButton()}
              </div>
              <div className="w-[100%] rounded-lg bg-[#fff] mt-2  shadow-[#0003] shadow-lg h-[40%] flex flex-col justify-center items-center">
                <h1 className="text-xl mb-1 text-center">Total Amount</h1>
                <h3 className="text-orange-700 text-2xl text-center">
                  {getTotalBill()}$
                </h3>
                <button
                  type="button"
                  onClick={handlePaymentCard}
                  className="bg-orange-600 text-sm text-white h-8 mt-2 w-[100px] rounded-sm"
                >
                  Place order
                </button>
              </div>
            </div>
          </div>
        );

        const handleAddress = (e) => {
          e.preventDefault();
          if (addressResult()) {
            handleAddressPop();
          }
        };

        const renderPopUp = () => (
          <div className="fixed left-0 right-0 top-0 bottom-0 flex bg-[#0004] justify-center items-center">
            <form
              onSubmit={handleAddress}
              className="bg-white rounded-md px-4 flex flex-col py-8 w-[90%] md:w-[40%]"
            >
              <div className="flex justify-between items-center mb-4">
                <h1 className="font-semibold text-2xl">Enter Address</h1>
                <button
                  type="button"
                  onClick={handleAddressPop}
                  className="border w-6 border-black"
                >
                  X
                </button>
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="door" className="text-lg font-[500]">
                  Door No:
                </label>
                <input
                  id="door"
                  required
                  value={address.doorNo}
                  placeholder="Enter Door No"
                  onChange={(e) => addDoorNo(e)}
                  className="border h-8 outline-none border-[#0003] px-2"
                  type="text"
                />
              </div>
              <div className="mb-2 flex flex-col">
                <label htmlFor="street" className="text-lg font-[500]">
                  Street:
                </label>
                <input
                  required
                  id="street"
                  value={address.street}
                  placeholder="Enter Street"
                  onChange={(e) => addStreet(e)}
                  className="border outline-none h-8 border-[#0003] px-2"
                  type="text"
                />
              </div>
              <div className="mb-2 flex flex-col">
                <label htmlFor="landmark" className="text-lg font-[500]">
                  Landmark:
                </label>
                <input
                  required
                  id="landmark"
                  value={address.landmark}
                  placeholder="Enter Landmark"
                  onChange={(e) => addLandmark(e)}
                  className="border outline-none h-8 border-[#0003] px-2"
                  type="text"
                />
              </div>
              <div className="mb-2 flex flex-col">
                <label htmlFor="pincode" className="text-lg font-[500]">
                  Pincode:
                </label>
                <input
                  required
                  id="pincode"
                  value={address.pincode}
                  placeholder="Enter Pincode"
                  onChange={(e) => addPincode(e)}
                  className="border outline-none h-8 border-[#0003] px-2"
                  type="text"
                />
              </div>
              <button
                type="submit"
                className="border-black border self-center w-[100px] mt-5"
              >
                Save
              </button>
            </form>
          </div>
        );

        const creditCard = () => (
          <form  onSubmit={handleOrder} className="border mt-2 py-4 px-3 w-[100%] border-[#0003] rounded-lg">
                  <div className="flex flex-col">
                  <label htmlFor="ccn" className="font-[450] mb-1" >Credit Card Number:</label>
                  <input
                    id="ccn"
                    className="outline-none border px-2 border-[#0003] h-8"
                    type="tel"
                    inputmode="numeric"
                    pattern="[0-9]{13,19}"
                    autocomplete="cc-number"
                    maxlength="19"
                    placeholder="xxxx xxxx xxxx xxxx"
                    required
                  />
                  </div>
                  <div className="flex justify-between items-center mt-5">
                    <div className="flex w-[48%]">
                    <label htmlFor="month" className="font-[450] mr-2" >Month: </label>
                    <input id="month" className="px-1 w-[40px] outline-none mr-1 border-[#0003] border" type="text" size="2" />
                    <div>/</div>
                    <input className="outline-none w-[40px] border-[#0003] ml-1 px-1 border" type="text" size="2" />
                    </div>
                    <div className="w-[35%]">
                      <label className="font-[450] mr-2">CVC:</label>
                      <input size="3" className="px-1 outline-none border w-[40px] border-[#0003]" type="text"/>
                    </div>
                  </div>

                  <button type="submit" className="bg-orange-400 w-[100%] h-10 rounded-sm mt-5" >Submit</button>
                </form>
        )

        const formCardDetails = () => (
          <div className="px-2 flex flex-col md:flex-row items-center justify-between w-[100%]">
              <div className="border border-[#0003] mt-5 px-2  py-2 w-[100%] md:w-[40%] overflow-hidden   flex flex-col">
                {displayAddress()}
              </div>
              <div className="w-[100%] md:w-[55%] mt-2">
                <h3 className="font-[500] text-xl flex items-center">Total Amount: <span className="text-orange-500 ml-2 text-2xl">{getTotalBill()}</span>$</h3>
                {creditCard()}
                <p className="text-center mt-2">OR</p>
                <button type="button" onClick={handleOrder} className="bg-orange-400 w-[100%] h-10 rounded-sm mt-2" >COD(Cash On Delivery)</button>
              </div>
              </div>
        )

        const orderConfirmed = () => (
           <div className="p-4 flex flex-col justify-center items-center" >
              <img className="w-[200px]" src="https://nexarise.com/static/assets/images/success.svg" alt="success"/>
              <h1 className="mt-4 text-center text-xl">Order Placed Successfully</h1>
           </div>
        )

        const renderPaymentCard = () => (
          <div className="bg-[#0003] py-40 flex flex-col justify-center items-center fixed top-0 right-0 left-0 bottom-0">
            <div className="bg-white px-4 rounded-md flex flex-col justify-center items-center w-[90%] md:w-[65%] py-4 md:py-8">
              <div className="flex w-[100%] justify-between items-center">
              <h1 className="text-2xl mb-1 font-[600]">{confirm ? "Order Status" : "Payment Mode"}</h1>
                <button
                  type="button"
                  onClick={handlePaymentCard}
                  className="border  border-black w-8"
                >
                  X
                </button>
              </div>
               {confirm ? orderConfirmed(): formCardDetails()}
            </div>
          </div>
        );

        return (
          <>
            {cartList.length === 0 ? renderNoCartItems() : renderCartItems()}

            {renderSidePaymentCardBar()}
            {addressPop ? renderPopUp() : null}
            {paymentCard ? renderPaymentCard() : null}
          </>
        );
      }}
    </Context.Consumer>
  );
};

export default Cart;
