import React, {FC} from 'react';

import MainLayout from 'layouts/MainLayout';
import Header from './Header';

const Main: FC = ({children}) => (
  <MainLayout header={<Header />}>
    {children}
  </MainLayout>
);

export default Main;
