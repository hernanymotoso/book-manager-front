import axios from 'axios'
import { BOOK_MANAGER_API_URL } from '$env/static/private'

export const api = axios.create({ baseURL: BOOK_MANAGER_API_URL })
