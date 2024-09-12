
export default function SideBar({ handleToggleModal, data }) {
    const { title, date, explanation } = data || {}; // Destructure data object
    
    return (
      <div className="sideBar">
        {/* Overlay to close the modal */}
        <div onClick={handleToggleModal} className="bgOverlay"></div>
        
        {/* Sidebar Content */}
        <div className="sideBarContent">
          <h2>{title}</h2>
          <div className="descriptionContainer">
            <p className="descriptionTitle">{date}</p>
            <p>{explanation}</p>
          </div>
          
          {/* Close button */}
          <button onClick={handleToggleModal}>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    );
  }
  