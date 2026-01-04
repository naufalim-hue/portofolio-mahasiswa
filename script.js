document.addEventListener('DOMContentLoaded', () => {
    const apiEndpoint = 'data.json'; // URL Web Service (Local/Relative)

    // Skenario: Menggunakan Fetch API untuk mengambil data (GET Request)
    fetch(apiEndpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error('Gagal mengambil data dari Web Service');
            }
            return response.json();
        })
        .then(data => {
            renderPortfolio(data);
        })
        .catch(error => {
            console.error('Error:', error);
            document.body.innerHTML = '<h1>Maaf, terjadi kesalahan saat memuat data server.</h1>';
        });
});

function renderPortfolio(data) {
    // 1. Render Profile
    document.getElementById('nav-name').textContent = data.profile.name;
    document.getElementById('hero-name').textContent = data.profile.name;
    document.getElementById('hero-role').textContent = data.profile.role;
    document.getElementById('hero-univ').textContent = `${data.profile.university} - ${data.profile.cohort}`;
    document.getElementById('hero-desc').textContent = data.profile.bio;
    document.getElementById('profile-img').src = data.profile.avatar;

    // 2. Render Skills
    const skillsContainer = document.getElementById('skills-list');
    data.skills.forEach(skill => {
        const span = document.createElement('span');
        span.className = 'skill-tag';
        span.textContent = skill;
        skillsContainer.appendChild(span);
    });

    // 3. Render Projects
    const projectContainer = document.getElementById('project-list');
    data.projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h4>${project.title}</h4>
            <p>${project.description}</p>
            <p class="project-tech">Teknologi: ${project.tech}</p>
        `;
        projectContainer.appendChild(card);
    });

    // 4. Render Contact
    const contactContainer = document.getElementById('contact-links');
    const { email, github, linkedin } = data.contact;
    contactContainer.innerHTML = `
        <a href="mailto:${email}">Email</a> | 
        <a href="https://${github}" target="_blank">GitHub</a> | 
        <a href="https://${linkedin}" target="_blank">LinkedIn</a>
    `;
}
