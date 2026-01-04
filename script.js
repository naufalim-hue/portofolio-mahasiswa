document.addEventListener('DOMContentLoaded', () => {
    const apiEndpoint = 'data.json'; 

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
    document.getElementById('nav-name').textContent = data.profile.name;
    document.getElementById('hero-name').textContent = data.profile.name;
    document.getElementById('hero-role').textContent = data.profile.role;
    document.getElementById('hero-univ').textContent = `${data.profile.university} - ${data.profile.cohort}`;
    document.getElementById('hero-desc').textContent = data.profile.bio;
    document.getElementById('profile-img').src = data.profile.avatar;

    const skillsContainer = document.getElementById('skills-list');
    data.skills.forEach(skill => {
        const span = document.createElement('span');
        span.className = 'skill-tag';
        span.textContent = skill;
        skillsContainer.appendChild(span);
    });

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

    const contactContainer = document.getElementById('contact-links');
    const { email, linkedin, contact} = data.contact;
    contactContainer.innerHTML = `
        <a href="mailto:${email}">Email</a> | 
        <a href="https://${linkedin}" target="_blank">LinkedIn</a> |
        <a href="https://${contact}" target="_blank">Contact</a>
    `;
}
