import "./About.css";

function About() {
  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="author-image"
        className="about__image"
      />
      <div className="about__content">
        <h1 className="about__content-title">About the author</h1>
        <p className="about__content-description">
          Adil Khan is a Solutions Architect with the State of Missouri, working
          at the intersection of cloud architecture, healthcare systems, and
          emerging AI applications. He is completing a full-stack software
          engineering program focused on the MERN stack while building modern
          web applications and cloud-based solutions.
        </p>
        <p className="about__content-experience">
          His work blends software development, cloud engineering, and system
          design to create practical, scalable technology solutions.
        </p>
      </div>
    </>
  );
}

export default About;
