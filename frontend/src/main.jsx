import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SocketProvider } from './atoms/Socket.jsx'
import { RecoilRoot } from 'recoil'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')).render(
<SocketProvider>
<RecoilRoot>

    <App />
    <Toaster richColors position='top-center' closeButton />

</RecoilRoot>
</SocketProvider>
)
