var MENU = {
    "espresso": {
        "ingredients": {
            "water": 50,
            "coffee": 10,
        },
        "cost": 4.7,
    },
    "latte": {
        "ingredients": {
            "water": 50,
            "milk": 10,
            "coffee": 20,
        },
        "cost": 12.5,
    },
    "cappuccino": {
        "ingredients": {
            "water": 50,
            "milk": 10,
            "coffee": 20,
        },
        "cost": 10.2,
    }
}
var resources = {
    "water": 200,
    "milk": 100,
    "coffee": 200,
}

var coins = {
    "quarters": 0.25,
    "half": 0.50,
    "threeFourth": 0.75,
    "full": 1.00
}


class CoffeeMachine {
    displayAvailableCoffee = () => {
        var availableList = [];
        for (const availableItem in MENU) {
            availableList.push(availableItem)
        }
        return availableList;
    }

    totalInsertedCoinsPrice = (inputCoins) => {
        var totalInsertedCoinsPrice = 0;
        for (var element in inputCoins) {
            var particularCoin = coins[element];
            totalInsertedCoinsPrice += inputCoins[element] * particularCoin;
        }
        return totalInsertedCoinsPrice;
    }

    displayDetails = (inputCoffee) => {
        return "Coffee Price :" + MENU[inputCoffee].cost;
    }

    checkResource = (inputCoffee) => {
        for (let item in MENU[inputCoffee].ingredients) {
            if (MENU[inputCoffee].ingredients[item] &&
                resources[item] < MENU[inputCoffee].ingredients[item]) {
                return false;
            }
        }
        return true;
    }

    decreseResource = (item) => {
        for (let ingredient in MENU[item].ingredients) {
            resources[ingredient] -= MENU[item].ingredients[ingredient];
        }
        return;
    }
    prepareCoffee = (inputCoffee, inputCoins) => {
        var totalInsertedCoins = this.totalInsertedCoinsPrice(inputCoins);
        console.log("totalInsertedCoinsPrice :" + totalInsertedCoins);
        var remainingChange = (totalInsertedCoins - MENU[inputCoffee].cost).toFixed(2);
        if (remainingChange > 0) {
            this.decreseResource(inputCoffee);
            console.log("Here is your change :" + remainingChange);
            return ("Here is your " + inputCoffee + "☕️ . Enjoy!..........");
        }
        else if (remainingChange == 0) {
            this.decreseResource(inputCoffee);
            return ("Here is your " + inputCoffee + "☕️ . Enjoy!..........");
        }
        else if (remainingChange < 0) {
            return "Sorry ,insufficient amount!";
        }
    }
    handlingCoffee = () => {
        if (this.checkResource(inputCoffee)) {
            console.log(coffeeMachine.displayDetails(inputCoffee));
            let inputQuaters = prompt('how many quaters will you insert !');
            let inputHalf = prompt('how many halfs will you insert !');
            let inputThreeFourth = prompt('how many threeFourths will you insert !');
            let inputFull = prompt('how many fulls will you insert !');
            let inputCoins = {};
            if (!isNaN(inputQuaters) && !isNaN(inputHalf) && !isNaN(inputThreeFourth) && !isNaN(inputFull)) {
                inputCoins.quarters = inputQuaters;
                inputCoins.half = inputHalf;
                inputCoins.threeFourth = inputThreeFourth;
                inputCoins.full = inputFull;
            }
            console.log(coffeeMachine.prepareCoffee(inputCoffee, inputCoins));
        }
        else {
            var resultIngredients = [];
            for (let item in MENU[inputCoffee].ingredients) {
                if (MENU[inputCoffee].ingredients[item] &&
                    resources[item] < MENU[inputCoffee].ingredients[item]) {
                        resultIngredients.push(item);
                }
            }
            console.log("Sorry !,no sufficient ingredients, needed : " + resultIngredients);
        }
    }
}


var coffeeMachine = new CoffeeMachine();
let prompt = require('prompt-sync')();
while (inputCoffee != "off") {
    console.log("If you want coffee ,available items are :" + coffeeMachine.displayAvailableCoffee() + " || Or Do you want to turn 'off' the machine.");
    let inpCoffee = prompt('Which coffee do you need?');
    var inputCoffee = inpCoffee.trim().replace(/\s+/g, " ");
    if (inputCoffee == "latte" || inputCoffee == "cappuccino" || inputCoffee == "espresso") {
        coffeeMachine.handlingCoffee(inputCoffee);
    }
    else if (inputCoffee == "off" || inputCoffee == "OFF") {
        console.log("coffee machine switched off !");
    }
    else {
        console.log("give valid item as input !");
    }
}
