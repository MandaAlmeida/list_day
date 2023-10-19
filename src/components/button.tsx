import clsx from "clsx";
import { Link } from "react-router-dom";

interface ButtonProps {
  title: string;
  link: string;
  className?: string;
}

function Button(props: ButtonProps) {
  const { title, link, className } = props;
  return (
    <>
      <Link
        to={link}
        className={clsx(
          "w-40 h-11  rounded-lg text-xl font-font-family font-medium hover:bg-gray-2 hover:text-white flex items-center justify-center",
          className
        )}
      >
        {title}
      </Link>
    </>
  );
}

export default Button;
