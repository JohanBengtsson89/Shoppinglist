import { useState } from "react";
// import "./App.css";
import { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

interface Item {
  id: number;
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
      const newItemObject = {
        itemName: newItem,
        dateOfLastPurchase: new Date().toISOString().split("T")[0],
        shoppingList: {
          id: 1,
        },
      };
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
        const savedItem: Item = await response.json();
        setItems([...items, savedItem]);
        setNewItem("");
      } catch (error) {
        console.error("Error adding item:", error);
      }
    }
  };

  const handleDeleteItem = async () => {
    const checkedItems = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    const checkedItemIds = Array.from(checkedItems).map((item) =>
      parseInt(item.id.split("-")[1])
    );

    const newItems = items.filter((item) => !checkedItemIds.includes(item.id!));
    setItems(newItems);

    try {
      const response = await fetch(
        `http://localhost:8080/api/item/delete/list`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(checkedItemIds),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <>
      <div style={{ padding: "20px" }}>
        <header>
          <h1>Inköpslista</h1>
        </header>
        <div
          style={{
            //height: "55px",
            //marginTop: "10px",
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <TextField
            style={{ width: "50%", marginRight: "10px" }}
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Lägg till ny vara"
          />
          <Button variant="contained" onClick={handleAddItem}>
            Lägg till
          </Button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Paper
            elevation={3}
            style={{
              width: "90%",
              padding: "20px",
              margin: "20px 0px 20px 0px",
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
          </Paper>
          <Button
            variant="contained"
            onClick={handleDeleteItem}
            style={{ height: "50px", width: "100px" }}
          >
            Markera klar
          </Button>
        </div>
      </div>
    </>
  );
}

export default App;
