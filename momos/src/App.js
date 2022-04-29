import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { combined_reducers } from "./store";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

//
import { PanFlip } from "./animations/pan-animated";

//react router dom v6
import { BrowserRouter, Routes, Route } from "react-router-dom";

// page imports
const Home = React.lazy(() => import("./pages/home"));
const Login = React.lazy(() => import("./pages/auth/login"));
const Register = React.lazy(() => import("./pages/auth/signup"));

// redux persist module config - Usually misbehaves on redux-toolkit

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["app_utils"],
};
const persistedReducer = persistReducer(persistConfig, combined_reducers);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

let persistor = persistStore(store);

const fallback = (
  <div className="wrapper w-100 container d-flex justify-content-center align-items-center">
    <div>
      {<PanFlip size={180} />}
      <h4 className="mt-3 text-success">Loading UI.......... </h4>
    </div>
  </div>
);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <React.Suspense fallback={fallback}>
            <Routes>
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/signup" element={<Register />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </React.Suspense>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
