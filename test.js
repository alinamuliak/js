/* DON'T CHANGE THIS CODE - START */
function wait(ms = 1000) { return new Promise(resolve => setTimeout(resolve, ms)) }

class Dish {
    constructor(cookingTime, ingredients) {
        this.cookingTime = cookingTime;
        this.ingredients = ingredients;
    }

    async cook() {
        const actualCookingTime = this.cookingTime * (1 + Math.random()) * 100;
        await wait(actualCookingTime);
        return this;
    }
}
/* DON'T CHANGE THIS CODE - END */


class Ingredient {
    constructor(name, amount) {
        this.name = name.toLowerCase();
        this.amount = amount;
    }
}


class Bolognese extends Dish {
    constructor() {
        super(10, [new Ingredient('spaghetti', 1),
                   new Ingredient('tomato', 2)]);

    }
}


class MashedPotatoes extends Dish {
    constructor() {
        super(8, [new Ingredient('potato', 2)]);
    }
}


class Steak extends Dish {
    constructor() {
        super(7, [new Ingredient('meat', 1)]);
    }
}


class SteakAndFries extends Dish {
    constructor() {
        super(13, [new Ingredient('potato', 2),
                   new Ingredient('meat', 1)]);
    }
}


class Kitchen {
    fridge = [];
    orders = [];

    addToFridge(ingredients) {
        for (let ingredient of ingredients) {
            // if there is such ingredient, just increase its amount
            if (this.fridge.some(ingr => ingr.name === ingredient.name)) {
                let index = this.fridge.map(e => e.name).indexOf(ingredient.name);
                this.fridge[index].amount += ingredient.amount;
            } else {
                this.fridge.push(ingredient);
            }
        }
    }

    order(dish) {
        for (let ingredient of dish.ingredients) {
            if (!this.fridge.some(ingr => (ingr.name === ingredient.name && ingr.amount >= ingredient.amount))) {
                throw 'Not enough ingredients in fridge';
            }
        }
        // preserve ingredients for this order from the fridge
        for (let ing of dish.ingredients) {
            let index = this.fridge.map(e => e.name).indexOf(ing.name);
            this.fridge[index].amount -= ing.amount;
            if (this.fridge[index].amount === 0) {
                this.fridge.splice(index, 1);
            }
        }
        this.orders.push(dish);
        console.log('Order placed');
    }

    cookFastestOrder() {
        if (this.orders.length === 0) {
            return null;
        }
        // find the fastest order
        let fastestOrderIndex = 0;
        for (let i in this.orders) {
            if (this.orders[i].cookingTime < this.orders[fastestOrderIndex].cookingTime) {
                fastestOrderIndex = i;
            }
        }
        console.log('Cooked fastest order');
        return this.orders.splice(fastestOrderIndex, 1)[0].cook();
    }

    cookAllOrders() {
        this.orders.map(x => x.cook());
        let cookedOrders = this.orders;
        this.orders = [];
        console.log('Cooked all orders');
        return cookedOrders;
    }
}



async function test() {
    const kitchen = new Kitchen();
    kitchen.addToFridge([
        new Ingredient('potato', 3),
        new Ingredient('spaghetti', 2),
        new Ingredient('meat', 3),
        new Ingredient('tomato', 2),
        new Ingredient('tomato', 2)
    ])

    console.log(`Fridge: ${JSON.stringify(kitchen.fridge)}`);
    kitchen.order(new Bolognese()); // Bolognese extends Dish (cookingTime = 10)
    kitchen.order(new MashedPotatoes()); // MashedPotatoes extends Dish (cookingTime = 8)
    kitchen.order(new Steak()); // Steak extends Dish (cookingTime = 7)

    // Feel free to experiment with various dishes and ingredients
    await kitchen.cookFastestOrder(); // Returns the fastest dish to make
    await kitchen.cookAllOrders(); // Returns two dishes in array
    try {
        kitchen.order(new SteakAndFries()); // Throws Error: Not enough ingredients in fridge
    } catch(e) {
        console.log(`Cannot cook Steak and fries, because of this error:\n\t${e}`);
    }
}

test();
