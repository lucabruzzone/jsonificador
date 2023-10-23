
export function stringify(value) {
    let anticipo = null;
    let separacion;
    let izquierda;
    let derecha;
    let newObject = {};
    let stringTemporal = '';
    let keyOpen = 0;
    let keyClose = 0;
    let corchOpen = 0;
    let corchClose = 0;
    let trash = [];

    let array = value.split('');
    let first = array.shift();
    let second = array.pop();
    let join = array.join('');
    join = join.replace(/\s/g, '');
    join = join.replace(/"/g, '');
    join = join.replace(/'/g, '');
    /* console.log(first, second); */
    if (first === '{' && second === '}') {
        for (let i = 0; i < join.length; i++) {
            const letra = join[i];
            stringTemporal += letra;
            if (letra === '{') {
                keyOpen++;
                if (!anticipo) {
                    anticipo = '{';
                }
            }
            if (letra === '}') {
                keyClose++;
                if (!anticipo) {
                    anticipo = '}';
                }
            }
            if (letra === '[') {
                corchOpen++;
                if (!anticipo) {
                    anticipo = '[';
                }
            }
            if (letra === ']') {
                corchClose++;
                if (!anticipo) {
                    anticipo = ']';
                }
            }
            if (join[i + 1] === ',' && !keyOpen && !keyClose && !corchOpen && !corchClose) {
                separacion = stringTemporal.indexOf(':');
                izquierda = stringTemporal.slice(0, separacion);
                derecha = stringTemporal.slice(separacion + 1);
                newObject = { ...newObject, [izquierda]: derecha };
                stringTemporal = '';
                anticipo = null;
                i++;
            }
            if (keyOpen && keyClose && keyOpen === keyClose && anticipo === '{') {
                separacion = stringTemporal.indexOf(':');
                izquierda = stringTemporal.slice(0, separacion);
                derecha = stringTemporal.slice(separacion + 1);
                let derechaRecursivo = stringify(derecha);
                newObject = { ...newObject, [izquierda]: derechaRecursivo };
                stringTemporal = '';
                keyOpen = 0;
                keyClose = 0;
                corchOpen = 0;
                corchClose = 0;
                anticipo = null;
                i++;
            }
            if (corchOpen && corchClose && corchOpen === corchClose && anticipo === '[') {
                separacion = stringTemporal.indexOf(':');
                izquierda = stringTemporal.slice(0, separacion);
                derecha = stringTemporal.slice(separacion + 1);
                let derechaRecursivo = stringify(derecha);
                newObject = { ...newObject, [izquierda]: derechaRecursivo };
                stringTemporal = '';
                keyOpen = 0;
                keyClose = 0;
                corchOpen = 0;
                corchClose = 0;
                anticipo = null;
                i++;
            }
        }
        if (stringTemporal.length) {
            separacion = stringTemporal.indexOf(':');
            izquierda = stringTemporal.slice(0, separacion);
            derecha = stringTemporal.slice(separacion + 1);
            newObject = { ...newObject, [izquierda]: derecha };
        }
        return newObject;
    }

    else {
        let arrayMaster = [];
        for (let i = 0; i < join.length; i++) {
            const letra = join[i];
            stringTemporal += letra;
            if (letra === '{') {
                keyOpen++;
                if (!anticipo) {
                    anticipo = '{';
                }
            }
            if (letra === '}') {
                keyClose++;
                if (!anticipo) {
                    anticipo = '}';
                }
            }
            if (letra === '[') {
                corchOpen++;
                if (!anticipo) {
                    anticipo = '[';
                }
            }
            if (letra === ']') {
                corchClose++;
                if (!anticipo) {
                    anticipo = ']';
                }
            }
            if (join[i + 1] === ',' && !keyOpen && !keyClose && !corchOpen && !corchClose) {
                arrayMaster.push(stringTemporal);
                stringTemporal = '';
                anticipo = null;
                i++;
            }
            if (keyOpen && keyClose && keyOpen === keyClose && anticipo === '{') {
                let newElement = stringify(stringTemporal);
                arrayMaster.push(newElement);
                stringTemporal = '';
                keyOpen = 0;
                keyClose = 0;
                corchOpen = 0;
                corchClose = 0;
                anticipo = null;
                i++;
            }
            if (corchOpen && corchClose && corchOpen === corchClose && anticipo === '[') {
                let newElement = stringify(stringTemporal);
                arrayMaster.push(newElement);
                stringTemporal = '';
                keyOpen = 0;
                keyClose = 0;
                corchOpen = 0;
                corchClose = 0;
                anticipo = null;
                /* i++; */
            }
        }
        if (stringTemporal.length) {
            arrayMaster.push(stringTemporal);
        }
        let finalArrayMater = [];
        for (let i = 0; i < arrayMaster.length; i++) {
            let element = arrayMaster[i];
            if (Array.isArray(element) && !element.length) {
                trash.push(element);
            }
            else finalArrayMater.push(element);
        }
        return finalArrayMater;
    }
}

