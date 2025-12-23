import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {useGetListUser} from "@/api";
import { Button } from 'primereact/button';

export function UserTable() {
    const { data, isLoading, error } = useGetListUser();

    if (isLoading) {
        return <div>Loading users...</div>;
    }

    if (error) {
        return <div>Failed to load users</div>;
    }

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">User</span>
            {/*<Button icon="pi pi-refresh" rounded raised />*/}
        </div>
    );

    const footer = `In total there are ${data ? data.length : 0} users.`;

    return (
        <DataTable value={data} footer={footer} header={header} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header="ID" />
            <Column field="username" header="Username" />
            <Column field="firstName" header="First Name" />
            <Column field="lastName" header="Last Name" />
            <Column field="email" header="Email" />
            <Column field="active" header="Active" />
        </DataTable>
    );
}