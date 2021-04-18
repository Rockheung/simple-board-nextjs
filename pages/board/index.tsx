import React from "react";
import Link from "next/link";

export default function Board() {
  const [posts, setPosts] = React.useState([]);
  const handleInitialLoading = React.useCallback(async () => {
    const res = await fetch("/api/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    setPosts(json);
  }, []);

  React.useEffect(() => {
    handleInitialLoading();
  }, []);
  return (
    <>
      <header>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="https://bulma.io">
              <img
                src="https://bulma.io/images/bulma-logo.png"
                width="112"
                height="28"
              />
            </a>

            <a
              role="button"
              className="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item">{"홈"}</a>

              <a className="navbar-item">{"문서"}</a>

              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">{"더 보기"}</a>

                <div className="navbar-dropdown">
                  <a className="navbar-item">{"나는..."}</a>
                  <a className="navbar-item">{"직업"}</a>
                  <a className="navbar-item">{"연락처"}</a>
                  <hr className="navbar-divider" />
                  <a className="navbar-item">{"여기로 신고"}</a>
                </div>
              </div>
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <a className="button is-primary">
                    <strong>{"회원가입"} </strong>
                  </a>
                  <a className="button is-light">{"로그인"}</a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <section className="hero  is-info">
          <div className="hero-body">
            <p className="title">아주 간단한</p>
            <p className="subtitle">간단한 게시판</p>
          </div>
        </section>
        <div className="container is-max-widescreen">
          <div className="columns is-gapless">
            <div className="column">번호</div>
            <div className="column">제목</div>
            <div className="column">댓글</div>
            <div className="column">편집</div>
          </div>
          {posts.map((post, idx) => {
            return (
              <Link key={post._id} href={"/board/" + post._id}>
                <div className="columns is-gapless">
                  <div className="column">{idx}</div>
                  <div className="column">{post.title}</div>
                  <div className="column">{0}</div>
                  <div className="column">{"편집"}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            <strong>Bulma</strong> by{" "}
            <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is
            licensed
            <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
            The website content is licensed{" "}
            <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
              CC BY NC SA 4.0
            </a>
            .
          </p>
        </div>
      </footer>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  return {
    props: {},
  };
}
