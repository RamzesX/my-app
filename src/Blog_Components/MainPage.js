import Header from './Header.js';
import Flex from './Flex';
import Posts from './Posts.js';
import Nothing from './Nothing.js';
import Footer from './Footer.js';
import Modal from './Modal.js';
import './PostyKategorii.css';
const react = require("react");


class MainPage extends react.Component {

  render() {
    return (
    <div className="highlevel">
    <Header />
    <Flex />
    <Posts />
    <Nothing />
    <Footer />
    <Modal />
    </div>
    )
  }
}



export default MainPage;