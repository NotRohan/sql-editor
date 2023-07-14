import { useEffect, useState } from "react";
import Papa from "papaparse";
import TABLE_NAMES from "@/constants/constants";
import { GridValidRowModel } from "@mui/x-data-grid";

interface CSVRow {
  [key: string]: string;
  id: string;
}

const getURL = (query: string) =>
  `https://api.github.com/repos/graphql-compose/graphql-compose-examples/contents/examples/northwind/data/csv/${query}.csv`;

const useQueryData = (query: string) => {
  const [data, setData] = useState<GridValidRowModel[]>([]);
  const [queryRuntime, setQueryRuntime] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const parseCSVData = (csvData: string): CSVRow[] => {
    const parsedData = Papa.parse<CSVRow>(csvData, { header: true });
    const structuredData: CSVRow[] = parsedData.data.map((row, index) => ({
      ...row,
      id: `${index + 1}`,
    }));
    console.log(structuredData)
    return structuredData;
  };
  

  useEffect(() => {
    const fetchQueryData = (query: string) => {
      setData([]);
      const tableName = TABLE_NAMES.find((name) => name === query);
      if (tableName) {
        setError(false);
        fetch(getURL(query), {
          headers: {
            Accept: "application/vnd.github.v4+raw",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            const structuredData = parseCSVData(
              atob(data.content.replace("\n", ""))
            );
            setData(structuredData);
          })
          .catch((error) => {
            console.log(error.message);
          });
      } else {
        setError(true);
      }
    };
    let t0 = performance.now();
    fetchQueryData(query);
    let t1 = performance.now();
    setQueryRuntime((t1 - t0).toString());
  }, [query]);

  return { data, queryRuntime, error };
};

export default useQueryData;
