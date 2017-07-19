import * as React from "react";

export abstract class AppComponent<P, S> extends React.Component<P, S> {
    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, prevContext?: any): void {
        if (this.props !== prevProps)
            this.componentDidReceiveProps();
    }

    componentDidReceiveProps(): void {
    }
}
