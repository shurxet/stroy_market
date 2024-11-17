// src/views/ProductsPage.tsx
// import React, { useState, useCallback, useMemo } from 'react';
// import {
//     Box,
//     Grid,
//     Card,
//     CardContent,
//     CardHeader,
//     Typography,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Button,
//     Snackbar,
//     CircularProgress,
//     Alert,
//     IconButton, Stack,
// } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useProducts } from '../hooks/useProducts';
// import { useCategories } from '../hooks/useCategories';
// import { useStores } from '../hooks/useStores';
// import ProductList from '../components/Product/ProductList';
// import ProductForm from '../components/forms/ProductForm/ProductForm';
// import { Product } from '../types';
// import ProductFilters from "../components/Product/ProductFilters.tsx";
// import {useSnackbar} from "../hooks/useSnackbar.ts";
//
// const cardHeaderStyles = {
//     backgroundColor: '#6c63ff',
//     color: '#fff',
//     borderRadius: '12px 12px 0 0',
//     padding: '8px',
//     '.MuiCardHeader-title': {
//         marginLeft: '20px', // Добавляет отступ слева
//         fontSize: '1.1rem', // Устанавливает размер шрифта
//         fontWeight: 'bold', // Делает шрифт жирным (опционально)
//         lineHeight: '1.2',  // Устанавливает высоту строки
//     },
// };
//
// const ProductsPage: React.FC = () => {
//     const { products, createProduct, updateProduct, removeProduct, loading, error } = useProducts();
//     const { categories } = useCategories();
//     const { allStores } = useStores();
//
//     const [isFormOpen, setIsFormOpen] = useState(false);
//     const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
//     const [filteredCategory, setFilteredCategory] = useState<number | null>(null);
//     const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; product: Product | null }>({
//         isOpen: false,
//         product: null,
//     });
//
//     const [priceRange, setPriceRange] = useState<number[]>([0, 10000]);
//     const [onlyAvailable, setOnlyAvailable] = useState<boolean>(true);
//
//     const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();
//
//     const toggleFormOpen = useCallback(() => {
//         setIsFormOpen((prev) => !prev);
//         setCurrentProduct(null);
//     }, []);
//
//     const handleCreateProduct = useCallback(
//         async (product: Product) => {
//             try {
//                 await createProduct(product);
//                 showSnackbar('success', 'Успешный запрос')
//                 setIsFormOpen(false);
//             } catch (err) {
//                 console.error(err); // Логирование ошибки
//                 showSnackbar('error', 'Произошла ошибка при сохранении продукта.');
//             }
//         },
//         [currentProduct, createProduct]
//     );
//
//     const handleUpdateProduct = useCallback(
//         async (productId: number, productData: { keyItem: keyof Product; valueItem: any }) => {
//             try {
//                 await updateProduct(productId, productData);
//                 showSnackbar('success', 'Успешный запрос')
//                 setIsFormOpen(false);
//             } catch (err) {
//                 console.error(err); // Логирование ошибки
//                 showSnackbar('error', 'Произошла ошибка при сохранении продукта.');
//             }
//         }, [currentProduct, updateProduct]
//     )
//
//
//
//     const filteredProducts = useMemo(() => {
//         return products.filter((product) => {
//             const inCategory = filteredCategory ? product.category_id === filteredCategory : true;
//             const inPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
//             const isAvailable = !onlyAvailable || product.stores.length > 0;
//             return inCategory && inPriceRange && isAvailable;
//         });
//     }, [products, filteredCategory, priceRange, onlyAvailable]);
//
//     const confirmDeleteProduct = useCallback(() => {
//         if (deleteDialog.product) {
//             removeProduct(deleteDialog.product.id);
//             showSnackbar('success', 'Продукт удалён успешно!');
//             setDeleteDialog({ isOpen: false, product: null });
//         }
//     }, [deleteDialog, removeProduct]);
//
//     return (
//         <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
//             <Grid container spacing={4}>
//                 <ProductFilters
//                     categories={categories}
//                     setFilteredCategory={setFilteredCategory}
//                     priceRange={priceRange}
//                     setPriceRange={setPriceRange}
//                     onlyAvailable={onlyAvailable}
//                     setOnlyAvailable={setOnlyAvailable}
//                 />
//                 <Grid item xs={12} md={9}>
//                     <Card elevation={6} sx={{ borderRadius: 3, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)' }}>
//                         <CardHeader
//                             title="Список продуктов"
//                             action={
//                                 <IconButton
//                                     onClick={toggleFormOpen}
//                                     size="large"
//                                     sx={{
//                                       marginRight: "20px",
//                                       color: 'darkgray',
//                                       '&:hover': {
//                                         transform: 'scale(1.1)',
//                                         transition: '0.3s ease',
//                                       },
//                                     }}
//                                 >
//                                     <Stack direction="row" alignItems="center" spacing={1}>
//                                         <AddIcon fontSize="inherit" />
//                                         <Typography variant="body2">Добавить новый продукт</Typography>
//                                     </Stack>
//                                 </IconButton>
//                             }
//                             sx={cardHeaderStyles}
//                         />
//                         <CardContent>
//                             {loading ? (
//                                 <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                                     <CircularProgress color="primary" />
//                                 </Box>
//                             ) : error ? (
//                                 <Alert severity="error">{error}</Alert>
//                             ) : filteredProducts.length > 0 ? (
//                                 <ProductList
//                                     products={filteredProducts}
//                                     onDelete={(product) => setDeleteDialog({ isOpen: true, product })}
//                                     onUpdate={handleUpdateProduct} />
//                             ) : (
//                                 <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center', padding: 2 }}>
//                                     Нет продуктов для отображения.
//                                 </Typography>
//                             )}
//                         </CardContent>
//                     </Card>
//                 </Grid>
//             </Grid>
//
//             <Dialog open={isFormOpen} onClose={toggleFormOpen} fullWidth maxWidth="md">
//                 <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', color: '#6c63ff' }}>
//                     {currentProduct ? 'Редактировать продукт' : 'Добавить продукт'}
//                 </DialogTitle>
//                 <DialogContent>
//                     <ProductForm
//                         onSubmit={handleCreateProduct}
//                         existingProduct={currentProduct}
//                         categories={categories}
//                         allStores={allStores || []}
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={toggleFormOpen} color="secondary">
//                         Отмена
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//
//             <Dialog open={deleteDialog.isOpen} onClose={() => setDeleteDialog({ isOpen: false, product: null })} fullWidth maxWidth="xs">
//                 <DialogTitle sx={{ fontWeight: 'bold' }}>Удалить продукт</DialogTitle>
//                 <DialogContent>
//                     <Typography sx={{ textAlign: 'center' }}>
//                         Вы уверены, что хотите удалить продукт "{deleteDialog.product?.name}"?
//                     </Typography>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setDeleteDialog({ isOpen: false, product: null })} color="primary">
//                         Отмена
//                     </Button>
//                     <Button startIcon={<DeleteIcon />} onClick={confirmDeleteProduct} color="error" variant="contained">
//                         Удалить
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//
//             <Snackbar
//                 open={snackbar.open}
//                 autoHideDuration={6000}
//                 onClose={closeSnackbar}
//                 anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//             >
//                 <Alert onClose={closeSnackbar} severity={snackbar.type} variant="filled">
//                     {snackbar.message}
//                 </Alert>
//             </Snackbar>
//
//         </Box>
//     );
// };
//
// export default ProductsPage;


import React, { useState, useCallback, useMemo } from 'react';
import {
    Box,
    Grid,
    Card,
    CardContent,
    CardHeader,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Snackbar,
    CircularProgress,
    Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { useStores } from '../hooks/useStores';
import ProductList from '../components/Product/ProductList';
import ProductForm from '../components/forms/ProductForm/ProductForm';
import { Product } from '../types';
import ProductFilters from "../components/Product/ProductFilters";
import { useSnackbar } from "../hooks/useSnackbar";

const cardHeaderStyles = {
    backgroundColor: '#4a90e2',
    color: '#fff',
    borderRadius: '8px 8px 0 0',
    padding: '16px',
    '.MuiCardHeader-title': {
        marginLeft: '16px',
        fontSize: '1.1rem',
        fontWeight: '600',
    },
};

const buttonStyles = {
  backgroundColor: '#006BFF', // Современный синий оттенок, приближённый к брендовым цветам
  color: '#FFFFFF', // Контрастный белый текст
  padding: '10px 20px', // Оптимальные отступы для адаптивности
  borderRadius: '12px', // Лёгкие закругления для утончённого вида
  border: 'none', // Минимализм без границ
  fontWeight: '600', // Чёткий текст
  fontSize: '0.7rem', // Удобный для чтения размер текста
  lineHeight: '1.4', // Хорошая читаемость
  cursor: 'pointer', // Указывает на интерактивность
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Плавная глубина
  transition: 'all 0.3s ease', // Универсальные плавные переходы
  display: 'inline-flex', // Удобное размещение текста и иконок
  alignItems: 'center', // Центровка текста и иконок
  gap: '8px', // Расстояние между текстом и иконками
  '&:hover': {
    backgroundColor: '#0056b3', // Более глубокий синий для наведения
    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)', // Усиление тени
  },
  '&:active': {
    transform: 'scale(0.96)', // Лёгкий эффект нажатия
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Уменьшение тени
  },
  '&:focus': {
    outline: '2px solid rgba(0, 123, 255, 0.5)', // Более мягкий фокус
    outlineOffset: '2px',
  },
  '&:disabled': {
    backgroundColor: '#E0E0E0', // Нейтральный цвет для неактивной кнопки
    color: '#9E9E9E', // Бледный текст
    cursor: 'not-allowed', // Указание недоступности
    boxShadow: 'none', // Отсутствие теней
  },
};

const ProductsPage: React.FC = () => {
    const { products, createProduct, updateProduct, removeProduct, loading, error } = useProducts();
    const { categories } = useCategories();
    const { allStores } = useStores();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    const [filteredCategory, setFilteredCategory] = useState<number | null>(null);
    const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; product: Product | null }>({
        isOpen: false,
        product: null,
    });

    const [priceRange, setPriceRange] = useState<number[]>([0, 10000]);
    const [onlyAvailable, setOnlyAvailable] = useState<boolean>(true);

    const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

    const toggleFormOpen = useCallback(() => {
        setIsFormOpen((prev) => !prev);
        setCurrentProduct(null);
    }, []);

    const handleCreateProduct = useCallback(
        async (product: Product) => {
            try {
                await createProduct(product);
                showSnackbar('success', 'Продукт успешно добавлен!');
                setIsFormOpen(false);
            } catch (err) {
                console.error(err);
                showSnackbar('error', 'Ошибка при добавлении продукта.');
            }
        },
        [createProduct]
    );

    const handleUpdateProduct = useCallback(
        async (productId: number, productData: { keyItem: keyof Product; valueItem: any }) => {
            try {
                await updateProduct(productId, productData);
                showSnackbar('success', 'Продукт обновлён!');
                setIsFormOpen(false);
            } catch (err) {
                console.error(err);
                showSnackbar('error', 'Ошибка при обновлении продукта.');
            }
        },
        [updateProduct]
    );

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const inCategory = filteredCategory ? product.category_id === filteredCategory : true;
            const inPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
            const isAvailable = !onlyAvailable || product.stores.length > 0;
            return inCategory && inPriceRange && isAvailable;
        });
    }, [products, filteredCategory, priceRange, onlyAvailable]);

    const confirmDeleteProduct = useCallback(() => {
        if (deleteDialog.product) {
            removeProduct(deleteDialog.product.id);
            showSnackbar('success', 'Продукт успешно удалён!');
            setDeleteDialog({ isOpen: false, product: null });
        }
    }, [deleteDialog, removeProduct]);

    return (
        <Box sx={{ padding: 4, backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
            <Grid container spacing={4}>
                <ProductFilters
                    categories={categories}
                    setFilteredCategory={setFilteredCategory}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    onlyAvailable={onlyAvailable}
                    setOnlyAvailable={setOnlyAvailable}
                />
                <Grid item xs={12} md={9}>
                    <Card elevation={6} sx={{ borderRadius: 3, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)' }}>
                        <CardHeader
                            title="Список продуктов"
                            action={
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    onClick={toggleFormOpen}
                                    sx={buttonStyles}
                                >
                                    Добавить продукт
                                </Button>

                                // <IconButton
                                //     onClick={toggleFormOpen}
                                //     size="large"
                                //     sx={{
                                //         marginRight: "20px",
                                //         color: 'darkgray', '&:hover': {
                                //             transform: 'scale(1.1)',
                                //             transition: '0.3s ease',
                                //         },
                                //     }}
                                // >
                                //     <Stack direction="row" alignItems="center" spacing={1}>
                                //         <AddIcon fontSize="inherit" />
                                //         <Typography variant="body2">Добавить новый продукт</Typography>
                                //     </Stack>
                                // </IconButton>

                                // <IconButton
                                //     onClick={toggleFormOpen}
                                //     size="large"
                                //     sx={(theme) => ({
                                //         marginRight: "20px",
                                //         padding: "10px 20px",
                                //         borderRadius: "12px",
                                //         backgroundColor: theme.palette.background.paper,
                                //         color: theme.palette.text.primary,
                                //         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                //         transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                //         '&:hover': {
                                //             transform: 'scale(1.1)',
                                //             boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
                                //             backgroundColor: theme.palette.action.hover,
                                //         },
                                //         '&:active': {
                                //             transform: 'scale(0.95)',
                                //             boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                                //         },
                                //     })}
                                // >
                                //     <Stack direction="row" alignItems="center" spacing={1}>
                                //         <AddIcon fontSize="inherit" />
                                //         <Typography variant="body2" fontWeight="bold">
                                //             Добавить новый продукт
                                //         </Typography>
                                //     </Stack>
                                // </IconButton>

                            }
                            sx={cardHeaderStyles}
                        />
                        <CardContent>
                            {loading ? (
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <CircularProgress color="primary" />
                                </Box>
                            ) : error ? (
                                <Alert severity="error">{error}</Alert>
                            ) : filteredProducts.length > 0 ? (
                                <ProductList
                                    products={filteredProducts}
                                    onDelete={(product) => setDeleteDialog({ isOpen: true, product })}
                                    onUpdate={handleUpdateProduct}
                                />
                            ) : (
                                <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center', padding: 2 }}>
                                    Нет продуктов для отображения.
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Dialog open={isFormOpen} onClose={toggleFormOpen} fullWidth maxWidth="md">
                <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', color: '#6c63ff' }}>
                    {currentProduct ? 'Редактировать продукт' : 'Добавить продукт'}
                </DialogTitle>
                <DialogContent>
                    <ProductForm
                        onSubmit={handleCreateProduct}
                        existingProduct={currentProduct}
                        categories={categories}
                        allStores={allStores || []}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleFormOpen} color="secondary">Отмена</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={deleteDialog.isOpen} onClose={() => setDeleteDialog({ isOpen: false, product: null })} fullWidth maxWidth="xs">
                <DialogTitle sx={{ fontWeight: 'bold' }}>Удалить продукт</DialogTitle>
                <DialogContent>
                    <Typography sx={{ textAlign: 'center' }}>
                        Вы уверены, что хотите удалить продукт "{deleteDialog.product?.name}"?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialog({ isOpen: false, product: null })} color="primary">
                        Отмена
                    </Button>
                    <Button startIcon={<DeleteIcon />} onClick={confirmDeleteProduct} color="error" variant="contained">
                        Удалить
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={closeSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={closeSnackbar} severity={snackbar.type} variant="filled">
                    {snackbar.message}
                </Alert>
            </Snackbar>

        </Box>
    );
};

export default ProductsPage;
