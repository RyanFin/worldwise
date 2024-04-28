import { useReducer } from "react";

export default function App() {
  const initialState = {
    bgColor: "#FAEFDE",
  };

  // handle state changes here
  function reducer(state, action) {
    switch (action.type) {
      case "green":
        return { ...state, bgColor: action.payload };
      case "blue":
        return { ...state, bgColor: action.payload };
      case "yellow":
        return { ...state, bgColor: action.payload };
      case "red":
        return { ...state, bgColor: action.payload };
      default:
        return state;
    }
  }

  const [{ bgColor }, dispatch] = useReducer(reducer, initialState);
  return (
    <div
      style={{ backgroundColor: bgColor, minHeight: "100vh", padding: "20px" }}
    >
      <h1>WorldWise</h1>
      <p>Click me and see the effects: </p>
      <button
        onClick={() => {
          dispatch({ type: "green", payload: "#48a156" });
        }}
      >
        Green
      </button>

      <button
        onClick={() => {
          dispatch({ type: "blue", payload: "#3e7eed" });
        }}
      >
        Blue
      </button>

      <button
        onClick={() => {
          dispatch({ type: "blue", payload: "#edd237" });
        }}
      >
        Yellow
      </button>
      <button
        onClick={() => {
          dispatch({ type: "blue", payload: "#e8321e" });
        }}
      >
        Red
      </button>
    </div>
  );
}
