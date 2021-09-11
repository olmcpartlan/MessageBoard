import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');


class ThemeWrapper extends Component {
render() {
  const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: "#363636"
      },
      secondary: {
        // This is green.A700 as hex.
        main: '#11cb5f',
      },
    },
  });
  return (
    <BrowserRouter basename={baseUrl}>
      <ThemeProvider
        theme={theme}
      >
        <App />
      </ThemeProvider>
    </BrowserRouter>
  )

}

}

ReactDOM.render(<ThemeWrapper />, rootElement);

registerServiceWorker();

