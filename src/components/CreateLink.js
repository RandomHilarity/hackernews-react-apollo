import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { FEED_QUERY } from './LinkList';
import { LINKS_PER_PAGE } from '../constants';

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
        onCompleted={() => props.history.push('/new/1')}
        update={(store, { data: { post } }) => {
          const first = LINKS_PER_PAGE
          const skip = 0
          const orderBy = 'createdAt_DESC'
          const data = store.readQuery({ 
            query: FEED_QUERY,
            variables: { first, skip, orderBy }
        });
          data.feed.links.unshift(post);
          store.writeQuery({ 
            query: FEED_QUERY,
            data,
            variables: { first, skip, orderBy }
          });
        }}
      >
        {postMutation => <button onClick={ postMutation }>Submit</button>}
      </Mutation>
    </div>
  )
};

export default CreateLink;