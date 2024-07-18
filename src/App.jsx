const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 2, packed: true },
];

export default function App() {
  return (
    <div className="flex flex-col h-screen bg-yellow-900">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
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

function Form() {
  return (
    <form className="flex sm:flex-row flex-col gap-4 py-4 px-4 sm:gap-4 bg-orange-600 items-center">
      <h3 className="text-center font-normal text-lg sm:text-2xl bg-orange-600">
        What stuffs do you need for Trip ?
      </h3>
      <select className="h-[44px] bg-orange-100 w-[80px] rounded-full text-center font-semibold">
        {Array.from({length: 20}, (_, i) => i + 1).map((num) =>(
          <option value={num} key={num}>{num}</option>
        ))
        }
      </select>
      <input type="text" placeholder="Enter item..." className="h-[38px] w-full sm:w-[300px] rounded-md bg-orange-100 px-4" />
      <button className="h-[38px] px-4 rounded-md w-full sm:w-[300px] border bg-orange-200">Add</button>
    </form>
  );
}

function PackingList() {
  return (
    <div className="bg-yellow-900 h-full">
      <ul className="flex flex-wrap gap-10 font-semibold text-xl bg-yellow-900 text-white p-4">
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Stats() {
  return (
    <footer className="flex items-center justify-center w-full text-center bg-sky-600 h-10">
      <em className="text-white">
        You have X items on your list, and you already packed X (X%)
      </em>
    </footer>
  );
}

function Item({ item }) {
  return (
    <li className="font-bold">
      <span className={item.packed ? "line-through" : ""}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}
