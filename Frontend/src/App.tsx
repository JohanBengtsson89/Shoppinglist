import { useState } from "react";
import { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { fetchAuthSession } from "aws-amplify/auth";

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

Amplify.configure({ ...awsExports });
// let token = (await fetchAuthSession()).tokens?.idToken?.toString();

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState("");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // ✅ Fetch JWT token when component mounts
    const getToken = async () => {
      try {
        const session = await fetchAuthSession();
        const accessToken = session.tokens?.accessToken?.toString();
        setToken(accessToken || null);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    getToken();
  }, []);

  useEffect(() => {
    if (!token) return; // Wait for token before fetching data
    const fetchItems = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/list/getByID/{id}?id=1",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data: ShoppingList = await response.json();
        setItems(data.items || []);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [token]);

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
            Authorization: `Bearer ${token}`,
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
            Authorization: `Bearer ${token}`,
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
      <Authenticator>
        {({ signOut }) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <header>
              <h1>Inköpslista</h1>
            </header>
            <div
              style={{
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
                width: "80%",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Paper
                elevation={3}
                style={{
                  width: "90%",
                  minHeight: "200px",
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
              <Button
                style={{
                  marginTop: "20px",
                  color: "Black",
                  backgroundColor: "red",
                }}
                onClick={signOut}
              >
                Sign out
              </Button>
            </div>
          </div>
        )}
      </Authenticator>
    </>
  );
}

export default App;
