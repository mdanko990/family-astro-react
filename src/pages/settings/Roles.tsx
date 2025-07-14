import { AllCommunityModule, ModuleRegistry, type CellValueChangedEvent, type ColDef, type RowValueChangedEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useRef, useState } from "react";
import Color from "../../models/color";
import { ActionsRenderer, EmptyBadgeRenderer, RoleRenderer } from "../../components/renderers";
import { Check } from "lucide-react";
ModuleRegistry.registerModules([AllCommunityModule]);

interface Role {
    id: string;
    name: string;
    colorId: string;
}

interface IRow extends Role {
    actions: any,
}

interface RoleFact {
    factId: string;
    roleId: string;
    qty: number;
}

interface Fact {
    id: string;
    name: string;
}

const DEFAULT_ACTIONS: ActionType[] = ["delete"]

const Roles = () => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [colors, setColors] = useState<Color[]>([]);

    const [rowData, setRowData] = useState<IRow[]>([])
    
    const [colDefs, setColDefs] = useState<ColDef<IRow>[]>([]);
    const [rowEdition, setRowEdition] = useState<any>(null);
    
    const onCellValueChanged = useCallback((event: CellValueChangedEvent) => {
        console.log(
          "onCellValueChanged: " + event.colDef.field + " = " + event.newValue,
        );
      }, []);

    const onRowValueChanged = useCallback((event: RowValueChangedEvent) => {
        const data = event.data;
        console.log(
          "onRowValueChanged: (" +
            data.name +
            ", " +
            data.color +
            ")",
        );
    }, []);

    useEffect(()=>{
        fetch("api/roles.json")
        .then(res => res.json())
        .then(data => {
            setRoles(data)
            setRowData(data.map((row: any)=>({...row, actions: DEFAULT_ACTIONS})))
        })
        .catch(()=>setRoles([]))

        fetch("api/colors.json")
        .then(res => res.json())
        .then(data => setColors(data))
        .catch(()=>setColors([]))

        setColDefs([
            { field: "name", editable: true, flex:1 },
            {
                field: "colorId",
                headerName: "Color",
                maxWidth: 70,
                cellRenderer: EmptyBadgeRenderer(colors),
                editable: true,
                cellEditorPopup: true,
            },
            { field: "actions", headerName: "", maxWidth: 70, cellClass: "flex justify-center", cellRenderer: ActionsRenderer },
        ])
    },[])
    
    // useEffect(()=>{
    //     setColDefs([
    //         { field: "name", cellRenderer: RoleRenderer(colors)},
    //         { field: "actions", cellRenderer: ActionsRenderer },
    //     ])
    // }, [roles, colors])
    const gridRef = useRef<AgGridReact>(null);

    const onBtStopEditing = useCallback(() => {
        console.log("editing?",gridRef.current!.api.getFocusedCell())
        gridRef.current!.api.stopEditing();
        setRowEdition(null);
    }, []);

    return (
        <div className="">
            <div className="flex justify-between pb-4">
                <h2 className="card-title">Roles</h2>
                {
                    !!rowEdition ?
                    <button className="btn btn-xs btn-circle" onClick={onBtStopEditing}>
                        <Check size={12} />
                    </button> : null
                }
            </div>
            <div className="h-100">
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={colDefs}
                    modules={[AllCommunityModule]}
                    editType={"fullRow"}
                    onCellValueChanged={onCellValueChanged}
                    onRowValueChanged={onRowValueChanged}
                    onRowEditingStarted={(event)=>setRowEdition(event.data)}
                    onRowEditingStopped={()=>setRowEdition(null)}
                    />
            </div>
        </div>
    )
}

export default Roles;