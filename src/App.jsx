import './App.css'
import Footer from './markup/components/Footer/Footer'
import Header from './markup/components/Header/Header'
import Home from './markup/pages/Home'



// Importing CSS files for styling
import "./assets/template_assets/css/bootstrap.css"
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";

function App() {

  return (
    <>
      <Header />
      <Home />
      <Footer />
    </>
  )
}

export default App
