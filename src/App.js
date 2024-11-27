import React, { useEffect, useState } from 'react';
import { sportsProduct } from './client/sportsData';
import Card from './cards/Cards';
import './styles/app.css';
import Header from './components/Header';
import './styles/header.css';

function App() {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [category, setCategory] = useState('все');
  const [priceRange, setPriceRange] = useState([0, 5000]); 
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]); 


  useEffect(() => {
    setTimeout(() => {
      setProducts(sportsProduct);
      setLoading(false);
    }, 2000);
  }, []);

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    setVisibleCount(3);
  };

  const handleFilterChange = (selectedCategories, priceRange) => {
    setSelectedCategories(selectedCategories);
    setPriceRange(priceRange);
  };

  const filteredProducts = products
    .filter((product) => 
      (category === 'все' || product.category === category) &&
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

  const isAllVisible = visibleCount >= filteredProducts.length;

  const handleLoadMore = () => {
    if (visibleCount < filteredProducts.length) {
      setVisibleCount((prevCount) => prevCount + 3);
    }
  };

  const handleReset = () => {
    setVisibleCount(3);
    setSelectedCategories([]); 
    setPriceRange([0, 5000]); 
  };

  return (
    <div>
      <Header
        categories={['все', 'Креатины', 'Протеины', 'Гейнеры', 'Предтренировочные-комплексы']}
        onCategoryChange={handleCategoryChange}
        onFilterChange={handleFilterChange}
      />
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="container-card">
          {filteredProducts.length > 0 ? (
            filteredProducts.slice(0, visibleCount).map((product) => (
              <Card key={product.id} product={product} />
            ))
          ) : (
            <h2>Нет данных для отображения</h2>
          )}
        </div>
      )}

      {filteredProducts.length > 3 && (
        <div className="controls">
          {isAllVisible ? (
            <button onClick={handleReset} className="controls-button">
              Вернуть
            </button>
          ) : (
            <button onClick={handleLoadMore} className="controls-button">
              Далее
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

