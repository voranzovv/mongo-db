const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to DB", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "spring boot",
    author: "voran",
    tags: ["java", "boot"],
    isPublished: true
  });
  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;
  const result = await Course.find({ author: "voran", isPublished: true })
    .find({ author: /^voranz/ })
    .skip((pageNumber-1) * pageSize)
    .limit(pageSize)
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(result);
}

getCourses();
