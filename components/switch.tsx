import { MdClose } from "react-icons/md";

export function Switch({
  active,
  setActive,
}: {
  active: boolean;
  setActive: () => void;
}) {
  return (
    <button onClick={setActive} type="button" className="focus:outline-none">
      {active ? (
        <div className="bg-green-normal flex h-5 w-9 items-center rounded-full px-1">
          <div className="ml-auto h-3 w-3 rounded-full bg-white" />
        </div>
      ) : (
        <div className="bg-white-darker flex h-5 w-9 justify-center rounded-full p-0.5">
          <div className="bg-white-normal flex h-full w-full items-center justify-center rounded-full p-0.5">
            <div className="bg-white-darker mr-auto flex h-3 w-3 items-center justify-center rounded-full">
              <span className="text-white-normal flex items-center justify-center">
                <MdClose size={8} />
              </span>
            </div>
          </div>
        </div>
      )}
    </button>
  );
}
