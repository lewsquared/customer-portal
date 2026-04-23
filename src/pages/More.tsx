import { BottomTabBar } from "@/components/nav/BottomTabBar";

const More = () => (
  <main className="min-h-screen bg-background font-sans antialiased">
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-5 pb-24 text-center">
      <h1 className="font-display text-3xl font-extrabold text-primary">More</h1>
      <p className="mt-2 text-sm text-muted-foreground">Coming soon</p>
    </div>
    <BottomTabBar />
  </main>
);

export default More;
