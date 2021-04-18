import Post from "../../../model/Post";

export default async (req, res) => {
  // new Post 형태로는 save가 되지 않아 create 메서드 사용
  if (req.method === "POST") {
    const { title, author, body } = req.body;
    if ([title, author, body].every((_) => _ !== undefined)) {
      try {
        const post = await new Promise((resolve, reject) => {
          Post.create({ title, author, body }, function (err, doc) {
            if (err) {
              reject(err);
              return;
            }
            resolve(doc);
          });
        });
        res.status(201).send(post);
        // const postRequested = new Post({ title, author, body });
        // const post = await postRequested.save();
        // post.length = postRequested.len();
      } catch (err) {
        res.status(502).send(err.message);
      }
    } else {
      res.status(400).send();
    }
  } else if (req.method === "GET") {
    const posts = await new Promise((resolve, reject) => {
      Post.find({}, function (err, doc) {
        if (err) {
          reject(err);
          return;
        }
        resolve(doc);
      });
    });
    res.status(200).send(posts);
  } else {
    res.status(501).send();
  }
};
