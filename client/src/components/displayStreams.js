import React, { useEffect, useState } from 'react';
import StreamLink from './streamLink';
//import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';

export default function DisplayStreams() {
    const [streamIds, setStreamIds] = useState();

    useEffect(() => {
        async function fetchStreamIds() {
            const response = await fetch('http://localhost:5000/'); 

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);   

                return;
            }
            
            const json = await response.json();
            setStreamIds(json.ids);
        }

        fetchStreamIds();
    });

    function streams() {
        return streamIds.map((streamId) => {
            return (
                <StreamLink streamId={streamId} key={streamId} /> /* unique key is needed for rendering of generated comps to work */
            );
        });
    }

    return (
        /*<div>
            {streamIds && streams()} 
        </div>*/
        <div className="mt-4 container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
                {streamIds && streams()} 
            </div>
        </div>
        /*<Container>
            <Row>
                <Col>Herro</Col>
                <Col>{streamIds && streams()}</Col>
                <Col>Herro</Col>
            </Row>
        </Container>*/
    );
    
}
