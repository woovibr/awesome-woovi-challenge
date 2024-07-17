import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Outlet } from "react-router-dom";
import { ContactsFooter } from "../components/contacts-footer";
import { useUnloadWarning } from "../hooks/use-unload-warning";


export const Layout = () => {
  useUnloadWarning();

  return (
    <div className="flex justify-center">
      <div className="flex items-center flex-col gap-2 p-3 w-full xs:w-[464px]">
        <Header />
          <Outlet />
        <Footer />
        <ContactsFooter />
      </div>
    </div>
  );
};
