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
  state = {
    theme1: {
      palette: {
        type: 'dark',
        primary: { main: '#363636' },
        secondary: { main: '#7f7f7f' },
      },
    },
    theme2: {
      palette: {
        type: 'dark',
        primary: { main: '#363636' },
        secondary: { main: '#7f7f7f' },
      },
    },
    isThemeLight: false
  }
  onChange = () => {
    this.setState = ({ isThemeLight: false })
  }
  onChangeTheme1 = () => {
    this.setState(({ theme1 }) => ({
      theme1: {
        ...theme1,
        primary: { main: 'red' },
      }
    }));
  }
  render() {
    const { theme1, theme2, isThemeLight } = this.state;
    return (
      <BrowserRouter basename={baseUrl}>
        <ThemeProvider
          theme={isThemeLight ? createTheme(theme1) : createTheme(theme2)}
        >
          <App />
        </ThemeProvider>
      </BrowserRouter>
    )

  }

}

ReactDOM.render(<ThemeWrapper />, rootElement);

registerServiceWorker();

