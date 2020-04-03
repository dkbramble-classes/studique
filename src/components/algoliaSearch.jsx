import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import QCards from './questionCards';

const client = algoliasearch('2OXOHVVBM2', 'b8769b9a1270565298eb7e51af306c8b');
function AlgoliaSearch(props) {

  function GetCards(){
    var searchString;
    var sortOption;
    var QuestionsString = "Questions similar to yours";

    if(props.sortOption === "user") {
      searchString = props.userSearchString;
      sortOption = "user";
      QuestionsString = "Your Asked Questions:"
    } else {
      searchString = window.location.href.split('/')[5] === null ? null : window.location.href.split('/')[5];
      if (searchString){
        searchString = searchString.replace(/_slash_/g, '/');
      } else {
        searchString = "";
      }

      sortOption = window.location.href.split('/sort/')[1] === null ? null : window.location.href.split('/sort/')[1];
      if (!sortOption){
        sortOption = "";
      } else{
        QuestionsString = "Recently Asked Questions"
      }
      console.log(sortOption);
      console.log(searchString);

    }

    const [result, loading] = useAsyncHook(searchString, sortOption);
    return (
      <div>
        {loading === "false" ? (
          <h3>Loading...</h3>
        ) : result.length === 0 ? (
          <h3>No results found</h3>
        ) : (
          <div>
          <h3>{QuestionsString}</h3>
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
      indexName = "Questions";
    }
    
    async function fetchSearch() {
      try {

        setLoading("true");
        console.log("INDEX", indexName);
        console.log("Search", searchHits);
        const response = await client.initIndex(indexName).search(searchHits, {
          attributesToRetrieve: ['Body', 'Title', 'Rating', 'CreationDate', 
          'Tags', 'UserID', 'objectID', 'UserDisplayName', 'UserPhoto', 'Comments'],
          hitsPerPage: 10,
        }).then(({ hits }) => {
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

    if ((searchHits && searchHits !== "") || sortOption === "date" ) {
      fetchSearch();
    } 
  }, [searchHits, sortOption]);

  return [result, loading];
}

export default AlgoliaSearch
    
