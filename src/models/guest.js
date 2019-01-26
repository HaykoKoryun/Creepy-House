const faker = require('faker');
import drinks from '../data/drinks';
import guests from '../data/guests';
import store  from 'store';

import randomFromArray from '../common/randomFromArray';

const STAGE_SAY_PREFERNCES = 1;
const STAGE_WANT_AGAIN = 2;
const STAGE_REPEAT = 3;

export default class Guest {
    constructor (level) {
        this.isActivated = false;
        this.level = level;
        
        const _guest = randomFromArray(guests);

        this.name = faker.name.firstName(_guest.gender);
        this.image = _guest.image;

        this.stage = STAGE_SAY_PREFERNCES;

        switch(level) {
            case 1: 
                this.drinkCount = 3;
                this.good = 20;
                this.bad  = 20;
                this.hmm  = 10;
            break;
            case 2:
                this.drinkCount = 2;
                this.good = 15;
                this.bad  = 30;
                this.hmm  = 20;
            break;
            case 3:
                this.drinkCount = 1;
                this.good = 10;
                this.bad  = 40;
                this.hmm  = 30;
            break;
            default:
                this.good = 15;
                this.bad  = 30;
                this.hmm  = 20;
                this.drinkCount = 2;
            break;
        }
    
        this.chooseDrinks();

        this.satisfaction = 100;
    }

    useDrink(usedDrink) {
        for(let drink of this.drinks) if(drink === usedDrink) {
            return this.noiceBro();
        }
        return this.damnIt();
    }

    activate() {
        if(this.stage === STAGE_SAY_PREFERNCES) {
            let dialog = `I want a `;
            for(let i = 0; i < this.drinks.length; i++) {
                let drink = this.drinks[i];

                if(i === 0) dialog += drink;
                
                else if(i === (this.drinks.length - 1)) dialog += ` or ${drink}.`;

                else dialog += `, ${drink}`;
            }

            store.state.dialog = dialog;
            return this.stage++;
        }

        if(this.stage === STAGE_WANT_AGAIN) {
            store.state.dialog = `Another one!`;
            return this.stage++;
        }

        if(this.stage === STAGE_REPEAT) {
            this.stage = 1;
            return this.activate();
        }
    }

    chooseDrinks() {
        this.drinks = [];

        for(let i = 0; i < this.drinkCount; i++) {
            let drink = randomFromArray(drinks).name;
            while(this.drinks.indexOf(drink) !== -1) {
                drink = randomFromArray(drinks).name;
            }
            this.drinks.push(drink);
        }
    }

    noiceBro() {
        this.satisfaction += this.good;
        console.log('Noice bro!')
    }

    damnIt() {
        this.satisfaction -= this.bad;
        console.log('What is this!?')
    }

    yourNotGonnaGetIt() {
        this.satisfaction -= this.hmm;
        console.log('Yeah, OK, whateva!');
    }
}