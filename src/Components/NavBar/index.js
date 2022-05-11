import { Link, Redirect } from "react-router-dom";
const NavBar = () => {
  return (
    <div>
      <Link className="linkStyle" to="/">
        首頁
      </Link>
      <Link className="linkStyle" to="/favorite">我的最愛</Link>
      <Redirect to="/"></Redirect>
    </div>
  );
};

export default NavBar;
