const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to DB", err));

const courseSchema = new mongoose.Schema({
  name: {type:String, required:true},
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    // name: "spring boot",
    author: "voran",
    tags: ["java", "boot"],
    isPublished: true
  });

  try{
    const result = await course.save();
    console.log(result);
  }
  catch(ex){
    console.log(ex.message);
    
  }
}

async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;
  const result = await Course.find({ author: "voran", isPublished: true })
    .find({ author: /^voranz/ })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(result);
}

async function updateCourse(id) {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "traversy media"
      }
    },
    { new: true }
  );
  console.log(result);
}

async function deleteCourse(id){
const result = await Course.deleteOne({_id:id});
console.log(result);

}

createCourse();
