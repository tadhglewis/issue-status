import { Components } from "./components/Components";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { HistoricalIncidents } from "./incidents/HistoricalIncidents";
import { Incidents } from "./incidents/Incidents";
import { LanguageSwitcher } from "./components/LanguageSwitcher";

const App = () => (
  <div className="flex flex-col justify-between gap-8 max-w-[600px] py-8 px-4 mx-auto">
    <div className="flex justify-between items-center">
      <Header />
      <LanguageSwitcher />
    </div>
    <Incidents />
    <Components />
    <HistoricalIncidents />
    <Footer />
  </div>
);

export default App;
