const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const URL = `${BACKEND_URL}/equipos`

function getHeaderToken() {
    const token=localStorage.getItem("token");
    return ("Bearer "+token);
}

export async function obtenerEquipos(page, limit, queryABuscar) {
    try {
        const pagina = page > 0 ? page : 1;
        const limite = limit > 0 ? limit : 5;
        const query= queryABuscar ? `&q=${queryABuscar}`:"";
        const response = await fetch(`${URL}/general?page=${pagina}&limit=${limite}${query}`,{headers: {
            "Authorization": getHeaderToken()
        }});
        if (!response.ok) throw new Error("Error al traer los equipos");
        const equipo=await response.json();
        const res={
            equipo: equipo.data,
            totalPaginas: equipo.totalPages
        };
        return res;
    } catch (error) {
        console.error(error);
        throw error; // Re-lanzamos el error para que el componente sepa que falló
    }
}

export async function obtenerEquipoPorID(name) {
    try {
        const response = await fetch(`${URL}/equipos/${name}`, {headers: {
            "Authorization": getHeaderToken()
        }});
        if (!response.ok) throw new Error("Error al traer un equipo en particular");
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error; 
    }
}

export async function patchEquipo(dataToSend) {
    console.log("Llamando a la API para modificar un equipo");

    try {
        const respuesta = await fetch(`${URL}/modificar`, {
            method: "PATCH",
            body: dataToSend,
            headers:{"Authorization": getHeaderToken()}
        })
        if (!respuesta.ok) throw new Error("Error al modificar un equipo");
        return await respuesta.json()
    }
    catch (error) {
        console.error("Error al modificar");
        throw error;
    }
};

export async function postEquipo(dataToSend) {
    console.log("Llamando a la API para agregar un equipo");

    try {
        const respuesta = await fetch(`${URL}/agregar`, {
            method: "POST",
            body: dataToSend,
            headers:{
                "Authorization": getHeaderToken()
            }
            /*Como es formData no pongo el "Content-Type": "application/json"
            si lo tuvieras que poner, va en headers. */
        })
        if (!respuesta.ok) throw new Error("Error al agregar un equipo");
        return await respuesta.json()

    } catch (error) {
        console.error("Error al agregar");
        throw error;
    }
}


export async function deleteEquipo(id) {
    console.log("Llamando a la API para borrar el nombre:", id);
    try{
        const respuesta = await fetch(`${URL}/borrar/${id}`, {
            method: "DELETE",
            headers:{"Authorization": getHeaderToken()}
        });
        if (!respuesta.ok) throw new Error("Error al borrar un equipo");
    }
    catch(error){
        console.error("Error al borrar")
        throw error;
    }
};
