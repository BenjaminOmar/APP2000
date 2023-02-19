import React, { Component } from 'react';
import {Button} from "./LogInButton"
import { Link} from 'react-router-dom';
import './Header.css';

class Navbar extends Component {
  state = { clicked: false}

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked})
  }

  render() {
    return(
      <nav className="NavbarItems">
        <img src="/images/footerImage.png" alt='Logo' className='navbar-logo' />
    
        <div className="menu-icon" onClick={this.handleClick}>
        <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>

        <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
          {MenuItems.map((item, index) => {
            return (
                <li key={index}>
                  <a className={item.cName} href={item.url}>
                  {item.title}
                  </a>
                </li>
            )
          })}         
        </ul>
        <Button>Logg inn</Button>
      </nav>
    )
  }
}

const MenuItems = [
  {
      title: 'Hjem', 
      url: '#',
      cName: 'nav-links'
  }, 
  {
      title: 'Våre tjenester', 
      url: '#',
      cName: 'nav-links'
  }, 
  {
      title: 'Spesialistene', 
      url: '#',
      cName: 'nav-links'
  }, 
  {
      title: 'Kontakt oss', 
      url: '#',
      cName: 'nav-links'
  }, 
  {
      title: 'Logg inn', 
      url: '#',
      cName: 'nav-links-mobile'
  }, 
]


export default Navbar