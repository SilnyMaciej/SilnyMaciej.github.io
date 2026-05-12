 async function fetchGitHubRepos() {
    const projectsContainer = document.getElementById('projects');
    
    // Używamy endpointu API GitHub
    const url = 'https://api.github.com/users/SilnyMaciej/repos?sort=updated&per_page=10';

    try {
        const response = await fetch(url);
        
        if (!response.ok) throw new Error('Błąd API: ' + response.status);

        const repos = await response.json();
        projectsContainer.innerHTML = ''; 

        if (repos.length === 0) {
            projectsContainer.innerHTML = '<p>Nie znaleziono publicznych projektów.</p>';
            return;
        }

        repos.forEach(repo => {
            // Filtrowanie: tylko Twoje projekty (bez forków)
            if (!repo.fork) {
                const card = `
                    <div class="repo-card" style="border: 1px solid #ddd; margin: 10px; padding: 15px; border-radius: 8px; background: white; margin-bottom: 15px;">
                        <h3 style="margin-top: 0;">${repo.name}</h3>
                        <p>${repo.description || "Projekt Embedded / IT"}</p>
                        <p><strong>Język:</strong> ${repo.language || "N/A"}</p>
                        <a href="${repo.html_url}" target="_blank" style="color: #0366d6; font-weight: bold;">Zobacz kod →</a>
                    </div>
                `;
                projectsContainer.innerHTML += card;
            }
        });
    } catch (error) {
        projectsContainer.innerHTML = '<p>Błąd ładowania projektów. Sprawdź połączenie.</p>';
        console.error("Szczegóły błędu:", error);
    }
}

fetchGitHubRepos();