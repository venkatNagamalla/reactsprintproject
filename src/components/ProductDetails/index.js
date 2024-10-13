import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Context from '../../context/Context'

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [productApiDetails, setProductApiDetails] = useState({
    apiStatus: apiStatusConstants.initial,
    productFullData: {},
  });

  const { id } = useParams();

  const getProductFullDetails = async () => {
    setProductApiDetails({ apiStatus: apiStatusConstants.inProgress });
    const api = `https://fakestoreapi.com/products/${id}`;
    const response = await fetch(api);

    if (response.ok) {
      const data = await response.json();
      setProductApiDetails({
        apiStatus: apiStatusConstants.success,
        productFullData: data,
      });
    } else {
      setProductApiDetails({ apiStatus: apiStatusConstants.failure });
    }
  };

  useEffect(() => {
    getProductFullDetails();
  }, []);

  const failureView = () => (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-red-500 text-xl mb-2">
        Oops! Something went wrong please try again.
      </h1>
      <button
        type="button"
        onClick={getProductFullDetails}
        className="bg-black rounded-sm mt-2 text-white w-[70px] p-1"
      >
        Retry!
      </button>
    </div>
  );

  const successView = () => {
    const {
      title,
      image,
      description,
      price,
      rating,
    } = productApiDetails.productFullData;
    const { rate } = rating;

   return  <Context.Consumer>
        {value => {
            const {addItem} = value 

            const getItem = () => {
                addItem({...productApiDetails.productFullData,quantity})
            }

            return  (
                <div className="md:flex-row flex md:justify-between flex-col py-4 px-6  w-[100%]">
                  <div className="w-[100%] md:w-[40%] flex justify-center items-center">
                    <img className="w-[60%] md:w-[70%]" src={image} alt="image" />
                  </div>
                  <div className="w-[100%] md:w-[58%] mt-6">
                    <h1 className="text-2xl md:mb-4 md:text-4xl font-[500]">{title}</h1>
                    <p className="text-md md:mb-4 md:text-lg text-[#0009] mt-2">
                      {description}
                    </p>
                    <div>
                      <p className="flex items-center text-lg font-[500]">
                        Rating: {rate}
                        <span className="ml-1 mb-1">
                          <FaStar color="#F3C623" />
                        </span>
                      </p>
                    </div>
                    <p className="mt-3 md:text-xl font-[500] text-md">
                      Price:{" "}
                      <span className="text-orange-600 text-2xl font-semibold">
                        {price}$
                      </span>
                    </p>
          
                    <div className="flex items-center mt-3">
                      <p className="md:text-xl font-[500] text-md">Quantity:</p>
                      <button
                        type="button"
                        onClick={() => (quantity > 1 ? setQuantity(quantity - 1) : null)}
                        className="w-[50px] text-xl border ml-3 border-black"
                      >
                        -
                      </button>
                      <p className="mx-4 font-[500] text-3xl">{quantity}</p>
                      <button
                        type="button"
                        onClick={() => (quantity <= 5 ? setQuantity(quantity + 1) : null)}
                        className="w-[50px] text-xl border border-black"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={getItem}
                      className="bg-orange-400 font-[500] rounded-sm h-[35px] mt-6 w-[120px]"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              );
        }}
    </Context.Consumer>

  };

  const productStatus = () => {
    switch (productApiDetails.apiStatus) {
      case apiStatusConstants.inProgress:
        return <p>Loading...</p>;
      case apiStatusConstants.success:
        return successView();
      case apiStatusConstants.failure:
        return failureView();
      default:
        return null;
    }
  };

  return (
    <section className="min-h-[60vh] flex flex-col justify-center items-center mt-6">
      {productStatus()}
    </section>
  );
};

export default ProductDetails;
