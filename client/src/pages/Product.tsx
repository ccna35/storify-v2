import { useParams } from "react-router-dom";

const Product = () => {
  const { id } = useParams();
  return <div>Product</div>;
};

export default Product;
