import bookmark from "../assets/icons/bookmark.png";
import home from "../assets/icons/home.png";
import plus from "../assets/icons/plus.png";
import profile from "../assets/icons/profile.png";
import leftArrow from "../assets/icons/left-arrow.png";
import menu from "../assets/icons/menu.png";
import search from "../assets/icons/search.png";
import upload from "../assets/icons/upload.png";
import rightArrow from "../assets/icons/right-arrow.png";
import logout from "../assets/icons/logout.png";
import eyeHide from "../assets/icons/eye-hide.png";
import eye from "../assets/icons/eye.png";
import play from "../assets/icons/play.png";

export default {
  play,
  bookmark,
  home,
  plus,
  profile,
  leftArrow,
  menu,
  search,
  upload,
  rightArrow,
  logout,
  eyeHide,
  eye,
};

import { AntDesign, Feather } from "@expo/vector-icons";

export const icons = {
  index: (props) => <AntDesign name="home" size={26} {...props} />,
  explore: (props) => <Feather name="compass" size={26} {...props} />,
  create: (props) => <AntDesign name="pluscircleo" size={26} {...props} />,
  profile: (props) => <AntDesign name="user" size={26} {...props} />,
};
