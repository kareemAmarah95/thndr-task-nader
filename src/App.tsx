import React, { useEffect, useState, useCallback } from 'react';
import axios, { AxiosError } from 'axios';

// Define the type for the stock data
interface StockTicker {
  ticker: string;
  name: string;
  description: string;
  currency_name: string;
}

const App: React.FC = () => {
  const [stocks, setStocks] = useState<StockTicker[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Fetch stock data from Polygon.io
  const fetchStocks = useCallback(async (term: string, pageNumber: number) => {
    const apiKey = import.meta.env.VITE_POLYGON_API_KEY;
    const url = `https://api.polygon.io/v3/reference/tickers?search=${term}&market=stocks&active=true&apiKey=${apiKey}&page=${pageNumber}`;

    setLoading(true);
    try {
      const response = await axios.get<{ results: StockTicker[] }>(url);
      const newStocks = response.data.results;

      // Fetch logos for each stock using Financial Modeling Prep API
      const stocksWithLogos = await Promise.all(
        newStocks.map(async (stock) => {
          const logoUrl = await fetchLogo(stock.ticker);
          return { ...stock, logo: logoUrl };
        })
      );

      setStocks((prevStocks) =>
        pageNumber === 1 ? stocksWithLogos : [...prevStocks, ...stocksWithLogos]
      );
      setHasMore(newStocks.length > 0);
    } catch (error) {
      setError((error as AxiosError).message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch logo from Financial Modeling Prep API
  const fetchLogo = async (ticker: string): Promise<string> => {
    const apiKey = 'YOUR_FMP_API_KEY'; // Replace with your FMP API key
    const url = `https://financialmodelingprep.com/api/v3/profile/${ticker}?apikey=${apiKey}`;

    try {
      const response = await axios.get<{ profile: { image: string }[] }>(url);
      return response.data.profile[0]?.image || '';
    } catch (error) {
      console.error('Error fetching logo:', error);
      return '';
    }
  };

  // Debounce the search term and fetch data
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        setPage(1);
        fetchStocks(searchTerm, 1);
      } else {
        setStocks([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, fetchStocks]);

  // Load more data when the user scrolls to the bottom
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 10 && !loading && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  // Fetch data when the page changes
  useEffect(() => {
    if (page > 1) {
      fetchStocks(searchTerm, page);
    }
  }, [page, searchTerm, fetchStocks]);

  if (loading && page === 1) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-4">Stock List</h1>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        placeholder="Search"
        className="border-1 w-80 rounded-full p-4 mx-auto block"
      />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {stocks.map((stock) => (
            <div
              key={stock.ticker}
              className="border flex justify-between items-between border-black rounded-md p-4 gap-5 hover:shadow-lg transition-shadow"
            >
              <div className="font-bold text-lg text-center">{stock.ticker}</div>
              <div className="text-gray-600 text-center">{stock.name}</div>
              <div className="text-gray-600 text-center">{stock.description}</div>

            </div>
              // {/* <div className="text-gray-600 text-center">{stock.currency_name}</div> */}
          ))}
        </div>
      </div>
      {loading && page > 1 && <div className="text-center my-4">Loading more...</div>}
      {!hasMore && <div className="text-center my-4">Sorry No Results Found</div>}
    </div>
  );
};

export default App;