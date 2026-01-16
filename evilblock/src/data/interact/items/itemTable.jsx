// Consumables
import { reagentG } from "./consumable/reagentG";
import { reagentR } from "./consumable/reagentR";
import { reagentB } from "./consumable/reagentB";
import { reagentY } from "./consumable/reagentY";

import { reagentGG } from "./consumable/reagentGG";

import { reagentGR } from "./consumable/reagentGR";
import { reagentGB } from "./consumable/reagentGB";
import { reagentGY } from "./consumable/reagentGY";

import { reagentRR } from "./consumable/reagentRR";
import { reagentRB } from "./consumable/reagentRB"
import { reagentBB } from "./consumable/reagentBB";

import { reagentRY } from "./consumable/reagentRY";
import { reagentBY } from "./consumable/reagentBY";

import { reagentGGG } from "./consumable/reagentGGG";

import { reagentGGR } from "./consumable/reagentGGR";
import { reagentGGB } from "./consumable/reagentGGB";
import { reagentGGY } from "./consumable/reagentGGY";

import { reagentGRR } from "./consumable/reagentGRR";
import { reagentGBB } from "./consumable/reagentGBB";

import { reagentGRY } from "./consumable/reagentGRY";
import { reagentGBY } from "./consumable/reagentGBY";

import { reagentGRB } from "./consumable/reagentGRB";

// Weapons
import { colt } from "./weapon/colt";

// Ammo
import { handgunAmmo } from "./weapon/ammo/handgunAmmo";
import { plankOfWood } from "./key/plankofWood";

export const ITEM_TABLE = {
    // Consumables
    reagentG,
    reagentR,
    reagentB,
    reagentY,

    reagentGG,

    reagentGR,
    reagentGB,
    reagentGY,

    reagentRR,
    reagentRB,
    reagentBB,

    reagentRY,
    reagentBY,

    reagentGGG,

    reagentGGR,
    reagentGGB,
    reagentGGY,

    reagentGRR,
    reagentGBB,

    reagentGRY,
    reagentGBY,
    reagentGRB,

    // Weapons
    colt,

    // Ammo
    handgunAmmo,

    // Key
    plankOfWood
};

export const getItem = (item) => {
    return ITEM_TABLE[item]
}