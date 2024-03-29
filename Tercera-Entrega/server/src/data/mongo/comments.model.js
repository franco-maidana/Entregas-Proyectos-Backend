import MongoManager from "./manager.model.js"; // lo traemos el manager model
import comments from "./models/comment.model.js"; // lo traemos del models/comments

const comment = new MongoManager(comments);
export default comment;
