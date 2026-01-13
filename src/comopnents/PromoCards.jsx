import promo1 from "../assets/promo1.png";
import promo2 from "../assets/promo2.png";

const PromoCards = () => {
  return (
    <section className="promo">
      <div className="promo-card">
        <img src={promo1} alt="Top brands" className="promo-img" />
        <div className="promo-content">
          <span className="badge">Top brands</span>
          <h3>Reliability – Explore Our Auto Parts</h3>
          <p>Different Premium, Makes</p>
          <button>Shop Now</button>
        </div>
      </div>

      <div className="promo-card">
        <img src={promo2} alt="Best choice" className="promo-img" />
        <div className="promo-content">
          <span className="badge">Best Choice</span>
          <h3>Innovative Solutions For Auto Care</h3>
          <p>Curabitur Amet, Et Viverra</p>
          <button>Shop Now</button>
        </div>
      </div>
    </section>
  );
};

export default PromoCards;
