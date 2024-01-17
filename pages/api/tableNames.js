let tableNames = [
    { id: 1, name: "Table1",},
    { id: 2, name: "Table2",},
    { id: 3, name: "Table3",},
    { id: 4, name: "Table4",},
    { id: 5, name: "Table5",},
    { id: 6, name: "Table6",},
    { id: 7, name: "Table7",},
    { id: 8, name: "Table8",},
    { id: 9, name: "Table9",},
    { id: 10, name: "Table10",},
    { id: 11, name: "Table11",},
    { id: 12, name: "Table12",},
    { id: 13, name: "Table13",},
    { id: 14, name: "Table14",},
    { id: 15, name: "Table15",},
    { id: 16, name: "Table16",},
    { id: 17, name: "Table17",},
    { id: 18, name: "Table18",},
  ];
  
  export default async function handler(req, res) {
    if (req.method === "POST") {
      const { name, category } = req.body;
  
      // create a new id for the new tableNames item
      const id = tableNames.length + 1;
  
      // add the new tableNames item to the tableNames array
      tableNames.push({ id, name, category });
  
      res.status(200).json({ message: "tableNames Item added successfully" });
    } else if (req.method === "GET") {
      // if the request method is GET, return the tableNames
      res.status(200).json(tableNames);
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  }
  