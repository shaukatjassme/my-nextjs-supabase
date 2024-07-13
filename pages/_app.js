// pages/_app.js


import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  // You can wrap your pages with a layout component here
  return (
    <div>
 

      {/* Render the page component */}
      <Component {...pageProps} />

    
    </div>
  );
}

export default MyApp;
