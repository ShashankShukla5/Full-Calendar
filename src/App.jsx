import "./App.css";
import "./components/Calendar";
import Calendar from "./components/Calendar";
import PopAddEvent from "./components/PopAddEvent";
import { store } from "./store/store";

function App() {
  const addEventPop = store((state) => state.addEventPop);

  return (
    <div className="relative w-full h-full flex justify-center">
      {addEventPop && <div className="absolute flex justify-center w-full h-full bg-black/40 z-20">
      <PopAddEvent/>
      </div>}
      <Calendar />
    </div>
  );
}

export default App;
