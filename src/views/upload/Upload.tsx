import React, {useState, useEffect } from 'react';
import { UploadProps } from './upload.interface';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { FileUploader } from 'react-drag-drop-files';
import LinearProgress from '@mui/material/LinearProgress';

const Upload: React.FC<UploadProps> = ({
    ...props
}) => {

    const fileTypes = ['JPG', 'PNG', 'JPEG']

    const [imageFiles, setImageFiles] = useState([])
    
    const [images, setImages] = useState([])

    const [progress, setProgress] = useState(0)

    const handlerChange = (filesList: []) => {
        const files = filesList
        const validImageFiles: [] = []
        for (let i: number = 0; i < files.length; i++) {
            const file = files[i]
            validImageFiles.push(file)
        }
        if (validImageFiles.length) {
            setImageFiles(validImageFiles)
            return
        }
        alert("Formato no valido seleccionado!")
    }

    const setProgressbar = () => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 500)
        return () => {
            clearInterval(timer)
        }
    }

    const handlerStorage = () => {
        setProgressbar()
        console.log('Store: ', imageFiles)
    }

    useEffect(() => {
        const fileReaders: any = []
        let isCancel = false
        if (imageFiles.length) {
            const promises = imageFiles.map(file => {
                return new Promise((resolve, reject) => {
                    const fileReader = new FileReader()
                    fileReaders.push(fileReader)
                    fileReader.onload = (e: any) => {
                        const { result } = e.target
                        if (result) {
                            resolve(result)
                        }
                    }
                    fileReader.onabort = () => {
                        reject(new Error('No se inicio el proceso'))
                    }
                    fileReader.onerror = () => {
                        reject(new Error('Error procesando la imagen'))
                    }
                    fileReader.readAsDataURL(file)
                })
            })
            Promise
            .all(promises)
            .then((images: any) => {
                if (!isCancel) {
                    setImages(images)
                }
            })
            .catch(reason => {
                console.log(reason)
            });
        };
        return () => {
            isCancel = true
            fileReaders.forEach((fileReader: any) => {
                if (fileReader.readyState === 1) {
                    fileReader.abort()
                }
            })
        }
    }, [imageFiles])

    return (
        <Box>
            <CssBaseline />
            <Container maxWidth="sm">
                <Typography
                    component="h1"
                    variant="h4"
                    align="center"
                    color="text.secondary"
                    gutterBottom
                    mb={5}
                    mt={2}
                    >
                        Upload
                    </Typography>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <FileUploader
                                label="Sube tus imágenes aquí"
                                hoverTitle="Arrastra aquí"
                                multiple
                                name="file"
                                handleChange={handlerChange}
                                types={fileTypes} />
                        </CardContent>
                        <CardContent>
                            <Box sx={{ width: '100%' }}>
                            <LinearProgress
                                variant="determinate"
                                value={progress} />
                            </Box>
                            <ImageList sx={{ width: '100%' }} cols={3} rowHeight={164}>
                            {images.map((image) => {
                                return (
                                    <ImageListItem key={image}>
                                        <img
                                            src={`${image}`}
                                            alt=""
                                            loading="lazy"
                                        />
                                    </ImageListItem>
                                )
                            })}
                            </ImageList>
                        </CardContent>
                        <CardContent>
                        {images.length ? 
                            <Button
                                onClick={handlerStorage}
                                variant="contained">
                                Subir
                            </Button>
                            :
                            null
                        }
                        </CardContent>
                    </Card>
            </Container>
        </Box>
    )
}

export default Upload
