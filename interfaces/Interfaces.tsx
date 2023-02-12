interface ToDoItem {
    id: string | number[];
    task: string;
    done: boolean;
}

interface SwapiItem {
    id: string | number[];
    name: string;
    url: string,
}

interface SwapiPersonItem {
    name: string;
    gender: string;
    height: string;
    mass: string;
    birth_year: string;
    eye_color: string;
    skin_color: string;
    hair_color: string;
}

interface SwapiPlanetItem {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
}