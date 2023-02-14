import { useState } from 'react';

export default function useFilter() {
    const filterNames = ['all', 'active', 'completed'];

    const [filter, setFilter] = useState(filterNames[0]);

    return {
        filterNames,
        filter,
        setFilter,
    };
}
