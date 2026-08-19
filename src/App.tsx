import { BrowserRouter } from "react-router-dom";
import { AppProviders } from "@/app/providers";
import { AnimatedRoutes } from "@/app/routes";
import { Grain } from "@/components/layout/Grain";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { CursorProvider } from "@/components/layout/Cursor";

const App = () => (
  <AppProviders>
    <BrowserRouter>
      <CursorProvider>
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full px-5 py-3 font-body text-sm font-medium transition-transform focus:translate-y-0"
          style={{ backgroundColor: "#F2EEE7", color: "#0E0D0C" }}
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Grain />
        <AnimatedRoutes />
      </CursorProvider>
    </BrowserRouter>
  </AppProviders>
);

export default App;
