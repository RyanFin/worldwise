import { createContext, useContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        // override current state with isLoading beginning as true
        ...state,
        isLoading: true,
      };
    // case events
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities.filter((city) => city.id !== action.payload)],
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type...");
  }
}

// proptype validation
CitiesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const BASE_URL = "http://localhost:9000";
  // context values (state)
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        // setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "there was a error loading data for cities...",
        });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    // No point calling the API if the current city is already loaded!
    if (Number(id) === currentCity.id) {
      return;
    }

    dispatch({ type: "loading" });
    try {
      // setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "there was a error loading data in the city...",
      });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      // setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      // keep the UI state in sync with the remote state (our fake API server)
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "there was a error loading data in the city...",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      // setIsLoading(true);

      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      // filter out the cities that equal the deleted id so that the object is filtered out (deleted)
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "there was a error loading data in the city...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      // context values
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        // if data was not asyncronous, pass the 'dispatch' function into the context, then call dispatch in required component
        error,
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
