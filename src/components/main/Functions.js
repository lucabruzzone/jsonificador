
/* export function stringify(value) {
    let newObject = {};

    let array = value.split('');
    array.shift();
    array.pop();
    let join = array.join('');
    let splitComa = join.split(',');
    for (let i = 0; i < splitComa.length; i++) {
        let iterado = splitComa[i];
        const primerAparicion = iterado.indexOf(':');
        const primerosDosElementos = [
            iterado.slice(0, primerAparicion), // Captura la parte antes de ':'
            iterado.slice(primerAparicion + 1) // Captura la parte después de ':'
        ];
        if (primerosDosElementos.length === 2) {
            let keyProperty = primerosDosElementos[0].trim();
            let keyValue = primerosDosElementos[1].trim();
            if (/\s/.test(keyProperty)) {
                keyProperty = keyProperty.replace(/\s/g, '');
            }
            if (/\s/.test(keyValue)) {
                keyValue = keyValue.replace(/\s/g, '');
            }
            let open = keyValue[0];
            let close = keyValue[keyValue.length - 1];
            if (open === '{' && close === '}') {
                let valueRecursivo = stringify(keyValue);
                newObject = {...newObject, [keyProperty]: valueRecursivo}
            }
            else {
                newObject = {...newObject, [keyProperty]: keyValue};
            }
        }
    }

    return newObject;
} */








export function stringify(value) {
    /* 
    let objetoTemporal = {};
    let stringTemporal = '';
    let llaveAbierta = false;
    let llaveCerrada = false;
    let segundoTemporal; */
   /*  let acumulador = []; */
    let signosTotales = 0;
    let separacion;
    let izquierda;
    let derecha;
    let newObject = {};
    let stringTemporal = '';
    let contadorOpen = 0;
    let contadorClose = 0;

    let array = value.split('');
    array.shift();
    array.pop();
    let join = array.join('');
    join = join.replace(/\s/g, '');
    /* if (!join.length) */
    for (let i = 0; i < join.length; i++) {
        const letra = join[i];
        stringTemporal += letra;
        if (join[i + 1] === ',' && !contadorOpen && !contadorClose) {
            separacion = stringTemporal.indexOf(':');
            izquierda = stringTemporal.slice(0, separacion);
            derecha = stringTemporal.slice(separacion + 1);
            newObject = {...newObject, [izquierda]: derecha};
            stringTemporal = '';
            /* signosTotales++; */
            i++
        }
        if (letra === '{') {
            contadorOpen++;
        }
        if (letra === '}') {
            contadorClose++;
        }
        if (contadorOpen === 1 && contadorClose === 1) {
            separacion = stringTemporal.indexOf(':');
            izquierda = stringTemporal.slice(0, separacion);
            derecha = stringTemporal.slice(separacion + 1);
            let derechaRecursivo = stringify(derecha);
            newObject = {...newObject, [izquierda]: derechaRecursivo};
            stringTemporal = '';
            contadorOpen = 0;
            contadorClose = 0;
            signosTotales++;
            i++
        }
        if (contadorOpen && contadorClose && contadorOpen === contadorClose) {
            separacion = stringTemporal.indexOf(':');
            izquierda = stringTemporal.slice(0, separacion);
            derecha = stringTemporal.slice(separacion + 1);
            let derechaRecursivo = stringify(derecha);
            newObject = {...newObject, [izquierda]: derechaRecursivo};
            stringTemporal = '';
            contadorOpen = 0;
            contadorClose = 0;
            /* signosTotales++; */
            i++
        }




    }
    if (!signosTotales) {
        separacion = stringTemporal.indexOf(':');
        izquierda = stringTemporal.slice(0, separacion);
        derecha = stringTemporal.slice(separacion + 1);
        newObject = {...newObject, [izquierda]: derecha};
    }

    return newObject;





    /* const separacion = join.indexOf(':');
    const primerElemento = join.slice(0, separacion).trim();
    const segundoElemento = join.slice(separacion + 1).trim();
    for (let i = 0; i < segundoElemento.length; i++) {
        stringTemporal += segundoElemento[i];
        if (segundoElemento[i - 1] === ',' && !contadorOpen) {
            objetoTemporal = {...objetoTemporal, primerElemento: stringTemporal}
        }
        else {
            newObject = {primerElemento: stringTemporal};
        }



        if (segundoElemento[i] === '{') {
            stringTemporal = '';
        }
        stringTemporal += segundoElemento[i];
        if (segundoElemento[i] === '}') {
            segundoTemporal = stringify(stringTemporal);
        }
    }
    segundoTemporal = stringTemporal;
    for (let i = 0; i < segundoElemento.length; i++) {
        let letra = segundoElemento[i];
        if (letra === '{') llaveAbierta(true);
        const primerAparicion = iterado.indexOf(':');
        const primerosDosElementos = [
            iterado.slice(0, primerAparicion), // Captura la parte antes de ':'
            iterado.slice(primerAparicion + 1) // Captura la parte después de ':'
        ];
        if (primerosDosElementos.length === 2) {
            let keyProperty = primerosDosElementos[0].trim();
            let keyValue = primerosDosElementos[1].trim();
            if (/\s/.test(keyProperty)) {
                keyProperty = keyProperty.replace(/\s/g, '');
            }
            if (/\s/.test(keyValue)) {
                keyValue = keyValue.replace(/\s/g, '');
            }
            let open = keyValue[0];
            let close = keyValue[keyValue.length - 1];
            if (open === '{' && close === '}') {
                let valueRecursivo = stringify(keyValue);
                newObject = {...newObject, [keyProperty]: valueRecursivo}
            }
            else {
                newObject = {...newObject, [keyProperty]: keyValue};
            }
        }
    }

    return newObject; */
}







