import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import QCards from './questionCards';

const client = algoliasearch('2OXOHVVBM2', 'b8769b9a1270565298eb7e51af306c8b');
function AlgoliaSearch(props) {

  function GetCards(){
    var searchString;

    if(props.sortOption === "user") {
      searchString = props.userSearchString;
    } else {
      searchString = window.location.href.split('=')[1] === null ? null : window.location.href.split('=')[1];
    }

    const [result, loading] = useAsyncHook(searchString, props.sortOption);
    return (
      <div>
        {loading === "false" ? (
          <h3>Loading...</h3>
        ) : result.length === 0 ? (
          <h3>No results found</h3>
        ) : (
          <div>
          <h3>Questions similar to yours:</h3>
          {<SortCards result={result} sortOption={props.sortOption}/>}
          </div>
        )}
      </div>
    );

  }

  function SortCards(props){

    if (props.sortOption === "rating"){
      props.result.sort(SortCompare);
    }
    var cards = [];
    cards = props.result.map(item => {
      return <QCards key={item.objectID} objectId={item.objectID} title={item.Title}
      body={item.Body} rating={item.Rating} creationDate={item.creationDate}
      tags={item.Tags} userId={item.UserID} userDisplayName={item.UserDisplayName}
      userPhoto={item.UserPhoto} comments={item.Comments}/>
    });

    return cards;
  }

  function SortCompare(item1, item2){
    return item2.Rating - item1.Rating;
  }

  return(<GetCards/>);

}


function useAsyncHook(searchHits, sortOption) {
  const [result, setResult] = React.useState([]);
  const [loading, setLoading] = React.useState("false");



  React.useEffect(() => {
    var indexName;
    if (sortOption){
      indexName = (sortOption === "rating") ? 'Questions' : 'Questions_Date';
      if(sortOption === "user"){
        indexName = "Questions_User";
      }
    } else {
      indexName = "rating";
    }
    
    async function fetchSearch() {
      try {

        setLoading("true");
        const response = await client.initIndex(indexName).search(searchHits, {
          attributesToRetrieve: ['Body', 'Title', 'Rating', 'CreationDate', 
          'Tags', 'UserID', 'objectID', 'UserDisplayName', 'UserPhoto', 'Comments'],
          hitsPerPage: 10,
        }).then(({ hits }) => {
          //console.log('hits', hits)
          return hits;
        });


        const hits = await response;
        setResult(
          hits.map(item => {
            return item;
          })
        );
      } catch (error) {
        setLoading("null");
      }
    }

    if (searchHits !== "" && searchHits) {
      fetchSearch();
    }
  }, [searchHits, sortOption]);

  return [result, loading];
}

export default AlgoliaSearch
    
