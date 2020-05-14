import React, { Component } from "react";
import Posts from "../../containers/Blog/Posts/Posts";
import "./Blog.css";
import { Route, Link, NavLink, Switch, Redirect } from "react-router-dom";
import NewPost from "./NewPost/NewPost";
import FullPost from "./FullPost/FullPost";
//import AsyncComponent from '../../hoc/asyncComponent'
import asyncComponent from "../../hoc/asyncComponent";

const AsyncComponent = asyncComponent(() => {
  return import("./NewPost/NewPost");
});
class Blog extends Component {
  state = {
    auth: true,
  };
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                {/* <Link to="/">Home</Link> */}
                <NavLink
                  to="/posts"
                  exact
                  activeStyle={{
                    textDecoration: "underline",
                  }}
                >
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: "/new-post",
                    hash: "#submit",
                    search: "?quick-submit=true",
                  }}
                  activeStyle={{
                    textDecoration: "underline",
                  }}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          {this.state.auth ? (
            <Route path="/new-post" exact component={AsyncComponent} />
          ) : null}
          <Route path="/posts" component={Posts} />
          <Route path="/" component={Posts} />
          {/* <Redirect from="/" to="/posts" /> */}
          <Route render={() => <div>Not Found, it's 404</div>} />
        </Switch>
        {/* <section>
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section> */}
      </div>
    );
  }
}

export default Blog;
