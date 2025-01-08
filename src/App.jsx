import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";

// styles
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "react-datepicker/dist/react-datepicker.css";

// components
import Router from "./router/Router";

// redux
import store from "./redux/Store";

function App() {
  return (
    <Provider store={store}>
      <ToastContainer
        className={"text-[13px]"}
        hideProgressBar
        autoClose={3000}
        pauseOnHover={false}
      />
      <Router />
    </Provider>
  );
}

export default App;
