import './SearchBar.css';
import { FaSearch } from 'react-icons/fa';

const SearchBar =({ searchText, onChange }) =>{
  return (
    <div className="search-container">
      <FaSearch className="search-icon" />
      <input
        type="text"
        className="search-input"
        placeholder="Search products by name..."
        value={searchText}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
