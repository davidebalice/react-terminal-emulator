import ReactDOM from "react-dom/client";
import App from "./App";
import { DataProvider } from "./context/DataContext";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
localStorage.setItem("token", "");
localStorage.setItem("directory", "");
localStorage.setItem("command", "");
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <DataProvider>
      <App />
    </DataProvider>
  </>
);

reportWebVitals();
