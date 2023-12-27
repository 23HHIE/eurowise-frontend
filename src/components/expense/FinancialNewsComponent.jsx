import React, { useEffect, useState } from 'react';
import { Form, Card, Button } from 'react-bootstrap';
import { retrieveFinancialNewsApi } from './api/FinancialNews'


const FinancialNewsComponent = () => {


    const [newsData, setNewsData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await retrieveFinancialNewsApi()
                setNewsData(response.data)
            } catch (error) {
                console.error('Error message: ', error)
            }
        }

        fetchData();
    }, []

    )

    return (
        // <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        //     <h2>Financial News</h2>
        //     {newsData ? (
        //         newsData.map((news, index) => (
        //             <Card key={index} style={{ width: '48rem', margin: '8px', padding: '1px' }}>
        //                 <Card.Img variant="top" src={news.thumbnailUrl} />
        //                 <Card.Body>
        //                     <Card.Title>{news.headline}</Card.Title>
        //                     {/* <Card.Text>{news.summary}</Card.Text> */}
        //                     <Button variant="primary" href={news.url} target="_blank">
        //                         Read More
        //                     </Button>
        //                 </Card.Body>
        //             </Card>
        //         ))
        //     ) : (
        //         <p>No news data available.</p>
        //     )}
        // </div>
        <Form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>Financial News</h2>

            {newsData ? (
                <div className="news-container">
                    {newsData.map((news, index) => (
                        <Card key={index} className="news-card">
                            <Card.Img variant="top" src={news.thumbnailUrl} className="card-image" />
                            <Card.Body>
                                <Card.Title className="card-title">{news.headline}</Card.Title>
                                <Button variant="primary" href={news.url} target="_blank" className="read-more-btn">
                                    Read More
                                </Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            ) : (
                <p>No news data available.</p>
            )}
        </Form>
    );
};


export default FinancialNewsComponent;
