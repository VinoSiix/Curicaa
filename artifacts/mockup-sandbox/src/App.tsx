import { ThemeProvider } from "next-themes";
import { Route, Switch } from "wouter";
import { HubPage } from "./pages/HubPage";
import { SubjectPage } from "./pages/SubjectPage";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <Switch>
        <Route path="/" component={HubPage} />
        <Route path="/:ageGroup/:subject" component={SubjectPage} />
        <Route component={HubPage} />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
