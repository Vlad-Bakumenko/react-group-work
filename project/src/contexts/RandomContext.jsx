import { createContext, useState } from "react";
import { useReducer } from "react";

export const RandomContext = createContext();

const initialState = {
  items: JSON.parse(localStorage.getItem("items")) || [],
  isPlaying: false,
  pickedItem: "",
  gifs: [
    "https://media.giphy.com/media/vVzH2XY3Y0Ar6/giphy.gif?cid=82a1493bbbv8efs3t500i4utn59xjxd7lmhj10jzulcq23sl&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
    "https://media.giphy.com/media/L9AqjFr6H4iaY/giphy.gif?cid=82a1493bau9tmkbb3k7pnn3zxuy4pwxhlmsud9dwflyq4b9w&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
    "https://media.giphy.com/media/5K7ngCtszoxxbaBieC/giphy.gif?cid=82a1493bau9tmkbb3k7pnn3zxuy4pwxhlmsud9dwflyq4b9w&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
    "https://media.giphy.com/media/aiE3JQU3vLqTK/giphy.gif?cid=790b76118pb352guosl0jokipcr20oacqek5flm834nfagqc&ep=v1_gifs_search&rid=giphy.gif&ct=g",
    "https://media.giphy.com/media/aKLfLPnrRNkze7OrUJ/giphy.gif?cid=790b7611kuwf9vxbllwgh8v1kjbrrrbsajvdzk0eot6ykacw&ep=v1_gifs_search&rid=giphy.gif&ct=g",
  ],
  pickedGif: "https://media.giphy.com/media/aiE3JQU3vLqTK/giphy.gif?cid=790b76118pb352guosl0jokipcr20oacqek5flm834nfagqc&ep=v1_gifs_search&rid=giphy.gif&ct=g",
};

function reducer(currentState, action) {
  switch (action.type) {
    case "ADD":
      return {
        ...currentState,
        items: [...currentState.items, action.payload],
      };
    case "DELETE":
      return {
        ...currentState,
        items: currentState.items.filter((item) => item !== action.payload),
      };
    case "PLAY":
      return { ...currentState, isPlaying: !currentState.isPlaying };
    case "PICK":
      const randomItem = getRandomItem(currentState.items);
      const randomGif = getRandomItem(currentState.gifs);
      return { ...currentState, pickedItem: randomItem, pickedGif: randomGif };
    case "RESET":
      return { ...initialState, items: [] };
  }
}

function getRandomItem(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function RandomContextProvider({ children }) {
  const [input, setInput] = useState("");
  function handleChange(e) {
    setInput(e.target.value.toUpperCase());
  }
  const [error, setError] = useState({ content: "", open: false });

  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(state);

  function handlePlay() {
    if (state.items.length < 2) {
      setError({content:"2 items required", open:true})
      return;
    } else {
      dispatch({ type: "PLAY" });
    }
  }

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
    setInput("")   
  }

  return (
    <RandomContext.Provider
      value={{
        input,
        setInput,
        handleChange,
        state,
        dispatch,
        handlePlay,
        error,
        setError,handleClick
      }}
    >
      {children}
    </RandomContext.Provider>
  );
}

export default RandomContextProvider;
