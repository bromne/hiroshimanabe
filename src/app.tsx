import * as React from "react";
import * as ReactDOM from "react-dom";
import PropTypes from 'prop-types';

import { HashRouter, Route, RouteComponentProps } from "react-router-dom";
import { MainComponent } from "./components/MainComponent";

ReactDOM.render(
    <HashRouter>
        <section>
            <Route exact path="/" component={ MainComponent } />
            <Route path="/:date" component={ MainComponent } />
        </section>
    </HashRouter>,
    document.getElementById("root")
);

export interface RouteProps<T> extends RouteComponentProps {
    // history: PropTypes.historyContext.isRequired;
    match: {
        params: T;
    }
    history: {
        push(url: string);
    }
}

