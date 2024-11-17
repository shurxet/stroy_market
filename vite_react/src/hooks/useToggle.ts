// src/hooks/useToggle.ts
import { useState } from 'react';

export const useToggle = (initialValue: boolean = false): [boolean, () => void] => {
    const [value, setValue] = useState(initialValue);
    const toggle = () => setValue((prev) => !prev);
    return [value, toggle];
};
