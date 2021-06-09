var coffeeMachine = new CoffeeMachine();

// Внести средства в кофейный автомат
coffeeMachine.setCash(-1); // return false - ошибка
coffeeMachine.setCash(50); // return true

// Получить меню с кофейными напитками
coffeeMachine.getCoffeeMenu();

// Выбрать напиток
coffeeMachine.chooseCoffee('123123'); // return false
coffeeMachine.chooseCoffee(1000); // return false
coffeeMachine.chooseCoffee(2); // return true

// Вызов метода выдачи сдачи
coffeeMachine.getRemainCash();
