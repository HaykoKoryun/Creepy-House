const DRINKS = 
[
    "Godfather",
    "Rob roy",
    "Hanky panky",
    "Jungle bird",
    "White russian",
    "Painkiller",
    "Sidecar",
    "Paloma",
    "french 75",
    "corpse reviver",
    "zombie",
    "sazerac",
    "stalin"
];

const PERSONS = [
    "Aristocrat",
    "Intelligent",
    "Criminal",
    "Punk",
    "Cat",
    "Russian",
    "Racer",
    "Tatik",
    "Stalin"
];

const randomFromArray = items => items[Math.floor(Math.random()*items.length)];

export default class Guest {
    constructor (level) {
        this.isActivated = false;
        this.level = level;

        switch(level) {
            case 1: 
                this.drinkCount = 3;
                this.good = 20;
                this.bad  = 20;
            case 2:
                this.drinkCount = 2;
                this.good = 15;
                this.bad  = 30;
            case 3:
                this.drinkCount = 1;
                this.good = 10;
                this.bad  = 40;
            default:
                this.good = 15;
                this.bad  = 30;
                this.drinkCount = 2;
        }

        this.drinks = [];

        for(let i = 0; i < this.drinkCount; i++) {
            let drink = randomFromArray(DRINKS);
            while(this.drinks.indexOf(drink) !== -1) {
                drink = randomFromArray(DRINKS);
            }
            this.drinks.push(drink);
        }
        
        this.person = randomFromArray(PERSONS);
    
        this.satisfaction = 100;
    }

    useDrink(usedDrink) {
        for(let drink of this.drinks) if(drink === usedDrink) {
            return this.noiceBro();
        }
        return this.damnIt();
    }

    noiceBro() {
        this.satisfaction += this.good;
        // TODO Say Noice and go away
    }

    damnIt() {
        this.satisfaction -= this.bad;
        // TODO Say this is shitt and go away
    }
}