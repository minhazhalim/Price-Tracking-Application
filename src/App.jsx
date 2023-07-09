import React,{useState,useEffect} from 'react';
import SearchTextList from './components/searchTextList.jsx';
import PriceHistoryTable from './components/priceHistoryTable.jsx';
import TrackedProductList from './components/trackedProductList.jsx';
import axios from 'axios';
const URL = 'http://localhost:5000';
function App(){
  const [showPriceHistory,setShowPriceHistory] = useState(false);
  const [priceHistory,setPriceHistory] = useState([]);
  const [searchTexts,setSearchTexts] = useState([]);
  const [newSearchText,setNewSearchText] = useState("");
  const fetchUniqueSearchTexts = async () => {
    try {
      const response = await axios.get(`${URL}/unique_search_texts`);
      const data = response.data;
      setSearchTexts(data);
    }catch(error){
      console.log('Error fetching unique search texts:',error);
    }
  };
  useEffect(() => {
    fetchUniqueSearchTexts();
  },[]);
  const handleSearchTextClick = async (searchText) => {
    try {
      const response = await axios.get(`${URL}/results?search_text=${searchText}`);
      const data = response.data;
      setPriceHistory(data);
      setShowPriceHistory(true);
    }catch(error){
      console.log('Error fetching price history:',error);
    }
  };
  const handlePriceHistoryClose = () => {
    setShowPriceHistory(false);
    setPriceHistory([]);
  };
  const handleNewSearchTextChange = (event) => {
    setNewSearchText(event.target.value);
  };
  const handleNewSearchTextSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${URL}/start-scraper`,{
        search_text: newSearchText,
        url: 'https://amazon.ca',
      });
      alert('Scraper Started Successfully');
      setSearchTexts([...searchTexts,newSearchText]);
      setNewSearchText("");
    }catch(error){
      alert('Error Starting Scraper',error);
    }
  };
  return (
    <div className='main'>
      <h1>product search tool</h1>
      <form onSubmit={handleNewSearchTextSubmit}>
        <label>search for a new item:</label>
        <input type="text" value={newSearchText} onChange={handleNewSearchTextChange}/>
        <button type="submit">start scraper</button>
      </form>
      <SearchTextList searchTexts={searchTexts} onSearchTextClick={handleSearchTextClick}/>
      <TrackedProductList/>
      {showPriceHistory && (
        <PriceHistoryTable priceHistory={priceHistory} onClose={handlePriceHistoryClose}/>
      )}
    </div>
  );
}
export default App;