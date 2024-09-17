import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
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
    <BrowserRouter>
      <DataProvider>
        <App />
      </DataProvider>
    </BrowserRouter>
  </>
);

reportWebVitals();
