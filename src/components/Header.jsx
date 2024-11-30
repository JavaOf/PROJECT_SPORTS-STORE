import { FaShoppingCart } from 'react-icons/fa';
import { FiLogIn, FiUserPlus } from 'react-icons/fi';
import { BiCategoryAlt } from 'react-icons/bi';
import { MdSearch, MdRemoveCircleOutline, MdAddCircleOutline } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const Header = ({ categories = [], onCategoryChange, onFilterChange, sortCategories, cartItems, onRemoveFromCart, onUpdateCartItem }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [isCartOpen, setIsCartOpen] = useState(false); 
  const [cartOpenColor, setCartOpenColor] = useState(false); 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isModalOpen &&
        !event.target.closest('.modal-content') &&
        !event.target.closest('.category-button')
      ) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isModalOpen]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (onCategoryChange) onCategoryChange(category);
    setIsModalOpen(false);
  };

  const handleMultiSelect = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category]
    );
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleFilterChange = () => {
    if (onFilterChange) onFilterChange(selectedCategories, priceRange);
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 5000]);
    setSearchTerm('');
    setActiveCategory(null);
    if (onFilterChange) onFilterChange([], [0, 5000]);
  };

  const filterCategories = (categories) => {
    const filtered = categories.filter((category) =>
      category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return sortCategories ? filtered.sort(sortCategories) : filtered;
  };

  const handleQuantityChange = (itemId, increment) => {
    onUpdateCartItem(itemId, increment);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };
   
  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
    if (isCartOpen) {
      setCartOpenColor(false);
    } else {
      setCartOpenColor(true); 
    }
  };
  

  return (
    <header className={`header ${theme}`}>
      <h1 className="header-title">GigaForge</h1>
      <nav className="header-nav">
        <ul className="header-nav-list">
          <li onClick={handleCartClick}>
            <FaShoppingCart /> Корзина ({cartItems.length})
          </li>
          <li onClick={() => setIsModalOpen(true)} className="category-button">
            <BiCategoryAlt /> Категория
          </li>
          <div className="container-auto">
            <button className="login-button">
              <FiLogIn /> Войти
            </button>
            <button className="register-button">
              <FiUserPlus /> Зарегистрироваться
            </button>
          </div>
        </ul>
      </nav>

      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? '🌙' : '🌞'}
      </button>

      {/* Корзина */}
      {isCartOpen && (
        <div className={`cart-modal1 ${cartOpenColor ? 'active' : ''}`}>
          <h3>Корзина</h3>
          {cartItems.length === 0 ? (
            <p>Корзина пуста</p>
          ) : (
            <ul className="cart-items-list1">
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item1">
                  <div className="cart-item-details1">
                    <b>{item.name}</b> - {item.price} ₽ x {item.quantity}
                  </div>
                  <div className="cart-item-actions1">
                    <button onClick={() => handleQuantityChange(item.id, -1)} className="cart-item-btn">
                      <MdRemoveCircleOutline />
                    </button>
                    <button onClick={() => handleQuantityChange(item.id, 1)} className="cart-item-btn">
                      <MdAddCircleOutline />
                    </button>
                    <button onClick={() => onRemoveFromCart(item.id)} className="cart-item-btn">
                      <FaTrash />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="cart-total1">
            <b>Итого: {getTotalPrice()} ₽</b>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="close-cart-btn1">Закрыть</button>
        </div>
      )}

      {/* Модальное окно категорий */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setIsModalOpen(false)}>
              X
            </button>
            <h3>Выберите категорию</h3>

            <div className="category-search">
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

            <div className="modal-actions">
              <button className="apply-filters" onClick={handleFilterChange}>
                Применить фильтры
              </button>
              <button className="apply-filters" onClick={handleResetFilters}>
                Сбросить фильтры
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;