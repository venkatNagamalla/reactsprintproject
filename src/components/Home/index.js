import { useState, useEffect } from "react";
import Product from "../Product";
import Footer from '../Footer'

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const categories = [
  {
    id: "jewelery",
    text: "Jewelery",
    filter: "/category/jewelery",
  },
  {
    id: "electronics",
    text: "Electronics",
    filter: "/category/electronics",
  },
  {
    id: "mensClothing",
    text: "Men's Clothing",
    filter: "/category/men's clothing",
  },
  {
    id: "womensClothing",
    text: "Women's Clothing",
    filter: "/category/women's clothing",
  },
  {
    id: "remove",
    text: "Remove",
    filter: "",
  },
];

const Home = () => {
  const [apiDetails, setApiDetails] = useState({
    productsData: [],
    apiStatus: apiStatusConstants.initial,
  });

  const [search, setSearch] = useState("");

  const [toggleFilter, setToggleFilter] = useState(false);
  const [category, setCategory] = useState("");

  const handleToggleFilters = () => setToggleFilter(!toggleFilter);

  const getProductsDetails = async () => {
    setApiDetails({ apiStatus: apiStatusConstants.inProgress });

    const api = `https://fakestoreapi.com/products${category}`;
    const response = await fetch(api);
    if (response.ok) {
      const data = await response.json();
      setApiDetails({
        apiStatus: apiStatusConstants.success,
        productsData: data,
      });
    } else {
      setApiDetails({ apiStatus: apiStatusConstants.failure });
    }
  };

  useEffect(() => {
    getProductsDetails();
  }, [category]);

  const getSearch = (e) => {
    e.preventDefault();
    const data = apiDetails.productsData.filter((eachProduct) =>
      eachProduct.title.toLowerCase().includes(search.toLowerCase())
    );

    setApiDetails((prevState) => ({
      ...prevState,
      productsData: data,
    }));
  };

  const handleRetry = () => {
    getProductsDetails();
    setSearch("");
  };

  const searchBar = () => (
    <form
      onSubmit={getSearch}
      className="max-[600px]:w-[100%] sm:w-[70%] md:w-[40%] flex justify-center items-center h-9"
    >
      <input
        type="search"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder="Enter here..."
        className="border px-3 h-[100%] outline-none w-[80%] border-black"
      />
      <button type="submit" className="bg-black w-[20%] h-[100%] text-white">
        Search
      </button>
    </form>
  );

  const failureView = () => (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-[500] text-xl">Error! Please try again..</h1>
      <button type="button" className="border border-black w-[50px] mt-2" onClick={getProductsDetails}>
        Retry
      </button>
    </div>
  );

  const text = () => (
    <div className="mb-4 md:mb-6 mt-6">
      <h1 className="text-2xl font-light text-center sm:text-4xl md:text-5xl pt-2 pb-2">
        DISCOVER OUR PRODUCTS
      </h1>
    </div>
  );

  const filters = () => (
    <div className="self-end w-[150px] mt-8 mr-4">
      <button
        type="button"
        onClick={handleToggleFilters}
        className="bg-[#a69e9e33] font-[450] w-[100%] text-xs h-8 mb-2"
      >
        {category === "" ? "Filter" : category.split("/")[2].toUpperCase()}
      </button>
      {toggleFilter ? (
        <ul className="w-[150px] shadow-lg shadow-[#0003] absolute bg-white">
          {categories.map((eachCategory) => {
            const getFilter = (filter) => {
              setCategory(filter);
              handleToggleFilters();
            };

            return (
              <li key={eachCategory.id}>
                <button
                  type="button"
                  onClick={() => getFilter(eachCategory.filter)}
                  className="h-9 p-2 border-b w-[100%] border-black text-sm "
                >
                  {eachCategory.text}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );

  const successView = () => (
    <ul className="flex min-h-[30vh] flex-wrap w-[100%]">
      {apiDetails.productsData.length > 0 ? (
        apiDetails.productsData.map((eachProduct) => (
          <Product key={eachProduct.id} product={eachProduct}/>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center w-[100%]">
          <h1 className="text-center text-xl">Oops! There is no that product.</h1>
          <button type="button" className="border border-black p-1 mt-3" onClick={handleRetry}>
            Try Again!
          </button>
        </div>
      )}
    </ul>
  );

  const setProducts = () => {
    switch (apiDetails.apiStatus) {
      case apiStatusConstants.inProgress:
        return <h1>Loading...</h1>;
      case apiStatusConstants.success:
        return successView();
      case apiStatusConstants.failure:
        return failureView();
      default:
        return null;
    }
  };

  return (
    <>
      <section className="mt-5 flex-col flex justify-center items-center">
      {text()}
      {searchBar()}
      {filters()}
      <div className="mt-4 flex flex-col justify-center items-center w-[90vw] min-h-[50vh]">
        {setProducts()}
      </div>
    </section>
     <Footer />
    </>
  );
};

export default Home;
