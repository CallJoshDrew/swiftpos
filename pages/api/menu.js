let menu = [
    { id: 1, name: "Egg Tart", category: "Cakes", price:2.50, image: "/eggTart.png"},
    { id: 2, name: "UFO Tart", category: "Cakes", price:2.50, image: "/ufoTart.png"},
    { id: 3, name: "HawFlakes", category: "Cakes", price:2.50, image: "/hawFlakes.png"},
    { id: 4, name: "Brown Swiss Roll", category: "Cakes", price:2.50, image: "/brownSwissRoll.png"},
    { id: 5, name: "Swiss Roll", category: "Cakes", price:2.50, image: "/swissRoll.png"},
    { id: 6, name: "Chicken Fross", category: "Cakes", price:2.50, image: "/chickenFross.png"},
    { id: 7, name: "Chicken Pie", category: "Cakes", price:2.50, image: "/chickenPie.png"},
    { id: 8, name: "Jam Pie", category: "Cakes", price:2.50, image: "/jamPie.png"},
    { id: 9, name: "Tausa Pie", category: "Cakes", price:2.50, image: "/tausaPie.png"},
    { id: 10, name: "Choc Cream Cake", category: "Cakes", price:2.50, image: "/chocCreamCake.png"},
    { id: 11, name: "Cream Cake", category: "Cakes", price:2.50, image: "/creamCake.png"},
    { id: 12, name: "Steam Cake", category: "Cakes", price:2.50, image: "/steamCake.png"},
    { id: 13, name: "Cream Puff", category: "Cakes", price:2.50, image: "/creamPuff.png"},
    { id: 14, name: "Curry Puff", category: "Cakes", price:2.50, image: "/curryPuff.png"},
    { id: 15, name: "Custard Cake", category: "Cakes", price:2.50, image: "/custardCake.png"},

    { id: 16, name: "Kono Mee", category: "Dish", price:8.00, image: "/konoMee.png", choices: [{name: "Campur", price: 0.00}, {name: "Ayam Goreng", price: 0.00}, {name: "Sui Kau", price: 1.00}, {name: "Seafood", price: 2.00}, {name: "Udang", price: 4.00}]},
    { id: 17, name: "Goreng Kering", category: "Dish", price:9.00, image: "/gorengKering.png", choices: [{name: "Campur", price: 0.00}, {name: "Ayam", price: 0.00}, {name: "Ayam Goreng", price: 1.00}, {name: "Seafood", price: 2.00}]},
    { id: 18, name: "Goreng Basah", category: "Dish", price:8.00, image: "/gorengBasah.png", choices: [{name: "Campur", price: 0.00}, {name: "Ayam", price: 0.00}, {name: "Ayam Goreng", price: 1.00}, {name: "Seafood", price: 2.00}]},
    { id: 19, name: "Laksa", category: "Dish", price:10.0, image: "/laksa.png", choices: [{name: "Campur", price: 0.00}, {name: "Ayam Goreng", price: 0.00}, {name: "Sui Kau", price: 0.00}, {name: "Seafood", price: 2.00}]},

    { id: 20, name: "Lo Mee", category: "Dish", price:10.0, image: "/loMee.png", choices: [{name: "Campur", price: 0.00}, {name: "Ayam", price: 0.00}, {name: "Sui Kau", price: 0.00}, {name: "Seafood", price: 2.00}]},

    { id: 21, name: "Watan Hor", category: "Dish", price:10.00, image: "/watanHor.png", choices: [{name: "Campur", price: 0.00},{name: "Ayam", price: 0.00}, {name: "Sui Kau", price: 0.00}, {name: "Seafood", price: 2.00}]},
    
   
    { id: 22, name: "Nasi Ayam", category: "Dish", price:7.00, image: "/nasiAyam.png"},
    { id: 23, name: "Nasi Goreng Ayam", category: "Dish", price:7.00, image: "/nasiGorengAyam.png"},
    { id: 24, name: "Sui Kau", category: "Dish", price:9.00, image: "/suiKau.png"},

    { id: 41, name: "Teh C", category: "Drinks", price:2.50, image: "/pandan.png", choices: [{name: "Hot", price: 0.00},{name: "Cold", price: 1.00}]},
    { id: 42, name: "Teh Kahwin", category: "Drinks", price:2.50, image: "/pandan.png", choices: [{name: "Hot", price: 0.00},{name: "Cold", price: 1.00}]},
    { id: 43, name: "Lemon Teh", category: "Drinks", price:2.50, image: "/pandan.png", choices: [{name: "Hot", price: 0.00},{name: "Cold", price: 1.00}]},
    { id: 44, name: "Lemon Sui", category: "Drinks", price:2.50, image: "/pandan.png", choices: [{name: "Hot", price: 0.00},{name: "Cold", price: 1.00}]},
    { id: 45, name: "Nescafe Nai", category: "Drinks", price:2.50, image: "/pandan.png", choices: [{name: "Hot", price: 0.00},{name: "Cold", price: 1.00}]},
    { id: 46, name: "Milo Nai", category: "Drinks", price:2.50, image: "/pandan.png", choices: [{name: "Hot", price: 0.00},{name: "Cold", price: 1.00}]},
    { id: 47, name: "Milo C", category: "Drinks", price:2.50, image: "/pandan.png", choices: [{name: "Hot", price: 0.00},{name: "Cold", price: 1.00}]},
    { id: 48, name: "Nestum Nai", category: "Drinks", price:2.50, image: "/pandan.png", choices: [{name: "Hot", price: 0.00},{name: "Cold", price: 1.00}]},
    { id: 49, name: "Nestum C", category: "Drinks", price:2.50, image: "/pandan.png", choices: [{name: "Hot", price: 0.00},{name: "Cold", price: 1.00}]},
    { id: 50, name: "Kitcai Ping", category: "Drinks", price:2.50, image: "/pandan.png", choices: [{name: "Hot", price: 0.00},{name: "Cold", price: 1.00}]},
    { id: 51, name: "Teh C Special", category: "Drinks", price:4.00, image: "/pandan.png", choices: [{name: "Hot", price: 0.00},{name: "Cold", price: 0.50}]},
    { id: 52, name: "Liong Fun", category: "Drinks", price:3.80, image: "/pandan.png"},
    { id: 53, name: "Lo Han Kuo", category: "Drinks", price:3.00, image: "/pandan.png"},
    { id: 54, name: "Air Bunga", category: "Drinks", price:3.00, image: "/pandan.png"},
    { id: 55, name: "Soft Drink", category: "Drinks", price:2.50, image: "/pandan.png", choices: [{name: "Cola", price: 0.00},{name: "100%", price: 0.00}, {name: "Sasi", price: 0.00},{name: "7UP", price: 0.00}]},
    { id: 56, name: "Kopi O", category: "Drinks", price:1.80, image: "/pandan.png", choices: [{name: "Hot", price: 0.00}, {name: "Cold", price: 2.50}]},
    { id: 57, name: "Teh O", category: "Drinks", price:1.80, image: "/pandan.png", choices: [{name: "Hot", price: 0.00},{name: "Cold", price: 0.70}]},
    { id: 58, name: "Chinese Teh", category: "Drinks", price:0.50, image: "/pandan.png", choices: [{name: "Hot", price: 0.00},{name: "Cold", price: 0.00}]},
  ];
  
  export default async function handler(req, res) {
    if (req.method === "POST") {
      const { name, category } = req.body;
  
      // create a new id for the new menu item
      const id = menu.length + 1;
  
      // add the new menu item to the menu array
      menu.push({ id, name, category });
  
      res.status(200).json({ message: "Menu Item added successfully" });
    } else if (req.method === "GET") {
      // if the request method is GET, return the menu
      res.status(200).json(menu);
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  }
  