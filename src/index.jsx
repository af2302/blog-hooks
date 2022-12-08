import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import store from './store';

import { createRoutesFromElements, Route} from 'react-router';
import { createBrowserRouter , RouterProvider } from "react-router-dom";
import AppLayout from './components/AppLayout';

import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="*" element={<AppLayout />}/>
    </>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));

const persistor = persistStore(store);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);