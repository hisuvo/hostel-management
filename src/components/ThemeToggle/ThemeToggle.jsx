import useTheme from "../../Hooks/useTheme";
import { Sun, MoonStar } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="p-2 transition">
      {theme === "dark" ? <Sun size={27} /> : <MoonStar size={27} />}
    </button>
  );
}
