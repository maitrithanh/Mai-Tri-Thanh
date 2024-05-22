import React, { useState, useEffect } from "react";
import InputCrypto from "../Input/InputCrypto";
import { handleLinkImg } from "../../utils/handleLinkImage";
import toast from "react-hot-toast";

const SwapForm = ({ dataPrice }) => {
  const [typeSend, setTypeSend] = useState({
    name: "USD",
    img: handleLinkImg("USD"),
  });
  const [typeReceive, setTypeReceive] = useState({
    name: "",
    img: "",
  });

  const [valueSend, setValueSend] = useState();
  const [valueReceive, setValueReceive] = useState();
  const [priceSend, setPriceSend] = useState();
  const [priceReceive, setPriceReceive] = useState();
  const [loading, setLoading] = useState(false);

  //get value price of type crypto when change data { dataPrice, typeSend, typeReceive}
  useEffect(() => {
    setPriceSend(dataPrice?.find((x) => x.currency === typeSend.name)?.price);
    setPriceReceive(
      dataPrice?.find((x) => x.currency === typeReceive.name)?.price
    );
  }, [dataPrice, typeSend, typeReceive]);

  //exchange type send to receive and type receive to send when click icon
  const handleChangeType = () => {
    setTypeSend(typeReceive);
    setTypeReceive(typeSend);
  };

  const handleSwap = () => {
    //check invalid
    if (typeReceive.name === "" || typeSend.name === "") {
      toast.error("Please select token.");
      return;
    }
    if (!valueSend) {
      toast.error("Please input Amount to send.");
      return;
    }

    let resultSwap = 0;
    setLoading(true);
    //caculate
    resultSwap = (valueSend * priceSend) / priceReceive;
    //simulate timeout delay for the submit button
    setTimeout(() => {
      setValueReceive(resultSwap.toFixed(10));
      setLoading(false);
    }, 300);
  };

  return (
    <div className="flex justify-center bg-white shadow-2xl md:w-[480px] p-4 rounded-2xl mt-8">
      <div className="w-full">
        {/* <h5>Swap</h5> */}
        <div className="relative flex flex-col gap-4">
          <div className="flex flex-col border border-[#EAECEF] focus-within:border-[#27d38e] p-4 rounded-xl">
            <label htmlFor="input-amount text-md">Amount to send</label>
            <InputCrypto
              inputId="input-send"
              typeDefault={typeSend}
              valuesend={valueSend}
              setTypeSend={setTypeSend}
              setValueSend={setValueSend}
              dataPrice={dataPrice}
            />
          </div>
          <div
            className="absolute right-28 rounded-3xl top-[35%] bg-white group border border-[#EAECEF]  p-4 cursor-pointer"
            onClick={handleChangeType}
          >
            <img
              className="group-hover:rotate-180 transition-all duration-300"
              src="/icon/arrow-down-up.svg"
              alt="Change send rececive type"
              width={18}
              height={18}
            />
          </div>
          <div className="flex flex-col border border-[#EAECEF] focus-within:border-[#27d38e] p-4 rounded-xl">
            <label htmlFor="input-amount text-md">Amount to receive</label>
            <InputCrypto
              inputId="input-receive"
              typeDefault={typeReceive}
              valueReceive={valueReceive}
              setTypeReceive={setTypeReceive}
              setValueReceive={setValueReceive}
              dataPrice={dataPrice}
            />
          </div>
        </div>

        <button
          onClick={handleSwap}
          className={`${
            loading
              ? "bg-slate-100 text-[#27d38e] border border-[#27d38e]"
              : "primary-btn"
          } rounded-2xl flex justify-center gap-2 items-center w-full p-4 mt-4 font-bold text-white text-xl`}
        >
          <img
            className={`${loading ? "block" : "hidden"}`}
            src="/icon/loading.gif"
            alt="Loading..."
            width={24}
            height={24}
          />
          CONFIRM SWAP
        </button>
      </div>
    </div>
  );
};

export default SwapForm;
