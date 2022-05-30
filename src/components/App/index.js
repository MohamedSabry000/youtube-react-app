import React from 'react';
import { Col, Container, Row, Alert } from 'reactstrap';

import SearchBar from "../SearchBar";
import VideoDetail from "../VideoDetail";
import VideoList from "../VideoList";
import YoutubeApi from "../../Api/youtubeApi";
import Faker from 'faker';
import './App.css';

// const randomWord = require('random-words');

class App extends React.Component {

  state = {
    videos: [],
    selectedVideo: null,
    relatedVideos: [],
    maxResults: 5
  }

  componentDidMount = () => {
    this.onTermSubmit('')
  }

  onTermSubmit = async (term) => {
    const choices = [
      "الأفلام العربية", "الأفلام الأجنبية", "الأفلام الهنديه",
      "البرامج التلفزيونية", "البرامج", "رياضه", "الأجهزة اللوحيه",
      "مسرحيات", "أفلام وثائقية", "الصور والخلفيات", "المسلسلات العربية",
      "المسلسلات الأجنبية", "الألعاب", "الأنمي", "فديو كليب", "موسيقى", "إسلاميات و أناشيد",
      " الكتب", "الكورسات التعليميه",
      "trending", "Music", "Gaming", "fashion $ Beauty", "learning", "live", "news", "sports", "movies & shows"
    ]

    // const ran = randomWord({ exactly: 3, join: ' ' });
    // const ran = Faker.random.objectElement(choices2);
    const ran = Faker.random.objectElement(choices);

    const response = await this.getSearch(term, ran);

    await this.onVideoSelect(response.data.items[0]);

    response && this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0],
    });
  }
  getSearch = (term, ran) => {
    return new Promise(async (resolve, reject) => {
      const response = await YoutubeApi.get('/search', { params: { q: !term ? ran : term } });
      resolve(response);
      reject("Can't Fetch Data!")
    })
  }
  onVideoSelect = async video => {
    const response = await YoutubeApi.get('/search', {
      params: {
        relatedToVideoId: video.id.videoId
      }
    });

    response && this.setState({ selectedVideo: video, relatedVideos: response.data.items });
    return response;
  }

  updateNextRelatedVideos = () => {

    const next = async () => {
      const response = await YoutubeApi.get('/search', {
        params: {
          relatedToVideoId: this.state.selectedVideo.id.videoId,
          maxResults: this.state.maxResults + 5
        }
      }).catch(error => console.log(error));

      const settingState = async (res) => {
        this.setState({ relatedVideos: res.items, maxResults: res.items.length })
      }

      response && await settingState(response.data);
    }

    // Time out for typing the word
    const timeoutId = setTimeout(() => {
      if (this.state.selectedVideo)
        next();
    }, 500);

    // clear timeout after any action to re-timeout again...to reach 
    // wait 0.5s then delete timeout once
    return () => {
      clearTimeout(timeoutId);
    }

  }

  updatePrevRelatedVideos = () => {
    console.log(`Hello Related ${this.state.relatedVideos.length}`);
    const { relatedVideos, maxResults } = this.state;
    if ((maxResults - 5) >= 0)
      this.setState({ relatedVideos: relatedVideos.splice(0, relatedVideos.length - 5), maxResults: relatedVideos.length - 5 })
  }

  render() {
    return (
      <Container style={{ marginTop: '10px' }}>
        <SearchBar onFormSubmit={this.onTermSubmit} />
        {this.state.selectedVideo ?
          <>
            <Row lg="2" md="1">
              <Col lg="8" md="12">
                <VideoDetail video={this.state.selectedVideo} />
              </Col>

              <Col lg="4" md="12" style={{ margin: "10px auto" }}>
                <VideoList videos={this.state.videos} selectVideo={this.onVideoSelect} flag="main" />
              </Col>
            </Row>


            <VideoList
              videos={this.state.relatedVideos}
              selectVideo={this.onVideoSelect}
              flag="related" />

            <div className="row">
              <div className="ui">
                <div className="ui buttons" style={{ width: "100%", marginBottom: "20px" }}>
                  <button onClick={this.updatePrevRelatedVideos} className="ui labeled icon button">
                    <i className="left chevron icon"></i>
                    Back
                  </button>
                  <button onClick={this.updateNextRelatedVideos} className="ui right labeled icon button">
                    Forward
                    <i className="right chevron icon"></i>
                  </button>
                </div>
              </div>
            </div>
          </>
        : 
        <Alert color="danger"> Something Went Wrong with Internet Connection</Alert>}
      </Container>
    )
  }
}

export default App;
