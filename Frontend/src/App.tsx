import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [items, setItems] = useState(["Mjölk", "Bröd", "Smör"]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("https://api.example.com/items");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const handleAddItem = () => {
    if (newItem.trim() !== "") {
      setItems([...items, newItem]);
      setNewItem("");
    }
  };

  return (
    <>
      <div className="App" style={{ padding: "20px" }}>
        <header className="App-header">
          <h1>Inköpslista</h1>
        </header>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "grey",
              border: "1px solid white",
              padding: "10px",
              width: "300px",
            }}
          >
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {items.map((item, index) => (
                <li key={index}>
                  <input type="checkbox" id={`item-${index}`} />
                  <label
                    htmlFor={`item-${index}`}
                    style={{ marginLeft: "5px" }}
                  >
                    {item}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Lägg till ny vara"
              style={{ marginRight: "5px" }}
            />
            <button onClick={handleAddItem}>+</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
