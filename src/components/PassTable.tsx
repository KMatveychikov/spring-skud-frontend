import React, {useEffect, useState} from 'react';
import DataTable, {TableColumn} from 'react-data-table-component';
import $api from "../http";

const PassTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    type DataRow = {
        employeeName: string;
        date: string;
        doorControllerDescription: string;
    };

    const columns: TableColumn<DataRow>[] = [
        {
            name: "Сотрудник",
            selector: (row: { employeeName: any; }) => row.employeeName,
            sortable: true
        },
        {
            name: "Время",
            selector: (row: { date: any; }) => row.date,
            sortable: true
        },
        {
            name: "Контроллер прохода",
            selector: (row: { doorControllerDescription: any; }) => row.doorControllerDescription,
            sortable: true
        },
    ]

    useEffect(() => {
        fetchTableData()
    }, [])

    async function fetchTableData() {
        setLoading(true)
        const response = await $api.get("pass/all")
        const passes = await response.data
        setData(passes)
        setLoading(false)
    }

    return (
        <div>
            <DataTable
                title="Проходы"
                columns={columns}
                data={data}
                progressPending={loading}
            />
        </div>
    );
};

export default PassTable;