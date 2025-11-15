import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import dollarIcon from "../assets/images/icon-dollar.svg";
import personIcon from "../assets/images/icon-person.svg";

// 
export default function TipCalculator() {
  const tipOptions = [5, 10, 15, 25, 50];
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

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-[500px] sm:max-w-[600px] md:max-w-[700px]  bg-white text-black rounded-3xl p-7 pl-8 pr-8 ">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-1/2">
        {/* Bill seciton*/}
        <InputField
          label={"Bill"}
          icon={dollarIcon}
          register={register("bill", { required: true, min: 1 })}
        />
        {/* Tip Select Buttons section */}
        <div className="mb-8">
          <label className="text-sm text-[hsl(186,14%,43%)] font-semibold">Select Tip %</label>
          <div className="grid grid-cols-3 gap-3 my-3">
            {tipOptions.map((tip) => (
              <TipButton
                key={tip}
                tip={tip}
                selectedTip={selectedTip}
                onSelect={() => setSelectedTip(tip)}
              />
            ))}
            <input
              type='number'
              {...register("customTip")}
              placeholder='Custom'
              onFocus={() => setSelectedTip(null)}
              className='p-2 rounded font-bold text-[hsl(183,100%,15%)] text-center bg-[hsl(189,41%,97%)] outline-none focus:ring-1 focus:ring-[hsl(172,67%,45%)]'
            />
          </div>
        </div>
        {/* Number of People section */}
        <InputField
          label={"Number of People"}
          icon={personIcon}
          register={register("people", { required: true, min: 1 })}
        />

        <button type="submit">Calculate. </button>
      </form>
      {/* result of tip calculator */}
      <div className="flex flex-col justify-between w-full md:w-1/2 bg-[hsl(183,100%,15%)] text-white p-8 rounded-xl">
        <div>
          <ResultRow
            label={"Tip Amount"}
            value={3} />
          <ResultRow
            label={"Total"}
            value={5} />
        </div>
        <button className="bg-[hsl(172,67%,45%)] text-[hsl(183,100%,15%)] font-bold rounded cursor-pointer p-2">RESET</button>
      </div>
    </div>
  );
}

/* ---------- Reusable Components ---------- */

function InputField({ label, icon, register, error }) {
  return (
    <div className='mb-8'>
      <label className='text-sm text-[hsl(186,14%,43%)] font-semibold'>
        {label}
      </label>
      <div className='relative mt-1'>
        <img
          src={icon}
          alt=''
          className='absolute left-4 top-1/2 -translate-y-1/2 w-3'
        />
        <input
          type='number'
          placeholder='0'
          {...register}
          className='w-full bg-[hsl(189,41%,97%)] p-1 pl-10 pr-3 text-right text-[hsl(183,100%,15%)] rounded-sm font-bold outline-none focus:ring-1 focus:ring-[hsl(172,67%,45%)]'
        />
      </div>
      {error && <span className='text-red-500 text-xs'>Required field</span>}
    </div>
  );
}

function TipButton({ tip, selectedTip, onSelect }) {
  const isActive = selectedTip === tip;
  return (
    <button
      type='button'
      onClick={onSelect}
      className={`p-2 rounded font-bold transition ${isActive
        ? "bg-[hsl(172,67%,45%)] text-[hsl(183,100%,15%)]"
        : "bg-[hsl(183,100%,15%)] text-white hover:bg-[rgb(38_192_171_/50%)] hover:text-[rgb(0,73,77)]"
        }`}
    >
      {tip}%
    </button>
  );
}

function ResultRow({ label, value }) {
  return (
    <div className='flex justify-between mb-8'>
      <div>
        <p>{label}</p>
        <p className='text-sm text-gray-400'>/ person</p>
      </div>
      <p className='text-3xl font-bold text-[hsl(172,67%,45%)]'>
        ${value.toFixed(2)}
      </p>
    </div>
  );
}
