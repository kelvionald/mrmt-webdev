var expect = require("chai").expect,
    fs = require("fs");

var fileContent = fs.readFileSync("./src/js/main.js", "utf8");
eval(fileContent);
var coffeeMachine = new CoffeeMachine();

describe("coffeeMachine", function() {

  describe("setCash", function() {
    describe("invalid", function() {
      it("number", function() {
        expect(coffeeMachine.setCash(-1)).to.equal(false);
      });
      it("boolean", function() {
        expect(coffeeMachine.setCash(false)).to.equal(false);
      });
      it("string", function() {
        expect(coffeeMachine.setCash('50')).to.equal(false);
      });
    });
    it("valid number", function() {
      expect(coffeeMachine.setCash(50)).to.equal(true);
    });
  });

  it("getCoffeeMenu", function() {
    expect(coffeeMachine.getCoffeeMenu()).to.equal('1 10Р Американо\n2 15Р Латте\n3 20Р Каппучино\n');
  });

  describe("chooseCoffee input", function() {
    describe("invalid", function() {
      it("string", function() {
        expect(coffeeMachine.chooseCoffee('2')).to.equal(false);
      });
      it("big number", function() {
        expect(coffeeMachine.chooseCoffee(100)).to.equal(false);
      });
      it("negative number", function() {
        expect(coffeeMachine.chooseCoffee(-1)).to.equal(false);
      });
      it("false", function() {
        expect(coffeeMachine.chooseCoffee(false)).to.equal(false);
      });
      it("zero number", function() {
        expect(coffeeMachine.chooseCoffee(0)).to.equal(false);
      });
    });
    it("valid small number", function() {
      expect(coffeeMachine.chooseCoffee(2)).to.equal(true);
    });
  });

  describe("getRemainCash", function() {
    it("drink and cash not installed", function() {
      var coffeeMachine = new CoffeeMachine();
      expect(coffeeMachine.getRemainCash()).to.equal(false);
    });

    it("drink not installed", function() {
      var coffeeMachine = new CoffeeMachine();
      coffeeMachine.setCash(50);
      expect(coffeeMachine.getRemainCash()).to.equal(false);
    });

    it("cash not installed", function() {
      var coffeeMachine = new CoffeeMachine();
      coffeeMachine.chooseCoffee(2);
      ;
      expect(coffeeMachine.getRemainCash()).to.equal(false);
    });

    it("drink and more cash installed", function() {
      var coffeeMachine = new CoffeeMachine();
      coffeeMachine.setCash(50);
      coffeeMachine.chooseCoffee(2);
      expect(coffeeMachine.getRemainCash()).to.equal(35);
    });

    it("drink and equal cash installed", function() {
      var coffeeMachine = new CoffeeMachine();
      coffeeMachine.setCash(15);
      coffeeMachine.chooseCoffee(2);
      expect(coffeeMachine.getRemainCash()).to.equal(0);
    });

    it("drink and small cash installed", function() {
      var coffeeMachine = new CoffeeMachine();
      coffeeMachine.setCash(5);
      coffeeMachine.chooseCoffee(2);
      expect(coffeeMachine.getRemainCash()).to.equal(false);
    });
  });

});