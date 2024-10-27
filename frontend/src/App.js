import axios from 'axios';
import './App.css';
import EmailSMSSender from './components';

function App() {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL
  return (
    <div className="">
      <EmailSMSSender />
    </div>
  );
}

export default App;
