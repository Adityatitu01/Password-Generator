import React, { useState, useCallback, useEffect } from 'react';

function App() {
  let [length, setLength] = useState(8);
  let [numAllowed, setNumAllowed] = useState(false);
  let [charAllowed, setCharAllowed] = useState(false);
  let [password, setPassword] = useState('');
  let [copied, setCopied] = useState(false); // State to handle copied animation

  let passwordGenerator = useCallback(() => {
    let password = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*+-';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      password += str.charAt(char);
    }

    setPassword(password);
  }, [length, numAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true); // Set copied state to true
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  // Dynamic background based on numAllowed and charAllowed
  const dynamicBackground = numAllowed
    ? charAllowed
      ? 'from-green-500 via-blue-500 to-indigo-700'
      : 'from-blue-500 via-indigo-500 to-purple-700'
    : charAllowed
    ? 'from-purple-500 via-pink-500 to-red-600'
    : 'from-purple-600 to-indigo-600';

  return (
    <>
      <div
        className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${dynamicBackground} transition-all duration-1000 ease-in-out`}
      >
        <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 w-full sm:w-2/3 lg:w-1/3 transition transform hover:scale-105 duration-300">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-6">
            Password Generator
          </h1>
          <div className="input-area flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
            <input
              className="w-full sm:w-60 p-3 rounded-lg shadow-inner text-center text-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
              placeholder="Generated password"
              value={password}
              readOnly
            />
            <button
              className={`w-full sm:w-20 p-3 rounded-lg text-white font-semibold shadow-md transition-all duration-300 transform ${
                copied ? 'bg-green-500' : 'bg-indigo-500 hover:bg-indigo-600 hover:scale-105'
              }`}
              onClick={copyToClipboard}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="action-area pt-4 flex flex-col sm:flex-row justify-center items-center gap-6 flex-wrap">
            <div className="flex flex-col items-center">
              <input
                type="range"
                min={6}
                max={50}
                value={length}
                className="cursor-pointer w-full focus:ring-2 focus:ring-indigo-400 transition duration-300"
                onChange={(e) => setLength(e.target.value)}
              />
              <label className="text-gray-700 mt-2 font-medium transition duration-300">
                Length: <span className="font-bold">{length}</span>
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={numAllowed}
                id="numberInput"
                className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 transition transform duration-300 focus:scale-110"
                onChange={() => {
                  setNumAllowed((prev) => !prev);
                }}
              />
              <label
                htmlFor="numberInput"
                className="text-gray-700 font-medium transition duration-300"
              >
                Numbers
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={charAllowed}
                id="characterInput"
                className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 transition transform duration-300 focus:scale-110"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label
                htmlFor="characterInput"
                className="text-gray-700 font-medium transition duration-300"
              >
                Characters
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
