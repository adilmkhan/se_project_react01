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
          This block describes the project author. Here you should indicate your
          name, what you do, and which development technologies you know.
        </p>
        <p className="about__content-experience">
          You can also talk about your experience with TripleTen, what you
          learned there, and how you can help potential customers.
        </p>
      </div>
    </>
  );
}

export default About;
