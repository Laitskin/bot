interface ListableEntity {
    [key: string]: string | number | null | undefined;
  }
function prettify(dataset: ListableEntity[]): string {
      let header: string = '';
      let list: string = '';
      let result: string = '';
  
      const keyHolder = Object.keys(dataset[0]);
  
    for (let j = 0; j < keyHolder.length; j++) {
          header += '| ' + addPadding(keyHolder[j], getMaxLengthByValue(keyHolder[j], dataset) + 1);
      }
      for (let i = 0; i < dataset.length; i++) {
          for (let j = 0; j < keyHolder.length; j++) {
          list += '| ' + addPadding(dataset[i][keyHolder[j]], getMaxLengthByValue(keyHolder[j], dataset) + 1);
          }
          list += '|\n';
      }
  
      result += repeatChar('-', header.length+1) + '\n';
      result += header + '|';
      result += '\n' + repeatChar('-', header.length+1) + '\n';
      result += list;
      result += repeatChar('-', header.length+1);
  
      return result;
}
//------------------------------------------------
function repeatChar(char: string, times: number) {
       let result = '*';
       for(let i = 0; i < times - 2; i++) {
           result += char;
       }
       return result += '*';
}
//------------------------------------------------
function addPadding(value: string, maxLength: number) {
       let paddedResult = String(value);
  
      while (paddedResult.length < maxLength) {
            paddedResult += ' ';
      }
       return paddedResult;
}
//------------------------------------------------
function getMaxLengthByValue(key, dataset) {
    const keyLength = key.length; // length del nombre de la tabla
    let lengthComparer = 0; // minimo de padding requerido
  
    for (let i = 0; i < dataset.length; i++) {
      const valueBasedOnIndex = dataset[i][key]; // valor de cada value para la key de nombre
  
      if (valueBasedOnIndex.length > lengthComparer) {
        // si el comparador de cada nombre encuentra un valor mas grande, settear la length de ese valor
        lengthComparer = valueBasedOnIndex.length;
      }
    }
  
    return lengthComparer < keyLength ? keyLength : lengthComparer;
    // comparador es mas chico que el
    // nombre de la tabla? retornar nombre de la tabla, sino, comparador
}