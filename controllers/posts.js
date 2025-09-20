// In-memory posts data
let posts = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
  { id: 3, title: "Post 3" },
];

// GET /api/posts - Get all posts with optional limit parameter
export const getAllPosts = (req, res) => {
  const { params, query } = req;
  const limit = parseInt(query.limit);

  if (!isNaN(limit) && limit > 0) {
    res.status(200).json(posts.slice(0, limit));
  } else {
    res.status(200).json(posts);
  }
};

// GET /api/posts/:id - Get single post by ID
export const getPostById = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`Post with id: ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  res.status(200).json(post);
};

// POST /api/posts - Create new post
export const createPost = (req, res, next) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };

  if (!newPost.title) {
    const error = new Error(`Please include a title`);
    error.status = 400;
    return next(error);
  }

  posts.push(newPost);
  res.status(200).json(posts);
};

// PUT /api/posts/:id - Update existing post by ID
export const updatePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`Post with id: ${id} was not found`);
    error.status = 400;
    return next(error);
  }

  post.title = req.body.title;
  res.status(200).json(posts);
};

// DELETE /api/posts/:id - Delete post by ID
export const deletePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`Post with id: ${id} was not found`);
    error.status = 400;
    return next(error);
  }

  posts = posts.filter((post) => post.id !== id);
  res.status(200).json(posts);
};
