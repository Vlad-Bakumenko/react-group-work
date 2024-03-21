import { useContext } from "react";
import { RandomContext } from "../contexts/RandomContext";
import Item from "./Item";

function DisplayItems() {
  const {state} = useContext(RandomContext)
  return (
    <div className="item-container">
    {state.items.map((str,i) => <Item item={str} key={i}/>)}
    </div>
  )
}

export default DisplayItems