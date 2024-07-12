import "./App.css";

export default function App() {
  return (
    <div className="flex flex-col">
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
    <div>
      <h3 className="text-center font-normal text-lg sm:text-2xl bg-orange-600 p-6">
        What stuffs do you need for Trip ?
      </h3>
    </div>
  );
}
function PackingList() {
  return (
    <div className="flex justify-center font-semibold text-xl bg-yellow-900 min-h-[505px] text-white p-4">
      LIST
    </div>
  );
}
function Stats() {
  return (
    <footer className="flex items-center justify-center w-full text-center bg-sky-600 h-10">
      <em className=" text-white">
        You have X items on your list, and you already packed X (X%)
      </em>
    </footer>
  );
}
