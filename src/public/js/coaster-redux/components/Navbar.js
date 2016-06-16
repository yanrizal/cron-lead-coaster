import React from 'react'
import $ from 'jquery'

class Navbar extends React.Component{

    handleNavClick = e => {
      const url = e.target.getAttribute('data-page');
      console.log(url);
      this.props.onLearnClick({
        'page':url
      })
    }

	render(){
      const { isLogin } = this.props;

        return(
          <nav className="navbar navbar-default navbar-fixed-top">
              <div className="container">
                <div className="navbar-header">
                  {isLogin === 'true' &&<ul className="nav navbar-nav">
                    <li><a data-page='coaster/active' onClick={this.handleNavClick}>Coaster</a></li>
                    <li><a data-page='result' onClick={this.handleNavClick} >Results</a></li>
                    <li><a data-page='help' onClick={this.handleNavClick} >Help</a></li>
                    <li><a href="#">Invite</a></li>
                    <li><a href="#">Account</a></li>
                  </ul>}
                </div>
                {isLogin === 'true' &&<ul className="nav navbar-nav pull-right">
                    <li><a href="/logout">Logout</a></li>
                  </ul>}
              </div>
            </nav>
        )
	}
}


export default Navbar;

