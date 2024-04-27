#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";


console.log(chalk.magenta.underline.bold(" -- Welcome to Adventure Game -- "))

class Player {
  name: string;
  fuel: number = 100;
  constructor(name: string) {
    this.name = name;
  }
  fuelDecrease() {
    let fuel = this.fuel - 25;
    this.fuel = fuel;
  }
  fuelIncrease() {
    this.fuel = 100;
  }
}


class Opponent {
  name: string;
  fuel: number = 100;
  constructor(name: string) {
    this.name = name;
  }
  fuelDecrease() {
    let fuel = this.fuel - 25;
    this.fuel = fuel;
  }
}



let player = await inquirer.prompt([
  {
    name: "name",
    type: "input",
    message: "Enter your Name: ",
  },
]);




let opponent = await inquirer.prompt([
  {
    name: "Select",
    type: "list",
    message: "Select Your Opponent",
    choices: ["Hitman", "Pikachu", "Pacman"],
  },
]);




let p1 = new Player(player.name);
let o1 = new Opponent(opponent.Select);




do {
  if (opponent.Select == "Hitman" || "Pikachu" || "Pacman") {
    console.log(
      `${chalk.bold.yellow(p1.name)} VS ${chalk.bold.yellow(o1.name)}`
    );
    let ask = await inquirer.prompt({
      name: "opt",
      type: "list",
      message: "Select Your Option",
      choices: ["Attack", "Drink Health", "Run for your Life.."],
    });

    if (ask.opt == "Attack") {
      let num = Math.floor(Math.random() * 2);
      if (num > 0) {
        p1.fuelDecrease();
        console.log(chalk.bold.red(`${p1.name} fuel is ${p1.fuel}`));
        console.log(chalk.bold.green(`${o1.name} fuel is ${o1.fuel}`));
        if (p1.fuel <= 0) {
          console.log(chalk.bold.italic.redBright("You Lost the Game,Better Luck Next Time.!!" )
          );
          process.exit();
        }
      }

      if (num <= 0) {
        o1.fuelDecrease();
        console.log(chalk.bold.green(`${p1.name} fuel is ${p1.fuel}`));
        console.log(chalk.bold.red(`${o1.name} fuel is ${o1.fuel}`));

        if (o1.fuel <= 0) {console.log( chalk.bgGreenBright.black.italic("Congrats..You Won..!!"));
          process.exit();
        }
      }
    }
    if (ask.opt == "Drink Health") {
      p1.fuelIncrease();
      console.log(chalk.bold.italic.green( `You Drink Health Portion,Your Fuel is ${p1.fuel}`));
    }

    if (ask.opt == "Run for your Life..") 
      {console.log(chalk.bold.italic.red("You Lost,Better Luck Next Time.!!"));
      process.exit();
    }
  }

} while (true);
