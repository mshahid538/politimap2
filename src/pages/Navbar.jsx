import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Logo from "../assets/logo/logo.png";
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { ThemeProvider, SwitchField, View, Text } from '@aws-amplify/ui-react';
import '../assets/Candidates.css'; // Add custom styles for themes

function NavBar(props) {

  const [theme, setTheme] = useState('light'); // Set the default theme to light
  
  // Toggle theme function
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Load saved theme from Amplify Storage
  useEffect(() => {
      const savedTheme = localStorage.getItem('theme') || 'light';
      setTheme(savedTheme);
  }, []);

  // Save theme and update body class
  useEffect(() => {
      document.body.className = theme
      localStorage.setItem('theme', theme);
  }, [theme]);



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
            <SwitchField
              label={`${theme === 'light' ? 'Dark' : 'Light'} Mode`}
              checked={theme === 'dark'}
              onChange={toggleTheme}
            />
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;