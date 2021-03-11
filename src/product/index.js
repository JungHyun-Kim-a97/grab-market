import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css";
import { API_URL } from "../config/constants.js";
import dayjs from "dayjs";
import { Button, message } from "antd";
import ProductCard from "../components/productCard";

function ProductPage() {
  const { id } = useParams(); //해당 product페이지에는 id가 들어감
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const getProduct = () => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then((result) => {
        setProduct(result.data.product);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getRecommendation = () => {
    axios
      .get(`${API_URL}/products/${id}/recommendation`)
      .then((result) => {
        setProducts(result.data.products);
        console.log(result.data.products);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getProduct();
    getRecommendation();
  }, [id]);
  /*
if문을 써주는 이유는 null에서 이미지 Url 인자를 가져올려고 하기 때문에
방어 코드를 적어줘야함 (axios통신이 비동기 처리기 때문에 비동기 호출이 필요함, return은 함수를 종료 시키기 때문에 아래의 return문이 처리되는 걸 막아줌)
*/
  if (product === null) {
    return <h1>상품 정보를 받고 있습니다...</h1>;
  }

  const onClickPurchase = () => {
    axios
      .post(`${API_URL}/purchase/${id}`)
      .then((result) => {
        message.info("구매가 완료되었습니다.");
      })
      .catch((error) => {
        message.error(`에러가 발생했습니다.  ${error.message}`);
      });
  };

  return (
    <div>
      <div id="image-box">
        <img src={`${API_URL}/${product.imageUrl}`} />
      </div>
      <div id="profile-box">
        <img src="/images/icons/avatar.png" />
        <span>{product.seller}</span>
      </div>
      <div id="contents-box"></div>
      <div id="name">{product.name}</div>
      <div id="price">{product.price}원</div>
      <div id="createdAt">
        {dayjs(product.createdAt).format("YYYY년 MM월 DD일")}
      </div>
      <Button
        id="purchase-button"
        size="large"
        type="primary"
        danger
        onClick={onClickPurchase}
        disabled={product.soldout === 1} //제품이 soldout인 경우 삼항 연산자를 통해 버튼을 disabled를 해준다
      >
        재빨리 구매하기
      </Button>
      <div id="description-box">
        <pre id="description">{product.description}</pre>
      </div>

      <h1>추천 상품</h1>
      <div
        style={{
          marginBottom: 7,

          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {products.map((product, index) => {
          return <ProductCard key={index} product={product} />;
        })}
      </div>
    </div>
  );
}

export default ProductPage;
