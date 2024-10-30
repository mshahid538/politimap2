import MyRoutes from './route/Routes';
import React from 'react';
import NavBar from './pages/Navbar';
import Footer from './pages/Footer';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function App({ signOut, user }) {
  console.log(user);
  return (
    <React.Fragment>
      <NavBar signOut={signOut} user={user} />
      <MyRoutes />
      <Footer />
    </React.Fragment>
  );
}

export default withAuthenticator(App);
