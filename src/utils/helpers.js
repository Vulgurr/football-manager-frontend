export function esPassValida(pass) {
    if (typeof pass !== "string" || pass === "") {
        return "La contraseña es obligatoria.";
    }
    let errores="";

    // Un array garantiza que evaluamos en el orden correcto
    const validaciones = [
        { regex: /[A-Z]/, error: "Debe contener al menos una letra mayúscula." },
        { regex: /[a-z]/, error: "Debe contener al menos una letra minúscula." },
        { regex: /[0-9]/, error: "Debe contener al menos un número." },
        { regex: /\W/, error: "Debe contener al menos un carácter especial (ej: !@#)." },
        { regex: /^(?![A-Z][a-z]+[0-9]+[\W]+$).*/, error: "La contraseña es demasiado predecible (Evita el formato Palabra123!)." }
    ];

    for (const regla of validaciones) {
        if (!regla.regex.test(pass)) {
            errores+=regla.error+"\n";
        }
    }
    
    return errores; 
}

export function esMailValido(email) {
    if (typeof email !== "string" || email === "") {
        return "El correo electrónico es obligatorio.";
    }
    let errores="";

    const validaciones = [
        { regex: /@/, error: "El email debe contener un '@'." },
        { regex: /^[^@]*@[^@]*$/, error: "El email no puede contener más de un '@'." },
        { regex: /^(?![^.]*\.\.).*$/, error: "El email no puede tener puntos consecutivos." },
        { regex: /^(?!\.).*/, error: "El email no puede empezar con un punto." },
        { regex: /^(?!.*\.@).*$/, error: "El email no puede tener un punto justo antes del '@'." },
        { regex: /@.*\./, error: "Debe haber un punto después del '@' (ej: .com)." },
        { regex: /[^.]$/, error: "El email no puede terminar con un punto." },
        { regex: /^[A-Za-z0-9_\-.+]+@/, error: "La primera parte del email contiene caracteres no válidos." },
        { regex: /@[A-Za-z0-9]/, error: "El dominio debe empezar con letras o números." },
        { regex: /@[A-Za-z0-9]{2,}/, error: "El dominio del correo es demasiado corto." }
    ];

    for (const regla of validaciones) {
        if (!regla.regex.test(email)) {
            errores+=regla.error+"\n";
        }
    }

    return errores;
}

export function esNombreValido(name) {
    if (typeof name !== "string") return "El nombre es obligatorio.";
    
    const nombreLimpio = name.trim();
    if (nombreLimpio === "") return "El nombre no puede estar vacío.";
    if (nombreLimpio.length < 2) return "El nombre debe tener al menos 2 letras.";
    
    if (!/^[a-zA-Z\sáéíóúÁÉÍÓÚ]+$/.test(nombreLimpio)) {
        return "El nombre solo puede contener letras y espacios.";
    }

    return null;
}