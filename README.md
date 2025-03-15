# thndr-task-nader
Stock Ticker Search Application
This is a React-based web application that allows users to search for stock tickers using the Polygon.io API. The application provides a user-friendly interface to search for stocks by their ticker symbol or name, and displays the results in a clean, responsive layout.

Features
Search Functionality: Users can search for stock tickers by entering a search term in the input field.

Debounced API Calls: The application uses a debounce mechanism to limit the number of API calls made while the user is typing.

Loading State: Displays a loading message while fetching data from the API.

Error Handling: Shows an error message if the API request fails.

Responsive Design: The layout is responsive and adapts to different screen sizes.

Technologies Used
React: A JavaScript library for building user interfaces.

Axios: A promise-based HTTP client for making API requests.

Polygon.io API: A financial data API used to fetch stock ticker information.

Tailwind CSS: A utility-first CSS framework for styling the application.

Getting Started
Prerequisites
Node.js and npm installed on your machine.

A valid API key from Polygon.io.

Installation
Clone the repository:

bash
Copy
git clone https://github.com/your-username/stock-ticker-search.git
cd stock-ticker-search
Install dependencies:

bash
Copy
npm install
Set up environment variables:
Create a .env file in the root directory of the project and add your Polygon.io API key:

env
Copy
VITE_POLYGON_API_KEY=your_api_key_here
Run the application:

bash
Copy
npm run dev
The application should now be running on http://localhost:3000.

Usage
Search for Stock Tickers:

Enter a search term in the input field (e.g., "AAPL" or "Apple").

The application will automatically fetch and display the matching stock tickers.

View Results:

The results will be displayed in a list format, showing the stock ticker symbol and the company name.

Loading and Error States:

If the application is fetching data, a "Loading..." message will be displayed.

If an error occurs (e.g., network issues or invalid API key), an error message will be shown.

Code Structure
App Component:

The main component that handles the state and logic for fetching and displaying stock tickers.

Uses React's useState and useEffect hooks to manage state and side effects.

Implements a debounce mechanism to optimize API calls.

StockTicker Interface:

Defines the structure of the stock data returned by the API.

Axios:

Used to make HTTP requests to the Polygon.io API.

Handles errors using the AxiosError type.

Tailwind CSS:

Used for styling the application, including the input field and the list of stock tickers.

Customization
Styling:

You can customize the styling by modifying the Tailwind CSS classes in the JSX.

API Endpoint:

If you want to use a different API endpoint or modify the query parameters, update the url variable in the useEffect hook.

Debounce Delay:

Adjust the debounce delay by changing the value in the setTimeout function.

Contributing
Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for more details.

Acknowledgments
Polygon.io for providing the financial data API.

React and Tailwind CSS for making it easy to build and style the application.
