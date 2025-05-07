import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.scss';
import { Provider } from "react-redux";
import { store } from "./service/store.js";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { DndContext } from '@dnd-kit/core';
import '../i18n.js'

ReactDOM.createRoot(document.getElementById('root')).render(<DndContext>
        <MantineProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </MantineProvider>
    </DndContext>);