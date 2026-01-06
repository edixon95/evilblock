New start to do things cleaner.

TODO 1:
    - Enemy Data
    - Level Data
    - Item Data
    - Inventory Store
    - Enemy Store
    - Item Store

Notes: All parts of a level should come from the same initial place
levelTable.floor_01: {
    ... all rooms under floor_01
    room_01: {
        ... all geometry, items, stations and enemies
    }
}
This should then get split out so that each store only holds onto the parts they need

COMPLETE 1:
    - Enemy Data
    - Grouped Data:
        Level geometry
        Props
        Stations
        Items
        Camera
        Camera Regions

        Enemies should remain on their own? tbd

    - Basic door data