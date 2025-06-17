import { Components } from "./components/Components";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { HistoricalIncidents } from "./incidents/HistoricalIncidents";
import { Incidents } from "./incidents/Incidents";

const App = () => (
  <div className="flex flex-col justify-between gap-8 max-w-[600px] py-8 px-4 mx-auto">
    <Header />
    <Incidents />
    <Components />
    <HistoricalIncidents />
    <Footer />
  </div>
);

export default App;
