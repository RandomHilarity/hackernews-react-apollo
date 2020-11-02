import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

function CreateLink(props) {
  const [state, setState] = React.useState({
    description: "",
    url: ""
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value });
  };
  
  const { description, url } = state;

  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          id="description"
          className="mb2"
          value={ description }
          onChange={ handleChange("description") }
          type="text"
          placeholder="A description for the link"
        />
        <input
          id="url"
          className="mb2"
          value={ url }
          onChange={ handleChange("url") }
          type="text"
          placeholder="The URL for the link"
        />
      </div>
      <Mutation 
        mutation={ POST_MUTATION }
        variables={{ description, url }}
        onCompleted={() => props.history.push('/')}>
        {postMutation => <button onClick={ postMutation }>Submit</button>}
      </Mutation>
    </div>
  )
};

export default CreateLink;