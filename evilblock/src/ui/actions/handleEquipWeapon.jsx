import { useInventoryStore } from "../../stores/useInventoryStore"

export const handleEquipWeapon = (index) => {
    if (useInventoryStore.getState().isWeaponEquipped(index)) {
        unequipWeapon()
    } else {
        equipWeapon(index)
    }
}

export const shouldDisplayEquip = (index) => {
    return useInventoryStore.getState().isWeaponEquipped(index)
}

const equipWeapon = (index) => {
    useInventoryStore.getState().tryEquipWeapon(index)
}

const unequipWeapon = () => {
    useInventoryStore.getState().tryUnequipWeapon()
}