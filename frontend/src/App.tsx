import React, { useState } from 'react'
import './App.css'
import { Toaster, toast } from 'sonner'
import { uploadFile } from './services/api'
import type { Data } from './type'
import { Search } from './steps/Search'


const APP_STATUS = {
  IDLE: 'idle', // al entrar
  ERROR: 'error', // al fallar
  READY_UPLOAD: 'ready_upload', // al seleccionar archivo
  UPLOADING: 'uploading', // al subir
  READY_USAGE: 'ready_usage', // al completar
}

function App() {

  const [ appStatus, setAppStatus ] = useState(APP_STATUS.IDLE)
  const [ data, setData ] = useState<Data>([])
  const [ file, setFile ] = useState<File | null>(null)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files ?? []
    if (file) {
      setFile(file)
      setAppStatus(APP_STATUS.READY_UPLOAD)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if(appStatus !== APP_STATUS.READY_UPLOAD || !file) return;

    setAppStatus(APP_STATUS.UPLOADING)

    try {
      const [ err, newData ] = await uploadFile(file)
      if (err) {
        setAppStatus(APP_STATUS.ERROR)
        toast.error(err.message || 'Error al subir el archivo (1)')
        return
      }

      setAppStatus(APP_STATUS.READY_USAGE)
      if(newData) setData(newData)
      console.log('newData',newData);
      toast.success('Archivo subido exitosamente!')
    } catch (error) {
      console.log('error',error);
      setAppStatus(APP_STATUS.ERROR)
    }
  }

  

  const getButtonText = () => {
    switch (appStatus) {
      case APP_STATUS.READY_UPLOAD:
        return 'Subir Archivo'
      case APP_STATUS.UPLOADING:
        return 'Subiendo...'
      case APP_STATUS.READY_USAGE:
        return '¡Subido Exitosamente!'
      case APP_STATUS.ERROR:
        return 'Error al Subir'
      default:
        return 'Subir Archivo'
    }
  }

  const showButton = appStatus === APP_STATUS.READY_UPLOAD || appStatus === APP_STATUS.UPLOADING
  const showInput = appStatus !== APP_STATUS.READY_USAGE && appStatus !== APP_STATUS.ERROR


  return (
    <>
      <Toaster position="top-center" richColors />
      <h1>Challenge: Upload CSV + Search</h1>
      { showInput && <form 
          onSubmit={handleSubmit}
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            gap: '12px' 
          }}
        >
          <label htmlFor="file">Upload CSV File</label>
          <input 
            disabled={appStatus === APP_STATUS.UPLOADING}
            onChange={handleInputChange} 
            name="file" 
            type="file" 
            accept=".csv" 
          />
          { showButton && <button type="submit" disabled={appStatus === APP_STATUS.UPLOADING}>{getButtonText()}</button> }
        </form>
      }

      {
        appStatus === APP_STATUS.READY_USAGE && data.length > 0 && (
          <Search initialData={data} />
        )
      }

    </>
  )
}

export default App
