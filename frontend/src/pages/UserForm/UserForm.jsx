import Header from "../../components/Header/Header.jsx";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSaveWorkEntry from "./hooks/useSaveWorkEntry.js";
import useGetWorkEntry from "./hooks/useGetWorkEntry.js";
import useUpdateWorkEntry from "./hooks/useUpdateWorkEntry.js";

const UserForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [state, setState] = useState({});
    const user = JSON.parse(window.localStorage.getItem("user"));
    const { mutate } = useSaveWorkEntry();
    const workEntryId = id;
    const { data: existingWorkEntry, isLoading } = useGetWorkEntry(workEntryId);
    const { mutate: updateWorkEntry } = useUpdateWorkEntry(workEntryId);
    const [file, setFile] = useState({});

    useEffect(() => {
        if (id && existingWorkEntry && !isLoading) {
            setState(prevState => ({
                ...prevState,
                ...existingWorkEntry.data,
            }));
        } else {
            setState({});
        }
    }, [id, existingWorkEntry, isLoading]);

    const handleChange = (e) => {
        if (e.target.name === "isHidden") {
            setState((prev) => (
                {...prev, [e.target.name] : e.target.checked}
            ));
        } else {
            setState((prev) => (
                {...prev, [e.target.name]: e.target.value}
            ));
        }
    };

    const handleChangeFile = (e) => {
        setFile(e.target.files[0]);
    }

    const handleSaveWorkEntry = async (e) => {
        e.preventDefault();
        const data = { ...state, userId: user.id, };
        try {
            await mutate({data, file});
        } catch (error) {
            console.error("Error saving work entry:", error);
        }
    };

    const handleUpdateWorkEntry = async (e) => {
        e.preventDefault();
        const data = { ...state, userId: user.id };
        try {
            await updateWorkEntry(data);
        } catch (error) {
            console.log("Error updating the work entry!", error);
        }
    };

    return (
        <div className="overflow-hidden">
            <Header />
            <button onClick={() => navigate(-1)} type="submit" className="mt-20 rounded-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Go Back</button>
            <div className="mt-20 ml-20 flex justify-center">
                <p className="text-[2.5rem]">Add Work Entry</p>
            </div>
            <div className="mt-20 flex justify-center">
                <form onSubmit={(e) => workEntryId ? handleUpdateWorkEntry(e) : handleSaveWorkEntry(e)} className="w-full max-w-lg" encType="multipart/form-data">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Title
                            </label>
                            <input name="title" value={state.title} onChange={(e) => handleChange(e)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" />
                            <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                        </div>
                        <div className="flex items-center mb-6">
                            <div className="flex flex-col">
                                <label>Hide Work</label>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value={state.isHidden} name="isHidden" onChange={(e) => handleChange(e)} className="sr-only peer" />
                                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                Description
                            </label>
                            <textarea name="description" value={state.description} onChange={(e) => handleChange(e)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                Customer Link
                            </label>
                            <input name="customerLink" value={state.customerLink} onChange={(e) => handleChange(e)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque" />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                                Image
                            </label>
                            <input name="file" onChange={(e) => handleChangeFile(e)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="file" />
                        </div>
                    </div>
                    <button type="submit" className="mt-10 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{workEntryId ? "Update Work Entry" : "Save Work Entry"}</button>
                </form>
            </div>
        </div>
    )
}

export default UserForm
