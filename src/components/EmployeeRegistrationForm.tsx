import React, {useState} from 'react';
import $api from "../http";
import classes from "../styles/EmployeeRegistrationForm.module.css"
import {IEmployee} from "../models/IEmployee";

const EmployeeRegistrationForm = () => {
    let employee = {} as IEmployee
    const [name, setName] = useState('')
    const [position, setPosition] = useState('')
    const [department, setDepartment] = useState('')
    const [cardId, setCardId] = useState('')

    function addNewEmployee() {
        employee = {
            name: name,
            position: position,
            department: department,
            cardId: cardId
        }
        console.log(employee)
        return $api.post("/employee/add", employee)

    }

    return (
        <div className={ classes.employeeForm }>
            <input type="text" placeholder="Имя" onChange={ e => setName(e.target.value) }
                   className={ classes.employeeForm__items }/>
            <input type="text" placeholder="Должность" onChange={ e => setPosition(e.target.value) }
                   className={ classes.employeeForm__items }/>
            <input type="text" placeholder="Отдел" onChange={ e => setDepartment(e.target.value) }
                   className={ classes.employeeForm__items }/>
            <input type="text" placeholder="Номер карты" onChange={ e => setCardId(e.target.value) }
                   className={ classes.employeeForm__items }/>
            <button onClick={ addNewEmployee } className={ classes.employeeForm__items }>Регистрация</button>
        </div>
    );
};

export default EmployeeRegistrationForm;

