import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState(false);
  const [length, setLength] = useState(8);
  const [chracther, setChrachter] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  let passwordref = useRef(null);

  const passwordGenerate = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (chracther) str += "!@#$%&?";
    for (let i = 1; i <= length; i++) {
      // Changed 'index' to 'i'
      let randomm = Math.floor(Math.random() * str.length + 1); // Removed +1

      pass += str.charAt(randomm);
    }
    setPassword(pass);
  }, [length, number, chracther, setPassword]);

  const passwordcopytoclip = () => {
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password);
  };
  const MyModel = () => {
    return (
      <>
        <div
          className="flex flex-wrap items-center justify-center bg-slate-500 top-0 bottom-0 left-0 mt-56 rounded-lg text-orange-500
     right-0 p-3 font-bold text-2xl max-w-md mx-auto h-48 fixed"
        >
          <h2 className="">welcome</h2>
          <p className="text-orange-500 text-2xl">
            To Sheharyars Random Password Genrater
          </p>
        </div>
      </>
    );
  };

  useEffect(() => {
    passwordGenerate();
    setTimeout(() => {
      setModalIsOpen(false); // Close the modal after 3000ms
    }, 3000);
    // displayModalRef.current = false; // Set the flag to false after the initial display
  }, [length, number, chracther, passwordGenerate]);

  return (
    <>
      <div
        className="w-full bg-slate-700 max-w-md flex-col 
      rounded-lg mx-auto py-3 mt-56 px-4 flex justify-center items-center text-orange-500"
      >
        <h2 className="font-bold text-2xl my-2">Password Generator</h2>
        <div className="flex w-full overflow-hidden rounded-lg">
          <input
            type="text"
            placeholder="Password"
            value={password}
            readOnly
            className="w-full py-1 px-3 outline-none "
            ref={passwordref}
          />
          <button
            onClick={passwordcopytoclip}
            className="bg-orange-500 text-white px-2 font-bold hover:bg-orange-400 "
          >
            Copy
          </button>
        </div>
        <div className="flex w-full my-2 gap-2">
          <div>
            <input
              type="range"
              value={length}
              min={8}
              max={100}
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="">Length:{length}</label>
          </div>
          <div>
            <input
              type="checkbox"
              value={number}
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
            <label htmlFor="">Number</label>
          </div>
          <div>
            <input
              type="checkbox"
              onChange={() => {
                setChrachter((prev) => !prev);
              }}
            />
            <label htmlFor="">Chracther</label>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap text-center">
        {modalIsOpen && <MyModel />}
      </div>
    </>
  );
}

export default App;
