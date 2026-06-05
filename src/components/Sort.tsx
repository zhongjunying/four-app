'use client'
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { SortValue } from "@/types/global"
import { SortTitle, SortList } from "@/lib/constant"
import { useSortStore } from "@/store"

export default function Sort() {
    const { sortValue, setSortValue } = useSortStore()
    const handleChange = (value: SortValue) => {
        setSortValue(value)
    }
    return (
        <div className="w-64 py-4">
            <p className="m-5">{SortTitle}</p>
            <ToggleGroup className="flex-col gap-3" type="single" defaultValue={sortValue} onValueChange={handleChange}>
                {SortList.map((item) => (
                    <ToggleGroupItem key={item.value} value={item.value}>{item.title}</ToggleGroupItem>
                ))}
            </ToggleGroup>
        </div>
    );
}