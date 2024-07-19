import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@fontsource/nunito/300.css";
import "@fontsource/nunito/300.css";
import "@fontsource/nunito/500.css";
import "@fontsource/nunito/700.css";
import "@fontsource/nunito/800.css";
import { ThemeProvider } from "@emotion/react";
import { DefaultTheme } from "./theme/default.ts";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PaymentMethod from "./pages/payment-method.tsx";
import Pix from "./pages/pix.tsx";
import { Container } from "./components/container.tsx";
import { AmountProvider } from "./context/amount-provider.tsx";
import Credit from "./pages/credit.tsx";
import App from "./app.tsx";
import { PaymentMade } from "./pages/payment-made.tsx";
import "./lib/translation.ts";
import { ChangeLanguageProvider } from "./context/change-language-provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={DefaultTheme}>
    <ChangeLanguageProvider>
      <AmountProvider>
        <React.StrictMode>
          <Router>
            <Routes>
              <Route path="/" element={<Container />}>
                <Route path="/" element={<App />} />
                <Route path="/select-payment" element={<PaymentMethod />} />
                <Route path="/pix" element={<Pix />} />
                <Route path="/credit" element={<Credit />} />
                <Route path="/payment-made" element={<PaymentMade />} />
              </Route>
            </Routes>
          </Router>
        </React.StrictMode>
      </AmountProvider>
    </ChangeLanguageProvider>
  </ThemeProvider>
);
