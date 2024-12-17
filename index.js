import express from "express";
import bodyParser from "body-parser"
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

import blog from "./models/blogEntryModel.js" // TODO: Find an alternative for this import
import dateTime from "get-date";

const app = express();
const port = 3000;

app.use(express.static(__dirname + "/public")); // Set the public folder as the base folder of the static files
app.use('/css', express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use(bodyParser.urlencoded({ extended: true })); // Body Parser Middleware

app.get("/", (req, res) => {
    const viewsData = {
        pageTitle: 'Home Page - Blog Entries',
        blog
    };
    res.render(__dirname + "/views/index.ejs", viewsData);
});

app.get("/blogEntry/details/:blogEntryId", (req, res) => {
    const blogEntryID = req.params.blogEntryId;
    const idIndex = blog.getBlogEntryIndexByID(blogEntryID, blog.list);
    const showBlog = blog.list[idIndex];

    const viewsData = {
        pageTitle: showBlog.title,
        showBlog
    };

    // console.log(idIndex + " " + showBlog);

    res.render(__dirname + "/views/viewBlogEntry.ejs", viewsData);
});

app.get("/blogEntry/add", (req, res) => {
    const viewsData = {
        pageTitle: 'New Blog Entry'
    }

    res.render(__dirname + "/views/addBlogEntry.ejs", viewsData);
});

app.post("/blogEntry/add", (req, res) => {
    let newEntry = new blog.EntryClass(Date.now(), req.body.author, req.body.title, req.body.content, dateTime(true) + " | " + dateTime()); //Parameters: Number, Author, Content, Date
    blog.list.push(newEntry);
    console.log(blog.list);

    // res.writeHead(301, {"Location": "/"});
    // return res.end();
    // OR
    res.redirect("/");
});

app.get("/blogEntry/edit/:blogEntryId", (req, res) => {
    const blogEntryId = req.params.blogEntryId;
    const idIndex = blog.getBlogEntryIndexByID(blogEntryId, blog.list);
    const editBlog = blog.list[idIndex];

    const viewsData = {
        pageTitle: editBlog.title,
        editBlog
    };

    res.render(__dirname + "/views/editBlogEntry.ejs", viewsData);
});

app.post("/blogEntry/edit", (req, res) => {
    let editEntry = new blog.EntryClass(req.body.id, req.body.author, req.body.title, req.body.content, dateTime(true) + " | " + dateTime())
    const idIndex = blog.getBlogEntryIndexByID(req.body.id, blog.list);
    // blog.list[idIndex] = editEntry;
    blog.list.splice(idIndex, 1, editEntry); // Splice(indexToReplaced/Deleted, howManyElementsInvolved, theReplacement (Optional));

    res.redirect("/");
});

app.post("/blogEntry/delete", (req, res) => {
    const idIndex = blog.getBlogEntryIndexByID(req.body.id, blog.list);
    console.log("deleted from index of" + " " + idIndex);
    blog.list.splice(idIndex, 1);

    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});



