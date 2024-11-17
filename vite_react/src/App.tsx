// src/App.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, ThemeProvider, createTheme } from '@mui/material';
import ProductsPage from './views/ProductsPage';

const theme = createTheme({
    palette: {
        primary: {
            main: '#333333',
        },
    },
});

const App: React.FC = () => {
    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            Тестовое задание Управление Продуктами
                        </Typography>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
            <ProductsPage />
        </div>
    );
};

export default App;
