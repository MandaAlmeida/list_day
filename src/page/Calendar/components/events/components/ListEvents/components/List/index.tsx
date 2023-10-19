function List() {
  return (
    <li className="flex flex-col justify-center font-font-family bg-list px-12 mt-6 h-[70px] cursor-pointer">
      <p className="text-white text-lg flex items-center gap-5">
        <strong className="w-2 h-2 rounded-full bg-purple-2"></strong>Teste
      </p>
      <strong className="text-gray-3 text-base font-normal">
        20:00 - 21:00
      </strong>
    </li>
  );
}

export default List;
