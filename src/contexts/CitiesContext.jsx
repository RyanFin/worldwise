import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const CitiesContext = createContext();

// proptype validation
CitiesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
function CitiesProvider({ children }) {
  const BASE_URL = "http://localhost:9000";
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("there was a error loading data...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("there was a error loading data...");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
      }}
    >
      {/* children represents the entire App Component tree that is to be nested inside. */}
      {/* this is so that we can pass context values to every child component */}
      {children}
    </CitiesContext.Provider>
  );
}

// custom hook to consume and retrieve context values
function useCities() {
  // remember that there can be multiple context used here
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("CitiesContext was used outside of the CitiesProvider");
  }

  return context;
}

// export provider and custom retriever hook
export { CitiesProvider, useCities };
