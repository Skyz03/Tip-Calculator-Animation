import { useState } from "react";
import { useForm } from "react-hook-form";
import dollarIcon from "../assets/images/icon-dollar.svg"
import iconPerson from "../assets/images/icon-person.svg"

export default function TipCalculator() {

  const [selectedTip, setSelectedTip] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  // when user submit data
  const onSubmit = (data) => {
    const tip = selectedTip !== null ? selectedTip : Number(data.customTip) || 0;
    console.log("Bill:", data.bill);
    console.log("Custom Tip:", tip);
    console.log("People:", data.people);
    console.log("Selected Tip:", selectedTip);
  };
  const tipOptions = [5, 10, 15, 25, 50];

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-[500px] sm:max-w-[600px] md:max-w-[700px]  bg-white text-black rounded-3xl p-7 pl-8 pr-8 ">

      <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-1/2">
        {/* Bill seciton*/}
        <div className="min-w-full mb-8">
          <label className="text-sm text-[hsl(186,14%,43%)] font-semibold">Bill</label>
          <div className="relative mt-1">
            <img src={dollarIcon} alt="doller_Icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-3"
            />
            <input
              type="number"
              className="w-full bg-[hsl(189,41%,97%)] p-1 pl-10 pr-3 text-right text-[hsl(183,100%,15%)] rounded-sm font-bold outline-none focus:ring-1 focus:ring-[hsl(172,67%,45%)]"
              placeholder="0"
              {...register("bill", { required: true, min: 1 })}
            />
          </div>

          {errors.bill && <span className="text-red-500 text-xs">Enter valid bill</span>}
        </div>

        {/* Tip Select Buttons section */}
        <div className="mb-8">
          <label className="text-sm text-[hsl(186,14%,43%)] font-semibold">Select Tip %</label>
          <div className="grid grid-cols-3 gap-3 my-3">
            {tipOptions.map((tip) => (
              <button
                key={tip}
                type="button"
                className={`p-2 rounded cursor-pointer font-bold ${selectedTip === tip
                  ? "bg-[hsl(172,67%,45%)] text-[hsl(183,100%,15%)]"
                  : "bg-[hsl(183,100%,15%)] text-white hover:bg-[rgb(38_192_171_/50%)] hover:text-[rgb(0,73,77)]"
                  }`}
                onClick={() => {
                  setSelectedTip(tip);
                }}
              >
                {tip}%
              </button>
            ))}
            {/* Custom Tip */}
            <input
              type="number"
              {...register("customTip")}
              placeholder="Custom"
              className="p-2 rounded font-bold text-[hsl(183,100%,15%)]  text-center appearance-none outline-none focus:ring-1 focus:ring-[hsl(172,67%,45%)]"
              onFocus={() => setSelectedTip(null)}
            />


          </div>
        </div>

        {/* Number of People section */}
        <div className="mb-8">
          <label className="text-sm text-[hsl(186,14%,43%)] font-semibold">Number of People</label>
          <div className="relative mt-1">
            <img src={iconPerson} alt="personIcon"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-3" />
            <input
              type="number"
              className="w-full bg-[hsl(189,41%,97%)] p-1 pl-10 pr-3 text-right text-[hsl(183,100%,15%)] rounded-sm font-bold outline-none focus:ring-1 focus:ring-[hsl(172,67%,45%)]"
              placeholder="0"
              {...register("people", { required: true, min: 1 })}
            />
            {/*  */}
          </div>
          {errors.people && <span className="text-red-500 text-xs">Enter number of people</span>}
        </div>
        <button type="submit">Calculate. </button>
      </form>
      {/* result of tip calculator */}
      <div className="flex flex-col justify-between w-full md:w-1/2 bg-[hsl(183,100%,15%)] text-white p-8 rounded-xl">
        <div>

          <div className="flex justify-between mb-8 ">
            <div>
              <p>Tip Amount</p>
              <p>/ person</p>
            </div>
            <div>0.00</div>
            {/*  */}
          </div>
          <div className="flex justify-between mb-8 ">
            <div>
              <p>Tip Amount</p>
              <p>/ person</p>
            </div>
            <div>0.00</div>
          </div>


        </div>
        <button className="bg-[hsl(172,67%,45%)] text-[hsl(183,100%,15%)] font-bold rounded cursor-pointer p-2">RESET</button>
      </div>
    </div>
  );
}
