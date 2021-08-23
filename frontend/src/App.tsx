import React, { useState, useEffect }  from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';

import logo from './logo.svg';
import './App.css';
import '@aws-amplify/ui/dist/style.css';

import config from './aws-exports';
import { onOrderUpdated } from './graphql/subscriptions';
Amplify.configure(config);

const App = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const subscription = API.graphql(graphqlOperation(onOrderUpdated, { id: '552fd243-8f8e-4921-b838-df9e0f94a8aa' })).subscribe({
      next: ({ value }) => {
        console.log(value.data.onOrderUpdated);
      },
    });

    // const subscription = API.graphql(
    //   graphqlOperation(onOrderUpdated, { id: '552fd243-8f8e-4921-b838-df9e0f94a8aa' })
    // ).subscribe({
    //   next: ({ value }) => {
    //     console.log(value.data.onOrderUpdated);
    //     setOrder(value.data.onOrderUpdated);
    //   },
    //   error: error => console.warn(error)
    // })

    return () => subscription.unsubscribe();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
export default withAuthenticator(App, true)
