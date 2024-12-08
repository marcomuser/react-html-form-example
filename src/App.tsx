import { useForm } from "react-hook-form";
import "./App.css";

interface FormValues {
  firstName: string;
  gender: "female" | "male" | "other";
}

export default function App() {
  const { register, handleSubmit } = useForm<FormValues>({
    progressive: true,
    shouldUseNativeValidation: true,
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))} className="form">
      <label>
        First Name
        <input
          type="number"
          {...register("firstName", {
            required: "required",
            min: -22,
            validate: {
              malePositive: (v, formValues) =>
                formValues.gender === "male" && parseInt(v) < 0
                  ? "not valid"
                  : true,
            },
          })}
        />
      </label>

      <label>
        Gender Selection
        <select {...register("gender", { required: "required" })}>
          <option value=""></option>
          <option value="female">female</option>
          <option value="male">male</option>
          <option value="other">other</option>
        </select>
      </label>

      <button>Submit</button>
    </form>
  );
}
