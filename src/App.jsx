import "./App.css";
import "./components/Calendar";
import { useEffect } from "react";
import Calendar from "./components/Calendar";
import PopAddEvent from "./components/PopAddEvent";
import { store } from "./store/store";

function App() {
  const addEventPop = store((state) => state.addEventPop);

  
  useEffect(() => {
    if (addEventPop) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [addEventPop]);

  return (
    <div className="relative w-full h-full flex justify-center">
      {addEventPop && (
        <div className="absolute flex justify-center w-full h-full bg-black/40 dark:bg-white/40 z-20">
          <PopAddEvent />
        </div>
      )}
      <Calendar />
    </div>
  );
}

export default App;
