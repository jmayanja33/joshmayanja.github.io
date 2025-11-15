// Replace with your GitHub username
const GITHUB_USERNAME = 'jmayanja33';

// Manual order for featured repositories (these will appear first)
const FEATURED_REPOS_ORDER = [
    'quarterback-evaluation-models',
    'automated-grading',
    'airport-simulation',
    'modeling-spreads',
    'analyzing-energy-consumption',
    'certificate-management'
];

// Fetch repositories from GitHub API
async function fetchRepositories() {
    const loading = document.getElementById('loading');
    const container = document.getElementById('repos-container');

    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);

        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }

        const allRepos = await response.json();

        // Separate featured and other repos
        const featuredRepos = [];
        const otherRepos = [];

        // Sort repos into featured (in order) and others
        FEATURED_REPOS_ORDER.forEach(repoName => {
            const repo = allRepos.find(r => r.name === repoName);
            if (repo) {
                featuredRepos.push(repo);
            }
        });

        // Get remaining repos sorted by updated date (newest first)
        allRepos.forEach(repo => {
            if (!FEATURED_REPOS_ORDER.includes(repo.name)) {
                otherRepos.push(repo);
            }
        });

        // Sort other repos by updated date (newest first)
        otherRepos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        // Combine: featured first, then others by date
        const repos = [...featuredRepos, ...otherRepos];

        // Hide loading message
        loading.style.display = 'none';

        // Display repositories
        displayRepositories(repos);

        // Create individual pages for each repository
        createRepositoryPages(repos);

    } catch (error) {
        loading.textContent = 'Error loading repositories. Please check the username in script.js';
        console.error('Error:', error);
    }
}

// Display repositories as cards
function displayRepositories(repos) {
    const container = document.getElementById('repos-container');

    repos.forEach(repo => {
        const card = document.createElement('div');
        card.className = 'repo-card';

        card.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || 'No description available'}</p>
            <div class="repo-meta">
                <span>⭐ ${repo.stargazers_count}</span>
                <span>🍴 ${repo.forks_count}</span>
                ${repo.language ? `<span>💻 ${repo.language}</span>` : ''}
            </div>
            <div class="repo-links">
                <a href="project-pages/${repo.name}.html" class="repo-link">Details</a>
                <a href="${repo.html_url}" target="_blank" class="repo-link">View on GitHub</a>
            </div>
        `;

        container.appendChild(card);
    });
}

// Create individual HTML pages for each repository
function createRepositoryPages(repos) {
    repos.forEach(repo => {
        // This function demonstrates the structure
        // In practice, you'll need to manually create these pages or use a build tool
        console.log(`Create page: repo-pages/${repo.name}.html with the following content:`);

        const pageContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${repo.name} - My Portfolio</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    <nav class="navbar">
        <div class="nav-container">
            <a href="../index.html" class="nav-logo">My Portfolio</a>
            <ul class="nav-menu">
                <li><a href="../index.html">Home</a></li>
                <li><a href="../bio.html">Bio</a></li>
                <li><a href="../interests.html">Interests</a></li>
                <li><a href="../resume.html">Resume</a></li>
                <li><a href="../repositories.html" class="active">Repositories</a></li>
                <li><a href="../extras.html">Extras</a></li>
                <li><a href="../contact.html">Contact</a></li>
            </ul>
        </div>
    </nav>

    <main class="container">
        <div class="page-header">
            <h1>${repo.name}</h1>
            <a href="${repo.html_url}" target="_blank" class="download-btn">View on GitHub</a>
        </div>

        <div class="content-section">
            <div class="interest-category">
                <h2>Description</h2>
                <p>${repo.description || 'No description available'}</p>
            </div>

            <div class="interest-category">
                <h2>Repository Details</h2>
                <p><strong>Language:</strong> ${repo.language || 'Not specified'}</p>
                <p><strong>Stars:</strong> ${repo.stargazers_count}</p>
                <p><strong>Forks:</strong> ${repo.forks_count}</p>
                <p><strong>Created:</strong> ${new Date(repo.created_at).toLocaleDateString()}</p>
                <p><strong>Last Updated:</strong> ${new Date(repo.updated_at).toLocaleDateString()}</p>
            </div>

            ${repo.homepage ? `
            <div class="interest-category">
                <h2>Live Demo</h2>
                <p><a href="${repo.homepage}" target="_blank">${repo.homepage}</a></p>
            </div>
            ` : ''}

            <div class="interest-category">
                <h2>Topics</h2>
                <p>${repo.topics && repo.topics.length > 0 ? repo.topics.join(', ') : 'No topics specified'}</p>
            </div>
        </div>
    </main>

    <footer class="footer">
        <div class="footer-content">
            <div class="social-links">
                <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
                    <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" class="social-icon">
                </a>
                <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" rel="noopener noreferrer">
                    <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" class="social-icon">
                </a>
            </div>
            <p>&copy; 2024 My Portfolio. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>
        `;

        // Log instructions for manual creation
        console.log(pageContent);
    });
}

// Run on page load
if (document.getElementById('repos-container')) {
    fetchRepositories();
}