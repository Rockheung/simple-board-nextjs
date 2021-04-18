import Post from "../../../model/Post";

export default async (req, res) => {
  // new Post 형태로는 save가 되지 않아 create 메서드 사용
  if (req.method === "GET") {
    const { id } = req.query;
    console.log(id);
    const posts = await new Promise((resolve, reject) => {
      Post.find({ _id: id }, function (err, doc) {
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
