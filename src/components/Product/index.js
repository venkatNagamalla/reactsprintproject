import { Link } from "react-router-dom";
import "./index.css";

const Product = (props) => {

  const { product } = props;

  const { id, title, image } = product;

  return (
    <Link to={`/product/${id}`} className="list-items">
      <li className="flex flex-col h-[100%] justify-center items-center">
        <div className=" h-[75%] md:h-[85%] flex justify-center items-center overflow-hidden">
          <img className="w-[40%] sm:w-[50%] " src={image} alt={`image${id}`} />
        </div>

        <div className="flex justify-center pb:2 w-[100%] px-2 mb:px-3 items-center">
          <h3 className="text-xs  text-center">{title}</h3>
        </div>
      </li>
    </Link>
  );
};

export default Product;
