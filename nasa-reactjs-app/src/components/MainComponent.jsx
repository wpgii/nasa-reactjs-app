

export default function MainComponent({ data }) {
    const { hdurl, title } = data || {}; // Destructure with fallback
    
    return (
      <div className="imgContainer">
        <img
          className="bgImage"
          src={hdurl || "default-image.jpg"}  // Fallback to a default image if hdurl is undefined
          alt={title || "Background Image"}  // Descriptive fallback for alt text
        />
      </div>
    );
  }
  