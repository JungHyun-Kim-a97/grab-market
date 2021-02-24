import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css";
import { API_URL } from "../config/constants.js";
import dayjs from "dayjs";

function ProductPage() {
  const { id } = useParams(); //해당 product페이지에는 id가 들어감
  const [product, setProduct] = useState(null);
  useEffect(function () {
    axios
      .get(`${API_URL}/products/${id}`)
      .then(function (result) {
        setProduct(result.data.product);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  /*
if문을 써주는 이유는 null에서 이미지 Url 인자를 가져올려고 하기 때문에
방어 코드를 적어줘야함 (axios통신이 비동기 처리기 때문에 비동기 호출이 필요함, return은 함수를 종료 시키기 때문에 아래의 return문이 처리되는 걸 막아줌)
*/
  if (product === null) {
    return <h1>상품 정보를 받고 있습니다...</h1>;
  }

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
      <pre id="description">{product.description}</pre>
    </div>
  );
}

export default ProductPage;
