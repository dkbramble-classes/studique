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
        <h1>Searching</h1>
      ) : loading === "null" ? (
        <h1>No Results Found</h1>
      ) : (
        result.map(item => {
          return <QCards Rating={12} key={item[1]} bodyText={item[0]}/>;
        })
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
          attributesToRetrieve: ['Text', 'objectID'],
          hitsPerPage: 10,
        }).then(({ hits }) => {
          return hits;
        });


        const hits = await response;
        setResult(
          hits.map(item => {
            let hitlist = [item.Text, item.objectID];
            //console.log(hitlist);
            return hitlist;
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
    
