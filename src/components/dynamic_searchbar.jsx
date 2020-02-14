import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits} from 'react-instantsearch-dom';

// const Hits = ({ hits }) => (
//   <ol>
//     {hits.map(hit => (<li key={hit.objectID}> {hit.name} </li>))}
//   </ol>
// );

//const CustomHits = connectHits(Hits);


const algoliaClient = algoliasearch('2OXOHVVBM2', 'b8769b9a1270565298eb7e51af306c8b');

const searchClient = {
  search(requests) {
    const newRequests = requests.map((request)=>{
      
      // test for empty string and change request parameter: analytics
      if(!request.params.query || request.params.query.length===0) {
        request.params.analytics=false
      }
      return request
    });
    return algoliaClient.search(newRequests);
  },
};

// const Results = connectStateResults(
//   ({ searchState, searchResults, children }) =>
//     searchResults && searchResults.nbHits !== 0 ? (
//       children
//     ) : (
//       <div>No results have been found for {searchState.query}.</div>
//     )
// );

	

// const Results = connectStateResults(({ searchState }) =>
//   searchState && searchState.query ? (
//     <div></div>
//   ) : (
//     <div></div>
//   )
// );


const Hit = ({ hit }) => (<p>{hit.Text}</p>);
class DynamicSearchBar extends React.Component {
    render() {
        return (
            <InstantSearch searchClient={searchClient} indexName="Questions" filters="Text">
              <SearchBox />
              <Hits className="rounded" hitComponent={Hit}></Hits>
              {/* <Results>
                
              </Results> */}
          </InstantSearch>
        )
      }
}

export default DynamicSearchBar
    
