let tableNames = [
    { id: 1, name: "Table 1",},
    { id: 2, name: "Table 2",},
    { id: 3, name: "Table 3",},
    { id: 4, name: "Table 4",},
    { id: 5, name: "Table 5",},
    { id: 6, name: "Table 6",},
    { id: 7, name: "Table 7",},
    { id: 8, name: "Table 8",},
    { id: 9, name: "Table 9",},
    { id: 10, name: "Table 10",},
    { id: 11, name: "Table L11",},
    { id: 12, name: "Table L12",},
    { id: 13, name: "Table L13",},
    { id: 14, name: "Table L14",},
    { id: 15, name: "Table L15",},
    { id: 16, name: "Table L16",},
    { id: 17, name: "Table L17",},
    { id: 18, name: "Table L18",},
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
  