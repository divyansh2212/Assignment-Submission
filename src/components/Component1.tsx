import { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Post from '../models/PostModel';

const Component1 = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    useEffect(() => {
        fetch('https://api.thedogapi.com/v1/breeds  ')
            .then((response) => response.json())
            .then((data: Post[]) => setPosts(data));
    }, []);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Name', width: 300 },
        { field: 'temperament', headerName: 'Temperament', width: 500 },
        { field: 'life_span', headerName: 'Life Span', width: 300 },
    ];

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>API Fetching - Dog Breeds</h1>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={posts} columns={columns}
                />
            </div>
        </>
    );
}

export default Component1