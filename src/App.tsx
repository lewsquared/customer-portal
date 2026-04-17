import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Demo from "./pages/Demo.tsx";
import Index from "./pages/Index.tsx";
import OrderReceived from "./pages/OrderReceived.tsx";
import OrderCollected from "./pages/OrderCollected.tsx";
import Processing from "./pages/Processing.tsx";
import PaymentFailed from "./pages/PaymentFailed.tsx";
import OrderComplete from "./pages/OrderComplete.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Demo />} />
          <Route path="/order-received" element={<OrderReceived />} />
          <Route path="/order-collected" element={<OrderCollected />} />
          <Route path="/processing" element={<Processing />} />
          <Route path="/out-for-delivery" element={<Index />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />
          <Route path="/order-complete" element={<OrderComplete />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
