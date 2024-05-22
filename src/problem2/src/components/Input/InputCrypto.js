import React, { useState } from "react";
import { handleLinkImg } from "../../utils/handleLinkImage";

const InputCrypto = ({
  inputId,
  typeDefault,
  setTypeSend,
  setTypeReceive,
  valueSend,
  valueReceive,
  setValueSend,
  setValueReceive,
  dataPrice,
}) => {
  const [typeSearch, setTypeSearch] = useState("");
  return (
    <>
      <div className="flex gap-2 justify-center items-center h-full">
        <input
          id={inputId}
          name={inputId}
          defaultValue={inputId === "input-send" ? valueSend : valueReceive}
          onChange={(e) =>
            inputId === "input-send"
              ? setValueSend(e.target.value)
              : setValueReceive(e.target.value)
          }
          className="text-2xl font-bold border-none outline-none w-full"
          placeholder="0"
        />
        <div className="relative group">
          <div className="flex gap-2 text-md font-bold pr-4 cursor-pointer">
            <img
              src={typeDefault.name ? handleLinkImg(typeDefault.name) : null}
              width={20}
              height={20}
              alt="USDT"
            />
            {typeDefault.name ? typeDefault.name : "Select"}
            <img src="/icon/arrow-down.svg" width={20} height={20} alt="USDT" />
          </div>
          {/* search type currency */}
          <div className="absolute z-10 max-h-[430px] md:w-[480px] w-[280px] overflow-auto bg-white rounded-lg shadow-2xl -right-8 hidden hover:block group-hover:block">
            <div className="p-2">
              <div className="border rounded-lg p-1 flex justify-center items-center gap-2">
                <img src="/icon/search.svg" width={20} height={20} alt="USDT" />
                <input
                  id="input-amount"
                  value={typeSearch}
                  onChange={(e) => {
                    setTypeSearch(e.target.value);
                  }}
                  className="text-lg outline-none w-full"
                  placeholder="Search"
                />
              </div>
            </div>
            {/* suggest for search */}
            <ul className="mb-2 ">
              {dataPrice
                ?.filter((item) =>
                  item.currency.toLowerCase().includes(typeSearch.toLowerCase())
                )
                ?.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className="flex gap-2 hover:bg-slate-100 p-2 cursor-pointer"
                      onClick={() =>
                        inputId === "input-send"
                          ? setTypeSend({
                              name: item.currency,
                              img: handleLinkImg(item.currency),
                            })
                          : setTypeReceive({
                              name: item.currency,
                              img: handleLinkImg(item.currency),
                            })
                      }
                    >
                      <img
                        src={handleLinkImg(item.currency)}
                        width={18}
                        height={18}
                        alt={item.currency}
                        onError={(e) =>
                          (e.target.src = "/icon/fallback-coin.svg")
                        }
                      />
                      <p className="font-semibold">{item.currency}</p>
                    </li>
                  );
                })}
              {dataPrice?.filter((x) =>
                x.currency.toLowerCase().includes(typeSearch)
              ).length === 0 && (
                <span className="text-lg w-full flex justify-center items-center p-4">
                  Not Found!
                </span>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default InputCrypto;
