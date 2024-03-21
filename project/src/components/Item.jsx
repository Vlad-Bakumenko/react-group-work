/* eslint-disable react/prop-types */
import { useContext } from "react"
import { RandomContext } from "../contexts/RandomContext"

function Item({item}) {
    const {dispatch} = useContext(RandomContext);
  return (
    <div>
        <p className="item">{item} <button onClick={()=>dispatch({type:"DELETE", payload:item})}>X</button></p>
    </div>
  )
}

export default Item