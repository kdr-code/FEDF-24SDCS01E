import { NavLink, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Books from "./pages/Books.jsx";
import BookDetails from "./pages/BookDetails.jsx";
import About from "./pages/About.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <>
      <nav className="navbar">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "active-link" : undefined
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/books"
          className={({ isActive }) =>
            isActive ? "active-link" : undefined
          }
        >
          Books
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "active-link" : undefined
          }
        >
          About
        </NavLink>
      </nav>

      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
