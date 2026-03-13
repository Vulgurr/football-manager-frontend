const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const URL = `${BACKEND_URL}/auth`
export async function registrarUsuario(usuario) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(usuario),
        redirect: "follow"
    };

    try {
        const respuesta = await fetch(`${URL}/registrarse`, requestOptions);

        if (!respuesta.ok) {
            /*Para un fetch, que nos tire un error 401 por ejemplo no es un error, y solo
            puede fallar si se corta la conexión o pifiamos la URL. Por eso acá hay que
            verificar el .ok (recibimos 2xx) */
            const errorData = await respuesta.json();
            throw new Error(errorData.mensaje || "Error al registrar un usuario"); // "Credenciales inválidas"
        }
        return respuesta.json();
        //Devuelve id, email y name
    } catch (error) {
        console.error(error);
        throw error;
    }


}

export async function loginUsuario(usuario) {
    console.log(usuario);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(usuario),
        redirect: "follow"
    };

    try {
        const respuesta = await fetch(`${URL}/login`, requestOptions);
        if (!respuesta.ok) {
            const errorData = await respuesta.json();
            throw new Error(errorData.mensaje || "Error al realizar el login"); // "Credenciales inválidas"
        }
        return respuesta.json();
        /*Devuelve mensaje de existo, token y un objeto User con id, email y rol */
    } catch (error) {
        console.error(error);
        throw error;
    }
}