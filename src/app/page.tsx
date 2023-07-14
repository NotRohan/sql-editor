import DbConnectivityStatus from "@/components/DbConnectivityStatus";
import { Input } from "@/components/ui/Input";
import EditorTab from "@/containers/EditorTab";
import { Button } from "@/ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/Tabs";

export default function Home() {
  return (
    <div className="relative h-screen overflow-x-hidden">
      <div className="container pt-16 lg:pt-20 max-w-7xl w-full mx-auto h-full relative">
        <DbConnectivityStatus />
        <Tabs defaultValue="Editor" className="max-w-4xl w-full mx-auto mt-16 pt-2">
          <TabsList className="mx-auto">
            <TabsTrigger value="Editor">Editor</TabsTrigger>
            <TabsTrigger value="Tables">Tables</TabsTrigger>
            <TabsTrigger value="History">History</TabsTrigger>
          </TabsList>
          <TabsContent value="Editor">
            <EditorTab />
          </TabsContent>
          <TabsContent value="Tables">Tables</TabsContent>
          <TabsContent value="History">History</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
