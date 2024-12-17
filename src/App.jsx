// CSS
import "./App.css";

// Components
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NewPost from "./pages/NewPost";
import Search from "./pages/Search";
import PostUnique from "./pages/PostUnique";
import EditPost from "./pages/EditPost";

// Hooks
import { useAuthentication } from "./hooks/useAuthentication";

// Context
import { AuthContextProvider } from "./context/AuthContext";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  let loadingUser = user === undefined;
  if (loadingUser) return <p>Carregando...</p>;

  return (
    <AuthContextProvider value={{ user }}>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/posts/:id" element={<PostUnique />} />
            <Route path="/About" element={<About />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/Register"
              element={!user ? <Register /> : <Navigate to="/" />}
            />
            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/posts/edit/:id"
              element={user ? <EditPost /> : <Navigate to="/login" />}
            />
            <Route
              path="/posts/create"
              element={user ? <NewPost /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
