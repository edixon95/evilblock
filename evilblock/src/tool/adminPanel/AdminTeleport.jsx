import { useState, useMemo } from "react";
import { handleUseDoor } from "../../characters/player/actions/handleUseDoor";
import { DOOR_TABLE } from "../../data/doors/doorTable";
import { useDoorStore } from "../../stores/useDoorStore";

const handleTeleportToDoor = (id) => {
    const door = useDoorStore
        .getState()
        .handleFindDoorById(id)?.door;

    handleUseDoor(door, true);
};

const getDoorNumber = (doorValue) => {
    const match = String(doorValue).match(/\d+$/);
    return match ? Number(match[0]) : Number.MAX_SAFE_INTEGER;
};

const compareDoors = ([, a], [, b]) => {
    const aNum = getDoorNumber(a.to.door);
    const bNum = getDoorNumber(b.to.door);

    if (aNum !== bNum) return aNum - bNum;

    return String(a.to.door).length - String(b.to.door).length;
};

const groupDoors = (doorTable) => {
    const grouped = {};

    for (const entry of Object.entries(doorTable)) {
        const group = entry[1].group ?? "Other";
        if (!grouped[group]) grouped[group] = [];
        grouped[group].push(entry);
    }

    Object.values(grouped).forEach((doors) => {
        doors.sort(compareDoors);
    });

    return grouped;
};

export const AdminTeleport = () => {
    const [activeGroup, setActiveGroup] = useState("Epilogue");

    const groupedDoors = useMemo(
        () => groupDoors(DOOR_TABLE),
        []
    );

    const groupNames = Object.keys(groupedDoors);

    return (
        <>
            <h2>Door Teleport Panel</h2>

            <div style={{ marginBottom: 12 }}>
                <select
                    value={activeGroup}
                    onChange={(e) => setActiveGroup(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "6px",
                        backgroundColor: "#222",
                        color: "#fff",
                        border: "1px solid #555",
                        fontFamily: "monospace",
                        cursor: "pointer",
                    }}
                >
                    {groupNames.map((group) => (
                        <option key={group} value={group}>
                            {group}
                        </option>
                    ))}
                </select>
            </div>

            {groupedDoors[activeGroup]?.map(([id, data]) => {
                const { level, room, door } = data.to;

                return (
                    <button
                        key={id}
                        onClick={() => handleTeleportToDoor(id)}
                        style={{
                            display: "block",
                            width: "100%",
                            marginBottom: 6,
                            textAlign: "left",
                        }}
                    >
                        {level} → {room} → {door}
                    </button>
                );
            })}
        </>
    );
};
