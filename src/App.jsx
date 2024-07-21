import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 2, packed: true },
];

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    console.log(item);
    setItems([...items, item]);
  }

  function handleDeleteItem(itemId) {
    setItems(items.filter((item) => item.id !== itemId));
  }

  function handleUpdateItems(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="flex flex-col h-screen bg-yellow-900">
      <Logo />
      <Form handleAddItems={handleAddItems} />
      <PackingList
        items={items}
        handleDeleteItem={handleDeleteItem}
        handleUpdateItems={handleUpdateItems}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return (
    <h1 className="text-center font-semibold text-3xl sm:text-5xl bg-yellow-600 p-4">
      🌴 Far Away 💼
    </h1>
  );
}

function Form({ handleAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    handleAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex sm:flex-row flex-col gap-4 py-4 px-4 sm:gap-4 bg-orange-600 items-center justify-between"
    >
      <h3 className="text-center font-semibold text-lg sm:text-2xl bg-orange-600 text-white">
        What stuffs do you need for Trip ?
      </h3>
      <select
        value={quantity}
        onChange={(e) => {
          console.log(e.target.value);
          setQuantity(Number(e.target.value));
        }}
        className="h-[44px] bg-orange-100 w-[80px] rounded-full text-center font-semibold"
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        onChange={(e) => {
          // console.log(e);
          // console.log(e.target.value);
          setDescription(e.target.value.trim());
        }}
        value={description}
        type="text"
        placeholder="Enter item..."
        className="h-[38px] w-full sm:w-[300px] rounded-md bg-orange-100 px-4"
      />
      <button className="h-[38px] px-4 rounded-md w-full sm:w-[300px] border bg-orange-200">
        Add
      </button>
    </form>
  );
}

function PackingList({ items, handleDeleteItem, handleUpdateItems }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }
  if (sortBy === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="bg-yellow-900 h-full sm:px-4 flex flex-col justify-between py-8">
      <ul className="flex flex-wrap gap-10 font-semibold text-xl bg-yellow-900 text-white p-4">
        {sortedItems.map((item) => (
          <Item
            item={item}
            handleDeleteItem={handleDeleteItem}
            handleUpdateItems={handleUpdateItems}
            key={item.id}
          />
        ))}
      </ul>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="max-w-[300px] w-[90%] mx-auto rounded-md bg-orange-200 border focus:border-black h-[34px]"
      >
        <option value="input">Sort by Input Order</option>
        <option value="description">Sort by Description</option>
        <option value="packed">Sort by Packed Status</option>
      </select>
    </div>
  );
}

function Stats({ items }) {
  if (!items.length) {
    return (
      <footer className="flex items-center justify-center w-full text-center bg-sky-600 h-10">
        <em className="text-white">Start Adding your items.</em>
      </footer>
    );
  }

  const totalItems = items.length;
  const itemsPacked = items.filter((item) => item.packed).length;
  const itemsPercentage = Math.round((itemsPacked / totalItems) * 100);
  return (
    <footer className="flex items-center justify-center w-full text-center bg-sky-600 h-10">
      <em className="text-white">
        {itemsPercentage === 100
          ? "You are ready to go!!"
          : `You have ${totalItems} items on your list, and you already packed
        ${itemsPacked} items (${itemsPercentage}%)`}
      </em>
    </footer>
  );
}

function Item({ item, handleDeleteItem, handleUpdateItems }) {
  return (
    <li className="font-semibold flex gap-2">
      <input
        type="checkbox"
        className="w-4"
        value={item.packed}
        onChange={() => {
          handleUpdateItems(item.id);
        }}
      />
      <span className={item.packed ? "line-through" : ""}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => handleDeleteItem(item.id)}>❌</button>
    </li>
  );
}
