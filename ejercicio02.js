const baseUrl = 'https://pokeapi.co/api/v2';

async function getPokemonDetails(name) {
    try {
        const response = await fetch(`${baseUrl}/pokemon/${name}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Pokémon details:', error);
    }
}

async function getEvolutionChain(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching evolution chain:', error);
    }
}

async function getPokemonType(name) {
    const details = await getPokemonDetails(name);
    const types = details.types.map(typeInfo => typeInfo.type.name);
    return {
        name: details.name,
        types: types
    };
}

async function getPokemonAndEvolutionInfo(pokemonName) {
    try {
        const pokemonDetails = await getPokemonDetails(pokemonName);
        const speciesUrl = pokemonDetails.species.url;

        // Obtener información de la especie para obtener la URL de la cadena evolutiva
        const speciesResponse = await fetch(speciesUrl);
        if (!speciesResponse.ok) {
            throw new Error('Network response was not ok');
        }
        const speciesData = await speciesResponse.json();
        const evolutionChainUrl = speciesData.evolution_chain.url;

        // Obtener la cadena evolutiva
        const evolutionData = await getEvolutionChain(evolutionChainUrl);

        // Obtener detalles de la evolución
        const evolutionChain = evolutionData.chain;
        const evolutionDetails = evolutionChain.evolves_to[0]; // Suponiendo que solo hay una evolución

        const pokemonInfo = await getPokemonType(pokemonName);
        let evolutionInfo = null;

        if (evolutionDetails) {
            const evolutionName = evolutionDetails.species.name;
            evolutionInfo = await getPokemonType(evolutionName);
        }

        console.log('Pokémon Info:', pokemonInfo);
        console.log('Evolution Info:', evolutionInfo);

        return {
            pokemon: pokemonInfo,
            evolution: evolutionInfo
        };
    } catch (error) {
        console.error('Error fetching Pokémon and evolution info:', error);
    }
}

// Ejemplo de uso:
getPokemonAndEvolutionInfo('charmander');
