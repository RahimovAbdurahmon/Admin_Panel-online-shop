import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkside from "../../hooks/useDarkSide";

function Switcher() {
  const [colorTheme, settheme] = useDarkside();

  const [darkside, Setdarkside] = useState(
    colorTheme === "light" ? true : false
  );
  const toggleDarkMode = (checked) => {
    settheme(colorTheme);
    Setdarkside(checked);
  };
  return (
    <div>
      <DarkModeSwitch checked={darkside} onChange={toggleDarkMode} size={30} />
    </div>
  );
}
export default Switcher;
