import React from 'react';
import { AUTH_TOKEN } from '../constants';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

function Login(props) {
  const [state, setState] = React.useState({
    login: true,
    email: "",
    password: "",
    name: ""
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value });
  };

  const { login, email, password, name } = state;

  const _confirm = async data => {
    const { token } = state.login ? data.login : data.signup;
    _saveUserData(token);
    props.history.push("/");
  };
  
  // note that localStorage should not be used for credentials in PROD
  const _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  };

  return (
    <div className="background-grey">
      <h4 className="mv3">{ login ? 'Login' : 'Sign Up' }</h4>
      <div className="flex flex-column">
        {!login && (
          <input
            id="name"
            value={ name }
            onChange={ handleChange("name") }
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          id="email"
          value={ email }
          onChange={ handleChange("email") }
          type="text"
          placeholder="Your email address"
        />
        <input
          id="password"
          value={ password }
          onChange={ handleChange("password") }
          type="text"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <Mutation
          mutation={ login ? LOGIN_MUTATION : SIGNUP_MUTATION }
          variables={{ email, password, name }}
          onCompleted={ data => _confirm(data) }
        >
          {mutation => (
            <div className="point mr2 button" onClick={ mutation }>
              {login ? "login" : "create account"}  
            </div>
          )}  
        </Mutation>
        <div 
          className="pointer button"
          onClick={() => setState({...state, login: !login })}
        >
          { login ? "need to create an account?" : "already have an account?" }
        </div>
      </div>  
    </div>
  )
};

export default Login;