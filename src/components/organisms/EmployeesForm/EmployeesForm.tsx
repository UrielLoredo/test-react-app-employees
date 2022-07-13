import React, { useState } from 'react';
import {EmployeesFormProps} from './employeesform.interface';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Collapse from '@mui/material/Collapse';
import { fixDateFormat } from '../../../utils/helpers'
import { createEmpoyee } from '../../../request/fetch'

const EmployeesForm = () => {

    const [date, setDate] = useState<Date | null>(null)
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [openAlert, setOpenAlert] = useState(false)

    const timingOut = 3000

    const clearForm = () => {
        setOpenAlert(true)
        setDate(null)
        setName('')
        setLastName('')
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const dataSumbit = {
            name: name,
            last_name: lastName,
            birthday: fixDateFormat(date)
        }
        await createEmpoyee(dataSumbit)
        setOpenAlert(true)
        setTimeout(() => {
            clearForm()
            setOpenAlert(false)
        }, timingOut)

    }
    return (
        <div>
            <CssBaseline />
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="given-name"
                            name="name"
                            required
                            fullWidth
                            id="name"
                            label="Nombre"
                            autoFocus
                            inputProps={{ maxLength: 30 }}
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="last_name"
                            label="Apellido(s)"
                            name="last_name"
                            autoComplete="family-name"
                            inputProps={{ maxLength: 30 }}
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Fecha de nacimiento"
                                value={date}
                                onChange={(newValue) => {
                                    setDate(newValue)
                                }}
                                renderInput={(params) => 
                                    <TextField
                                        fullWidth
                                        required
                                        {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                {date && name && lastName
                    ?
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >Crear</Button>
                    :
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        disabled
                        sx={{ mt: 3, mb: 2 }}
                    >Crear</Button>
                }
                <Collapse in={openAlert}>
                    <Alert severity="success">
                        <AlertTitle>¡Creado exitosamente!</AlertTitle>
                        { `Empleado ${name} ${lastName}`}
                    </Alert>
                </Collapse>
            </Box>
        </div>
    )
}

export default EmployeesForm
