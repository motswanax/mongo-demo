const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 255 },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
  },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    rquired: function () {
      return this.isPublished;
    },
    min: 10,
    max: 200,
  },
});

const Course = mongoose.model("Course", courseSchema); // This is a class.

async function createCourse() {
  const course = new Course({
    name: "Angular.js",
    category: "-",
    author: "BAD",
    tags: ["angular", "frontend"],
    isPublished: true,
    price: 15,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
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

async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id });
  console.log(result);
}

//removeCourse("625754269a8d01b601c918eb");
createCourse();
