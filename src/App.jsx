
 // if you have CSS for sale strip
import AppRoutes from "./routes/AppRoutes";
import Footer from "./comopnents/Footer";
import TopBar from "./comopnents/TopBar";
import Header from "./comopnents/Header";

function App() {
  return (
    <>
      {/* Constant Header & Sale Strip */}
      <TopBar/>
      <Header />
      <div className="sale-strip">
        <div className="sale-strip small-sale">
          <span>BIG SALE</span>
          <strong>50% OFF</strong>
          <small>Limited Time Offer</small>
        </div>
      </div>

      {/* Routes for all pages */}
      <AppRoutes />
      <Footer/>
    </>
  );
}

export default App;
