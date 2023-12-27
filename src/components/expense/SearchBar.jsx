import React, { useState } from 'react';
import { Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap';


const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        // 执行搜索操作

        const trimmedSearchTerm = searchTerm.trim();
        console.log('Search Term in SearchBar:', trimmedSearchTerm);
        if (trimmedSearchTerm !== '') {
            onSearch(trimmedSearchTerm);
            setSearchTerm(trimmedSearchTerm)
        }

    };

    return (
        <Container fluid>
            <Row className="justify-content-end">
                <Col xs="auto">
                    <Form inline >
                        <FormControl
                            type="text"
                            placeholder="Search Type"
                            className="mr-sm-2 "
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button variant="dark" onClick={handleSearch} className="ml-auto">
                            Search
                        </Button>
                    </Form>
                </Col>
            </Row>


        </Container>

    );
};

export default SearchBar;