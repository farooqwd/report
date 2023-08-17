import { ToastProvider } from "react-toast-notifications";
import "./App.css";
import Routing from "./Routing";

function App() {
  return (
    <div className="App">
      <ToastProvider>
        <Routing />
      </ToastProvider>
    </div>
  );
}

export default App;
