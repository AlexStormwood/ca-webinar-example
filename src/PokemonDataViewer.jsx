import { useEffect, useState } from "react";


export function PokemonDataViewer ({pokemonName}) {
	let [localPokemonName, setLocalPokemonName] = useState("");
	let [pokemonData, setPokemonData] = useState({});
	let [isLoading, setIsLoading] = useState(false);
	let [isShiny, setIsShiny] = useState(false);

	let shinyChance = 0.6;

	function shinyCheck() {
		let chanceRoll = Math.random();
		console.log(`Shiny check: ${chanceRoll} vs ${shinyChance}`);
		return shinyChance > chanceRoll;
	}

	useEffect(() => {
		setLocalPokemonName(pokemonName);
		setIsLoading(false);
		setPokemonData({})
		setIsShiny(false);
	}, [pokemonName]);

	useEffect(() => {
		async function getData() {
			let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + localPokemonName);
			let data = await response.json();
			setPokemonData(data);

			let shinyResult = shinyCheck();
			setIsShiny(shinyResult);
			document.getElementById("favicon").setAttribute("type","image/png");
			document.getElementById("favicon").setAttribute("href", shinyResult ? data.sprites.front_shiny : data.sprites.front_default);
		}

		getData();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);

	if (pokemonData.name){
		return(
			<section>
				<div>
					<h2>Data for {`#${pokemonData.id} ${pokemonName.toLocaleUpperCase()}`}</h2>
					{isShiny 
					? 
					<>
						<h4>🎉🎉🎉🎉 You found a shiny Pokemon! 🎉🎉🎉🎉 </h4>
						<img src={pokemonData.sprites.front_shiny} alt="The front shiny sprite representing the subject of the search." />
					</>				
					:
					<>
						<img src={pokemonData.sprites.front_default} alt="The front default sprite representing the subject of the search." />
					</>	
					}
					<h4>Type: {pokemonData.types.map(typeObj => typeObj.type.name).join(", ")}</h4>
					<h4>Best stat: {pokemonData.stats.sort((a,b)=> {
						return a.base_stat > b.base_stat ? -1 : 1;
					})[0].stat.name}</h4>
				</div>
				<div>
				{!isLoading && <button onClick={() => setIsLoading(true)}>
					Search!
				</button>}
				</div>
			</section>
		)
	} else {
		if (isLoading){
			return(
				<section>
					<h2>Data for {pokemonName}</h2>
					<p>Loading...</p>
				</section>
			)
		} else {
			return(
				<section>
					<h2>{pokemonName}</h2>
					<button onClick={() => setIsLoading(true)}>Search!</button>
				</section>
			)
		}
	}
}