import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*()_+';

    for (let i = 0; i < length; i++) {
      const charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = () => {
    navigator.clipboard.writeText(password);
    passwordRef.current?.select(); // Select the text in input
  };

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  return (
    <div className="w-full max-w-lg max-h-[700px] shadow-md p-4 my-6 bg-gray-800 text-orange-500 mx-auto rounded-lg">
      <p className="text-4xl font-bold text-center leading-tight mb-8">
        Password Generator
      </p>

      <div className="flex items-center shadow rounded-md overflow-hidden md:space-x-4 mb-4">
        <input
          type="text"
          ref={passwordRef}
          value={password}
          readOnly
          className="outline-none w-full py-1 px-3 bg-gray-700 text-white placeholder-gray-400 rounded-lg"
        />

        <button
          onClick={copyPasswordToClipboard}
          className="bg-orange-500 text-white font-semibold py-1 px-4 rounded hover:bg-orange-600 transition-all"
        >
          Copy
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-x-2">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(Number(e.target.value))}
            id="length"
          />
          <label htmlFor="length">Length: {length}</label>
        </div>

        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
            id="num"
          />
          <label htmlFor="num">Include Numbers</label>
        </div>

        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            checked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
            id="character"
          />
          <label htmlFor="character">Include Special Characters</label>
        </div>

        <button
          className="bg-orange-500 w-full text-white font-semibold py-2 rounded hover:bg-orange-600 transition-all"
          onClick={generatePassword}
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
