import { useSelector } from "react-redux";
import Login from "./Pages/Auth/Login"
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Footer from "./Component/Common/Footer";
import Navbar from "./Component/Common/Navbar/Navbar";
import AboutPage from "./Pages/AboutUs/Aboutus";
import ContactPage from "./Pages/Contactus/ContactUs";



function App() {

  const { accessToken } = useSelector((state) => state.auth);
  const location = useLocation();

  // const showSidebar = ["/add-product", "/productlist"].includes(location.pathname);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route 
          path="/login" 
          element={accessToken ? <Navigate to="/" /> : <Login />} 
        />
        <Route path="/" element={<Home />} />
        {/* <Route path="/productlist" element={<ProductList />} /> */}
        {/* <Route path="/productlist/productPage/:product" element={<ProductDetailPage />} /> */}
        <Route path="/contact" element={<ContactPage />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        {/* <Route path="/cart" element={<Cart />} /> */}
        <Route path="/about" element={<AboutPage />} />

        {/* Protected Routes
        <Route 
          path="/userorders" 
          element={<ProtectedRoute element={<OrderHistory />} />} 
        />
        <Route 
          path="/add-product"  
          element={<ProtectedRoute element={<Layout><AddProduct /></Layout>} />} 
        />
        <Route 
          path="/list-product"  
          element={<ProtectedRoute element={<Layout><ListProduct /></Layout>} />} 
        />
        <Route 
          path="/manage-category"  
          element={<ProtectedRoute element={<Layout><ManageCategories /></Layout>} />} 
        /> */}
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
