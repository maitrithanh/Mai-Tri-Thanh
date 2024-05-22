import { useEffect, useState } from "react";
import "./App.css";
import SwapForm from "./components/Form/SwapForm";
import { handleLinkImg } from "./utils/handleLinkImage";

function App() {
  const [typeSearch, setTypeSearch] = useState("");
  const [dataPrice, setDataPrice] = useState([]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          "https://interview.switcheo.com/prices.json"
        );
        const data = await response.json();
        setDataPrice(data);
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };

    fetchPrices();
  }, []);

  return (
    <div>
      <div className="fixed inset-0 -z-10 flex h-screen w-screen justify-center">
        <div className="radial-background block h-full w-full max-w-lg opacity-40 blur-[70px] saturate-150"></div>
      </div>

      <nav className="flex justify-between md:mx-10 mx-2 gap-2 items-center h-16">
        <div className="flex justify-center items-center">
          <img src="/99tech.png" alt="99Tech Logo" width={50} />
          <p className="text-lg font-bold text-[#c781ff] hidden sm:block">
            Swap
          </p>
        </div>

        <div className="md:w-[480px] rounded-lg bg-gray-100 p-1 group relative">
          <div className=" rounded-lg p-1 flex justify-center items-center gap-2">
            <img
              src="/icon/search.svg"
              width={20}
              height={20}
              alt="Search Icon"
            />
            <input
              id="input-amount"
              value={typeSearch}
              onChange={(e) => setTypeSearch(e.target.value)}
              className="text-lg outline-none w-full bg-gray-100"
              placeholder="Search price today"
            />
          </div>
          {typeSearch && (
            <ul className="absolute mt-1 p-1 border shadow-2xl rounded-lg bg-white max-h-[430px] md:w-[480px] overflow-auto z-10">
              {dataPrice
                .filter((item) =>
                  item.currency.toLowerCase().includes(typeSearch.toLowerCase())
                )
                .map((item, index) => (
                  <li
                    key={index}
                    className="flex gap-2 hover:bg-slate-100 p-2 cursor-pointer"
                  >
                    <img
                      src={handleLinkImg(item.currency)}
                      width={30}
                      alt={item.currency}
                      onError={(e) =>
                        (e.target.src = "/icon/fallback-coin.svg")
                      }
                    />
                    <div>
                      <p className="font-semibold">{item.currency}</p>
                      <p>{item.price}</p>
                    </div>
                  </li>
                ))}
              {dataPrice?.filter((x) =>
                x.currency.toLowerCase().includes(typeSearch)
              ).length === 0 && (
                <span className="text-lg w-full flex justify-center items-center p-4">
                  Not Found!
                </span>
              )}
            </ul>
          )}
        </div>

        <div>
          <button className="primary-btn p-2 px-4 border-none rounded-xl md:text-lg text-sm font-bold text-white">
            Join Us
          </button>
        </div>
      </nav>

      <div className="flex justify-center md:p-16 p-4 h-full items-center">
        <div>
          <div className="flex flex-col max-w-[920px] md:text-[64px] text-[44px] font-semibold items-center justify-center">
            <span className="leading-tight">Swap anytime,</span>
            <span className="leading-tight">anywhere.</span>
          </div>
          <SwapForm dataPrice={dataPrice} />
        </div>
      </div>
    </div>
  );
}

export default App;
