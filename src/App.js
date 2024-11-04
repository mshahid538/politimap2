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
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <NavBar signOut={signOut} user={user} />
        <main style={{ flex: '1' }}>
          <MyRoutes />
        </main>
        <Footer />
    </div>
    </React.Fragment>
  );
}

export default withAuthenticator(App);
