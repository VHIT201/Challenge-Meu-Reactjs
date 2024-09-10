import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import TodoApp from './pages/TodoApp';
import CatWikiApp from './pages/CatWikiApp';
import JobSearch from './pages/JobSearch';
import QuoteGeneratorApp from './pages/QuoteGeneratorApp';
import WeatherApp from './pages/WeatherApp';

function App() {
  return (
    <div className="App">
      {/* Invisible left-edge trigger for sidebar */}
      <div className="left-edge-trigger"></div>

      {/* Sidebar */}
      <div className="sidebar">
        <ul>
          <li><Link to="/todo">Todo App</Link></li>
          <li><Link to="/weather">Weather App</Link></li>
          <li><Link to="/cat-wiki">Cat Wiki</Link></li>
          <li><Link to="/job-search">Job Search</Link></li>
          <li><Link to="/quote-generator">Quote Generator</Link></li>
        </ul>
      </div>

      {/* Main content */}
      <div className="main-content">
        <Routes>
          <Route path="/todo" element={<TodoApp />} />
          <Route path="/weather" element={<WeatherApp />} />
          <Route path="/cat-wiki" element={<CatWikiApp />} />
          <Route path="/job-search" element={<JobSearch />} />
          <Route path="/quote-generator" element={<QuoteGeneratorApp />} /> 
        </Routes>
      </div>
    </div>
  );
}

export default App;
