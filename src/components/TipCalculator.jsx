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
    <div className="flex flex-col md:flex-row gap-6 w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px]  bg-white text-black rounded-2xl p-4 ">

      <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-1/2">
        <div className="min-w-full">
          <label className="text-sm text-gray-600 font-semibold">Bill Amount  :</label>
          <div className="relative mt-1 mb-4">
            <img src={dollarIcon} alt="doller_Icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-3"
            />
            <input
              type="number"
              className="w-full bg-[hsl(189,41%,97%)] p-3 pl-10 pr-3 text-right text-[hsl(183,100%,15%)] rounded-sm font-bold outline-none focus:ring-2 focus:ring-[hsl(172,67%,45%)]"
              placeholder="Enter bill"
              {...register("bill", { required: true, min: 1 })}
            />
          </div>

          {errors.bill && <span className="text-red-500 text-xs">Enter valid bill</span>}
        </div>

        {/* Tip Select Buttons */}
        <label className="block text-sm font-semibold">Select Tip %</label>
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
            className="p-2 border rounded font-700 text-[rgb(0,73,77)] text-center appearance-none"
            onFocus={() => setSelectedTip(null)}
          />

        </div>

        <label>Number of People:</label>
        <img src={iconPerson} alt="personIcon"
          className="absolute" />
        <input
          type="number"
          className="w-full relative p-2 text-right  text-[rgb(0,73,77)]"
          placeholder="People count"
          {...register("people", { required: true, min: 1 })}
        />
        {errors.people && <span>Enter number of people</span>}

        <button type="submit">Calculate</button>
      </form>
      {/* result of tip calculator */}
      <div className="w-full md:w-1/2 bg-[hsl(183,100%,15%)] text-white p-4 rounded-xl">
        <h1>Here resulte should be display</h1>
      </div>
    </div>
  );
}
