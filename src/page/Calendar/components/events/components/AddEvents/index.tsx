import { X } from "phosphor-react";
import InputForm from "./components/input";
import { Formik, Form, FormikHelpers } from "formik";

interface AddEventsProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
interface FormikValues {
  name: string;
  initial: string;
  end: string;
}

const initialValues = {
  name: "",
  initial: "",
  end: "",
};

const Dados: Array<FormikValues> = [];

function AddEvents(props: AddEventsProps) {
  const { onClick } = props;

  const handleSubmit = (
    values: FormikValues,
    actions: FormikHelpers<FormikValues>
  ) => {
    Dados.push(values);
    localStorage.setItem("Dados", JSON.stringify(Dados));
    console.log(Dados);
    actions.resetForm();
  };

  return (
    <div className="items-center absolute left-[50%] translate-x-[-50%] bottom-[100px] w-full font-font-family bg-white p-4 rounded-lg h-[300px]">
      <div className="w-full flex justify-between mb-2">
        <h5 className="text-xl text-gray-4 font-medium">Adicionar evento</h5>
        <button aria-label="Close" onClick={onClick}>
          <X size={20} color="#373C4F" weight="bold" />
        </button>
      </div>
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors: { name?: string; initial?: string; end?: string } = {};

          // Verifique se todos os campos estão vazios
          if (!values.name) {
            errors.name = "Campo obrigatório";
          }

          // Verifique se "initial" tem o formato de hora (HH:mm)
          if (!/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(values.initial)) {
            errors.initial = "Formato de hora inválido (exemplo: 09:30)";
          }

          // Verifique se "end" tem o formato de hora (HH:mm)
          if (!/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(values.end)) {
            errors.end = "Formato de hora inválido (exemplo: 17:45)";
          }

          if (values.initial > values.end) {
            errors.end = "Hora final tem que ser maior que Hora inicial";
          }

          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="relative w-full flex flex-col gap-5 items-center">
            <InputForm mask="" name="name" placeholder="Nome do evento" />
            <InputForm mask="99:99" name="initial" placeholder="Hora inicial" />
            <InputForm mask="99:99" name="end" placeholder="Hora final" />
            <button
              disabled={isSubmitting}
              type="submit"
              className="bg-purple-2 h-10 px-2 rounded-lg text-white font-medium hover:bg-white hover:border-[1px] hover:border-purple-2 hover:text-purple-2 mt-2"
              aria-label="Adicionar evento"
            >
              Adicionar evento
            </button>
          </Form>
        )}
      </Formik>

      {/* Lista de eventos salvos */}
      <div>
        <h2>Eventos Salvos:</h2>
        <ul>
          {Dados.map((evento, index) => (
            <li key={index}>
              Nome: {evento.name}, Hora Inicial: {evento.initial}, Hora Final:{" "}
              {evento.end}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AddEvents;
