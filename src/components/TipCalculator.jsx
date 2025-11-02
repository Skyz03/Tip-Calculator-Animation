import { useForm } from "react-hook-form";

export default function TipCalculator() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="bg-white text-black rounded-2xl p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Bill Amount:</label>
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
    </div>

  );
}
