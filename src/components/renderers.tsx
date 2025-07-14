import { Pencil, Trash2, UserRound } from "lucide-react";
import type { CustomCellRendererProps } from "ag-grid-react";
import type Color from "../models/color";

const COLORS = ["#f2cfc9", "#dea2a6", "#dd785b", "#ea994d", "#efd353", "#c4c66a", "#b8caa5", "#b4d8d4", "#80a4aa", "#d2cde3", "#a299b8", "#c4b28e"]

export const GenderRenderer = (params: CustomCellRendererProps) => (
    <span className="flex items-center justify-center h-full">
        <UserRound
            color={
                params.value === "M"
                ? "#80a4aa"
                : params.value === "F"
                ? "#dea2a6"
                : "#fff"
            }
        />
    </span>
);

export const RoleRenderer = (colors: Color[]) => {
    return ({ value, data }: { value: string, data: any }) => {
        const color = colors.find((clr: Color)=>clr.id==data.colorId);
        return (
            <span className="flex h-full w-full items-center">{<span className="badge badge-sm p-2" style={{backgroundColor: color?.bg, borderColor: color?.bg, color: color?.txt}}>{data.name}</span>}</span>
        )
    }
}

export const EmptyBadgeRenderer = (colors: Color[]) => {
    return ({ value, data }: { value: string, data: any }) => {
        const color = colors.find((clr: Color)=>clr.id==value);
        console.log(value, colors, color)
        return (
            <span className="badge badge-sm w-9 hover:shadow-md cursor-pointer font-medium"
                style={{
                    color: color?.txt,
                    backgroundColor: color?.bg,
                    borderColor: color?.bg
                }}>
                A
                </span>
        )
    }
}

export const ActionsRenderer = ({ value, data }: { value: string, data: any }) => {
    return (
        <>{
            data.actions
            ?
            <div className="flex h-full w-full items-center justify-around gap-2">
            {
                data.actions.includes("edit")
                ? <button className="btn btn-xs btn-circle bg-transparent">
                    <Pencil size={12} /></button>
                : null
            }
            {
                data.actions.includes("delete")
                ? <button className="btn btn-xs btn-circle bg-transparent"><Trash2 size={12} /></button>
                : null
            }
            </div>
            : null
        }</>
    )
}