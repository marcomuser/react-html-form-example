import { useForm } from "react-hook-form";
import "./App.css";

interface FormValues {
  temperature: string;
  country: "sweden" | "india";
}

export default function App() {
  const { register, handleSubmit } = useForm<FormValues>({
    progressive: true,
    shouldUseNativeValidation: true,
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))} className="form">
      <label>
        Country
        <select {...register("country", { required: true })}>
          <option value=""></option>
          <option value="sweden">Sweden</option>
          <option value="india">India</option>
        </select>
      </label>

      <label>
        Temperature
        <input
          type="number"
          {...register("temperature", {
            required: true,
            min: -30,
            max: 60,
            validate: {
              coldEurope: (v, formValues) =>
                formValues.country === "sweden" && parseInt(v) > 40
                  ? "Not valid. It doesn't get this hot in Sweden!"
                  : true,
              hotIndia: (v, formValues) =>
                formValues.country === "india" && parseInt(v) < 0
                  ? "Not valid. It doesn't get this cold in India!"
                  : true,
            },
          })}
        />
      </label>

      <button>Submit</button>
    </form>
  );
}
