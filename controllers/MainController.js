import blog from "../models/BlogEntryModel.js"
import dateTime from "get-date";

function getHome (req, res) {
    const viewsData = {
        pageTitle: 'Home Page - Blog Entries',
        blog
    };
    res.render("index", viewsData);
}

function showBlog (req, res) {
    const blogEntryID = req.params.blogEntryId;
    const idIndex = blog.getBlogEntryIndexByID(blogEntryID, blog.list);
    const showBlog = blog.list[idIndex];

    const viewsData = {
        pageTitle: showBlog.title,
        showBlog
    };

    res.render("ViewBlogEntry", viewsData);
}

function getAddBlog (req, res) {
    const viewsData = {
        pageTitle: 'New Blog Entry'
    }

    res.render("AddBlogEntry", viewsData);
}

function postAddBlog (req, res) {
    let newEntry = new blog.EntryClass(Date.now(), req.body.author, req.body.title, req.body.content, dateTime()); //Parameters: Number, Author, Content, Date
    blog.list.push(newEntry);
    console.log(blog.list);

    // res.writeHead(301, {"Location": "/"});
    // return res.end();
    // OR
    res.redirect("/");
}

function getEditBlog (req, res) {
    const blogEntryId = req.params.blogEntryId;
    const idIndex = blog.getBlogEntryIndexByID(blogEntryId, blog.list);
    const editBlog = blog.list[idIndex];

    const viewsData = {
        pageTitle: editBlog.title,
        editBlog
    };

    res.render("EditBlogEntry", viewsData);
}

function postEditBlog (req, res) {
    let editEntry = new blog.EntryClass(req.body.id, req.body.author, req.body.title, req.body.content, dateTime(true) + " | " + dateTime())
    const idIndex = blog.getBlogEntryIndexByID(req.body.id, blog.list);
    // blog.list[idIndex] = editEntry;
    blog.list.splice(idIndex, 1, editEntry); // Splice(indexToReplaced/Deleted, howManyElementsInvolved, theReplacement (Optional));

    res.redirect("/");
}

function deleteBlog (req, res) {
    const idIndex = blog.getBlogEntryIndexByID(req.body.id, blog.list);
    console.log("deleted from index of" + " " + idIndex);
    blog.list.splice(idIndex, 1);

    res.redirect("/");
}

export {getHome, showBlog, getAddBlog, postAddBlog, getEditBlog, postEditBlog, deleteBlog};