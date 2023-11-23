## Simple code (cas de problème)
if (shoppinCard.product[0] == 'kindle')
    return new KindleProuct()
if(shoppingCard.product[0] == 'audio')
    return new BookProduct()

## Simple refactorisation
### créer une methode dans la classe de l'objet qui va l'instancier initiallement
class KindleProduct {
    constructor() { 
        throx error('Method not allouwed, use the createEmpty method')
    }
    static createEmpty() {
        return new KindleProduct('', prop1, prop2)
    }
}
=> le problème se réside s'il y a un ou plusieurs autre objet de même type (par exemple un produit audio autre le kindle)

## Simple Factory
### déléguer la création de l'objet à une classe propre
### on peut implementer en plus une couche d'abstraction (interface, parentClass) pour le type d'objet
interface Product {
    price, quantity, ...
    getAmount(), ...
}

class KindleProduct implements Product {
    price, quantity
    props, ...
    constructor ...
    getAmount() {
        return this.price * this.quantity
    }
}

class AudioProduct implements Product {
    price, quantity
    props, ...
    constructor ...
    getAmount() {
        return this.price * this.quantity
    }
}

class ProductFactory {
    static create(typeProduct, initialValue) {
        switch (typeProduct)
            case 'Kindle': new KindleProduct(initialValue)
            case 'Audio': new AudioProduct(initialValue)
            default
                throw error('Wrong type passed')
    }
}
[avantage_1]
=> kindle: Product = ProductFactory().create('kindle', { prop1, ... })
=> audio: Product = ProductFactory().create('audio', { prop1, ... })

=> kindlePrice = kindle.getPrice()
=> audioPrice = audio.getPrice()

=> productList: Product[] = [kindle, audio]

getTotalAmount(productList) {
    return productList.reduce((total, product) => total + product.getAmount())
}

## design pattern Factory
### si on a plusieurs logique différentes de création d'un objet
### implementer une couche d'abstraction (interface, abstractClass) pour les logiques de création de l'objet
interface ProductFactory {
    create()
}

class ProductByTypeFactory implements ProductFactory {
    static create() {
        switch (typeProduct)
            case 'Kindle': new KindleProduct(initialValue)
            case 'Audio': new AudioProduct(initialValue)
            default
                throw error('Wrong type passed')
    }
}

class ProductByRandomTypeFactory implements ProductFactory {
    static create() {
        const random = Math.random()
        if(random < 0.2)
            new KindleProduct(initialValue)
        else if(random > 0.6)
            new AudioProduct(initialValue)
    }
}

