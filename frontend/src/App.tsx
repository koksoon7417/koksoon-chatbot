import { store } from './app/store';
import { Provider } from 'react-redux';

import { Message } from './components/message/Message';

const App = () => {
  return (
    <Provider store={store}>
      <Message />
    </Provider>
  );
};

export default App;
