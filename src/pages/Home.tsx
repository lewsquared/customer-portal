import { BottomTabBar } from "@/components/nav/BottomTabBar";

const Home = () => (
  <main className="min-h-screen bg-background font-sans antialiased">
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-5 pb-24 text-center">
      <h1 className="text-2xl font-extrabold text-primary">Home</h1>
      <p className="mt-2 text-sm text-muted-foreground">Coming soon</p>
    </div>
    <BottomTabBar />
  </main>
);

export default Home;
