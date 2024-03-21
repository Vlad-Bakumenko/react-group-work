import { useContext, useEffect } from "react";
import { RandomContext } from "../contexts/RandomContext";
import Modal from "./Modal";
import Form from "./Form";
import DisplayItems from "./DisplayItems";

function RandomPicker() {
  const { state, dispatch, handlePlay, error } = useContext(RandomContext);
  //console.log(input);
  useEffect(() => {
    if (state.isPlaying) {
      const pickedItem = setInterval(() => {
        dispatch({ type: "PICK" });
      }, 60);
      setTimeout(() => {
        clearInterval(pickedItem);
        dispatch({ type: "PLAY" });
      }, 2000);
    }
  }, [state.isPlaying]);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(state.items));
  }, [state.items]);

  return (
    <div className="app">
      <h1>Random Picker</h1>
      <div className="container">
        <h2>{state.pickedItem || "Add Items & Pick One"}</h2>
        <Form></Form>
        <DisplayItems></DisplayItems>
        <div className="btn-container">
          <input
            type="button"
            value="Play"
            className="btn-play"
            onClick={handlePlay}
            disabled={state.isPlaying}
          />
          <input
            type="button"
            className="btn-reset"
            value="Reset"
            onClick={() => dispatch({ type: "RESET" })}
          />
        </div>
        <div className="img-container">
          {<img src={state.pickedGif} alt="" /> || <p></p>}
        </div>
      </div>
      {error.open && <Modal />}
    </div>
  );
}

export default RandomPicker;
