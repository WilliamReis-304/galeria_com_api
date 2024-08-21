async function fetchDogBreeds() {
    const breedSelect = document.getElementById('breed-select');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');

    try {
        loadingElement.style.display = 'block';
        errorElement.textContent = '';

        // Solicitação à API para obter a lista de raças
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        if (!response.ok) {
            throw new Error('Erro ao obter a lista de raças.');
        }

        const data = await response.json();
        const breeds = Object.keys(data.message);

        // Populando o dropdown com as raças
        breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed;
            option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
            breedSelect.appendChild(option);
        });
    } catch (error) {
        errorElement.textContent = error.message;
    } finally {
        loadingElement.style.display = 'none';
    }
}

async function fetchDogImages(breed) {
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const galleryElement = document.getElementById('gallery');

    try {
        loadingElement.style.display = 'block';
        errorElement.textContent = '';
        galleryElement.innerHTML = '';

        // Solicitação à API para obter imagens da raça selecionada
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
        if (!response.ok) {
            throw new Error('Erro ao obter as imagens da raça.');
        }

        const data = await response.json();
        displayImages(data.message);
    } catch (error) {
        errorElement.textContent = error.message;
    } finally {
        loadingElement.style.display = 'none';
    }
}

function displayImages(images) {
    const galleryElement = document.getElementById('gallery');
    images.slice(0, 10).forEach(imageUrl => {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Imagem de cachorro';
        img.className = 'dog-image';
        galleryElement.appendChild(img);
    });
}

// Evento para carregar as imagens da raça selecionada
document.getElementById('load-images').addEventListener('click', () => {
    const breedSelect = document.getElementById('breed-select');
    const selectedBreed = breedSelect.value;
    
    if (selectedBreed) {
        fetchDogImages(selectedBreed);
    } else {
        alert('Por favor, selecione uma raça.');
    }
});

// Iniciar a aplicação carregando a lista de raças
fetchDogBreeds();
