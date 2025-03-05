import {createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route} 
  
  from "react-router-dom";
import Navbar from "./pages/Navbar";
import About from "./pages/About";
import Footer from "./pages/Footer";
import ContactUs from "./pages/Contact";
import Business from "./pages/Business";
import ProductListPage from "./pages/ProductListPage";
import ProductCard from "./pages/ProductCard";
import ProductAddPage from "./pages/ProductAddPage";
import Dashboard from "./pages/Dashboard";
import AdminViewPage from "./pages/AdminViewPage";
import MainLayout from "./layout/MainLayout";
import MessagePage from "./pages/Message";
import ImageSlider from "./pages/ImageSlider";
import FacilityAddPage from "./pages/Facility";
import FacilityViewAdmin from "./pages/FacilityViewAdmin";
import FacilityListPage from "./pages/Facilities";
  
  function App() {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <>
        <Route path="/image" element={<ImageSlider/>}/>

        <Route path="/" element={<MainLayout />}>
         
  
          {/* <Route path="/" element={<Navbar />}/> */}
          <Route path="/" element={<About/>}/>
          {/* <Route path="/footer" element={<Footer/>}/> */}
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/business" element={<Business />} />
          <Route path="/facilities" element={<FacilityListPage/>}/>
          <Route path="/product" element={<ProductListPage/>}/>
          <Route path="/admin" element={<ProductAddPage/>}/>
          <Route path="/card" element={<ProductCard/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/admin-view" element={<AdminViewPage/>}/>
          <Route path="/message" element={<MessagePage/>}/>
          <Route path="/facility" element={<FacilityAddPage/>}/>
          <Route path="/facility-view" element={<FacilityViewAdmin/>}/>


        </Route>




          
        
        </>
      )
    );
  
    return (
      <>
        <RouterProvider router={router} />
      </>
    );
  }
  
  export default App;