import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import AddBook from "./users/AddUser";
import EditBook from "./users/EditUser";
import ViewBook from "./users/ViewUser";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        {/* Heading Section */}
        <header className="App-header">
          <h1 className="bookstore-heading">University of Michigan - Dearborn BookStore</h1>
        </header>
        
        {/* Navbar Section */}
        <Navbar />
        
        {/* Routes Section */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addbook" element={<AddBook />} />
          <Route exact path="/editbook/:id" element={<EditBook />} />
          <Route exact path="/viewbook/:id" element={<ViewBook />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
