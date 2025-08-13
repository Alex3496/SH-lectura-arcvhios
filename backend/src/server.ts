import express from "express";
import cors from "cors";
import multer from "multer";
import csvToJson from "convert-csv-to-json";

//indica que los archivos subidos se guardarán temporalmente en la memoria RAM, no en disco.
const storage = multer.memoryStorage();
//inicializa Multer usando esa configuración
const upload = multer({ storage });
//Cuando se usa memoryStorage de Multer, 
// los archivos subidos solo existen en la memoria RAM mientras dura la petición HTTP. 
// Una vez que la petición termina (es decir, cuando el servidor responde), 
// esos archivos se eliminan automáticamente de la memoria y no quedan guardados en el servidor.

const app = express();
const PORT = process.env.PORT || 3000;

// Permite solicitudes desde otros orígenes (CORS)
app.use(cors());
// Permite recibir y procesar JSON en las peticiones
app.use(express.json());
// Permite recibir datos de formularios (urlencoded)
app.use(express.urlencoded({ extended: true }));
// Procesa la subida de un solo archivo con el campo 'file'
// Se aplica este middleware a las rutas que lo necesiten
//pero mejor lo ponemos solo en la ruta que lo necesita
//app.use(upload.single("file"));


let userData: Array<any> = [];


app.get("/", (req, res) => {
  res.status(405).send("PRUEBA TECNICA SHAWARMA!");
});

app.post("/api/files", upload.single("file"), async (req, res) => {

  const { file } = req;

  if (!file) {
    return res.status(500).json({ message: "File is required" })
  }

  if(file.mimetype !== "text/csv") {
    return res.status(400).json({ message: "Invalid file type. Only CSV files are allowed." });
  }

  try{
    // Convertir archivo binario a texto
    const result = Buffer.from(file.buffer).toString("utf-8");
    //Convertir String a JSON
    const data_json = csvToJson.fieldDelimiter(",").csvStringToJson(result);

    userData = data_json;

  }catch (error) { 
    console.log('error',error);
    return res.status(500).json({ message: "Error processing file", error });
  }

  return res.json({ data: userData, message: "File uploaded successfully!" });
});

app.get("/api/users", async (req, res) => {

  const { q } = req.query;

  if (userData.length === 0) {
    return res.status(404).json({ message: "No users found. Please upload a file first." });
  }

  if(!q){
    return res.status(400).json({ message: "Query parameter 'q' is required." });
  }

  const search = q.toString().toLowerCase();

  // Normaliza cadenas de texto
  // Elimina acentos y convierte a minúsculas
  const normalizeString = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
  };

  // Fetch users from the database
  const filteredUsers = userData.filter(user => {
    return Object.values(user).some(value => {
      return normalizeString(String(value)).includes(search);
    });
  });

  res.json({ data: filteredUsers });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
