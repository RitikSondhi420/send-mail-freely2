import axios from 'axios';
import './App.css';
import SendMail from './components/sendMail';

function App() {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL
  return (
    <div className="">
      <SendMail />
    </div>
  );
}

export default App;
