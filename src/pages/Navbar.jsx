import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Logo from "../assets/logo/logo.png";

import {Link} from 'react-router-dom';

function NavBar(props) {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand>
            <Link to="/">
                <img className='logo' src={Logo} alt="logo" />
            </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <span> {props.user.attributes.email} </span>
            <Button variant="primary" size="sm" onClick={props.signOut}>Sign out</Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;