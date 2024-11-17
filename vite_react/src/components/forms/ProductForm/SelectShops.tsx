// src/components/forms/ProductForm/SelectShops.tsx
import React, {useState} from 'react';
import { Controller, Control } from 'react-hook-form';
import {Box, Button, Checkbox, FormControlLabel, TextField, Typography} from '@mui/material';
import { Store } from "../../../types";
import {useStores} from "../../../hooks/useStores.ts";


interface SelectShopsProps {
  control: Control<any>;
}

const SelectShops: React.FC<SelectShopsProps> = ({ control }) => {  // Установить значение по умолчанию как пустой массив
    const [storeAddress, setNewStoreAddress] = useState('');
    const {allStores, createStore} = useStores()
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setNewStoreAddress(event.target.value);

    };
  const handleAddNewShop = async () => {
    if (!storeAddress) return; // Проверка на пустое значение
    const shopData = { name: storeAddress };

    await createStore(shopData); // Дождитесь результата сохранения
    setNewStoreAddress(''); // Очистите поле ввода после успешного добавления

  };


    return (
    // <Box>
    <Controller
      name="stores"
      control={control}
      render={({ field }) => (
          <Box border={1} borderColor="grey.300" borderRadius={1} p={2} m={0}>
              <Typography variant="subtitle2" color="blue" gutterBottom>
                  Выберите нужные адреса магазинов
              </Typography>
              {allStores.map((store) => (
                  <FormControlLabel
                      key={store.id}
                      control={
                          <Checkbox
                              checked={field.value.some((s: Store) => s.id === store.id)}
                              onChange={(event) => {
                                  const isSelected = event.target.checked;
                                  if (isSelected) {
                                      field.onChange([...field.value, store]);
                                  } else {
                                      field.onChange(field.value.filter((s: Store) => s.id !== store.id));
                                  }
                              }}
                          />
                      }
                      label={store.name}
                      sx={{color: "black"}}
                  />
              ))}
              {/* Поле для добавления нового магазина */}
              <Box display="flex" alignItems="center" mt={2}>
                  <TextField
                      label="Добавить к списку новый адрес магазина"
                      value={storeAddress}
                      onChange={handleInputChange}
                      variant="outlined"
                      fullWidth
                  />
                  {/*<Button onClick={handleAddNewShop} variant="contained" sx={{ ml: 2 }}>*/}
                  <Button onClick={handleAddNewShop} variant="contained" sx={{ml: 2}}>Добавить</Button>
              </Box>
              <Typography variant="subtitle2" color="blue" gutterBottom>
                  {storeAddress}
              </Typography>
          </Box>
      )}
    />
    // </Box>
  );
};

export default SelectShops;
