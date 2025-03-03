import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

interface Item {
  id?: number;
  itemName: string;
  dateOfLastPurchase?: string;
  shoppingList?: ShoppingList;
}

interface ShoppingList {
  id: number;
  listName?: string;
  items?: Item[];
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState("");
  const [shoppingList, setShoppingList] = useState<ShoppingList | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/list/getByID/{id}?id=1"
        );
        const data: ShoppingList = await response.json();
        setShoppingList(data);
        setItems(data.items || []);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const handleAddItem = async () => {
    if (newItem.trim() !== "") {
      const newItemObject: Item = {
        itemName: newItem,
        dateOfLastPurchase: new Date().toISOString().split("T")[0],
        shoppingList: {
          id: 1,
        },
      };
      setItems([...items, newItemObject]);
      setNewItem("");
      try {
        const response = await fetch(`http://localhost:8080/api/item/post`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItemObject),
        });
        if (!response.ok) {
          throw new Error("Failed to add item");
        }
      } catch (error) {
        console.error("Error adding item:", error);
      }
    }
  };

  return (
    <>
      <div className="App" style={{ padding: "20px" }}>
        <header className="App-header">
          <h1>Inköpslista</h1>
        </header>
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
              {items.map((item) => (
                <li key={item.id}>
                  <input type="checkbox" id={`item-${item.id}`} />
                  <label
                    htmlFor={`item-${item.id}`}
                    style={{ marginLeft: "5px" }}
                  >
                    {item.itemName}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
