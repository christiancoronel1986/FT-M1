'use strict';

/*
 Implementar la clase BinarySearchTree, definiendo los siguientes métodos recursivos:
  - size: retorna la cantidad total de nodos del árbol
  - insert: agrega un nodo en el lugar correspondiente
  - contains: retorna true o false luego de evaluar si cierto valor existe dentro del árbol
  - depthFirstForEach: recorre el árbol siguiendo el orden depth first (DFS) en cualquiera de sus variantes, según se indique por parámetro ("post-order", "pre-order", o "in-order"). Nota: si no se provee ningún parámetro, hará el recorrido "in-order" por defecto.
  - breadthFirstForEach: recorre el árbol siguiendo el orden breadth first (BFS)
  El ábrol utilizado para hacer los tests se encuentra representado en la imagen bst.png dentro del directorio homework.
*/
function BinarySearchTree(value) {
   this.value = value; // Valor del nodo actual
   this.right = null; // Referencia al subárbol derecho (mayores)
   this.left = null; // Referencia al subárbol izquierdo (menores)
 }
 
 BinarySearchTree.prototype.insert = function (value) {
   // Agregar a la derecha
   if (value > this.value) {
     if (this.right === null) {
       this.right = new BinarySearchTree(value); // Crear un nuevo nodo y asignarlo al subárbol derecho
     } else {
       this.right.insert(value); // Llamar de forma recursiva al método insert en el subárbol derecho
     }
   }
 
   // Agregar a la izquierda
   if (value <= this.value) {
     if (this.left === null) {
       this.left = new BinarySearchTree(value); // Crear un nuevo nodo y asignarlo al subárbol izquierdo
     } else {
       this.left.insert(value); // Llamar de forma recursiva al método insert en el subárbol izquierdo
     }
   }
 };
 
 BinarySearchTree.prototype.size = function () {
   // Caso A: ambas ramas ocupadas
   if (this.right !== null && this.left !== null) {
     return 1 + this.left.size() + this.right.size(); // Sumar 1 (nodo actual) más los tamaños de los subárboles izquierdo y derecho
   }
 
   // Caso B: 1 sola rama ocupada
   if (this.left !== null && this.right === null) {
     return 1 + this.left.size(); // Sumar 1 (nodo actual) más el tamaño del subárbol izquierdo
   }
   if (this.left === null && this.right !== null) {
     return 1 + this.right.size(); // Sumar 1 (nodo actual) más el tamaño del subárbol derecho
   }
 
   // Caso C: ambas están vacías
   if (this.right === null && this.left === null) {
     return 1; // Solo hay un nodo actual
   }
 };
 
 BinarySearchTree.prototype.contains = function (value) {
   // Si lo encuentro
   if (this.value === value) {
     return true;
   }
 
   // Si no lo encuentro y es mayor
   if (value > this.value) {
     if (this.right === null) {
       return false; // No hay más nodos para buscar
     } else {
       return this.right.contains(value); // Llamar de forma recursiva al método contains en el subárbol derecho
     }
   }
 
   // Si no lo encuentro y es menor
   if (value < this.value) {
     if (this.left === null) {
       return false; // No hay más nodos para buscar
     } else {
       return this.left.contains(value); // Llamar de forma recursiva al método contains en el subárbol izquierdo
     }
   }
 };
 
 BinarySearchTree.prototype.depthFirstForEach = function (cb, order) {
   switch (order) {
     // Recorrido en pre-orden: raíz -> izquierda -> derecha
     case "pre-order":
       cb(this.value); // Ejecutar la función de callback en el valor del nodo actual
       this.left && this.left.depthFirstForEach(cb, order); // Recorrer de forma recursiva el subárbol izquierdo en pre-orden
       this.right && this.right.depthFirstForEach(cb, order); // Recorrer de forma recursiva el subárbol derecho en pre-orden
       break;
 
     // Recorrido en post-orden: izquierda -> derecha -> raíz
     case "post-order":
       this.left && this.left.depthFirstForEach(cb, order); // Recorrer de forma recursiva el subárbol izquierdo en post-orden
       this.right && this.right.depthFirstForEach(cb, order); // Recorrer de forma recursiva el subárbol derecho en post-orden
       cb(this.value); // Ejecutar la función de callback en el valor del nodo actual
       break;
 
     // Recorrido en in-orden (por defecto): izquierda -> raíz -> derecha
     default:
       if (this.left !== null) {
         this.left.depthFirstForEach(cb, order); // Recorrer de forma recursiva el subárbol izquierdo en in-orden
       }
       cb(this.value); // Ejecutar la función de callback en el valor del nodo actual
       if (this.right !== null) {
         this.right.depthFirstForEach(cb, order); // Recorrer de forma recursiva el subárbol derecho en in-orden
       }
       break;
   }
 };
 
 BinarySearchTree.prototype.breadthFirstForEach = function (cb, almacen = []) {
   cb(this.value); // Ejecutar la función de callback en el valor del nodo actual
 
   if (this.left !== null) {
     almacen.push(this.left); // Agregar el subárbol izquierdo al almacenamiento para procesarlo en el siguiente nivel
   }
 
   if (this.right !== null) {
     almacen.push(this.right); // Agregar el subárbol derecho al almacenamiento para procesarlo en el siguiente nivel
   }
 
   if (almacen.length > 0) {
     almacen.shift().breadthFirstForEach(cb, almacen); // Procesar el siguiente nodo en el almacenamiento en el siguiente nivel
   }
 };
 
 let imprimirValor = function (x) {
   console.log(x); // Función de ejemplo para imprimir el valor del nodo
 };
 
// No modifiquen nada debajo de esta linea
// --------------------------------

module.exports = {
   BinarySearchTree,
};
