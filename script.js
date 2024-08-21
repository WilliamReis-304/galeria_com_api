async function fetchDogBreeds() {
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const galleryElement = document.getElementById('gallery');

    try {
        // Exibir mensagem de carregamento
        loadingElement.style.display = 'block';
        errorElement.textContent = '';
        galleryElement.innerHTML = '';

        // Solicitação à API para obter a lista de raças
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        if (!response.ok) {
            throw new Error('Erro ao obter a lista de raças.');
        }

        const data = await response.json();
        const breeds = Object.keys(data.message);

        // Selecionar uma raça aleatória
        const randomBreed = breeds[Math.floor(Math.random() * breeds.length)];

        // Solicitação à API para obter imagens da raça selecionada
        const imageResponse = await fetch(`https://dog.ceo/api/breed/${randomBreed}/images`);
        if (!imageResponse.ok) {
            throw new Error('Erro ao obter as imagens da raça.');
        }

        const imageData = await imageResponse.json();
        displayImages(imageData.message);
    } catch (error) {
        // Exibir mensagem de erro
        errorElement.textContent = error.message;
    } finally {
        // Esconder mensagem de carregamento
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

// Iniciar a aplicação
fetchDogBreeds();
