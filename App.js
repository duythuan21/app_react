import React, { Component } from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/ConfigureStore';
import { LogBox } from 'react-native';
import { PersistGate } from 'redux-persist/es/integration/react';
const { persistor, store } = ConfigureStore();

class App extends Component {
  constructor(props){
    super(props);
    LogBox.ignoreLogs([
      'TextElement: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.'
    ]);
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}
export default App;