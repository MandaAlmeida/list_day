import { ErrorMessage, Field, FieldProps } from "formik";
import InputMask from "react-input-mask";

interface InputFormProps {
  placeholder: string;
  name: string;
  mask: string;
}

function InputForm(props: InputFormProps) {
  const { placeholder, name, mask } = props;
  return (
    <section className="relative w-full">
      <Field
        className="w-full outline-none h-10 px-[10px]"
        type="text"
        name={name}
        render={({ field }: FieldProps) => (
          <InputMask {...field} mask={mask} placeholder={placeholder} />
        )}
      />
      <ErrorMessage
        className="absolute bottom-[-16px] left-[10px] text-xs font-medium font-font-family text-red-600"
        name={name}
        component="div"
      />
    </section>
  );
}

export default InputForm;
