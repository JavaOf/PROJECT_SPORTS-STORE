import { useState } from 'react';
import { MdSearch } from 'react-icons/md';

const CategoryModal = ({ categories, onCategoryChange, onFilterChange, sortCategories, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);

  const filterCategories = (categories) => {
    const filtered = categories.filter((category) =>
      category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return sortCategories ? filtered.sort(sortCategories) : filtered;
  };

  const handleMultiSelect = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category]
    );
  };

  const handleFilterChange = () => {
    if (onFilterChange) onFilterChange(selectedCategories, priceRange);
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 5000]);
    setSearchTerm('');
    if (onFilterChange) onFilterChange([], [0, 5000]);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>
          X
        </button>
        <h3>Выберите категорию</h3>

        <div className="category-search">
          <input
            type="text"
            placeholder="Поиск категории..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <MdSearch className="search-icon" />
        </div>

        <div className="price-range">
          <label>Цена: {priceRange[0]} - {priceRange[1]} ₽</label>
          <input
            type="range"
            min="0"
            max="5000"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
          />
          <input
            type="range"
            min="0"
            max="5000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          />
        </div>

        <ul>
          {filterCategories(categories).map((category) => (
            <li key={category}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleMultiSelect(category)}
              />
              {category}
            </li>
          ))}
        </ul>

        <div className="modal-actions">
          <button className="apply-filters" onClick={handleFilterChange}>
            Применить фильтры
          </button>
          <button className="reset-filters" onClick={handleResetFilters}>
            Сбросить фильтры
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
