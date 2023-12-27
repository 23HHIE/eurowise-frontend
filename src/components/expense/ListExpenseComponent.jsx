import { useEffect, useState, useCallback, useMemo } from "react"
import { retrieveAllExpensesForUsernameApi, deleteExpenseApi } from "./api/ExpenseApiService"
import { useAuth } from "./security/AuthContext"
import { useNavigate } from "react-router-dom"
import axios from "axios"


function ListExpenseComponent() {


    const authContext = useAuth()

    const username = authContext.username

    const navigate = useNavigate()

    const [details, setDetails] = useState([])
    const [message, setMessage] = useState(null)

    const [exchangeRates, setExchangeRates] = useState(null)

    const [selectedCurrency, setSelectedCurrency] = useState('EUR');
    const [have, setHave] = useState('EUR');
    const [want, setWant] = useState('EUR');
    const [amount, setAmount] = useState(1);

    const fetchExchangeRates = async (selectedCurrency) => {
        try {
            const url = 'https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency'

            const headers = {
                'X-RapidAPI-Key': '03939cc397msh8dcd64407a76398p17c483jsncfe1fcb69495',
                'X-RapidAPI-Host': 'currency-converter-by-api-ninjas.p.rapidapi.com',

            }
            const response = await axios.get(url, {
                params: { have, want, amount }, headers,
            })

            console.log(response)
            setExchangeRates(response.data.rates);
        } catch (error) {
            console.error('failed to fetch exchange rates', error);
        }
    }

    const memoizedFetchExchangeRates = useMemo(() => fetchExchangeRates, [fetchExchangeRates, have, want, amount]);


    const fetchData = async () => {
        try {
            // 获取选定货币的最新汇率
            if (selectedCurrency) {

                await memoizedFetchExchangeRates(selectedCurrency);
            }

            // 获取费用数据
            const response = await retrieveAllExpensesForUsernameApi(username);
            setDetails(response.data);
            console.log(response.data);
        } catch (error) {
            console.log('failed to refresh expenses', error);
        }
    };

    const refreshExpenses = useCallback(async () => {
        await memoizedFetchExchangeRates(selectedCurrency);
        await fetchData();
    }, [username, selectedCurrency, memoizedFetchExchangeRates, fetchData]);



    useEffect(() => {
        fetchData();
    }, []); // 空依赖数组表示只在组件初次渲染时执行一次


    useEffect(() => {
        const fetchData = async () => {
            try {
                // 获取选定货币的最新汇率
                if (selectedCurrency) {
                    await memoizedFetchExchangeRates(selectedCurrency);
                }

                // 获取费用数据
                const response = await retrieveAllExpensesForUsernameApi(username);
                setDetails(response.data);
                console.log(response.data);
            } catch (error) {
                console.log('failed to refresh expenses', error);
            }
        };

        fetchData();
    }, [username, selectedCurrency, memoizedFetchExchangeRates]);





    function deleteExpense(id) {
        console.log('clicked ' + id)
        deleteExpenseApi(username, id)
            .then(
                () => {
                    setMessage(`Delete of expense with ${id} successful`)
                    // refreshExpenses()
                    fetchData()
                }
                // 1:display message for user
                // 2:update expenses list
            )
            .catch(error => console.log(error))
    }




    function updateExpense(id) {
        console.log('clicked ' + id)
        navigate(`/expense/${id}`)
    }

    function addNewExpense() {
        navigate(`/expense/-1`)
    }

    const convertAmount = (amount, targetCurrency) => {
        if (!exchangeRates || !targetCurrency) {
            return 'Loading...'; // 或其他默认值
        }

        const convertedAmount = amount * exchangeRates[targetCurrency];
        return convertedAmount.toFixed(2); // 根据需要进行调整
    };

    return (
        <div className="container">
            <h1>Your Expense Details</h1>
            {message && <div className="alert alert-warning">{message}</div>
            }

            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Payment Amount </th>
                            <th>Converted Amount
                                <select value={selectedCurrency}
                                    onChange={(e) => setSelectedCurrency(e.target.value)}>
                                    <option value="CNY">CNY</option>
                                    <option value="USD">USD</option>
                                    <option value="JPY">JPY</option>
                                    <option value="GBP">GBP</option>
                                    <option value="FRF">FRF</option>
                                </select>
                            </th>
                            <th>Payment Date</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            details.map(
                                detail =>
                                    <tr key={detail.id}>
                                        <td>{detail.type}</td>
                                        <td>€ {detail.fee.toString()}</td>
                                        <td>
                                            {convertAmount(detail.fee, selectedCurrency)}
                                        </td>
                                        {/* <td>{detail.paymentDate.toDateString()}</td> */}
                                        <td>{detail.date.toString()}</td>
                                        <td><button className="btn btn-warning"
                                            onClick={() => deleteExpense(detail.id)}>Delete</button></td>
                                        <td><button className="btn btn-success"
                                            onClick={() => updateExpense(detail.id)}>Update</button></td>

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

export default ListExpenseComponent