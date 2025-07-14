import { useEffect, useState, type JSX, } from "react";
import { Plus } from "lucide-react";
import { Popover } from "react-tiny-popover";
import type Color from "../../models/color";

interface ColorFormPopupProps {
    current?: Color,
    target: JSX.Element,
    create: Function,
    edit: Function,
    delete: Function,
    isOpen: boolean,
    setIsOpen: Function
}

const ColorFormPopup = (props: ColorFormPopupProps) => {
    const [newTxtColor, setNewTxtColor] = useState(props.current?.txt || "");
    const [newBgColor, setNewBgColor] = useState(props.current?.bg || "");

    useEffect(() => {
        if (props.current) {
            setNewTxtColor(props.current.txt);
            setNewBgColor(props.current.bg);
        } else {
            setNewTxtColor("");
            setNewBgColor("");
        }
    }, [props.current, props.isOpen]);

    const isValidHex = (hex: string): boolean => {
        const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        return hexPattern.test(hex);
    };
    const isFormValid = isValidHex(newTxtColor) && isValidHex(newBgColor);

    const closePopover = () => {
        props.setIsOpen(false);
        setNewBgColor("");
        setNewTxtColor("");
    }

    return (
        <Popover
        isOpen={props.isOpen}
        positions={['top', 'bottom', 'left', 'right']}
        content={
            <div className="card w-60 bg-base-100 card-xs shadow-sm m-4">
                <div className="card-body">
                    <input
                        autoFocus
                        type="text"
                        placeholder="Text HEX"
                        className={`input input-xs ${
                            newTxtColor && !isValidHex(newTxtColor) ? 'input-error' : ''
                        } ${
                            newTxtColor && isValidHex(newTxtColor) ? 'input-success' : ''
                        }`}
                        value={newTxtColor}
                        onChange={(val) => setNewTxtColor(val.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Background HEX"
                        className={`input input-xs ${
                            newBgColor && !isValidHex(newBgColor) ? 'input-error' : ''
                        } ${
                            newBgColor && isValidHex(newBgColor) ? 'input-success' : ''
                        }`}
                        value={newBgColor}
                        onChange={(e) => setNewBgColor(e.target.value)}
                        required
                    />
                    <div className="card-actions">
                        {
                            props.current
                            ? <div className="flex gap-2">
                                <button
                                    className="btn btn-xs btn-outline btn-error"
                                    onClick={()=>props.delete(props.current)}
                                >Delete</button>
                                <button
                                    className={`btn btn-xs ${!isFormValid ? 'btn-disabled' : ''}`}
                                    onClick={()=>props.edit({id: props.current?.id, txt: newTxtColor, bg: newBgColor})}
                                >Save</button>
                            </div>
                            : <button
                                className={`btn btn-xs w-full ${!isFormValid ? 'btn-disabled' : ''}`}
                                onClick={()=>props.create({txt: newTxtColor, bg: newBgColor})}
                            >Add</button>
                        }
                    </div>
                </div>
            </div>
        }
        onClickOutside={closePopover}
    >
        {props.target}
    </Popover>)
}

const Palette = () => {
    const [colors, setColors] = useState<Color[]>([]);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editTargetId, setEditTargetId] = useState<string | null>(null);

    useEffect(()=>{
        fetch("api/colors.json")
        .then(res => res.json())
        .then(data => setColors(data))
        .catch(()=>setColors([]))
    },[])
    
    const createColor = (clr: Color) => {
        const newColors = [...colors];
        newColors.push({id: `${Math.floor(Math.random() * 1000) + 1}`, txt: clr.txt, bg: clr.bg})
        setColors(newColors);
        setIsCreateOpen(false);
    }

    const editColor = (clr: Color) => {
        const index = colors.findIndex((color)=>color.id === clr.id)
        const newColors = [...colors];
        newColors[index] = clr;
        setColors(newColors);
        setEditTargetId(null);
    }

    const deleteColor = (clr: Color) => {
        const newColors = [...colors];
        setColors(newColors.filter((color)=>color.id !== clr.id));
        setEditTargetId(null);
    }
    
    return (
        <div className="flex flex-wrap gap-2 w-full h-full">
            {
                colors.map((color: Color)=>(
                    <ColorFormPopup
                    key={`${color.id}-${color.bg}-${color.txt}`}
                    current={color}
                    create={createColor}
                    edit={editColor}
                    delete={deleteColor}
                    isOpen={editTargetId === color.id}
                    setIsOpen={(open: boolean) => setEditTargetId(open ? color.id : null)}
                    target={
                        <span className="badge badge-sm w-9 hover:shadow-md cursor-pointer font-medium"
                        onClick={() =>
                            setEditTargetId(editTargetId === color.id ? null : color.id)
                          }
                        style={{
                            color: color.txt,
                            backgroundColor: color.bg,
                            borderColor: color.bg
                        }}>
                        A
                        </span>
                    }/>
                ))
            }
            <ColorFormPopup
                create={createColor}
                edit={editColor}
                delete={deleteColor}
                isOpen={isCreateOpen}
                setIsOpen={setIsCreateOpen}
                target={
                    <span className="badge badge-sm w-9 hover:shadow-md cursor-pointer" onClick={()=>setIsCreateOpen(!isCreateOpen)}>
                        <Plus size={12}/>
                    </span>
                }/>
        </div>
    )
}

export default Palette;