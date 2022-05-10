import { Link,Redirect } from "react-router-dom";
const NavBar = () => {
  return (
    <div>
      <Link to="/">首頁</Link>
      <Link to="/favorite">我的最愛</Link>
      <Redirect to="/"></Redirect>
    </div>
  );
};

export default NavBar;
