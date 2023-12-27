import { useEffect, useState } from 'react'
import { retrieveExpenseApi, updateExpenseApi, createExpenseApi } from './api/ExpenseApiService'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from "./security/AuthContext"
import { Formik, Form, Field, ErrorMessage } from 'formik'


export default function ExpenseComponent() {

    const { id } = useParams()

    const [type, setType] = useState('')
    const [fee, setFee] = useState('')
    const [date, setDate] = useState('')

    const authContext = useAuth()

    const navigate = useNavigate()

    const username = authContext.username


    useEffect(() => {
        function retrieveExpense() {
            if (id !== -1) {
                retrieveExpenseApi(username, id)
                    .then(response => {
                        setType(response.data.type);
                        setFee(response.data.fee);
                        setDate(response.data.date);
                        console.log(response);
                    })
                    .catch(error => console.log(error));
            }
        }

        retrieveExpense();  // 调用函数

    }, [id, username]);

    function onSubmit(values) {
        console.log(values)
        const expense = {
            id: id,
            username: username,
            type: values.type,
            fee: values.fee,
            date: values.date
        }
        console.log(expense)

        if (id === -1) {
            createExpenseApi(username, expense)
                .then(response => {
                    navigate('/details')
                })
                .catch(error => console.log(error))
        } else {
            updateExpenseApi(username, id, expense)
                .then(response => {
                    navigate('/details')
                })
                .catch(error => console.log(error))
        }




    }

    // 定义form中的validate
    function validate(values) {
        let errors = {
            // type: 'enter a valid type',
            // fee: 'enter a valid fee',
            // date: 'enter a valid date'

        }

        if (values.type.length < 2) {
            errors.type = 'Enter atleast 5 characters'
        }

        if (values.fee < 0) {
            errors.type = 'Enter a valid fee amount'
        }
        // if (values.type.date < 2) {
        //     errors.type = 'Enter atleast 5 characters'
        // }
        console.log(values)
        return errors
    }



    return (
        <div className="container">
            <h1 style={{ fontSize: '40px', marginTop: '35px' }}>Enter Expense Details</h1>
            <div>
                <Formik initialValues={{ type, fee, date, convertedAmount: '' }}
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                    validate={validate}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {
                        (props) => (
                            // <Form>中的ErrorMessage是在Form中做验证的
                            <Form>
                                <ErrorMessage
                                    name='type'
                                    component='div'
                                    className='alert alert-warning'
                                />
                                <ErrorMessage
                                    name='fee'
                                    component='div'
                                    className='alert alert-warning'
                                />
                                <ErrorMessage
                                    name='date'
                                    component='div'
                                    className='alert alert-warning'
                                />
                                <fieldset className='form-group'>
                                    <label>Type</label>
                                    <div className='col-md-5 mx-auto'>
                                        <Field type='text' className='form-control' name='type' />
                                    </div>

                                </fieldset>
                                <fieldset className='form-group'>
                                    <label >Payment Amount</label>
                                    <div className='col-md-5 mx-auto'>
                                        <Field type='text' className='form-control' name='fee' />
                                    </div>
                                </fieldset>
                                <fieldset className='form-group'>
                                    <label >Payment Date</label>
                                    <div className='col-md-5 mx-auto'>
                                        <Field type='date' className='form-control' name='date' />
                                    </div>

                                </fieldset>
                                <div>
                                    <button className='btn btn-success m-5' type='submit'>Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
} 