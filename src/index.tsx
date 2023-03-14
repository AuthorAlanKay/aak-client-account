// 2023-03-06 21:00:00

import React from "react";
import ReactDOM from "react-dom/client";
// TODO: yarn add @mui/material @mui/lab @emotion/react @emotion/styled @fontsource/roboto
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
// TODO: yarn add react-redux @reduxjs/toolkit redux-persist react-router-dom
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { persistor, store } from "./redux/store";
// TODO: yarn add framer-motion @iconify/react
// TODO: 项目添加 theme/* redux/* routes/* components/*
import { LoadingProgress } from "./components/reuse-components";
import ThemeConfig from "./theme/ThemeConfig";
import Router from "./routes/Router";

// 同源 跨域
try {
  window.document.domain = "aakstart.cn";
  console.log(window.location.origin + " set “aakstart.cn” domain successed");
} catch (error) {
  console.log(window.location.origin + " set “aakstart.cn” domain failed");
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeConfig>
          <BrowserRouter>
            <React.Suspense fallback={<LoadingProgress />}>
              <Router />
            </React.Suspense>
          </BrowserRouter>
        </ThemeConfig>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
