import "../styles/globals.css";

function MyApp({ Component, pageProps, customProp }) {

  return (
    <div>
   
      <Component {...pageProps} customProp={customProp} />
    </div>
  );
}

export default MyApp;
