import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { FEED_QUERY } from './LinkList';

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
        onCompleted={() => props.history.push('/')}
        update={(store, { data: { post } }) => {
          const data = store.readQuery({ query: FEED_QUERY });
          data.feed.links.unshift(post);
          store.writeQuery({ query: FEED_QUERY, data });
        }}
      >
        {postMutation => <button onClick={ postMutation }>Submit</button>}
      </Mutation>
    </div>
  )
};

export default CreateLink;