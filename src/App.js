import { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((result) => {
      const filteredCountry = result.data.find(
        (state) => state.name.common.toLowerCase() === name.toLowerCase()
      );
      // if (filteredCountry.length === 1) {
      setCountry(filteredCountry);
      // }
      // return country;
    });
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  console.log("insane", country);
  // if (country) {
  //   return null;
  // }

  return (
    <div>
      {!country ? (
        <div>not found...</div>
      ) : (
        <div>
          <h3>{country.name.common}</h3>
          <div>population {country.population}</div>
          <div>capital {country.capital}</div>
          <img
            src={country.flags.png}
            height="100"
            alt={`flag of ${country.name.common}`}
          />
        </div>
      )}
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    console.log("I am data");
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
