import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <h1>Marvel/DC Store</h1>
            <p>Fan sites, blogs, clubs, news, podcasts, etc. 
               Are not owned or controlled by or endorsed, sponsored or affiliated with Marvel/DC and do not necessarily reflect the views or opinions of DC Entertainment or Marvel/DC affiliates, nor does Marvel/DC vouch for their accuracy.
                Marvel/DC logos, trademarks, character names, and all related elements Marvel/DC. </p>
        </div>;
    }
}
