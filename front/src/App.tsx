import React from 'react';
import { hot } from 'react-hot-loader';
import Router from './component/router/EpeRouter';
import Loading from '@src/component/Loading';
import { useSelector } from 'react-redux';
import { RootState } from './data/modules';
import ExceptionHandler from '@src/utils/ExceptionHandler';
import { BrowserRouter } from 'react-router-dom';

import '@src/static/css/common.css';
import '@src/static/css/content.css';
import '@src/static/css/layout.css';
import '@src/static/css/test.css';
import '@src/static/fonts/NotoSansKR.css';

function App(): JSX.Element {
    const isLoading = useSelector((state: RootState) => state.loading.isLoading);
    return (
        <>
            {isLoading && <Loading />}
            <BrowserRouter>
                <ExceptionHandler>
                    <Router />
                </ExceptionHandler>
            </BrowserRouter>
        </>
    );
}

export default hot(module)(App);
