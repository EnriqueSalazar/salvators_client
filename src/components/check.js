/**
 * Created by enriq on 1/10/16.
 */
const validate={
  isNumber: (value)=>{
    if (isNaN(Number(value))){
      return "Numero requerido";
    } else {
      return undefined;
    }
  }
};
export default validate;
