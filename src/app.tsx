import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { PaymentProvider } from "./contexts/payment/provider";
import { HomePage } from "./pages/home";
import { Layout } from "./pages/layout";
import { PaymentMethodPage } from './pages/payment-method';
import { PixCreditCardPage } from "./pages/pix+credit-card";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/woovi",
        element: <HomePage />,
      },
      {
        path: "/payment-method",
        element: <PaymentMethodPage />,
      },
      {
        path: "/pix+credit-card",
        element: <PixCreditCardPage />,
      },
    ],
  },
]);

export const App = () => {

  return (
    <PaymentProvider>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        theme="light"
      />
    </PaymentProvider>
  )
}