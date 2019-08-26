import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { ProductList } from './components/ProductList';
import { ProductAddItem } from './components/ProductAddItem';

export const routes = <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/productList' component={ProductList} />
    <Route path='/productAddItem' component={ProductAddItem} />
    <Route path='/product/edit/:productid' component={ProductAddItem} />
</Layout>;
