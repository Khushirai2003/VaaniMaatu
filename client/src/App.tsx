import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/hooks/use-language";
import Home from "@/pages/home";
import Exercises from "@/pages/exercises";
import Progress from "@/pages/progress";
import VoiceTest from "@/pages/voice-test";
import ReadingTest from "@/pages/reading-test";
import SimpleTest from "@/pages/simple-test";
import Guide from "@/pages/guide";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/exercises" component={Exercises} />
      <Route path="/progress" component={Progress} />
      <Route path="/voice-test" component={VoiceTest} />
      <Route path="/reading-test" component={ReadingTest} />
      <Route path="/simple-test" component={SimpleTest} />
      <Route path="/guide" component={Guide} />
      <Route path="/:rest*" component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
