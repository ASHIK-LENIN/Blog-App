import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Projects from "./pages/Projects"
import Dashboard from "./pages/Dashboard"
import Header from "./components/Header"
import FooterCom from "./components/Footer"

const App = () => {
  return (
    <>
   
    <Header />
    <Routes>
      <Route  path="/" element={ <Home />}/>
      <Route  path="/about" element={ <About />}/>
      <Route  path="/sign-in" element={ <SignIn />}/>
      <Route  path="/sign-up" element={ <SignUp />}/>
      <Route  path="/projects" element={ <Projects />}/>
      <Route  path="/dashboard" element={ <Dashboard />}/>
    </Routes>
    <FooterCom />
    </>
  )
}

export default App