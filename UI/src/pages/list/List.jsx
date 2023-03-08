import './list.css';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import SearchItem from '../../components/searchItem/SearchItem';
import useFetch from '../../hooks/useFetch';

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state?.destination ? location.state.destination : '');
  const [date, setDate] = useState(
    !!location.state?.date ? location.state.date : [{ startDate: new Date(), endDate: new Date() }]
  );
  const [options, setOptions] = useState(
    !!location.state?.options ? location.state.options : { adult: 1, children: 0, room: 1 }
  );
  const [openDate, setOpenDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);

  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const BASE_URL = 'https://bookingapp-production.up.railway.app';
  const RELATIVE_URL = !!destination ? `/hotels?city=${destination}&min=${min || 0}&max=${max || 10000}` : '/hotels';
  const url = BASE_URL + RELATIVE_URL;
  const { data, loading, error, reFetch } = useFetch(url);
  // const { data, loading, error, reFetch } = useFetch(RELATIVE_URL);

  const handleClick = () => {
    reFetch();
    // useFetch(`/hotels?city=${destination}`); This line gives error but why?
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="ls">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label htmlFor="">Destination</label>
              <input placeholder={destination} type="text" />
            </div>
            <div className="lsItem">
              <label htmlFor="">Check-in Date</label>
              <span
                onClick={() => {
                  setOpenDate(!openDate);
                  setOpenOptions(false);
                }}
              >
                {`${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(date[0].endDate, 'MM/dd/yyyy')} `}
              </span>
              {openDate && (
                <DateRange
                  editableDateInputs={true}
                  onChange={item => setDate([item.selection])}
                  minDate={new Date()}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                />
              )}
            </div>
            <div className="lsItem">
              <label htmlFor="">Options</label>

              <div className="lsOptionContainer">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min Price <small>per night</small>
                  </span>
                  <input type="number" onChange={e => setMin(e.target.value)} className="lsOptionInput" />
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max Price <small>per night</small>
                  </span>
                  <input type="number" onChange={e => setMax(e.target.value)} className="lsOptionInput" />
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input min={1} type="number" className="lsOptionInput" placeholder={options.adult} />
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input min={0} type="number" className="lsOptionInput" placeholder={options.children} />
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input min={1} type="number" className="lsOptionInput" placeholder={options.room} />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              'loading'
            ) : (
              <>
                {data.map(item => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;

// listSearch = ls
