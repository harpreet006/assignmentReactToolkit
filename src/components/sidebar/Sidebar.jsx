import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import Cookies from "js-cookie";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faPowerOff } from "@fortawesome/free-solid-svg-icons";

//redux
import { setSidebarState } from "../../redux/reducers/LayoutReducer";

// data
import MenuItems from "./menuItems";

const Sidebar = () => {
  // track the hover state of the sidebar
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [disableHover, setDisableHover] = useState(false);

  // state to track the scrolling of the sidebar
  // if scrolled -> display the blur effect on top
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollableDivRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSidebarCollapsed } = useSelector((state) => state.layout);

  // on first closing of the sidebar, it should close direclty and the hover effect should not be triggered
  useEffect(() => {
    if (isSidebarCollapsed) {
      setDisableHover(true);

      setTimeout(() => {
        setDisableHover(false);
      }, 500);
    }
  }, [isSidebarCollapsed]);

  const handleSidebarToggle = () => {
    dispatch(setSidebarState(!isSidebarCollapsed));
  };

  // add an event listener for scroll on the sidebar to enable blur effect on top of it when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (scrollableDivRef.current) {
        const isScrolledDown = scrollableDivRef.current.scrollTop > 2;
        setIsScrolled(isScrolledDown);
      }
    };

    const div = scrollableDivRef.current;
    div.addEventListener("scroll", handleScroll);

    return () => div.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      // track the hover of sidebar using mouse enter and mouse leave
      onMouseEnter={(e) => {
        isSidebarCollapsed && setIsSidebarHovered(true);
      }}
      onMouseLeave={(e) => {
        isSidebarCollapsed && setIsSidebarHovered(false);
      }}
      className={`h-screen bg-primary text-white transition-all ease-in fixed z-[400] flex flex-col ${
        isSidebarCollapsed
          ? disableHover
            ? `w-[80px] items-center`
            : !isSidebarHovered
            ? `w-[80px] items-center`
            : `w-[250px]`
          : `w-[250px]`
      } `}
    >
      {/* Sidebar Logo section */}
      <div
        className={`h-[50px]  pl-4 w-full flex items-center transition-all relative`}
      >
        <NavLink
          to={"/"}
          className={`font-bold transition-all ml-5 ${
            isSidebarCollapsed && !isSidebarHovered
              ? "text-[16px]"
              : "text-[24px]"
          }`}
        >
          <h1>{isSidebarCollapsed && !isSidebarHovered ? "cu" : "CLICKUP"}</h1>
        </NavLink>

        {/* Icon Button to collapse and expand sidebar */}
        {
          <FontAwesomeIcon
            icon={faAngleLeft}
            className={`h-[13px] w-[13px] aspect-square p-1.5 bg-secondary border-[4px] border-base-100 rounded-full text-base transition-all absolute right-[0] top-[50%] translate-y-[-50%]  translate-x-[50%] cursor-pointer ${
              // rotate the icon on sidebar collapse
              isSidebarCollapsed
                ? "rotate-180 opacity-0 pointer-events-none"
                : ""
            } ${
              isSidebarCollapsed && isSidebarHovered
                ? "delay-100 opacity-100 pointer-events-auto "
                : ""
            }`}
            onClick={() => handleSidebarToggle()}
          />
        }
      </div>

      {/* Sidebar Menu Items */}
      <div
        className={`${
          isScrolled ? "before:block" : "before:hidden" // for scroll blur effect
        } w-full sidebarMenuItems relative overflow-hidden flex-1 ${
          // add a margin for the scrollbar only when sidebar is expanded
          !isSidebarCollapsed || isSidebarHovered ? "pr-1" : ""
        }`}
      >
        <div
          ref={scrollableDivRef}
          className="sidebarScrollbar h-full pt-.5 pb-5 overflow-x-hidden"
        >
          {MenuItems.map((item, index) => {
            return (
              <div
                key={index}
                // only navigate to the link if the item is not disabled
                onClick={() => !item?.disabled && navigate(item.link)}
                className={`text-white transition-all px-8 py-2.5 my-5 mx-3 min-h-0 flex items-center rounded-sm opacity-90 peer-hover:bg-primary-focus peer-hover:opacity-100 hover:bg-primary-focus hover:opacity-100  ${
                  item?.disabled ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                {item?.subMenu ? (
                  <div
                    key={index}
                    tabIndex={0}
                    className={`collapse ${
                      !item.disabled &&
                      (!isSidebarCollapsed || isSidebarHovered) &&
                      "collapse-arrow"
                    } `}
                  >
                    {/* If app is not enabled, show not allowed cursor */}
                    <input
                      type="checkbox"
                      className={`peer min-h-0 h-full  w-full ${
                        !item.disabled
                          ? "cursor-pointer"
                          : "cursor-not-allowed "
                      }`}
                    />
                    <div
                      className={`collapse-title px-0 py-0 after:top-[1rem]  bg-primary transition-all min-h-0 flex items-center rounded-sm   ${
                        !item.disabled ? "cursor-pointer" : "cursor-not-allowed"
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={item.icon}
                        className={`w-8 ml-1 mr-5 shrink-0 text-[15px]`}
                      />
                      <p
                        className={`opacity-1 transition-all whitespace-nowrap  ${
                          isSidebarCollapsed && !isSidebarHovered
                            ? "w-0 overflow-hidden opacity-0 translate-x-[-10px]"
                            : ""
                        }`}
                      >
                        {item.title}
                      </p>
                    </div>

                    {!item.disabled &&
                      (!isSidebarCollapsed || isSidebarHovered) && (
                        <div className={`collapse-content px-0 py-0`}>
                          {item.subMenu.map((launch, index) => {
                            return (
                              <Link
                                to={"/task"}
                                key={index}
                                className="break-words transition-all mx-3 px-4 text-left first-of-type:mt-5 py-2 cursor-pointer rounded-sm opacity-90 hover:bg-primary-focus hover:opacity-100 flex gap-2"
                              >
                                <span
                                  className={`w-8 shrink-0 flex justify-center`}
                                >
                                  -
                                </span>
                                <span className={`transition-all`}>
                                  {launch.title}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                  </div>
                ) : (
                  <>
                    {" "}
                    <FontAwesomeIcon
                      icon={item.icon}
                      className={`w-8 ml-1 mr-5 shrink-0 text-[15px]`}
                    />
                    <p
                      className={`opacity-1 transition-all whitespace-nowrap  ${
                        isSidebarCollapsed && !isSidebarHovered
                          ? "w-0 overflow-hidden opacity-0 translate-x-[-10px]"
                          : ""
                      }`}
                    >
                      {item.title}
                    </p>
                  </>
                )}
              </div>
            );
          })}

          <div
            onClick={() => {
              Cookies.remove("clickup");
              localStorage.clear("userData");
              navigate("/login");
            }}
            className={`text-white transition-all px-8 py-2.5 my-5 mx-3 min-h-0 flex items-center rounded-sm opacity-90 peer-hover:bg-primary-focus peer-hover:opacity-100 hover:bg-primary-focus hover:opacity-100 gap-2 cursor-pointer
            `}
          >
            <FontAwesomeIcon
              icon={faPowerOff}
              className={`w-8 mr-2 shrink-0 text-[15px]`}
            />
            <p
              className={`opacity-1 transition-all whitespace-nowrap  ${
                isSidebarCollapsed && !isSidebarHovered
                  ? "w-0 overflow-hidden opacity-0 translate-x-[-10px]"
                  : ""
              }`}
            >
              Logout
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
