let menu = [
    { id: 1, name: "Kono Mee (Campur)", category: "Main", price:"RM8.00", isAdded: false },
    { id: 2, name: "Goreng Kering (Campur)", category: "Main", price:"RM9.00", isAdded: false  },
    { id: 3, name: "Goreng Basah (Campur)", category: "Drinks", price:"RM8.00", isAdded: false  },
    { id: 4, name: "Goreng Laksa (Campur)", category: "Drinks", price:"RM10.00", isAdded: false  },
    { id: 5, name: "Lo Mee (Campur)", category: "Cakes", price:"RM10.00", isAdded: false  },
    { id: 6, name: "Watan (Campur)", category: "Cakes", price:"RM10.00", isAdded: false  },
    { id: 7, name: "Nasi Ayam", category: "Cakes", price:"RM7.00", isAdded: false  },
    { id: 8, name: "Sui Kau", category: "Cakes", price:"RM9.00", isAdded: false  },
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
  