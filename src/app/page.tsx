import DbConnectivityStatus from "@/components/DbConnectivityStatus";
import AppNavigationTabs from "@/containers/AppNavigationTabs";

export default function Home() {
  return (
    <div className="relative h-screen overflow-x-hidden">
      <div className="container pt-16 lg:pt-20 max-w-7xl w-full mx-auto h-full relative">
        <DbConnectivityStatus />
        <AppNavigationTabs />
      </div>
    </div>
  );
}
