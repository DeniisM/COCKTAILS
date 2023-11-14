document.getElementById("randomButton").addEventListener("click", function(){

let cocktails = [];

fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
.then(function cogerRespuesta(respuesta){
    return respuesta.json();
})

.then(function cogerDatos(datos) {
    console.log(datos);
    for (let i = 0; i < datos.drinks.length; i++) {
          let bebida = datos.drinks[0];
            let ingredientes = [];
    for (let j = 1; j <= 15; j++) {
          let ingrediente = bebida['strIngredient' + j];
            if (ingrediente !== null) {
              ingredientes.push(ingrediente);
        }
      }
    
    //Con estos bucles anteriores recogemos toda la información sobre el cocktail en cuestión
    //y nos permitirá que de los 15 opciones de ingredientes, nos muestre solo los strIngredients
    //que contengan información y los que contienen "null" no nos los mostrará. 
    //Por eso hemos tenido que realizar dos bucles uno para toda la información
    //y otro para filtrar los ingredientes.

        document.getElementById("cocktails").innerHTML=`
        <div id="randomC">
        <div id"firstBox">
          <h1 id="titleC">${bebida.strDrink}</h1>
          <img id="imgC" src="${bebida.strDrinkThumb}" alt="${datos.strDink}">
          </div>
          <div id="column">
          <div id="secondBox">
          <h1 id="institleC">Instructions</h1>
          <p id="insC">${bebida.strInstructions}</p>
          </div>
          <div id="thirdBox">
          <h1 id="ingC">Ingredients</h1>
          <div id="ingmapC"> ${ingredientes.map(ingrediente => `<p>${ingrediente}</p>`).join('')} </div>
           </div>
           </div>
        </div>
        `;
};

})
.catch(function(error) {
    console.error('Error al obtener los datos de la API:', error);
  });


//Formulario para que encuentre un cocktail aleatorio ingresando un ingrediente.

document.getElementById("searchLink").addEventListener("click", function() {
  // Mostrar formulario de búsqueda
  document.getElementById("cocktails").innerHTML = `
    <h1 id="titleSCI">Search Cocktail by Ingredient</h1>
    <form id="searchForm">
      <input type="text" id="ingredientInput" placeholder="Enter ingredient">
      <button type="submit" id="buttonSearch">Search</button>
    </form>
  `;

  // Formulario
  document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
      const ingredient = document.getElementById("ingredientInput").value;

    // Realizar búsqueda de cóctel por ingrediente
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        // Verificar si se encontraron cócteles con el ingrediente especificado
        if (data.drinks) {
          // Obtener un cóctel aleatorio del resultado
          const randomIndex = Math.floor(Math.random() * data.drinks.length);
          const cocktailId = data.drinks[randomIndex].idDrink;

          // Obtener los detalles del cóctel aleatorio
          fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`)
            .then(function(response) {
              return response.json();
            })
            .then(function(cocktailData) {
              const cocktail = cocktailData.drinks[0];
              let ingredientList = "";

              // Construir lista de ingredientes
              for (let i = 1; i <= 15; i++) {
                const ingredient = cocktail[`strIngredient${i}`];
                if (ingredient) {
                  ingredientList += `<p>${ingredient}</p>`;
                }
              }
              // Mostrar el cóctel aleatorio con los ingredientes
              document.getElementById("cocktails").innerHTML = `
                <div id="searchIng">
                <div id="firstSearch">
                  <h1 id="titleSearch">${cocktail.strDrink}</h1>
                  <img id="imgSearch" src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
                  </div>
                  <div id="columnSearch">
                  <div id="secondSearch">
                  <h1 id="insSearch">Instructions</h1>
                  <p id="pSearch">${cocktail.strInstructions}</p>
                  </div>
                  <div id="thirdSearch">
                    <h1 id="ingS">Ingredients</h1>
                    <div id="listSearch">${ingredientList}</div>
                  </div>
                  </div>
                </div>
              `;
            })
            .catch(function(error) {
              console.error('Error al obtener los datos del cóctel:', error);
            });
        } else {
          // Mostrar mensaje si no se encuentran cócteles con el ingrediente designado
          document.getElementById("cocktails").innerHTML = `<p>No se encontraron cócteles con ese ingrediente.</p>`;
        }
      })
      .catch(function(error) {
        console.error('Error al realizar la búsqueda:', error);
      });
  });
});

});

// NAV BUTTONS
const randomButton = document.getElementById("randomButton");
const cocktailsContainer = document.getElementById("cocktails");

  randomButton.addEventListener("click", () => {
    randomButton.classList.add("hidden");
});

const inicioLink = document.querySelector("nav a:nth-child(1)");
  inicioLink.addEventListener("click", () => {
    cocktailsContainer.innerHTML = "";
      randomButton.classList.remove("hidden");
});


// Mostrar About
function mostrarAbout() {
  document.getElementById("cocktails").innerHTML = `
  <div id="all">
  <div id="AboutC">
    <h1 id="tAbout">About Cocktails&Co</h1>
    <p id="pAbout">En el mundo de la coctelería siempre encontrarás un cóctel delicioso para cada tipo de persona.<br>
    <br>
    En nuestra web de cócteles exquisitos descubrirás hasta los tragos más innovadores. <br>
    Es por eso que hemos creado una herramienta para compartir contigo nuestra selección de recetas para cócteles,<br>
    y con solo un "click" podrás encontrar información sobre diferentes cócteles,<br>
    incluyendo sus ingredientes y las instrucciones para prepararlos,<br>
    o incluso obtener un cóctel aleatorio según el ingrediente que prefieras. <br>
    Todo apto para que triunfes en tus quedadas con amigos o en tus reuniones familiares. <br>
    <br>
    ¡Porque nada triunfa más que preparar deliciosos cocteles tras una buena cena!<br>
    ¡Disfruta explorando y experimentando con nuevos cócteles!</p>
    </div>
    <img id="cocktailimg" src="./background/cocktails.jpg" alt="Cocktails">
    </div>
  `;
  document.getElementById("randomButton").classList.add("hidden");
}
document.getElementById("aboutLink").addEventListener("click", mostrarAbout);

// Volver Home
function volverHome() {
  document.getElementById("cocktails").innerHTML = "";
  document.getElementById("randomButton").classList.remove("hidden");
}
document.getElementById("homeLink").addEventListener("click", volverHome);










