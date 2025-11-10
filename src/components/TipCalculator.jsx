import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import dollarIcon from "../assets/images/icon-dollar.svg";
import personIcon from "../assets/images/icon-person.svg";

export default function TipCalculator() {
  const tipOptions = [5, 10, 15, 25, 50];
  const [selectedTip, setSelectedTip] = useState(null);

  const {
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bill: "",
      customTip: "",
      people: "",
    },
  });

  // Watch form values in real-time
  const bill = Number(watch("bill")) || 0;
  const people = Number(watch("people")) || 0;
  const customTip = Number(watch("customTip")) || 0;

  // Determine actual tip percentage
  const tipPercent = selectedTip ?? customTip ?? 0;

  // Compute derived values using useMemo
  const { tipAmountPerPerson, totalPerPerson } = useMemo(() => {
    if (!bill || !people) return { tipAmountPerPerson: 0, totalPerPerson: 0 };
    const tipTotal = (bill * tipPercent) / 100;
    const tipPerPerson = tipTotal / people;
    const totalPerPerson = (bill + tipTotal) / people;
    return { tipAmountPerPerson: tipPerPerson, totalPerPerson };
  }, [bill, people, tipPercent]);

  // Reset handler
  const handleReset = () => {
    reset();
    setSelectedTip(null);
  };

  return (
    <div className='flex flex-col md:flex-row gap-8 w-full max-w-3xl bg-white text-black rounded-3xl p-7 md:p-10'>
      {/* Left Panel: Inputs */}
      <div className='w-full md:w-1/2'>
        {/* Bill */}
        <InputField
          label='Bill'
          icon={dollarIcon}
          error={errors.bill}
          register={register("bill", { required: true, min: 1 })}
        />

        {/* Select Tip */}
        <div className='mb-8'>
          <label className='text-sm text-[hsl(186,14%,43%)] font-semibold'>
            Select Tip %
          </label>
          <div className='grid grid-cols-3 gap-3 my-3'>
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

        {/* Number of People */}
        <InputField
          label='Number of People'
          icon={personIcon}
          error={errors.people}
          register={register("people", { required: true, min: 1 })}
        />
      </div>

      {/* Right Panel: Results */}
      <div className='flex flex-col justify-between w-full md:w-1/2 bg-[hsl(183,100%,15%)] text-white p-8 rounded-xl'>
        <div>
          <ResultRow label='Tip Amount' value={tipAmountPerPerson} />
          <ResultRow label='Total' value={totalPerPerson} />
        </div>
        <button
          onClick={handleReset}
          disabled={!bill && !people && !selectedTip && !customTip}
          className={`font-bold rounded p-2 mt-6 ${
            bill || people
              ? "bg-[hsl(172,67%,45%)] text-[hsl(183,100%,15%)] hover:opacity-80"
              : "bg-gray-500 cursor-not-allowed"
          }`}
        >
          RESET
        </button>
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
      className={`p-2 rounded font-bold transition ${
        isActive
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
