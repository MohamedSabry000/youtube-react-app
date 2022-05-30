import React from 'react';
import VideoItem from "./VideoItem";
import { Row, Col } from "reactstrap";

const VideoList = ({videos, selectVideo, flag}) => {

    switch(flag) {
        case "main":
            return (
                <div className="ui relaxed divided list">
                    {videos.map( video =>{
                        return <VideoItem key={video.id.videoId} item={video} selectVideo={selectVideo} flag={flag} />
                    })}
                </div>
            )
        case "related":
            return (
                <div className="ui horizontal list">
                    <div className="ui">
                        <Row lg="4" md="3" sm="2" xs="1">
                            {videos.map( video =>{
                                return video.snippet? <Col key={video.id.videoId} style={{padding: "9px 8px"}}><VideoItem key={video.id.videoId} item={video} selectVideo={selectVideo} flag={flag} /></Col>: <></>;
                            })}
                        </Row>
                    </div>
                </div>
            )
        default:
            break;
    }
    
}

export default VideoList;