import React from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Link from './Link';

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

function Search(props) {
  const [state, setState] = React.useState({
    links: [],
    filter: ""
  });
    
  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value });
  };

  const _executeSearch = async () => {
    const { filter } = state;
    const result = await props.client.query({
      query: FEED_SEARCH_QUERY,
      variables: { filter }
    });
    const links = result.data.feed.links;
    console.log(filter, "filter");
    setState({ ...state, links: links })
  };

  return (
    <div>
      <div>
        Search
        <input
          id="filter"
          type="text"
          onChange={ handleChange("filter") }
        />
        <button onClick={() => _executeSearch()}>OK</button>
      </div>
      { state.links.map((link, index) => (
        <Link key={ link.id } link={ link } index={ index } />
      ))}  
    </div>
  )
};

export default withApollo(Search);