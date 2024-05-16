const baseUrl = 'https://pokeapi.co/api/v2';

// a. Obtener detalles de un Pokémon por nombre
async function getPokemonDetails(name) {
    try {
        const response = await fetch(`${baseUrl}/pokemon/${name}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Detalles del Pokémon:', data);
        return data;
    } catch (error) {
        console.error('Error fetching Pokémon details:', error);
    }
}

// b. Obtener habilidades de un Pokémon específico
async function getPokemonAbilities(name) {
    try {
        const data = await getPokemonDetails(name);
        const abilities = data.abilities.map(abilityInfo => abilityInfo.ability.name);
        console.log('Habilidades del Pokémon:', abilities);
        return abilities;
    } catch (error) {
        console.error('Error fetching Pokémon abilities:', error);
    }
}

// c. Obtener información sobre un tipo específico de Pokémon (por ejemplo, agua)
async function getPokemonTypeInfo(type) {
    try {
        const response = await fetch(`${baseUrl}/type/${type}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Información del tipo de Pokémon:', data);
        return data;
    } catch (error) {
        console.error('Error fetching Pokémon type information:', error);
    }
}

// d. Obtener una lista de los primeros 50 Pokémon
async function getFirst50Pokemon() {
    try {
        const response = await fetch(`${baseUrl}/pokemon?limit=50`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Lista de los primeros 50 Pokémon:', data.results);
        return data.results;
    } catch (error) {
        console.error('Error fetching first 50 Pokémon:', error);
    }
}

// Ejemplos de uso:
getPokemonDetails('pikachu');
getPokemonAbilities('charizard');
getPokemonTypeInfo('water');
getFirst50Pokemon();
