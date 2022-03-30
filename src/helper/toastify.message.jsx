import { toast } from 'react-toastify'

const success = (message, option) => {
    return toast.success(message, option)
}

const warning = (message, option) => {
    return toast.warning(message, option)
}

const error = (message, option) => {
    return toast.error(message, option)
}

const info = (message, option) => {
    return toast.info(message, option)
}

const loading = (message, option) => {
    return toast.loading(message, option)
}


export const Toast = {
    success,
    loading,
    warning,
    error,
    info
}