import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { Button } from "../../views/design/Button";
import { withRouter } from "react-router-dom";
import { api, handleError } from '../../helpers/api';


const FormContainer = styled.div`
color: white;
font-size: 25px;
text-align: center;
text-transform: uppercase;
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

class Edit extends React.Component {

    constructor() {
        super();
        this.state = {
            user: {}
        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    back() {
        this.props.history.push(`/game/dashboard`);
    }

    async editUser() {
        try {
            const pathname = this.props.location.pathname;
            var numb = pathname.match(/\d/g);
            numb = numb.join("");

            const requestBody = JSON.stringify({
                id: this.state.user.id,
                username: this.state.username,
                birthday: this.state.birthday
            });

            //const test = "users/1"
            const response = await api.put(`users/${this.state.user.id}`, requestBody);
        
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Get the returned users and update the state.
            this.setState({ user: response.data });

            // This is just some data for you to see what is available.
            console.log('request to:', response.request.responseURL);
            console.log('status code:', response.status);
            console.log('status text:', response.statusText);
            console.log('requested data:', response.data);

            alert("Successfully edited user!")

            this.props.history.push(`../users/${numb}`)
    
        }  catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }

    async componentDidMount() {
        try{
            const pathname = this.props.location.pathname;
            var numb = pathname.match(/\d/g);
            numb = numb.join("");

            const response = await api.get(`users/${numb}`);

            console.log(response.data)

            await new Promise(resolve => setTimeout(resolve, 1000));
            
            this.setState({ user: response.data });
            
            console.log('request to:', response.request.responseURL);
            console.log('status code:', response.status);
            console.log('status text:', response.statusText);
            console.log('requested data:', response.data);
    
        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
          
    }

    render() {
        return (
            <BaseContainer>
                <FormContainer>Edit User Information
                    <Form>
                        <Label>Username</Label>
                        <InputField
                            placeholder={this.state.user.username}
                            onChange={e => {
                                this.handleInputChange("username", e.target.value);
                            }}
                        />
                        <Label>Birthday</Label>
                        <InputField
                            type={`date`}
                            placeholder={this.state.user.birthday}
                            onChange={e => {
                                this.handleInputChange("birthday", e.target.value);
                            }}
                        />
                    </Form>
                </FormContainer>
                <ButtonContainer>
                    <Button
                        width="50%"
                        onClick={() => {
                            this.editUser() 
                        }}
                    >
                        Save
                    </Button>
                </ButtonContainer>
                <ButtonContainer>
                    <Button /* log in button */
                        width="30%"
                        onClick={() => {
                            this.back()
                        }}
                    >
                        Return to Users Overview
                    </Button>                   
                </ButtonContainer>
            </BaseContainer>
        );
    }
}

 export default withRouter(Edit)