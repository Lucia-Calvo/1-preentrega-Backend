//Imports
import {promises as fs} from 'fs';
import {nanoid} from "nanoid";

//Crear la clase
class ProductManager {
    constructor() {
        this.path = "./src/models/products.json";
    }

    readProducts = async() => {
        let products = await fs.readFile(this.path, "utf-8");
        let productsParse = JSON.parse(products);
    }

    writeProducts = async(product) => {
        await fs.writeFile (this.path, JSON.stringify(product));
    }

    exist = async (id) => {
        let products = await this.readProducts();
        return products.find(prod => prod.id === id);
    }

    addProducts = async (product) => {
        let oldProducts = await this.readProducts();
        product.id = nanoid()
        let allProducts = [...oldProducts, product];
        await this.writeProducts(allProducts);
        return "Producto agregado";
    }

    getProducts = async () => {
        return await this.readProducts();
    }

    getProductsById = async (id) => {
        let productsById = await this.exist(id)
        if (!productsById) return "Producto no encontrado";
        return productsById;
    }

    deleteProducts = async (id) => {
        let products = await this.readProducts();
        let existProducts = products.some(prod => prod.id === id);
        if (existProducts) {
            let filterProducts = products.filter(prod => prod.id != id);
            await this.writeProducts(filterProducts);
            return "Producto eliminado";
        } return "Producto a eliminar inexsistente"
        
    }

    updateProducts = async (id, product) => {
        let productsById = await this.exist(id);
        if (!productsById) return "Producto no encontrado";
        await this.deleteProducts(id);
        let productOld = await this.readProducts();
        let products = [{...product, id : id}, ...productOld];
        await this.writeProducts(products);
        return "Producto actualizado";
    }
}

export default ProductManager;

