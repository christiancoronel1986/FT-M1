'use strict';

function BinarioADecimal(num) {
   let decimal = 0;
   let exponente = 0;
   for(let i = num.length - 1; i >=0; i--){
      let digito = parseInt(num[i]);
      decimal += digito * Math.pow(2, exponente);
      exponente++
   }
   return decimal;
}

function DecimalABinario(num) {
   let numBinario = "";
   while(num > 0){
      let residuo = num % 2;
      numBinario = residuo + numBinario;
      num = Math.floor(num / 2);
   }
   return numBinario;
}

module.exports = {
   BinarioADecimal,
   DecimalABinario,
};