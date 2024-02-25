import DatePicker from "./components/DatePicker";
import ThemeProvider from "./context/ThemeContext";

function App() {
  return (
    <div>
      <ThemeProvider>
        <DatePicker />
      </ThemeProvider>
    </div>
  );
}

export default App;
