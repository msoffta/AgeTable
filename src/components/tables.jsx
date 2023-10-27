import { useState } from "react";
import { useEffect } from "react";
import Table from "./sub-components/table";
import { useContext } from "react";
import PropTypes from "prop-types";
import { curUpdate } from "../context";

function Tables({ setUpdate, baseUrl }) {
    const [data, setData] = useState([]);
    const update = useContext(curUpdate);

    useEffect(() => {
        async function getData() {
            let response = await fetch(`${baseUrl}/users`);

            if (response.ok) {
                setData(await response.json());
            }
        }
        getData();
    }, [baseUrl, update]);

    return (
        <>
            <div className="grid grid-cols-3 w-full mt-16">
                <div className="w-full flex flex-col items-start pr-12">
                    <h2 className="mb-12 font-[Gilroy] font-semibold text-2xl">
                        Люди до 25
                    </h2>
                    {
                        <curUpdate.Provider value={update}>
                            <Table
                                data={data}
                                type="un25"
                                setUpdate={setUpdate}
                                baseUrl={baseUrl}
                            />
                        </curUpdate.Provider>
                    }
                </div>
                <div className="w-full flex flex-col items-start border-r border-l border-solid border-black pl-12 pr-12">
                    <h2 className="mb-12 font-[Gilroy] font-semibold text-2xl">
                        Люди до 50
                    </h2>
                    {
                        <curUpdate.Provider value={update}>
                            <Table
                                data={data}
                                type="un50"
                                setUpdate={setUpdate}
                                baseUrl={baseUrl}
                            />
                        </curUpdate.Provider>
                    }
                </div>
                <div className="w-full flex flex-col items-start pl-12">
                    <h2 className="mb-12 font-[Gilroy] font-semibold text-2xl">
                        Остальные
                    </h2>
                    {
                        <curUpdate.Provider value={update}>
                            <Table
                                data={data}
                                type="other"
                                setUpdate={setUpdate}
                                baseUrl={baseUrl}
                            />
                        </curUpdate.Provider>
                    }
                </div>
            </div>
        </>
    );
}
Tables.propTypes = {
    setUpdate: PropTypes.func.isRequired,
    baseUrl: PropTypes.string.isRequired,
};

export default Tables;
