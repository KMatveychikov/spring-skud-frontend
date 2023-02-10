import React, {FC, useEffect, useState} from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import $api from "../http";


const EmployeeTable: FC = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);



    async function fetchTableData() {
        setLoading(true)
        const response = await $api.get("/employee/all")
        const passes = response.data
        setData(passes)
        setLoading(false)
    }

    useEffect(() => {
        fetchTableData()
    },[])

    type DataRow = {
        name: string;
        position: string;
        department: string;
        lastPassDate: string;
        lastPassDoor: string;
    };


    const columns: TableColumn<DataRow>[] = [
        {
            name: "Сотрудник",
            selector: (row: { name: string; }) => row.name,
            sortable: true
        },
        {
            name: "Должность",
            selector: (row: { position: string; }) => row.position,
            sortable: true
        },
        {
            name: "Отдел",
            selector: (row: { department: string; }) => row.department,
            sortable: true
        },

        {
            name: "Дата последнего прохода",
            selector: (row: { lastPassDate: string; }) => row.lastPassDate,
            sortable: true
        },
        {
            name: "Контроллер последнего прохода",
            selector: (row: { lastPassDoor: string; }) => row.lastPassDoor,
            sortable: true
        },
    ]

    return (
        <div>
            <DataTable
                className="employee_table"
                title="Персонал"
                columns={columns}
                data={data}
                progressPending={loading}
            />
            
        </div>
    );
};

export default EmployeeTable;