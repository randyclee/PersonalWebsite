// components/Letter.js
export default function Letter({ darkMode, letter, id, onSelect }) {
    return (
      <div
        className={`inline-flex items-center justify-center m-1 p-3 md:m-2 md:p-4  ${darkMode?"bg-blue-700":"bg-blue-500"} rounded cursor-pointer text-white`}
        onClick={() => onSelect(id)}
      >
        {letter}
      </div>
    );
  }
  