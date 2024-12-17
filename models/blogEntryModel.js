let list = [];

function EntryClass (id, author, title, content, date) {
    this.id = id,
    this.author = author,
    this.title = title,
    this.content = content,
    this.date = date
};

function getBlogEntryIndexByID (blogEntryId, blogArray) {
    // TRY: let blog = blogArray.find((b) => b.id.toString() === blogEntryId)
    let tempIndex = -1;

    for (let i = 0; i < blogArray.length; i++) {
        if (blogEntryId == blogArray[i].id) {
            tempIndex = i;
        }
        // console.log(typeof(blogEntryId) + " " + typeof(blogArray[i].id));
    }

    return tempIndex;
}

export default {list, EntryClass, getBlogEntryIndexByID};
