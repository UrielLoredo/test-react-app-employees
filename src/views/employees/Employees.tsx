import React, { FunctionComponent, useEffect, useState } from 'react';
import axios from 'axios';
import { EmployeesProps } from './employees.interface';
// import { fetchApi } from '../../request/fetch';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton, } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid'
import AddCircle from '@mui/icons-material/AddCircle';
import EmployeesForm from '../../components/organisms/EmployeesForm/EmployeesForm';
import { apiUrl } from '../../request/fetch';

const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'last_name', headerName: 'Last Name', width: 200 },
    { field: 'birthday', headerName: 'Birthday', width: 200 }
]

const Employees: React.FC<EmployeesProps> = ({ ...props }) => {
    const { list } = props

    const dialogContent = {
        title: 'Nuevo registro',
        text: 'Por favor completa todos los campos del formulario para agregar a un nuevo empleado',
    }

    const setDateFormat = (date: number) => {
        return new Date(date).toLocaleDateString('en')
    }

    const [collectionData, setCollectionData] = useState({
        employees: [{ id: 1, name: '', last_name:'', birthday: 0 }],
    })

    const [filterButtonEl, setFilterButtonEl] = useState<HTMLButtonElement | null>(null)

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        axios.get(apiUrl)
        .then(res => {
            const result = res.data.data.employees
            result.map(function(d: any) {
                return d.birthday = setDateFormat(d.birthday)
            })
            setCollectionData({
                employees: [...result]
            })
            return result
        })
    }, [])

    return (
        <Box>
            <CssBaseline />
            <Container maxWidth="lg">
                <Typography
                    component="h1"
                    variant="h4"
                    align="center"
                    color="text.secondary"
                    gutterBottom
                    mb={5}
                    mt={2}
                >
                    Lista de Empleados
                </Typography>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    mb={5}
                    >
                        <Button
                            startIcon={<AddCircle />}
                            variant="outlined"
                            onClick={handleClickOpen}>
                            Empleado
                        </Button>
                </Grid>

                {collectionData.employees.length &&
                <div style={{ height: 500, width: '100%' }}>
                    <DataGrid
                        rows={collectionData.employees}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </div>
                }
                <Dialog
                    open={open}
                    onClose={handleClose}>
                    <DialogTitle>
                        {dialogContent.title}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {dialogContent.text}
                        </DialogContentText>

                        <EmployeesForm />
                    
                    </DialogContent>
                </Dialog>
            </Container>
        </Box>
    )
}

export default Employees