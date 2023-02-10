import React, {useEffect, useState} from 'react';
import $api from "../http";
import DataTable, {TableColumn} from 'react-data-table-component';
import classes from '../styles/Table.module.css'

const WorkDaysTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [employeeName, setEmployeeName] = useState('');
    const [beginDate, setBeginDate] = useState(formatDate(new Date()));
    const [endDate, setEndDate] = useState(formatDate(new Date()));


    function formatDate(date: Date) {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${ year }-${ month }-${ day }`
    }

    type DataRow = {
        employeeName: string;
        date: string;
        worktime: string;

    };


    const columns: TableColumn<DataRow>[] = [
        {
            name: "Сотрудник",
            selector: (row: { employeeName: any; }) => row.employeeName,
            sortable: true
        },
        {
            name: "Дата",
            selector: (row: { date: any; }) => row.date,
            sortable: true
        },
        {
            name: "Отработанное время",
            selector: (row: { worktime: any; }) => row.worktime,
            sortable: true
        },
    ]

    useEffect(() => {
        fetchTableData()
    }, [])

    async function fetchTableData() {
        setLoading(true)
        const response = await $api.get(`/report/get_workdays_by_period/${ beginDate }_${ endDate }`)
        const workDays = response.data
        let filteredWorkDays = workDays.filter((e: { employeeName: string | string[]; }) => e.employeeName.includes(employeeName)).filter((e: { worktime: string; }) => e.worktime !== "00:00:00")
        if (employeeName !== '') {
            setData(filteredWorkDays)
        } else {
            setData(workDays.filter((e: { worktime: string; }) => e.worktime !== "00:00:00"))
        }
        setLoading(false)
    }


    return (
        <div>
            <div className="input">
                <input className="input" onChange={ e => setEmployeeName(e.target.value) } type="text"
                       placeholder="Имя сотрудника"/>
                <input className="input" onChange={ e => setBeginDate(e.target.value) } type="date"
                       value={beginDate}/>
                <input className="input" onChange={ e => setEndDate(e.target.value) } type="date"
                       value={endDate}/>
                <button className="input" onClick={ fetchTableData }>V</button>
            </div>
            <DataTable
                className={classes.table}
                pagination
                title="Рабочие смены"
                columns={ columns }
                data={ data }
                progressPending={ loading }
            />
        </div>
    );
};

export default WorkDaysTable;