import React, { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { FiLogIn, FiUserPlus } from 'react-icons/fi';
import { BiCategoryAlt } from 'react-icons/bi';
import { MdSearch } from 'react-icons/md';

const Header = ({ categories, onCategoryChange, onFilterChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isModalOpen && !event.target.closest('.modal-content') && !event.target.closest('.category-button')) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isModalOpen]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    onCategoryChange(category);
    setIsModalOpen(false);
  };

  const handleMultiSelect = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter(item => item !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = () => {
    onFilterChange(selectedCategories, priceRange);
  };

  const filterCategories = (categories) => {
    return categories.filter(category => category.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  return (
    <header className={`header ${theme}`}>
      <h1 className="header-title">Магазин Гига Чада</h1>
      <nav className="header-nav">
        <ul className="header-nav-list">
          <li><FaShoppingCart /> Корзина</li>
          <li onClick={() => setIsModalOpen(true)} className="category-button">
            <BiCategoryAlt /> Категория
          </li>
          <div className="container-auto">
            <button className="login-button"><FiLogIn /> Войти</button>
            <button className="register-button"><FiUserPlus /> Зарегистрироваться</button>
          </div>
        </ul>
      </nav>

      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? '🌙' : '🌞'}
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setIsModalOpen(false)}>X</button>
            <h3>Выберите категорию</h3>


            <div className="category-search">
              <MdSearch />
              <input
                type="text"
                placeholder="Поиск категории..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            <div className="price-range">
              <label>Цена: {priceRange[0]} - {priceRange[1]} ₽</label>
              <input
                type="range"
                min="0"
                max="5000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              />
              <input
                type="range"
                min="0"
                max="5000"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
              />
            </div>

            <ul>
              {filterCategories(categories).map((category) => (
                <li
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={category === activeCategory ? 'active' : ''}
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleMultiSelect(category)}
                  />
                  {category}
                </li>
              ))}
            </ul>

            <button className="apply-filters" onClick={handleFilterChange}>Применить фильтры</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
