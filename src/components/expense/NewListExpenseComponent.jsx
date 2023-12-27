import { useCallback, useEffect, useState } from "react"
import { Dropdown, DropdownButton, Container } from 'react-bootstrap';
import { deleteExpenseApi, retrieveAllExpensesForUsernameApi, updateExpenseApi } from "./api/ExpenseApiService"
import { useAuth } from "./security/AuthContext"
import { useNavigate } from "react-router-dom"
import SearchBar from "./SearchBar";


function NewListExpenseComponent() {
    const authContext = useAuth()

    const username = authContext.username

    const navigate = useNavigate()

    const [message, setMessage] = useState(null)

    const [refreshPage, setRefreshPage] = useState(false)

    const [details2, setDetails2] = useState([])

    const [currency, setCurrency] = useState('EUR')
    const [have, setHave] = useState('EUR');
    // const want = selectedCurrency || 'defaultCurrencyCode';
    const [amount, setAmount] = useState(1);
    const [type, setType] = useState('');

    const [selectedCurrency, setSelectedCurrency] = useState('')

    const refreshExpenses = useCallback(async () => {
        try {
            const internalResponse = await retrieveAllExpensesForUsernameApi(username, type, currency);
            console.log('Internal API Response:', internalResponse.data);
            setDetails2(internalResponse.data);
        } catch (error) {
            console.log('Error:', error);
        }
    }, [username, type, currency]);

    // 初始化页时获取数据
    useEffect(() => {
        refreshExpenses();
        console.log('Received type:', type)
    }, [username, type, currency, refreshPage]);

    // useEffect(() => {
    //     console.log('存入的金额', amount);
    // }, [amount]);


    // 处理search bar
    const handleSearch = (searchTerm) => {
        console.log('Received Search Term:', searchTerm);
        setType(searchTerm);
    }

    // 处理下拉菜单选择的变化
    const handleCurrencyChange = (newCurrency) => {
        console.log('Selected Currency:', newCurrency);
        setCurrency(newCurrency);
        // refreshExpenses(); // 在选择变化时刷新数据
    };

    function deleteExpense(id) {
        deleteExpenseApi(username, id)
            .then(
                () => {
                    setMessage(`Delete of expense with ${id} successful`)
                    setRefreshPage(true)
                }
            )
    }

    function updateExpense(id) {
        navigate(`/expense/${id}`)
    }

    function addNewExpense() {
        navigate(`/expense/-1`)
    }

    return (
        <div className="container">
            <h1 style={{ marginTop: '6%', fontSize: '35px' }}>Check Your Details</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <Container className="d-flex justify-content-end" >
                <div className="search-bar-container">
                    <SearchBar onSearch={handleSearch} />
                </div>
            </Container>

            <div>
                <table className="table" style={{ fontSize: '25px' }}>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>
                                <DropdownButton id="dropdown-basic-button"
                                    title={`Choose a currency: ${selectedCurrency}`}>
                                    <Dropdown.Item onClick={() => handleCurrencyChange('USD')}>USD</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleCurrencyChange('EUR')}>EUR</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleCurrencyChange('CNY')}>CNY</Dropdown.Item>
                                </DropdownButton>
                            </th>
                            <th>Date</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody style={{ fontSize: '20px' }}>
                        {
                            details2.map(
                                detail =>
                                    <tr key={detail.id}>
                                        <td>{detail.type}</td>
                                        <td> {currency === "EUR" ? "€" : currency === "USD" ? "$" : "¥"} {selectedCurrency ? (detail.convertedFee ? detail.convertedFee.toString() : 'N/A') : (detail.fee ? detail.fee.toString() : 'N/A')}</td>
                                        <td>{detail.date ? detail.date.toString() : 'N/A'}</td>
                                        <td><button className="btn btn-warning"
                                            onClick={() => deleteExpense(detail.id)}>Delete</button></td>
                                        <td><button className="btn btn-success"
                                            onClick={() => updateExpense(detail.id)}>Update</button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div className="btn btn-success m-5" onClick={addNewExpense}>Add New Expense</div>
        </div>
    )
}

export default NewListExpenseComponent