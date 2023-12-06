let menu = [
    { id: 1, name: "Egg Tart", category: "Cakes", price:2.50, isAdded: false, image: "/eggTart.png"},
    { id: 2, name: "UFO Tart", category: "Cakes", price:2.50, isAdded: false, image: "/ufoTart.png"},
    { id: 3, name: "HawFlakes", category: "Cakes", price:2.50, isAdded: false, image: "/hawFlakes.png"},
    { id: 4, name: "Brown Swiss Roll", category: "Cakes", price:2.50, isAdded: false, image: "/brownSwissRoll.png"},
    { id: 5, name: "Swiss Roll", category: "Cakes", price:2.50, isAdded: false, image: "/swissRoll.png"},
    { id: 6, name: "Chicken Fross", category: "Cakes", price:2.50, isAdded: false, image: "/chickenFross.png"},
    { id: 7, name: "Chicken Pie", category: "Cakes", price:2.50, isAdded: false, image: "/chickenPie.png"},
    { id: 8, name: "Jam Pie", category: "Cakes", price:2.50, isAdded: false, image: "/jamPie.png"},
    { id: 9, name: "Tausa Pie", category: "Cakes", price:2.50, isAdded: false, image: "/tausaPie.png"},
    { id: 10, name: "Choc Cream Cake", category: "Cakes", price:2.50, isAdded: false, image: "/chocCreamCake.png"},
    { id: 11, name: "Cream Cake", category: "Cakes", price:2.50, isAdded: false, image: "/creamCake.png"},
    { id: 12, name: "Steam Cake", category: "Cakes", price:2.50, isAdded: false, image: "/steamCake.png"},
    { id: 13, name: "Cream Puff", category: "Cakes", price:2.50, isAdded: false, image: "/creamPuff.png"},
    { id: 14, name: "Curry Puff", category: "Cakes", price:2.50, isAdded: false, image: "/curryPuff.png"},
    { id: 15, name: "Custard Cake", category: "Cakes", price:2.50, isAdded: false, image: "/custardCake.png"},
    { id: 16, name: "Goreng Basah", category: "Dish", price:2.50, isAdded: false, image: "/gorengBasah.png"},
    { id: 17, name: "Goreng Kering", category: "Dish", price:2.50, isAdded: false, image: "/gorengKering.png"},
    { id: 18, name: "Kono Mee", category: "Dish", price:2.50, isAdded: false, image: "/konoMee.png"},
    { id: 19, name: "Watan Hor", category: "Dish", price:2.50, isAdded: false, image: "/watanHor.png"},
    { id: 20, name: "Laksa", category: "Dish", price:2.50, isAdded: false, image: "/laksa.png"},
    { id: 21, name: "Lo Mee", category: "Dish", price:2.50, isAdded: false, image: "/loMee.png"},
    { id: 22, name: "Nasi Ayam", category: "Dish", price:2.50, isAdded: false, image: "/nasiAyam.png"},
    { id: 23, name: "Nasi Goreng Ayam", category: "Dish", price:2.50, isAdded: false, image: "/nasiGorengAyam.png"},
    { id: 24, name: "Sui Kau", category: "Dish", price:2.50, isAdded: false, image: "/suiKau.png"},
    { id: 25, name: "Pandan", category: "Drinks", price:2.50, isAdded: false, image: "/pandan.png"},
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
  