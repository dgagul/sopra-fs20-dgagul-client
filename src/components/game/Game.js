import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
//import { Link } from "react-router-dom";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      users: null
    };
  }

  async logout() {
    try {
      let token1 = localStorage.getItem("token");

      console.log(token1)

      const requestBody = JSON.stringify({
        token: token1,
      });

      const response = await api.put('/logout', requestBody);
      
      // some data to see what is available
      console.log('request to:', response.request.responseURL);
      console.log('status code:', response.status);
      console.log('status text:', response.statusText);
      console.log('requested data:', response.data);
    

      // Logout successfully worked --> navigate to the route /login in the AppRouter and remove token
      localStorage.removeItem('token');
      
      console.log(this.props)
      console.log(this.props.history)
      
      this.props.history.push('/login');
    } catch (error) {
      alert(`Something went wrong during the logout: \n${handleError(error)}`);
    }
  }

  showUser = (id) => {
    this.props.history.push(`/users/${id}`)
  }

  async componentDidMount() {
    try {
      const response = await api.get('/users');
      // delays continuous execution of an async operation for 1 second.
      // This is just a fake async call, so that the spinner can be displayed
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get the returned users and update the state.
      this.setState({ users: response.data });

    } catch (error) {
      alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
    }
  }

  render() {
    return (
      <Container>
        <h2>Dashboard! </h2>
        <p>Click on a user to get detailed information:</p>
        {!this.state.users ? (
          <Spinner />
        ) : (
          <div>
            <Users>
              {this.state.users.map(user => {
                return (
                  //<NavLink user={user} to={`/users/${user.id}`}>
                  <PlayerContainer onClick={() => this.showUser(user.id) }>
                    <Player user={user} />
                  </PlayerContainer>
                  //</NavLink>
                );
              })}
            </Users>
            <Button
              width="50%"
              onClick={() => {
                this.logout();
                //{console.log(localStorage.getItem())}
              }}
            >
              Logout
            </Button>
          </div>
        )}
      </Container>
    );
  }
}

export default withRouter(Game);
