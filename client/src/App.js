import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Homepaje from './Pages/Homepage'
import ChatPage from './Pages/ChatPage/ChatPaje'
import Ruf from './Pages/Ruf'



function App() {

  return (
    <div>

      <Router>

        <Switch>
          <Route path="/" component={Homepaje} exact />
          <Route path="/chats" component={ChatPage} />
          <Route path="/ruf" component={Ruf} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
