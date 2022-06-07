import { Route, Switch } from "react-router-dom";
import Homepage from './pages/Homepage'
import Header from './components/Header'
import TicTacToe from './pages/TicTacToe'

function App() {
    return (
        <div className={"App"}>
            <Header />
            <Switch>
                <Route exact path={"/"} component={Homepage} />
                <Route path={"/tictactoe"} component={TicTacToe} />
            </Switch>
        </div>)
}

export default App;
