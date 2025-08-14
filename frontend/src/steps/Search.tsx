import React, { useEffect, useState } from "react"
import type { Data } from "../type"
import { toast } from "sonner"
import { getUsers } from "../services/api"
import { useDebounce } from "@uidotdev/usehooks";

export const Search = ({initialData} : {initialData: Data}) => {

    const [data, setData] = useState<Data>(initialData || [])
    const [search, setSearch] = useState<string>(()=> {
        return new URLSearchParams(window.location.search).get("q") || ""
    })
    const debouncedSearchTerm = useDebounce(search, 300);


    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        const newPathname = debouncedSearchTerm === '' ? window.location.pathname : `?q=${debouncedSearchTerm}`;

        window.history.replaceState({}, '', newPathname);

        updateData()
    },[debouncedSearchTerm])

    const updateData = async () => {
        if(!debouncedSearchTerm){
            setData(initialData || [])
            return
        }

        try{
            const [err, responseData] = await getUsers(search)
            if(err) {
                toast.error(err.message || "Error al buscar usuarios")
            } else {
                setData(responseData || [])
            }
        }catch (error) {
            toast.error("Error al buscar usuarios")
        }
    }

    return (
        <div>
            <h2>Search</h2>
            <input
                type="search"
                placeholder="Buscar..."
                value={search}
                onChange={handleSearch}
            />
            <table style={{ width: "100%", marginTop: "20px"}}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Departamento</th>
                        <th>Edad</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.ID}>
                            <td>{item.ID}</td>
                            <td>{item.Nombre}</td>
                            <td>{item.Email}</td>
                            <td>{item.Departamento}</td>
                            <td>{item.Edad}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
