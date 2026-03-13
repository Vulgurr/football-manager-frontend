import ColocarBotones from "./botonesABM";

function FilaEquipo({ equipo, linkVer, onEliminar }) {
    const e = equipo;
    
    return (

        <>
            <td>{e.name}</td>
            <td>{e.area?.name || "No suministrado"}</td>
            {/*Aca va el ? porque e.area puede ser null y esto se puede romper si hace null.name */}
            <td className="celda-escudo">
                <img src={e.crestUrl} alt={e.name} width="30" />
            </td>
            <td><ColocarBotones equipo={e} linkVer={linkVer} onEliminar={onEliminar} /></td>
        </>

    )
}

export default FilaEquipo;