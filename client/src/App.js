import './App.css';
import { Route } from 'react-router-dom';
import Homepaje from './Pages/Homepage'
import ChatPage from './Pages/ChatPage'


function App() {
  return (
    <div className="app" >
      <Route path="/" component={Homepaje} exact />
      <Route path="/chats" component={ChatPage} />
    </div>
  );
}

export default App;
