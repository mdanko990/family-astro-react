// React Grid Logic
import { useState, useEffect } from "react";
// Theme
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";
import { GenderRenderer, RoleRenderer } from "./renderers";

ModuleRegistry.registerModules([AllCommunityModule]);

/**
 * Fetch example Json data
 * Not recommended for production use!
 */
export const useFetchJson = <T,>(url:string, limit?: number) => {
    const [data, setData] = useState<T[]>();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            // Note error handling is omitted here for brevity
            const response = await fetch(url);
            const json = await response.json();
            const data = limit ? json.slice(0, limit) : json;

            setData(data);
            setLoading(false);
        };
        fetchData();
    }, [url, limit]);
    return { data, loading };
};
type Gender = "M" | "F" | null;
type Fact = "BIRTH" | "MARRIAGE" | "DEATH" | null;
type Role = "CHILD" | "FATHER" | "MOTHER" | "GODFATHER" | "GODMOTHER" | null;
type Status = "селянин" | null;
type AgeGroup = "Y" | "M" | "W" | "D";
// Row Data Interface
interface IRow {
    lastName: string;
    maidenName: string;
    firstName: string;
    patronym: string;
    gender: Gender;
    type: Fact;
    role: Role;
    status: Status;
    age: number;
    ageGroup: AgeGroup; 
    date: Date;
    place: string;
    comment: string;
    archive: string;
    fond: string;
    inventory: string;
    file: string;
    page: number;
    link: string;
    inMyHeritage: boolean;
    inFamilySearch: boolean;
    inAncestry: boolean;
}

// Create new GridExample component
const Table = () => {
  // Row Data: The data to be displayed.
//   const { data, loading } = useFetchJson<IRow>(
//     "https://www.ag-grid.com/example-assets/space-mission-data.json",
//   );
    const [data] = useState<IRow[]>([
        {
            lastName: "test",
            maidenName: "test",
            firstName: "test",
            patronym: "test",
            gender: "F",
            type: "BIRTH",
            role: "CHILD",
            status: null,
            age: 0,
            ageGroup: "Y", 
            date: new Date(),
            place: "",
            comment: "",
            archive: "",
            fond: "",
            inventory: "",
            file: "",
            page: 0,
            link: "",
            inMyHeritage: false,
            inFamilySearch: false,
            inAncestry: false
        }
    ])

  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState<ColDef<IRow>[]>([
    { field: "lastName" },
    { field: "maidenName" },
    { field: "firstName" },
    { field: "patronym" },
    { field: "gender", filter: true, cellRenderer: GenderRenderer },
    { field: "type", filter: true },
    { field: "role", filter: true, cellRenderer: RoleRenderer },
    { field: "status" },
    { field: "age" },    
    { field: "date", filter: true },
    { field: "place" },
    { field: "comment" },
    { field: "archive" },
    { field: "fond" },
    { field: "inventory" },
    { field: "file" },
    { field: "page" },
    { field: "link" },
    { field: "inMyHeritage", filter: true },
    { field: "inFamilySearch", filter: true },
    { field: "inAncestry", filter: true }
  ]);

  const defaultColDef = {
    editable: true,
    flex: 1,
    minWidth: 100,
  };

  // Container: Defines the grid's theme & dimensions.
  return (
    <div className="w-full h-100">
      <AgGridReact
        rowData={data}
        columnDefs={colDefs}
        modules={[AllCommunityModule]}
        pagination={true}
        defaultColDef={defaultColDef}
        />
    </div>
  );
};

export default Table;