import { AppState } from '../state/AppState.js';

export function initializeTelegramWebApp() {
    try {
        AppState.tg = window.Telegram?.WebApp;
        if (AppState.tg) {
            AppState.tg.ready();
            AppState.tg.expand();                    
        } else {
            document.getElementById('order-button-container').style.display = 'none'; 
            throw new Error("Telegram WebApp is not available");
        }
    } catch (e) {
        console.warn(e.message);
        // // Mock object for browser testing
        // AppState.tg = {
        //     initData: 'dev_mode_init_data',
        //     initDataUnsafe: { user: { id: 'demo_user', first_name: 'Test', last_name: 'User' } },
        //     MainButton: {
        //         setText: (text) => console.log('TG MainButton Text:', text),
        //         show: () => console.log('TG MainButton: Show'),
        //         hide: () => console.log('TG MainButton: Hide'),
        //         setParams: (params) => console.log('TG MainButton Params:', params),
        //     },
        //     BackButton: {
        //         show: () => console.log('TG BackButton: Show'),
        //         hide: () => console.log('TG BackButton: Hide'),
        //     },
        //     onEvent: (event, callback) => console.log('TG Event Registered:', event, callback),
        //     close: () => console.log('TG Close'),
        //     showAlert: (message) => alert(`[TG]: ${message}`),
        // };
    }
}