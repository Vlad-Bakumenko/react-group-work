import { useContext,useEffect } from "react"
import { RandomContext } from "../contexts/RandomContext"
import Item from "./Item";
import Modal from "./Modal";

function RandomPicker() {
  const {handleChange, input, state, dispatch, handlePlay, error,setError} = useContext(RandomContext);
  //console.log(input);
  useEffect(() => {
    if(state.isPlaying) {
        const pickedItem = setInterval(()=>{
            dispatch({type:"PICK"});
        })
        setTimeout(() => {
            clearInterval(pickedItem);
            dispatch({type:"PLAY"});
        }, 2000);
    }
  }, [state.isPlaying])

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(state.items))
  
  }, [state.items])
  
  function handleClick(e) {
    e.preventDefault();
    const duplicate = state.items.find(item => input === item)
    if (duplicate) {
        setError({open:true, content:"such item already exist"})
    } else if (!input){
        setError({open:true, content:"no input"})
    } else {
        dispatch({type:"ADD", payload:input});
    }   
  }

  return (
    <>
    <h2>{state.pickedItem || <p>add items and pick one</p>}</h2>
    <form>
        <input type="text" onChange={handleChange} value={input}/>
        <button onClick={handleClick}>Add</button>
    </form>
    {state.items.map((str,i) => <Item item={str} key={i}/>)}
    <input type="button" value="Play" onClick={handlePlay} disabled={state.isPlaying} />
    <input type="button" value="Reset" onClick={()=>dispatch({type:"RESET"})}/>
    <div>{<img src={state.pickedGif} alt="" /> || <p></p>}</div>
    {error.open && <Modal />}
    </>
  )
}

export default RandomPicker