import LoginPage from "./pages/Auth/LoginPage"
import RegisterPage from "./pages/Auth/RegisterPage"
import CoursesPage from "./pages/CoursesPage"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<RegisterPage />} path="/" />
          <Route element={<LoginPage />} path="/login" />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
