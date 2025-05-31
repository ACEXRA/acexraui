import Content from "./Content";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Main = () => {
  return (
    <div className="main">
      <Sidebar />
      <Content />
    </div>
  );
};

export default Main;
