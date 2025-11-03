import { useState } from "react";
import { useForm } from "react-hook-form";

export default function TipCalculator() {

  const [selectedTip, setSelectedTip] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = (data) => {
    const tip = selectedTip !== null ? selectedTip : Number(data.customTip) || 0;

    console.log(`user data: ${data}`);
  };
  const tipOptions = [5, 10, 15, 25, 50];

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px]  bg-white text-black rounded-2xl p-4 ">

      <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-1/2">
        <label>Bill Amount  :</label>
        <input
          type="number"
          placeholder="Enter bill"
          {...register("bill", { required: true, min: 1 })}
        />
        {errors.bill && <span>Please enter a valid bill  </span>}

        {/* Tip Select Buttons */}
        <label className="block text-sm font-semibold">Select Tip %</label>
        <div className="grid grid-cols-3 gap-2 my-3">
          {tipOptions.map((tip) => (
            <button
            // 
              key={tip}
              type="button"
              className={`p-2 rounded font-bold ${selectedTip === tip
                ? "bg-[hsl(160,73%,28%)] text-white"
                : "bg-[hsl(183,100%,15%)] text-white hover:bg-gray-900"
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
            className="p-2 border rounded text-center"
            onFocus={() => setSelectedTip(null)}
          />
          {/*section fr */}
          {/**/}
        </div>

        <label>Number of People:</label>
        <input
          type="number"
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
