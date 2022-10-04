const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.nombre = archivo;
  }
  //validamos si tenemos el json creado
  async validateExistFile() {
    try {
      await fs.promises.stat(this.nombre);
    } catch (err) {
      await fs.promises.writeFile(this.nombre, JSON.stringify([]));
    }
  }
  //leemos la informacion en el json en general
  async readData() {
    this.validateExistFile();
    try {
      const contenido = await fs.promises.readFile(this.nombre, "utf-8");
      return JSON.parse(contenido);
    } catch (error) {
      console.log("error", error);
    }
  }
  async saveObject(products) {
    this.validateExistFile();
    await fs.promises.writeFile(
      this.nombre,
      JSON.stringify(products, null, "\t")
    );
  }
  async save(object) {
    const arrayObject = await this.readData();
    let id;
    arrayObject.length === 0
      ? (id = 1)
      : (id = arrayObject[arrayObject.length - 1].id + 1);

    const newObject = {
      title: object.title,
      price: object.price,
      id: id,
    };
    arrayObject.push(newObject);
    await this.saveObject(arrayObject);
  }
  async getAll() {
    const arrayObject = await this.readData();
    return console.log(arrayObject);
  }
  async deleteAll() {
    const borrado = [];
    await this.saveObject(borrado);
  }
  async getById(number) {
    const arrayObject = await this.readData();
    const encontrarId = (encontrar) => (encontrar.id === number ? true : false);
    const indice = arrayObject.findIndex(encontrarId);
    console.log(indice);
    indice === -1
      ? console.log("el producto no existe")
      : console.log(arrayObject[indice]);
  }
  async deleteById(number) {
    const arrayObject = await this.readData();
    const buscarObject = arrayObject.filter((buscar) => buscar.id !== number);
    await this.saveObject(buscarObject);
  }
}

const contenedor = new Contenedor("practica.json");
contenedor.validateExistFile();
contenedor.readData();
contenedor.getAll();
//contenedor.save({ title: "marcador", price: "325" });

//si llamamos a deleteAll nos borra todos los archivos// descomentar e ir probando..
//contenedor.deleteAll()
//contenedor.getById(556);
//contenedor.deleteById(24);
