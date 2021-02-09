import { useParams } from "react-router-dom";

function ProductPage() {
  const { id } = useParams(); //해당 product페이지에는 id가 들어감

  return <h1>상품 상세 페이지 {id} 상품</h1>;
}

export default ProductPage;
