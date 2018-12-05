import React, { Component } from 'react';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import axios from 'axios'
import Post from './Post/Post'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.processSearch = this.processSearch.bind( this );
  }
  
  componentDidMount() {
    axios.get(`https://practiceapi.devmountain.com/api/posts`)
    // .then(reply => console.log(reply))
    .then(reply => {
      this.setState({
        posts: reply.data
      })
    })
  }

  updatePost(id,text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}` , {text: 'All your text are belong to us.'})
    .then(reply => {
      this.setState({
        posts: reply.data
      })
    })
  }

  deletePost(id) {
    console.log('deletePost Invoked on ' + id)
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
    .then(reply => {
      this.setState({
        posts: reply.data
      })
    })
  }

  createPost(content) {
    let newPost = {text: content}
    console.log(newPost)
    axios.post(`https://practiceapi.devmountain.com/api/posts`, newPost)
    .then(reply => {
      this.setState({
        posts: reply.data
      })
    })
  }


  processSearch(str){
    axios.get(`https://practiceapi.devmountain.com/api/posts/filter?text=${encodeURI(str)}`)
      .then(reply => this.setState({
        posts: reply.data
      }))
  }
  

  render() {
    const { posts } = this.state

    return (
      <div className="App__parent">
        <Header processSearch={this.processSearch}/>

        <section className="App__content">

          <Compose createPostFn={this.createPost} />
          
          {posts.map(post => (

            <Post text={post.text} date={post.date} key={post.id} updatePostFn={this.updatePost} id={post.id} deletePostFn={ this.deletePost } />
          )
          )}
          
        </section>
        <section>
        </section>
      </div>
    );
  }
}

export default App;
