import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from "react-redux";
import {store} from "./service/store.js";
import '@mantine/core/styles.css';

import {MantineProvider} from '@mantine/core';
import {DndContext} from '@dnd-kit/core';

ReactDOM.createRoot(document.getElementById('root')).render(
    <DndContext>
        <MantineProvider>
            <Provider store={store}>
                <App/>
            </Provider>
        </MantineProvider>
    </DndContext>
)
