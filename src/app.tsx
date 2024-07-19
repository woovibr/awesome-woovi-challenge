import { Stack } from "@mui/material";
import { Header } from "./components/header";

import { InputSelectAmount } from "./components/input-select-amount";
import { useEffect } from "react";
import { StorageService } from "./helper/local-storage";

function App() {
  useEffect(() => {
    StorageService.clearAll();
  }, []);

  return (
    <Stack>
      <Header
        title={{
          key: "header_root_page",
          options: {
            amount: null,
          },
        }}
      />

      <InputSelectAmount />
    </Stack>
  );
}

export default App;
