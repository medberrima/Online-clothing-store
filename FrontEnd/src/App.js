import './App.css';
import Navbar from './components/Navbar';
import { Switch, Route } from "react-router-dom";
import Addvetement from './components/AddVetement';
import VetementList from './components/VetementList';
import EditVetement from './components/EditVetement';
import { VetementView } from './components/VetementView';
import Login from './components/Login/Login';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className="container">
      </div>
      <Switch>
          <Route exact path="/vetements" component={VetementList} />
          {/* <Route exact path={["/", "/vetements"]} component={VetementList} /> */}
          <Route path="/add" component={Addvetement} />
          <Route path="/edit/:id" component={EditVetement} />
          <Route path="/login" component={Login} />
          <Route path="/:id" component={VetementView} />
        </Switch>
    </div>
  );
}

export default App;
