import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Buttons from "./components/Button";
import Comments from "./components/Comments";
import SearchForm from "./components/SearchForm";
import Stories from "./components/Stories";

function App() {
  return (
    <Router>
      <SearchForm />
      <Switch>
        <Route exact path="/" component={Stories} />
        <Route exact path="/comments/:id" component={Comments} />
      </Switch>
    </Router>
  );
}

export default App;
