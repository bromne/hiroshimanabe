import * as React from "react";
import * as ReactDOM from "react-dom";
// import PropTypes from 'prop-types';
import { HashRouter, Route, RouteComponentProps } from "react-router-dom";
import { MainComponent } from "./components/MainComponent";

ReactDOM.render(
    <HashRouter>
        <Route path="/hiroshimanabe">
            <div>
                <Route exact path="/" component={ MainComponent } />
                <Route path="/:date" component={ MainComponent } />
            </div>
        </Route>
    </HashRouter>,
    document.getElementById("root")
);
