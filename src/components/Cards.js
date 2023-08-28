import React, {useRef, useState, useEffect} from "react";
import { useDispatchCart,useCart } from "./ContextReducer";

export default function Cards(props) {
  let option = props.options;
  let optPrice = Object.keys(option);
  let dispatch = useDispatchCart();
  let foodItem = props.foodItems;
  const priceRef = useRef();
  let data = useCart();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");


  const handleAddCart = async() =>{
    let food = []
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;

        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        
        return
      }
      return
    }

  }
  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])
  let finalPrice = qty * parseInt(option[size]);
  return (
    <div>
      <div
        className="card mt-3 hover"
        style={{ width: "16rem", maxHeight: "400px" }}
      >
        <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "180px" , objectFit:"fill" }} />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          
          <div className="container w-100 p-0" style={{ height: "38px" }}>
            <select className="m-2 h-100  bg-primary rounded text-light" onChange={(e)=>{
              setQty(e.target.value)
            }}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select className="m-2 h-100 bg-primary rounded text-light" ref={priceRef} onChange={(e)=>{
              setSize(e.target.value)
            }}>
              {optPrice.map((data) => {
                return <option key={data} value={data}>{data}</option>
              })}
            </select>
            <div className="d-inline ms-2 h-100 w-20">₹{finalPrice}/-</div>
            
          </div>
          <hr/>
          <div className="text-center justify-content-center">
          <button className="btn  bg-primary text-white " onClick={handleAddCart} >Add To Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
