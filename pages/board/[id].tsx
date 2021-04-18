import React from "react";

export default function BoardById({ postId }) {
  const [post, setPost] = React.useState();
  const handleInitialQuery = React.useCallback(async () => {
    const res = await fetch("/api/posts/" + postId);
    const json = await res.json();
    setPost(json);
  }, []);

  React.useEffect(() => {
    handleInitialQuery();
  }, []);

  return <p>{JSON.stringify(post, null, 2)}</p>;
}

export async function getServerSideProps({ params, req, res }) {
  const { id } = params;
  return {
    props: { postId: id },
  };
}
