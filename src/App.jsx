import { useState } from "react";
import Tables from "./components/tables";
import { curUpdate } from "./context";

function App() {
    const [update, setUpdate] = useState(0);
    const baseUrl = "http://localhost:8080";

    async function addData(event) {
        event.preventDefault();
        let data = new FormData(event.target);
        let user = {
            name: data.get("name"),
            age: data.get("age"),
        };

        let response = await fetch(`${baseUrl}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            setUpdate(update + 1);
        }
    }

    return (
        <>
            <div className="w-[80%] m-auto mt-6 pb-6 flex flex-col items-start">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-black font-[Gilroy] font-bold text-5xl">
                        Dashboard
                    </h1>
                    <p className="text-black font-[Gilroy] font-normal text-2xl">
                        (Age Control)
                    </p>
                </div>

                <form
                    className="flex items-end justify-start gap-5 mt-6"
                    name="addForm"
                    onSubmit={(e) => addData(e)}
                >
                    <label className="flex flex-col items-start" htmlFor="name">
                        <span className="font-[Gilroy] font-semibold text-[18px]">
                            Имя
                        </span>
                        <input
                            className="focus:outline-none mt-2 w-full h-9 border border-solid border-[rgb(0,0,0,0.2)] pl-4 rounded-md"
                            type="text"
                            id="name"
                            name="name"
                            required
                        />
                    </label>

                    <label className="flex flex-col items-start" htmlFor="age">
                        <span className="font-[Gilroy] font-semibold text-[18px]">
                            Возраст
                        </span>
                        <input
                            className="focus:outline-none mt-2 w-full h-9 border border-solid border-[rgb(0,0,0,0.2)] pl-4  rounded-md"
                            type="text"
                            id="age"
                            name="age"
                            required
                        />
                    </label>

                    <button
                        className="bg-[#2323d3] text-white font-[Gilroy] p-3 font-semibold text-sm rounded-xl"
                        type="submit"
                    >
                        Добавить
                    </button>
                </form>
                {
                    <curUpdate.Provider value={update}>
                        <Tables setUpdate={setUpdate} baseUrl={baseUrl} />
                    </curUpdate.Provider>
                }
            </div>
        </>
    );
}

export default App;
