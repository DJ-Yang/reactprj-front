import React from 'react';
import './App.css';
import api from './api';
import PostView from './Components/PostView';

// ui/ux
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';


import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class App extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: '',
      results: [],
    }
  }

  componentDidMount() {
    this.getPosts()
  }

  async getPosts() {
    const _results = await api.getAllPosts()
    console.log(_results.data)
    this.setState({results: _results.data})
  }

  handlingChange = (event) => {
    // 밑의 event.target.name => 아래 인풋들의 네임으로 간다
    this.setState({[event.target.name]: event.target.value})
  }

  // 폼을 보내는 함수
  // async 위치 확인 함수의 처음에 달아줘야한다.
  handlingSubmit = async (event) => {
    event.preventDefault()
    let result = await api.createPost({title:this.state.title, content:this.state.content})
    console.log("완료됨!", result)

    // 글을 작성했을 때 전체화면에도 노출시키는 것
    this.setState({title:'', content:''})
    this.getPosts()
  }

  // 삭제 함수
  handlingDelete =  async (id) =>  {
    await api.deletePost(id)
    this.getPosts()
  }


  render() {
    return (
      <div className="App">
        <Container maxWidth="lg">
        <div className="PostingSection">
          <Paper className="PostingPaper">
          <h2>대나무 숲 글 작성하기</h2>
          <form className="PostingForm" onSubmit={this.handlingSubmit}>

            <TextField
              id="outlined-name"
              label="title"
              name="title"
              // className={classes.textField}
              value={this.state.title}
              onChange={this.handlingChange}
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="outlined-name"
              label="content"
              name="content"
              multiline
              rows = "4"
              // className={classes.textField}
              value={this.state.content}
              onChange={this.handlingChange}
              margin="normal"
              variant="outlined"
            />


            <Button variant="outlined" color="primary" type="submit">제출하기</Button>
          </form>
          </Paper>
        </div>
        <div className="ViewSection">
          {
            this.state.results.map((post) => 
            <Card className={'card'}>
              <CardContent>
                <Typography>
                  <PostView key={post.id} id={post.id} title={post.title} content={post.content} />
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={(event) => {this.handlingDelete(post.id)}}>삭제</Button>
              </CardActions>
            </Card>
            )
          }
        </div>
        </Container>
      </div>
    );
  }
}

export default App;
