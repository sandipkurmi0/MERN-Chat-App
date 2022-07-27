import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Homepaje from './Pages/Homepage'
import ChatPage from './Pages/ChatPaje'
// import { ChatState } from './context/ChatProvider'

function App() {

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" component={Homepaje} exact />
          <Route path="/chats" component={ChatPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
