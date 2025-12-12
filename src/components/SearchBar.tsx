import { useRef, useEffect } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export default function SearchBar({ value, onChange, onSubmit }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  // DOM Manipulation: Highlight search box on load
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.outline = "2px solid #ff1744";
      inputRef.current.style.transition = "outline 0.5s ease-in-out";

      setTimeout(() => {
        if (inputRef.current) inputRef.current.style.outline = "none";
      }, 1000);
    }
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex items-center gap-3 my-8"
    >
      <input
        ref={inputRef} // DOM manipulation target
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search movies…"
        className="w-full px-4 py-3 rounded-lg bg-[#1e1e1e] border border-[#333] text-white outline-none"
      />

      <button
        type="submit"
        className="px-6 py-3 bg-[#ff1744] rounded-lg text-white font-semibold hover:bg-[#ff4564] transition"
      >
        Search
      </button>
    </form>
  );
}
