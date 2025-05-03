import { useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyinfo";

function App() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = (e) => {
    e.preventDefault();
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full">
    
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/5466791/pexels-photo-5466791.jpeg?auto=compress&cs=tinysrgb&w=600')",
        }}
      ></div>


      <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-full max-w-lg mx-auto border border-gray-100 rounded-lg p-5 backdrop-blur-md bg-white/30">
          <form onSubmit={convert}>
            <div className="w-full mb-1">
              <InputBox
                label="From"
                 placeholder = "Enter Amount"
                 className="text-black"
                amount={amount}
                onAmountChange={(amount) => setAmount(amount)}
                currencyOptions={options}
                selectCurrency={from}
              
                onCurrencyChange={(currency) => setFrom(currency)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                Swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
              className="text-black"
                label="To"
                placeholder = "Result is here"
                amount={convertedAmount}
                onCurrencyChange={(currency) => setTo(currency)}
                currencyOptions={options}
                selectCurrency={to}
                disabled={true} 
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
