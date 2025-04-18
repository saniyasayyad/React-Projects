import { Link } from "react-router-dom";
export default function Home() {
    return (
        <div className="mx-auto w-full max-w-7xl">
  <aside className="relative overflow-hidden text-black rounded-lg sm:mx-5 mx-2 sm:py-16 ">
  <div className="relative z-10 max-w-screen-2xl px-5 pb-20 pt-10 sm:py-24 mx-auto sm:px-8 lg:px-8 ">
    <div className="max-w-xl sm:mt-1 mt-80 space-y-8 text-center sm:text-right sm:ml-auto sm:translate-x-4">
      <h2 className="text-2xl font-bold sm:text-4xl">
        Download Now
        <span className="hidden sm:block text-3xl">Here we Go</span>
      </h2>

      <Link
        className="inline-flex text-white items-center px-4 py-2 font-medium bg-orange-700 rounded-lg hover:opacity-75"
        to="/"
      >
        <svg
          fill="white"
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
        >
          <path d="M1.571 23.664l10.531-10.501 3.712 3.701-12.519 6.941c-.476.264-1.059.26-1.532-.011l-.192-.13zm9.469-11.56l-10.04 10.011v-20.022l10.04 10.011zm6.274-4.137l4.905 2.719c.482.268.781.77.781 1.314s-.299 1.046-.781 1.314l-5.039 2.793-4.015-4.003 4.149-4.137zm-15.854-7.534c.09-.087.191-.163.303-.227.473-.271 1.056-.275 1.532-.011l12.653 7.015-3.846 3.835-10.642-10.612z" />
        </svg>
        &nbsp; Download now
      </Link>
    </div>
  </div>

  <div className="absolute top-0 bottom-0 left-0 right-0 sm:left-8 sm:right-8 sm:translate-x-[-4rem] w-full sm:my-20 sm:pt-1 pt-12 h-full">
    <img
      className="w-96"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShGsJNV1DmnQ5VBNEZc0okNRkQg3RiXWznbLWAGjkbkdSSvMRk"
      alt="image1"
    />
  </div>
</aside>
            <div className="grid  place-items-center">
                <img className="sm:w-96 w-48" src="https://ph-files.imgix.net/17f6e9b5-8ba9-4dca-8a6c-906b388142fe.png?auto=format&fit=crop" alt="image2" />
            </div>

            <h1 className="text-center text-xl text-black  py-10 ">React Router Learning</h1>
        </div>
    );
}
