import './App.css';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Tasks from './components/Tasks/Tasks';

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="main-body">
        <Sidebar />
        <div className="main-content">
          <Tasks/>
        </div>
      </div>
    </div>
  );
}

export default App;
