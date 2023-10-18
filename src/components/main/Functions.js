
export function stringify(value) {
    let newObject = {};

    let array = value.split('');
    array.shift();
    array.pop();
    let join = array.join('');
    let splitComa = join.split(',');
    console.log(splitComa);
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
                keyProperty = keyProperty.replace(/\s/g, '_');
            }
            if (/\s/.test(keyValue)) {
                keyValue = keyValue.replace(/\s/g, '_');
            }
            let open = keyValue[0];
            let close = keyValue[keyValue.length - 1];
            console.log(open);
            console.log(close);
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
}

