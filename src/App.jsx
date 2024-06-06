import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx";
import MoviesPage from "./pages/MoviesPage/MoviesPage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage.jsx";
import "./App.css";
import Navigation from "./components/Navigation/Navigation.jsx";

function App() {
  return (
    <>
      <Navigation/>

      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="/movies/:movieId" element={<MovieDetailsPage/>}/>
        </Route>
        <Route path="/movies" element={<MoviesPage />}>
        <Route path="/movies/:movieId" element={<MovieDetailsPage/>}/>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
