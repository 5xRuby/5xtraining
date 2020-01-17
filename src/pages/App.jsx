import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Header from '@/components/header';
import Footer from '@/components/footer';
import Contact from './contact';
import Index from './index';
import NoMatch from './noMatch';

import reducer from '@/store/reducer';

import '../assets/style/all.scss';

const store = createStore(reducer);
export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <main>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/contact" component={Contact} />
            <Route component={NoMatch} />
          </Switch>
        </main>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}
