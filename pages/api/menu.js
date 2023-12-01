let menu = [
    { id: 1, name: "Kono Mee (Campur)", category: "Main", price:8.00, isAdded: false },
    { id: 2, name: "Goreng Kering (Campur)", category: "Main", price:9.00, isAdded: false  },
    { id: 3, name: "Goreng Basah fewfaewf(Campur)", category: "Drinks", price:8.00, isAdded: false  },
    { id: 4, name: "Goreng Laksa (Campur)", category: "Drinks", price:10.00, isAdded: false  },
    { id: 5, name: "Lo Mee (Campur)", category: "Cakes", price:10.00, isAdded: false  },
    { id: 6, name: "Watan (Campur)", category: "Cakes", price:10.00, isAdded: false  },
    { id: 7, name: "Nasi Ayam", category: "Cakes", price:7.00, isAdded: false  },
    { id: 8, name: "Sui Kau", category: "Cakes", price:9.00, isAdded: false  },
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
  