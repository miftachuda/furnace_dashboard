import { ZoomableCanvas } from "./components/ZoomableCanvas";
import Headers from "./components/Header";
import Dashboard from "./components/MainPage";
import { ParameterProvider } from "./context/ParameterContext";

// Sample background image URL (replace with your own 1920x1080 image)
const BACKGROUND_IMAGE = "src/assets/bg2.jpg";

function App() {
  return (
    <div className="w-full h-screen overflow-hidden">
      <Headers></Headers>
      <ParameterProvider>
        <ZoomableCanvas backgroundImage={BACKGROUND_IMAGE}>
          <Dashboard />
        </ZoomableCanvas>
      </ParameterProvider>
    </div>
  );
}

export default App;
