import ReactDOM from "react-dom/client";
import App from "./App";
import { DataProvider } from "./context/DataContext";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
sessionStorage.setItem("token", "");
sessionStorage.setItem("directory", "");
sessionStorage.setItem("command", "");
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
