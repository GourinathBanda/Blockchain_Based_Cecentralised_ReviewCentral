import React from 'react';
import ReactDOM from 'react-dom';
import ReviewBoard from './components/reviewboard';
import { CookiesProvider } from "react-cookie";
import Login from './components/login'
import Register from './components/register'
import AddReview from './components/add-review'
import OffsetReview from './components/offset-review'
import Profile from './components/profile'
import {HashRouter, Route, Switch} from 'react-router-dom'
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const link = createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin'
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <CookiesProvider>    
        <ApolloProvider client={client}>
            <HashRouter>
                <Switch>
                    <Route exact path='/' render={() => (
                      <ReviewBoard currentUser={false} />
                    )}/>
                    <Route exact path='/offset-review/:token' component={OffsetReview}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/register' component={Register}/>
                    <Route exact path='/add-review' component={AddReview}/>
                    <Route exact path='/profile' component={Profile}/>
                    <Route exact path='/my-reviews' render={() => (
                      <ReviewBoard currentUser={true} />
                    )}/>
                </Switch>
            </HashRouter>
        </ApolloProvider>
  </CookiesProvider>,
  document.getElementById('root')
);
