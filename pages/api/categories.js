export default async function handler(req, res) {
  if (req.method === "POST") {
    const { category } = req.body;

    // Here you can add your logic to save the category in your database

    res.status(200).json({ message: "Category created successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
