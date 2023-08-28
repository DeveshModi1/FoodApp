import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge"
import Cart from "../screens/Cart";
import Modal from "../Modal";
import { useCart } from "./ContextReducer";

export default function Navbar() {
  const navigate = useNavigate();
  let data = useCart();
  const [cartView, setcartView] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-primary text-light">
      <div className="container-fluid">
        <Link className="navbar-brand fst-italic text-light" to="/">
          FoodOrder
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto ">
            <li className="nav-item">
              <Link
                className="nav-link active text-light"
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            {localStorage.getItem("authToken") ? (
              <li className="nav-item">
                <Link
                  className="nav-link active text-light"
                  aria-current="page"
                  to="/myorder"
                >
                  My Orders
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
          {!localStorage.getItem("authToken") ? (
            <div className="d-flex ">
              <Link className="btn bg-white text-primary mx-1" to="/login">
                Login
              </Link>

              <Link
                className="btn bg-white text-primary mx-1 me-1"
                to="/signuser"
              >
                SignUp
              </Link>
            </div>
          ) : (
            <div>
              <div className="btn bg-white text-primary mx-1" onClick={()=>{setcartView(true)}}>My Cart {" "}
              {data.length>0?<Badge pill bg = "danger">{data.length}</Badge>:""}
              
              </div>
              {cartView? <Modal onClose={()=>{setcartView(false)}}><Cart/></Modal>:null}

              <div
                className="btn bg-white text-danger mx-1"
                onClick={handleLogout}
              >
                LogOut
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
