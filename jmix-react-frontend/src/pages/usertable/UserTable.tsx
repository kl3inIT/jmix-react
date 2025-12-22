import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {useGetListUser} from "@/api";

export function UserTable() {
    const { data, isLoading, error } = useGetListUser();

    if (isLoading) {
        return <div>Loading users...</div>;
    }

    if (error) {
        return <div>Failed to load users</div>;
    }
    return (
        <DataTable value={data} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header="ID" />
            <Column field="username" header="Username" />
            <Column field="firstName" header="First Name" />
            <Column field="lastName" header="Last Name" />
            <Column field="email" header="Email" />
            <Column field="active" header="Active" />
        </DataTable>
    );
}