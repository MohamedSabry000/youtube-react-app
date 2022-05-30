import axios from 'axios';

const KEY = "AIzaSyAG0hrXMvAMLTXmFz6SdivErABaT5W_naU";

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params:{
        part: 'snippet',
        type: 'video',
        maxResults: 5,
        key: KEY
    }
})
