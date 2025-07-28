import Header from '../components/Header';
import Footer from '../components/Footer';
import UpdatesSection from '../components/UpdatesSection';

// --- GitHub Repo Data Fetching ---
interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
}

async function getProjects(): Promise<Repo[]> {
  try {
    const res = await fetch('https://api.github.com/users/AR-ONA/repos?sort=updated&per_page=6', {
      next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!res.ok) {
      console.error('Failed to fetch GitHub repos');
      return [];
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <Header />
      <main id="home">
        <section className="hero">
          <div className="hero-content">
            <h1>ARONA</h1>
            <p>All Roads, One New Answer</p>
          </div>
        </section>

        <div className="container">
          <section id="about">
            <h2>ABOUT</h2>
            <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
              "All Roads, One New Answer"
              <br/>
              <br/>
              We are a developer club trying to explore most of the development fields,<br/>such as the front-end and the back-end.
              <br/>
              <br/>
              Isn't it cool?
            </p>
          </section>

          <section id="projects">
            <h2>PROJECTS</h2>
            <div className="project-grid">
              {projects.map((repo) => (
                <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className="project-link">
                  <div className="project-card">
                    <h3>{repo.name}</h3>
                    <p>{repo.description || 'No description provided.'}</p>
                  </div>
                </a>
              ))}
            </div>
            <div className="more-button-container">
              <a href="https://github.com/AR-ONA?tab=repositories" target="_blank" rel="noopener noreferrer" className="more-button">
                + More
              </a>
            </div>
          </section>

          <UpdatesSection />

          <section id="contact" className="contact">
            <h2>CONTACT</h2>
            <p>We are always looking for new members and collaborators.<br />Feel free to reach out to us!</p>
            <a href="mailto:arona.devs@gmail.com" className="cta-button">Email Us</a>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
