import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import dollarIcon from "../assets/images/icon-dollar.svg";
import personIcon from "../assets/images/icon-person.svg";

export default function TipCalculator() {
  const tipOptions = [5, 10, 15, 25, 50];
  const [selectedTip, setSelectedTip] = useState(null);

  const [tipPerPerson, setTipPerPerson] = useState(0);
  const [totalPerPerson, setTotalPerPerson] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const watchBill = watch("bill");
  const watchPeople = watch("people");
  const watchCustomTip = watch("customTip");

  // Auto calculate on change
  useEffect(() => {
    const bill = Number(watchBill);
    const people = Number(watchPeople);
    const tipPercent =
      selectedTip !== null ? selectedTip : Number(watchCustomTip) || 0;

    if (bill > 0 && people > 0) {
      const tipAmount = (bill * (tipPercent / 100)) / people;
      const totalAmount = bill / people + tipAmount;

      setTipPerPerson(tipAmount);
      setTotalPerPerson(totalAmount);
    }
  }, [watchBill, watchPeople, watchCustomTip, selectedTip]);

  const onSubmit = () => {}; // no longer needed, but kept for react-hook-form

  const handleReset = () => {
    reset();
    setSelectedTip(null);
    setTipPerPerson(0);
    setTotalPerPerson(0);
  };

  return (
    <div className='flex flex-col md:flex-row gap-8 w-full max-w-[700px] bg-white text-black rounded-3xl p-8'>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-1/2'>
        <InputField
          label='Bill'
          icon={dollarIcon}
          register={register("bill", { required: true, min: 1 })}
          error={errors.bill}
        />

        <div className='mb-8'>
          <label className='text-sm text-neutral-gray font-semibold'>
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

            {/* custom tip */}
            <input
              type='number'
              {...register("customTip")}
              placeholder='Custom'
              onFocus={() => setSelectedTip(null)}
              className='
                p-3 text-lg tracking-wide rounded-md font-bold
                text-primary text-center
                bg-neutral-light outline-none
                focus:ring-2 focus:ring-accent
              '
            />
          </div>
        </div>

        <InputField
          label='Number of People'
          icon={personIcon}
          register={register("people", { required: true, min: 1 })}
          error={errors.people}
        />

        <button
          type='submit'
          className='
            w-full bg-primary text-white py-3 rounded mt-4 
            text-lg tracking-wide font-bold 
            hover:bg-hover-accent-light hover:text-hover-dark-text hover:cursor-pointer
          '
        >
          Calculate
        </button>
      </form>

      <div className='flex flex-col justify-between w-full md:w-1/2 bg-primary text-white p-8 rounded-xl'>
        <div>
          <ResultRow label='Tip Amount' value={tipPerPerson} />
          <ResultRow label='Total' value={totalPerPerson} />
        </div>

        <button
          onClick={handleReset}
          className='
            bg-accent text-primary font-bold text-lg tracking-wide 
            rounded p-3 hover:bg-neutral-pale hover:cursor-pointer
          '
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
      <label className='text-base tracking-wide text-neutral-gray font-semibold uppercase'>
        {label} *
      </label>

      <div className='relative mt-2'>
        <img
          src={icon}
          alt=''
          className='absolute left-4 top-1/2 -translate-y-1/2 w-4'
        />

        <input
          type='number'
          placeholder='0'
          {...register}
          className='
            w-full bg-neutral-light p-2 pl-12 pr-3 
            text-right text-lg tracking-wide
            text-primary rounded-md font-bold 
            outline-none focus:ring-2 focus:ring-accent
          '
        />
      </div>

      {error && (
        <span className='text-red-500 text-xs tracking-wide'>
          This is a required field
        </span>
      )}
    </div>
  );
}

function TipButton({ tip, selectedTip, onSelect }) {
  const isActive = selectedTip === tip;

  return (
    <button
      type='button'
      onClick={onSelect}
      className={`
        p-3 rounded-md font-bold text-lg tracking-wide transition hover:cursor-pointer
        ${
          isActive
            ? "bg-accent text-primary"
            : "bg-primary text-white hover:bg-hover-accent-light hover:text-hover-dark-text"
        }
      `}
    >
      {tip}%
    </button>
  );
}

function ResultRow({ label, value }) {
  return (
    <div className='flex justify-between mb-10'>
      <div>
        <p className='text-lg tracking-wide font-semibold'>{label}</p>
        <p className='text-sm tracking-wide text-neutral-gray'>/ person</p>
      </div>

      <p className='text-4xl tracking-wide font-bold text-accent'>
        ${value.toFixed(2)}
      </p>
    </div>
  );
}
