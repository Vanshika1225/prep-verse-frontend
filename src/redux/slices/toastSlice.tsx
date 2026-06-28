import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface Alert {
  key: number
  severity: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
}

interface ToastState {
  alerts: Alert[]
}

const initialState: ToastState = {
  alerts: [],
}

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<Omit<Alert, 'key'>>) => {
      state.alerts.push({
        key: Date.now() + Math.random(),
        ...action.payload,
      })
    },

    removeAlert: (state) => {
      state.alerts.shift()
    },
  },
})

export const { addAlert, removeAlert } = toastSlice.actions
export default toastSlice.reducer