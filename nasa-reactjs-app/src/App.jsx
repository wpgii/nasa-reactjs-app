import { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import Main from "./components/MainComponent";
import Footer from "./components/Footer";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;

  // Toggle modal visibility
  function handleToggleModal() {
    setShowModal(s => !s);
  }

  useEffect(() => {
    async function fetchAPIDATA() {
      const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`;
      const today = new Date().toDateString();
      const localKey = `NASA-${today}`;

      // Check if today's data is already cached
      const cachedData = localStorage.getItem(localKey);
      if (cachedData) {
        setData(JSON.parse(cachedData));
        console.log('Fetched from cache');
        setLoading(false); // Update loading state after fetching from cache
        return;
      }

      // Clear outdated cache
      localStorage.clear();

      try {
        const response = await fetch(url);
        const apiData = await response.json();
        localStorage.setItem(localKey, JSON.stringify(apiData));
        setData(apiData);
        console.log('Fetched from API');
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Ensure loading state is updated even on error
      }
    }

    fetchAPIDATA();
  }, [NASA_KEY]);

  return (
    <>
      {loading ? (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      ) : (
        <Main data={data} />
      )}
      {showModal && <SideBar data={data} handleToggleModal={handleToggleModal} />}
      <Footer data={data} handleToggleModal={handleToggleModal} />
    </>
  );
}

export default App;
