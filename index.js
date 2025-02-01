import express from "express";
import bodyParser from "body-parser"
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

import { getHome, showBlog, getAddBlog, postAddBlog, getEditBlog, postEditBlog, deleteBlog } from "./controllers/MainController.js"

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(__dirname + "/public")); // Set the public folder as the base folder of the static files
app.use('/css', express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use(bodyParser.urlencoded({ extended: true })); // Body Parser Middleware

app.get("/", getHome);
app.get("/blogEntry/details/:blogEntryId", showBlog);
app.get("/blogEntry/add", getAddBlog);
app.post("/blogEntry/add", postAddBlog);
app.get("/blogEntry/edit/:blogEntryId", getEditBlog);
app.post("/blogEntry/edit", postEditBlog);
app.post("/blogEntry/delete", deleteBlog);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});



