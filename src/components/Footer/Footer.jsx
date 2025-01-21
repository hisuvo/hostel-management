import React from "react";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div>
      <footer className="footer footer-center bg-blue-950 text-white rounded p-10">
        <nav className="grid grid-flow-col gap-4">
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Meals</a>
          <a className="link link-hover">Upcomming Meals</a>
        </nav>
        <nav className="md:place-self-center md:justify-center">
          <div className="grid grid-flow-col gap-4">
            <Link to={"/"}>
              <img
                className="w-10 h-10"
                src="https://img.icons8.com/?size=100&id=CaSfJLdM4LTY&format=png&color=000000"
                alt=""
              />
            </Link>
            <Link to={"/"}>
              <img
                className="w-10 h-10"
                src="https://img.icons8.com/?size=100&id=13608&format=png&color=000000"
                alt=""
              />
            </Link>
            <Link to={"/"}>
              <img
                className="w-10 h-10"
                src="https://img.icons8.com/?size=100&id=34350&format=png&color=000000"
                alt=""
              />
            </Link>
          </div>
        </nav>
        <div className="footer bg-blue-950  text-white border-base-300 border-t px-10 py-4">
          <aside>
            <p className="text-center">
              Copyright © {new Date().getFullYear()} - All right reserved by
              ACME Industries Ltd
            </p>
          </aside>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
