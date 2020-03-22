import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import QCards from './questionCards';

const client = algoliasearch('2OXOHVVBM2', 'b8769b9a1270565298eb7e51af306c8b');
const index = client.initIndex('Questions');

function AlgoliaSearch(props) {
  const [result, loading] = useAsyncHook(props.query);
  return (
    <div>
      {loading === "false" ? (
        <h3>Loading...</h3>
      ) : result.length === 0 ? (
        <h3>No results found</h3>
      ) : (
        <div>
        <h3>Questions similar to yours:</h3>
        {result.map(item => {
          return <QCards key={item.objectID} objectId={item.objectID} title={item.Title}
          body={item.Body} rating={item.Rating} creationDate={item.creationDate}
          tags={item.Tags} userId={item.UserID} userDisplayName={item.UserDisplayName}
          userPhoto={item.UserPhoto}/>
        })}
        </div>
      )}
    </div>
  );
}
function useAsyncHook(searchHits) {
  const [result, setResult] = React.useState([]);
  const [loading, setLoading] = React.useState("false");

  React.useEffect(() => {
    async function fetchSearch() {
      try {
        setLoading("true");
        const response = await index.search(searchHits, {
          attributesToRetrieve: ['Body', 'Title', 'Rating', 'CreationDate', 
          'Tags', 'UserID', 'objectID', 'UserDisplayName', 'UserPhoto'],
          hitsPerPage: 10,
        }).then(({ hits }) => {
          console.log('hits', hits)
          return hits;
        });


        const hits = await response;
        setResult(
          hits.map(item => {
            console.log("item", item);
            return item;
          })
        );
      } catch (error) {
        setLoading("null");
      }
    }

    if (searchHits !== "") {
      fetchSearch();
    }
  }, [searchHits]);

  return [result, loading];
}

export default AlgoliaSearch
    
