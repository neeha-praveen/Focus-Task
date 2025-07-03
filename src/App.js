import './App.css';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <div className="app">
      <Navbar/>
      <div className='main-body'>
        <Sidebar/>
      </div>
    </div>
  );
}

export default App;
