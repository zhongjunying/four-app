import { create } from 'zustand'

import { SortValue } from '@/types/global'

type SortStore = {
    sortValue: SortValue
    setSortValue: (sortValue: SortValue) => void
}

const useSortStore = create<SortStore>((set) => ({
    sortValue: SortValue.Latest,
    setSortValue: (sortValue) => set({ sortValue }),
}))

export default useSortStore