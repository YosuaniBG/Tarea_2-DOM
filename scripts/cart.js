export class Carrito {
  #currency
  #products
  #total
  //El carrito se construye a partir de un objeto derivado de un JSON
  constructor(objeto) {
    this.#currency = objeto.currency;
    this.#products = objeto.products;
    this.#total = 0;
  }

  //Actualiza el valor quantity del objeto, si este no existe lo crea y le asigna el valor (units)
  actualizarUnidades(sku, units) {
    this.#products.find((elem) => elem.SKU === sku)['quantity'] = units;
  }

  //Muestra la informacion de un producto determinado como la propiedad quantity inicializada en 0
  obtenerInformacionProducto(sku) {
    return this.#products.find((elem) => {
      if(elem.SKU === sku)
        return elem
    });
  }

  obtenerCarrito() {
    const newCart = {
      currency : this.#currency,
      products : this.#products
    }; 
    if(isNaN(this.obtenerTotal()))
      newCart.total = 0
    else
      newCart.total = this.obtenerTotal()
    return newCart;
  }

  // Permite obtener el total a pagar en el carrito, si no se actualizan
  // las unidades antes, el método lanza un valo NaN que luego se tomará
  // como 0 en el método obtenerCarrito().
  obtenerTotal() {
    return this.#products.reduce((acc, elem) => acc + elem.quantity * elem.price , 0);
  }

  //Métodos adicionales para complementar las funciones del carrito
  adicionarProducto(producto){
    const productList = this.#products;
    let exist = false;
    for (let i = 0; i < productList.length; i++) {
      const elem = productList[i];
      if (elem.SKU === producto.SKU) {
        elem.quantity++;
        exist = true;
        break;      
      }      
    }
    if (!exist)
      this.#products.push(producto);    
  }

  eliminarProducto(sku){
    const productList = this.#products;
    for (let i = 0; i < productList.length; i++) {
      const elem = productList[i];
      if (elem.SKU === sku) {
        productList.splice(i,1);
        break;      
      }   
    }
  }

}
