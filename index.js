const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema); // This is a class.

async function createCourse() {
  const course = new Course({
    name: "Angular.js",
    author: "BAD",
    tags: ["angular", "frontend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;
  const courses = await Course
    //.find({ author: "BAD", isPublished: true })
    //.find({ price: { $gt: 10, $lte: 20 } })
    //.find({ price: { $in: [10, 15, 20] } })
    //.find()
    //.or([{ author: "BAD" }, { isPublished: true }])
    //.and([])
    .find({ author: /^BAD/ }) // Regex
    .skip((pageNumber - 1) * pageSize) // Pagination
    .limit(pageSize)
    .sort({ name: 1 })
    //.select({ name: 1, tags: 1 });
    .count();
  console.log(courses);
}

async function updateCourse(id) {
  // Query first approach. 1. findById() 2. Modify properties. 3. save()
  /* const course = await Course.findById(id);
  if (!course) return;
  course.set({
    isPublished: true,
    author: "BADASS",
  });
  const result = await course.save();
  console.log(result); */

  // Update first approach. 1. Update directly 2. Optionally, get the updated document.
  const result = await Course.updateOne(
    { _id: id },
    { $set: { author: "BADBOY", isPublished: false } }
  );
  console.log(result);
}

updateCourse("625754269a8d01b601c918eb");
