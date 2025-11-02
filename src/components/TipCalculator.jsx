import { useForm } from "react-hook-form";

export default function TipCalculator() {
  //

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log(`user data: ${data}`);
  };
  return (
    <div className="flex flex-col md:flex-row gap-6 w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px]  bg-white text-black rounded-2xl p-4 ">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-1/2">
        <label>Bill Amount  :</label>
        <input
          type="number"
          placeholder="Enter bill"
          {...register("bill", { required: true, min: 1 })}
        />
        {errors.bill && <span>Please enter a valid bill</span>}
        <label>Select Tip %</label>
        <input
          type="number"
          placeholder="Tip %"
          {...register("tip", { required: true })}
        />

        {errors.tip && <span>Select tip percentage</span>}
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
