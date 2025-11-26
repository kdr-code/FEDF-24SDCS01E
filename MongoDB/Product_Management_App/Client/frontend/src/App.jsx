import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddProduct from "./components/AddProduct";
// import ViewProducts from "./components/ViewProducts";
import ViewProductsUpdated from "./components/ViewProductsUpdated";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<AddProduct />} />
        <Route path="/view" element={<ViewProductsUpdated />} />
      </Routes>
       <ToastContainer position="top-right" autoClose={2500} theme="colored"/>
    </>
  );
}

export default App;
