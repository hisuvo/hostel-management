import useTheme from "../../Hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="p-2 transition">
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
