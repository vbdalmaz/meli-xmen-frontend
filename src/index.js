import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import DNABox from './DNA'
import Home from './Home'
import { BrowserRouter as Router, Route} from "react-router-dom";

ReactDOM.render(
    (<Router>
        <div>
            <App>
                <Route exact path="/" component={Home} />
                <Route exact path="/dnas" component={DNABox}/>
            </App>
        </div>
    </Router>), 
    document.getElementById('root')
);
  
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
