import React, {FC} from 'react';

import AppLayout from 'layouts/AppLayout';

const App: FC = ({children}) => (
  <AppLayout>
    {children}
  </AppLayout>
);

export default App;
