/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

const initialMenuList = [
  {
    menuName: "Home",
    subMenuList: [
      { subMenuName: "subMenu1" },
      { subMenuName: "subMenu2" },
    ],
    isMenuActive: false,
  },
  {
    menuName: "About",
    subMenuList: [
      { subMenuName: "subAbout1" },
      { subMenuName: "subAbout2" },
    ],
    isMenuActive: false,
  },
];

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [menuListData, setMenuListData] = useState(initialMenuList);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleMenuToggle = (index) => {
    const temp = menuListData.map((menu, idx) => ({
      ...menu,
      isMenuActive: idx === index ? !menu.isMenuActive : false,
    }));
    setMenuListData(temp);
  };

  const resetMenu = () => {
    setMenuListData(initialMenuList);
  };

  const navlinks = (
    <>
    {menuListData.some(menu => menu.isMenuActive)?<button onClick={resetMenu}>Back</button>:null}

      {menuListData.map((item, index) => (
        <div key={index}>
          {menuListData.some(menu => menu.isMenuActive) ? null : (
            <button onClick={() => handleMenuToggle(index)}>{item?.menuName}</button>
          )}
          {item?.isMenuActive && item?.subMenuList?.map((subItem, subItemIndex) => (
            <h6 key={subItemIndex}>{subItem?.subMenuName}</h6>
          ))}
        </div>
      ))}
    </>
  );

  return (
    <div className="navbar flex items-center md:justify-evenly w-full">
      <div className="flex justify-between items-center w-full lg:w-auto">
        <button onClick={toggleDrawer} className="btn btn-ghost lg:hidden">
          {isDrawerOpen ? (
            <RiCloseLine className="text-2xl" />
          ) : (
            <RiMenu3Line className="text-2xl" />
          )}
        </button>
        <p>LOGO</p>
      </div>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:hidden`}
      >
        <div className="p-4 flex items-center">
          <button
            onClick={toggleDrawer}
            className="btn btn-ghost absolute top-4 left-4"
          >
            <RiCloseLine className="text-2xl" />
          </button>
        </div>
        {/* mobile devices Navlinks */}
        <ul className="menu p-4 text-black">{navlinks}</ul>
      </div>
      {/* large devices navlinks */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-black">{navlinks}</ul>
      </div>
    </div>
  );
};

export default Navbar;
