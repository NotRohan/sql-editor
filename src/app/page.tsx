import DbConnectivityStatus from "@/components/DbConnectivityStatus";
import TABLE_NAMES from "@/constants/constants";
import EditorTab from "@/containers/EditorTab";
import HistoryList from "@/containers/HistoryList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/Tabs";
import { Info } from 'lucide-react'

const queryHistory = [
  { query: 'SELECT * FROM users;', timestamp: new Date() },
  { query: 'SELECT * FROM users;', timestamp: new Date() },
  { query: 'SELECT * FROM users;', timestamp: new Date() },
  { query: 'SELECT * FROM users;', timestamp: new Date() },
  { query: 'SELECT * FROM users;', timestamp: new Date() },
  { query: 'SELECT * FROM users;', timestamp: new Date() },
  { query: 'SELECT * FROM users;', timestamp: new Date() },
  { query: 'SELECT * FROM users;', timestamp: new Date() },
  { query: 'SELECT * FROM users;', timestamp: new Date() },
  { query: 'SELECT * FROM users;', timestamp: new Date() },
  { query: 'SELECT * FROM users;', timestamp: new Date() },
  { query: 'SELECT * FROM users;', timestamp: new Date() },
  { query: 'SELECT * FROM users;', timestamp: new Date() },
  { query: 'SELECT * FROM users;', timestamp: new Date() },
  { query: 'SELECT * FROM users;', timestamp: new Date() },
  { query: 'SELECT * FROM users;', timestamp: new Date() },
  { query: 'SELECT * FROM users;', timestamp: new Date() },
  { query: 'SELECT * FROM users;', timestamp: new Date() },
  // Add more query history items
];

export default function Home() {
  return (
    <div className="relative h-screen overflow-x-hidden">
      <div className="container pt-16 lg:pt-20 max-w-7xl w-full mx-auto h-full relative">
        <DbConnectivityStatus />
        <Tabs
          defaultValue="Editor"
          className="max-w-4xl w-full mx-auto mt-16 pt-2"
        >
          <TabsList className="mx-auto">
            <TabsTrigger value="Editor">Editor</TabsTrigger>
            <TabsTrigger value="Tables">Tables</TabsTrigger>
            <TabsTrigger value="History">History</TabsTrigger>
          </TabsList>
          <TabsContent value="Editor">
            <EditorTab />
          </TabsContent>
          <TabsContent value="Tables">
            <div className="pb-4 flex flex-wrap gap-5 justify-center items-center">
              {TABLE_NAMES.map((tableName, index) => {
                return (
                  <div
                    className="relative flex justify-center items-center w-[220px] h-[100px] shadow-[0_4px_20px_rgb(0,0,0,0.12)] hover:bg-slate-50 hover:scale-105 transition-all duration-300 mb-4 p-4 rounded-lg cursor-pointer"
                    key={tableName}
                  >
                    <Info className="absolute right-2 top-2 w-4 h-4"/>
                    <span className="font-bold">{tableName}</span>
                  </div>
                );
              })}
            </div>
          </TabsContent>
          <TabsContent value="History">
            <HistoryList items={queryHistory} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
