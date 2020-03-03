import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';
import { Spinner } from '../../views/design/Spinner';


const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const Container = styled(BaseContainer)`
  color: white;
  border-color: white;
  text-align: center;
  width: 60%;
  margin: auto;
`;
const Boxes = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 3px solid #ffffff30;
  border-radius: 8px; 
`;


class Profile extends React.Component {
    state = {
        user: null,
    };

    async componentDidMount() {
        try {
            const pathname = this.props.location.pathname;
            //console.log(pathname)
            //const test = "users/1"
            const response = await api.get(pathname);
        
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Get the returned users and update the state.
            this.setState({ user: response.data });

            // This is just some data for you to see what is available.
            console.log('request to:', response.request.responseURL);
            console.log('status code:', response.status);
            console.log('status text:', response.statusText);
            console.log('requested data:', response.data);
    
        }  catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
       
      }

    back() {
        this.props.history.push(`/game/dashboard`);
    }
    editUser(id){
        this.props.history.push(`/edit/${id}`);
    }

    formatDate(dateTime) {
        const date = new Date(dateTime);
        const day = date.getDate();
        const monthIndex = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${day}. ${monthIndex}. ${year}`;
    }


    render() {
        return (
            <Container>
                <h1>User Profile</h1>
                <p></p>
                {!this.state.user ? (
                    <Spinner />
                ) : (
                    <div>
                        <Boxes>
                            {"Username:"}   {this.state.user.username}
                        </Boxes>
                        <p></p>
                        <Boxes>
                            {"Birthday:"}   {this.state.user.birth}
                        </Boxes>
                        <p></p>
                        <Boxes>
                            {"Creation Date:"}   {this.state.user.creationDate}
                        </Boxes>
                        <p></p>
                        <Boxes>
                            {"Status:"}   {this.state.user.status}
                        </Boxes>
                        <ButtonContainer>
                            <Button
                                width="50%"
                                onClick={() => {
                                    this.back();
                                }}
                            >
                                Back
                            </Button>
                            <Button
                                width="50%"
                                onClick={() => {
                                    this.editUser(this.state.user.id);
                                }}
                            >
                                Edit User
                            </Button>
                        </ButtonContainer>
                    </div>
                )}
            </Container>
        );
    }






}

export default withRouter(Profile)











 /*
    public void removeItem(Item item){
     items.remove(items);
     item.setGame(null);
 }
    public void addPlayer(Player player){
     players.add(player)
     boards.add(this)
    }

 */