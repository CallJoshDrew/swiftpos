let menu = [
    { id: 1, name: "Egg Tart", category: "Cakes", price:2.40, image: "/cakes/eggTart.png"},
    { id: 2, name: "UFO Tart", category: "Cakes", price:2.60, image: "/cakes/ufoTart.png"},
    { id: 3, name: "HawFlake Cake", category: "Cakes", price:4.20, image: "/cakes/hawFlakeCake.png"},
    { id: 4, name: "Vanila Swiss Roll", category: "Cakes", price:2.40, image: "/cakes/valinaSwissRoll.png"},
    { id: 5, name: "Pandan Swiss Roll", category: "Cakes", price:2.40, image: "/cakes/pandanSwissRoll.png"},
    { id: 6, name: "Coffee Swiss Roll", category: "Cakes", price:2.40, image: "/cakes/coffeeSwissRoll.png"},
    { id: 7, name: "Chicken Floss", category: "Cakes", price:3.00, image: "/cakes/chickenFloss.png"},
    { id: 8, name: "Chicken Pie", category: "Cakes", price:2.70, image: "/cakes/chickenPie.png"},
    { id: 9, name: "Jam Pie", category: "Cakes", price:1.30, image: "/cakes/jamPie.png"},
    { id: 10, name: "Tausa Pie", category: "Cakes", price:1.30, image: "/cakes/tausaPie.png"},
    { id: 11, name: "Choc Cream Cake", category: "Cakes", price:3.20, image: "/cakes/chocCreamCake.png"},
    { id: 12, name: "Cream Cake", category: "Cakes", price:3.20, image: "/cakes/creamCake.png"},
    { id: 13, name: "Steam Cake", category: "Cakes", price:2.00, image: "/cakes/steamCake.png"},
    { id: 14, name: "Cream Puff", category: "Cakes", price:2.50, image: "/cakes/creamPuff.png"},
    { id: 15, name: "Curry Puff", category: "Cakes", price:2.70, image: "/cakes/curryPuff.png"},
    { id: 16, name: "Custard Cake", category: "Cakes", price:3.00, image: "/cakes/custardCake.png"},

    { id: 17, name: "Butter Chocolate Cake", category: "Cakes", price:3.00, image: "/cakes/butterChocolateCake.png"},
    { id: 18, name: "Honey Comb", category: "Cakes", price:2.40, image: "/cakes/honeyComb.png"},
    { id: 19, name: "Cheese Tart", category: "Cakes", price:3.50, image: "/cakes/cheeseTart.png"},
    { id: 20, name: "Chocolate Chip", category: "Cakes", price:4.20, image: "/cakes/chocolateChip.png"},
    { id: 21, name: "Sponge Cake", category: "Cakes", price:2.00, image: "/cakes/spongeCake.png"},

    { id: 25, name: "Kono Mee", category: "Dish", price:8.00, image: "/dish/konoMee.png", selection:true, choices: [{name: "Campur", price: 0.00}, {name: "Ayam Goreng", price: 0.00}, {name: "Sui Kau", price: 1.00}, {name: "Seafood", price: 2.00}, {name: "Udang", price: 4.00}]},
    { id: 26, name: "Goreng Kering", category: "Dish", price:9.00, image: "/dish/gorengKering.png", selection:true, choices: [{name: "Campur", price: 0.00}, {name: "Ayam", price: 0.00}, {name: "Ayam Goreng", price: 1.00}, {name: "Seafood", price: 2.00}]},

    { id: 27, name: "Goreng Basah", category: "Dish", price:8.00, image: "/dish/gorengBasah.png", selection:true, choices: [{name: "Campur", price: 0.00}, {name: "Ayam", price: 0.00}, {name: "Ayam Goreng", price: 1.00}, {name: "Seafood", price: 2.00}], meat: [{level:"Normal Meat", price: 0.00}, {level:"Extra Meat", price: 2.00}], addOn: [{type:"Normal Mee", price: 0.00},{type:"Extra Mee", price: 2.00}]},

    { id: 28, name: "Laksa", category: "Dish", price:10.0, image: "/dish/laksa.png", selection:true, choices: [{name: "Campur", price: 0.00}, {name: "Ayam Goreng", price: 0.00}, {name: "Sui Kau", price: 0.00}, {name: "Seafood", price: 2.00}]},

    { id: 29, name: "Lo Mee", category: "Dish", price:10.0, image: "/dish/loMee.png", selection:true, choices: [{name: "Campur", price: 0.00}, {name: "Ayam", price: 0.00}, {name: "Sui Kau", price: 0.00}, {name: "Seafood", price: 2.00}]},

    { id: 30, name: "Watan Hor", category: "Dish", price:10.00, image: "/dish/watanHor.png", selection:true, choices: [{name: "Campur", price: 0.00},{name: "Ayam", price: 0.00}, {name: "Sui Kau", price: 0.00}, {name: "Seafood", price: 2.00}]},
    
   
    { id: 31, name: "Nasi Ayam", category: "Dish", price:7.00, image: "/dish/nasiAyam.png"},
    { id: 32, name: "Nasi Goreng Ayam", category: "Dish", price:7.00, image: "/dish/nasiGorengAyam.png"},
    { id: 33, name: "Sui Kau", category: "Dish", price:9.00, image: "/dish/suiKau.png"},

    { id: 41, name: "Teh C", category: "Drinks", price:2.50, image: "/pandan.png", selection:true, choices: [{name: "Hot", price: 0.00},{name: "Cold", price: 1.00}]},
    { id: 42, name: "Teh Nai", category: "Drinks", price:2.50, image: "/pandan.png", selection:true, choices: [{name: "Hot", price: 0.00},{name: "Cold", price: 1.00}]},
    { id: 43, name: "Teh Kahwin", category: "Drinks", price:2.50, image: "/pandan.png", selection:true, choices: [{name: "Hot", price: 0.00},{name: "Cold", price: 1.00}]},
    { id: 44, name: "Lemon Teh", category: "Drinks", price:2.50, image: "/pandan.png", selection:true, choices: [{name: "Hot", price: 0.00},{name: "Cold", price: 1.00}]},
    { id: 45, name: "Lemon Sui", category: "Drinks", price:2.50, image: "/pandan.png", selection:true, choices: [{name: "Hot", price: 0.00},{name: "Cold", price: 1.00}]},
    { id: 46, name: "Nescafe Nai", category: "Drinks", price:2.50, image: "/pandan.png", selection:true, choices: [{name: "Hot", price: 0.00},{name: "Cold", price: 1.00}]},
    { id: 47, name: "Milo Nai", category: "Drinks", price:2.50, image: "/pandan.png", selection:true, choices: [{name: "Hot", price: 0.00},{name: "Cold", price: 1.00}]},
    { id: 48, name: "Milo C", category: "Drinks", price:2.50, image: "/pandan.png", selection:true, choices: [{name: "Hot", price: 0.00},{name: "Cold", price: 1.00}]},
    { id: 49, name: "Nestum Nai", category: "Drinks", price:2.50, image: "/pandan.png", selection:true, choices: [{name: "Hot", price: 0.00},{name: "Cold", price: 1.00}]},
    { id: 50, name: "Nestum C", category: "Drinks", price:2.50, image: "/pandan.png", selection:true, choices: [{name: "Hot", price: 0.00},{name: "Cold", price: 1.00}]},
    { id: 51, name: "Kitcai Ping", category: "Drinks", price:2.50, image: "/pandan.png", selection:true, choices: [{name: "Hot", price: 0.00},{name: "Cold", price: 1.00}]},
    { id: 52, name: "Teh C Special", category: "Drinks", price:4.00, image: "/pandan.png", selection:true, choices: [{name: "Hot", price: 0.00},{name: "Cold", price: 0.50}]},
    { id: 53, name: "Liong Fun", category: "Drinks", price:3.80, image: "/pandan.png"},
    { id: 54, name: "Lo Han Kuo", category: "Drinks", price:3.00, image: "/drinks/loHanKuo.png"},
    { id: 55, name: "Air Bunga", category: "Drinks", price:3.00, image: "/pandan.png"},
    
    { id: 56, name: "Kopi O", category: "Drinks", price:1.80, image: "/pandan.png", selection:true, choices: [{name: "Hot", price: 0.00}, {name: "Cold", price: 2.50}]},
    { id: 57, name: "Pandan Soy Milk", category: "Drinks", price:3.00, image: "/drinks/pandanSoya.png", selection:true, choices: [{name: "with Sugar", price: 0.00}, {name: "No Sugar", price: 0.50}]},
    { id: 58, name: "Teh O", category: "Drinks", price:1.80, image: "/pandan.png", selection:true, choices: [{name: "Hot", price: 0.00},{name: "Cold", price: 0.70}]},
    { id: 59, name: "Chinese Teh", category: "Drinks", price:0.50, image: "/drinks/chineseTeh.png", selection:true, choices: [{name: "Hot", price: 0.00},{name: "Cold", price: 0.00}]},
    { id: 60, name: "Sang Suk Lai", category: "Drinks", price:2.50, image: "/drinks/sangSukLai.png", selection:true, choices: [{name: "Hot", price: 0.00},{name: "Cold", price: 1.00}]},
    { id: 61, name: "Lai Lo Fa", category: "Drinks", price:4.00, image: "/drinks/laiLoFa.png"},
    { id: 65, name: "100 Plus", category: "Drinks", price:2.50, image: "/drinks/100Plus.png"},
    { id: 66, name: "Coca Cola", category: "Drinks", price:2.50, image: "/drinks/cocaCola.png"},
    { id: 67, name: "EST Cola", category: "Drinks", price:2.50, image: "/drinks/estCola.png"},
    { id: 68, name: "F&N Orange.png", category: "Drinks", price:2.50, image: "/drinks/F&NOrange.png"},
    { id: 69, name: "Yeo's Chrysanthemum", category: "Drinks", price:2.50, image: "/drinks/chrysanthemum.png"},
    { id: 70, name: "Yeo's Susu Soya", category: "Drinks", price:2.50, image: "/drinks/susuSoya.png"},
    
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
  