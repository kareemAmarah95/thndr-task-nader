import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

// Define the type for the stock data
interface StockTicker {
  ticker: string;
  name: string;
}

const App: React.FC = () => {
  const [stocks, setStocks] = useState<StockTicker[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    // Access the API key from environment variables
    const apiKey = import.meta.env.VITE_POLYGON_API_KEY;

    // Define the API endpoint
    const url = `https://api.polygon.io/v3/reference/tickers?search=${searchTerm}&market=stocks&active=true&apiKey=${apiKey}`;

    // Debounce the API call
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        setLoading(true);
        axios
          .get<{ results: StockTicker[] }>(url)
          .then((response) => {
            setStocks(response.data.results);
            setLoading(false);
          })
          .catch((error: AxiosError) => {
            setError(error.message);
            setLoading(false);
          });
      } else {
        // Clear results if search term is empty
        setStocks([]);
      }
    }, 500); // 500ms debounce delay

    // Cleanup the timeout
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]); // Re-run effect when searchTerm changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Stock List</h1>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        placeholder="Search"
        className="border-1 w-80 rounded-md p-4 mx-auto block"
      />
      <ul>
        {stocks.map((stock) => (
          <li className="p-4" key={stock.ticker}>
            <div className="container mx-auto">
              <div className="grid grid-flow-col md:grid-cols-2 lg:grid-cols-4 gap-6">
                <strong className="p-4 flex justify-start items-center border border-black rounded-md">
                  {stock.ticker}
                </strong>{' '}
                <span className="flex justify-start items-center border border-black p-4 rounded-md">
                  - {stock.name}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;