import React from "react";
import { Helmet } from "react-helmet";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import Main from "./main/Main";
import { configureTranslation } from "./utils/i18n";
import { Provider } from "react-redux";
import configureStore from "./utils/configureStore";
import theme from "./utils/theme";
import SnackbarWrapper from "./common/components/SnackbarWrapper";
import { Web3ModalContainer } from "./common/contexts/Web3ModalProvider";

configureTranslation();

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Helmet>
        <title>Hydro Protocol</title>
      </Helmet>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <SnackbarWrapper>
            <Web3ModalContainer>
              <Main />
            </Web3ModalContainer>
          </SnackbarWrapper>
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  );
}

export default App;
