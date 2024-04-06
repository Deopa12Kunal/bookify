import{Routes, Route} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
//Pages
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/login";
function App() {
  return (
    <Routes>
    
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage></RegisterPage>} />


      
    </Routes>
  );
}

export default App;
