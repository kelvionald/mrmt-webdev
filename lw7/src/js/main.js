function CoffeeMachine() {
  this.moneyCash;
  this.coffeeMenu = [
    { name: 'Американо', price: 10 },
    { name: 'Латте', price: 15 },
    { name: 'Каппучино', price: 20 },
  ];
  this.currentCoffeeNumber;

  this.setCash = function (money) {
    if (typeof money === 'number') {
      if (money < 0) {
        console.log('error: money < 0');
        return false;
      }
      this.moneyCash = money;
      return true;
    }
    return false;
  }

  this.getCoffeeMenu = function () {
    let menu = '';
    for (i in this.coffeeMenu) {
      menu += Number(i) + 1 + ' ' + this.coffeeMenu[i].price + 'Р ' + this.coffeeMenu[i].name + '\n';
    }
    console.log(menu);
    return menu;
  }

  this.chooseCoffee = function (coffeeNum) {
    if (typeof coffeeNum === 'number') {
      if (coffeeNum >= 1 && coffeeNum < this.coffeeMenu.length + 1) {

        if (this.moneyCash >= this.coffeeMenu[coffeeNum - 1].price){
          console.log('choosed ' + coffeeNum);
          this.currentCoffeeNumber = coffeeNum - 1;
          return true;
        }
        console.log('Не хватает денег!');
        return false;
      }
      console.log('Такой кнопки нет вообще!');
      return false;
    }
    return false;
  }

  this.getRemainCash = function () {
    if (typeof this.currentCoffeeNumber === 'number' && typeof this.moneyCash === 'number'){
      remain = this.moneyCash - this.coffeeMenu[this.currentCoffeeNumber].price;
      console.log('Сдача: ' + remain);
      return remain;
    }
    return false;
  }
}