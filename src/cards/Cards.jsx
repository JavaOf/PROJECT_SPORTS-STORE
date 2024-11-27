const Card = ({ product }) => {

  return (
    <div className="card" key={product.id}>
      <img className="card-image" loading='lazy' src={product.imageUrl} alt={product.name} />
      <h2 className="card-name">{product.name}</h2>
      <p className="card-description">{product.description}</p>
      <h3 className="card-category">Категория: {product.category}</h3>
      <b className="card-price">Цена: {product.price} ₽</b>
      <div className="card-rating">
        Рейтинг: {'★'.repeat(Math.floor(product.rating))}{'★'.repeat(5 - Math.floor(product.rating))}
      </div>
      <div className="card-stock">
        {product.stock ? 'В наличии' : 'Нет в наличии'}
      </div>
    </div>
  );
};

export default Card;
