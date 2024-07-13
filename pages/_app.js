import "../styles/globals.css";

function MyApp({ Component, pageProps, customProp }) {
  // You can wrap your pages with a layout component here
  return (
    <div>
      {/* Example of passing a customProp */}
      <Component {...pageProps} customProp={customProp} />
    </div>
  );
}

export default MyApp;
