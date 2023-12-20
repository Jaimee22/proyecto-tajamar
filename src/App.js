import './App.css';
import Router from './Router';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';


function App() {
  return (
    <div className="App">

      <Router />
      <Footer />
      
    </div>
  );
}

export default App;
