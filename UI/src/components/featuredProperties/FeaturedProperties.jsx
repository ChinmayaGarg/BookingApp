import useFetch from '../../hooks/useFetch';
import './featuredProperties.css';

const FeaturedProperties = () => {
  const BASE_URL = 'https://bookingapp-production.up.railway.app';
  const RELATIVE_URL = '/hotels?featured=true&limit=4';
  const url = BASE_URL + RELATIVE_URL;
  const { data, loading, error } = useFetch(url);
  // const { data, loading, error } = useFetch(RELATIVE_URL);

  return (
    <div className="fp">
      {loading ? (
        'Loading'
      ) : (
        <>
          {data.map(item => (
            <div className="fpItem" key={item._id}>
              <img src={item.photos[0]} alt="" className="fpImg" />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
