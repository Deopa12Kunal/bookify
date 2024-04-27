import{Routes, Route} from "react-router-dom";
import Mynavbar from "./components/navbar";
import ListingPage from "./pages/lists";
import HomePage from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
//Pages
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/login";
import BookDetailsPage from "./pages/Details";
function App() {
  return (
    <div>
      <Mynavbar/>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>} /> 
      <Route path="/book/lists" element={<ListingPage/>} />
      <Route path="/book/views/:userID" element={<BookDetailsPage/>} />


 
    </Routes>
    </div>
  );
}

export default App;
