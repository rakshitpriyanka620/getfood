import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";
//import { useDispatchCart, useCart } from "./ContextReducer";
export default function Card(props) {
 let dispatch =   useDispatchCart();
 let data=useCart()
 const priceRef= useRef();
  let options = props.options;
  let priceOptions;

  if (options !== null && options !== undefined) {
    priceOptions = Object.keys(options);
  } else {
  }

 const [qty,setqty] = useState(1)
 const [size,setsize] = useState("")
const handleAddToCart= async()=>{

  let food=[]
  for(const item of data){
    if(item.id===props.foodItem._id){
      food=item;

      break;
    }
  }
  if(food!==[]){
    if(food.size===size){
      await dispatch ({type:"UPDATE",id:props.foodItem._id,price:finalPrice,qty:qty})
      return
    }
 else if(food.size!==size)
 {await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name, price: finalPrice, qty: qty, size:size})
return
}
return
 //console.log(data)
}
await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name, price: finalPrice, qty: qty, size:size})
}
const handleIncrementQty = () => {
  setqty(prevQty => prevQty + 1);
};


const finalPrice = options ? qty * parseInt(options[size]) : 0;
useEffect(()=>{
  setsize(priceRef.current.value)
})
  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "360px" }}
        >
          <img src={ props.foodItem && props.foodItem.img?props.foodItem.img:""}
            className="card-img-top"
            alt="..."
            style={{ height: "160px", objectFit: "fill" }}
          />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem && props.foodItem.name?props.foodItem.name:""}</h5>

            <div className="container w-100">
              <select className="m-2 h-100  bg-success rounded"onChange={(e)=> setqty(e.target.value)}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>

              <select className="m-2 h-100  bg-success rounded" ref = {priceRef} onChange={(e)=> setsize(e.target.value)}>
                {priceOptions?.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
              <div className="d-inline h-100 fs-5">Rs.{finalPrice}/-</div>
            </div>
            <hr>
            </hr>
            <button className={"btn btn-success justify-center ms-2"} onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
