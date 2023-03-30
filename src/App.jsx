import { useState, useEffect } from "react";

import GlobalStyles from "./styles/global";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/themes";

import Container from "./components/layout/Container";
import AddItem from "./components/add/AddItem";

export default function App() {
  // list init
  const [items, setItems] = useState([]);

  const iconColors = [
    "black",
    "red",
    "blue",
    "green",
    "yellow",
    "navy",
    "purple",
    "orange",
    "pink",
    "gray",
  ];

  useEffect(() => {
    const sample = (() => {
      let arr = [];
      for (let i = 0; i < 8; i++) {
        arr.push({
          color: iconColors[i],
          name: "아이콘_" + i,
        });
      }
      return arr;
    })();
    setItems(sample);
  }, []);

  // add func
  const addItem = function (item) {
    setItems([...items, item]);
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container itemslist={items} setList={setItems} />
        <AddItem itemslist={items} add={addItem} iconColors={iconColors} />

        <GlobalStyles />
      </ThemeProvider>
    </div>
  );
}
