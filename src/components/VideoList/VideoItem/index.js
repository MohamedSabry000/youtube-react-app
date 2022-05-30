import React from 'react';
import './styles.css';

const VideoItem = ({ item, selectVideo, flag }) => {
    switch(flag){
        case "main": 
            return (
                <div className="item video-item" onClick={() => selectVideo(item)} >
                    <img className="ui image" src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
                    <div className="content">
                        <div className="header">
                            {item.snippet.title}
                        </div>
                    </div>
                    
                </div>
            )
        case "related":
            return (

                    <div className="item related-video-item ui card" onClick={() => selectVideo(item)} style={{width: "100%"}}>
                        <div className="ui slide masked reveal image">
                            <img className="visible content" src={item.snippet?item.snippet.thumbnails.medium.url:''} alt={item.snippet?item.snippet.title:''} />
                            <img className="hidden content" src={item.snippet?item.snippet.thumbnails.medium.url:''} alt={item.snippet?item.snippet.title:''} />
                        </div>
                        <div className="content" style={{fontSize: "12px"}}>
                            <div className="header">
                                {item.snippet?item.snippet.title:''}
                            </div>
                        </div>
                    </div>
            )
        default:
            break;
    }
    
}

export default VideoItem;