import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "../../style/main.scss";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="listContainer">
          <div className="Container">
            Witam serdecznie na mojej stronie do sterowania.
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
