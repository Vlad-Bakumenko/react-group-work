import { useContext } from "react";
import { RandomContext } from "../contexts/RandomContext";

function Form() {
  const {handleChange, input, handleClick}=useContext(RandomContext)  
  return (
    <form>
      <input type="text" onChange={handleChange} value={input} placeholder="Add an item here"/>
      <button onClick={handleClick}>Add</button>
    </form>
  );
}

export default Form;
