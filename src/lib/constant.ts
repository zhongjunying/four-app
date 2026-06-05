import { SortValue } from "@/types/global"

export const title = "DUYI Store"

export const MenuList = [
    { href: "/search", title: "Search" },
    { href: "/account", title: "Account" },
    { href: "/cart", title: "Cart" },
]

export const NavList = [
    {
        title: "Categories", list: ['Clothing', 'Audio', 'Furniture']
    },
    {
        title: "Collections", list: [
            'Latest Drops',
            'Weekly Picks',
            'Sale'
        ]
    },
    {
        title: "Code", list: [
            'Github',
            'Documentation',
            'source code'
        ]
    },
]
export const SortTitle = "Sort by"
export const SortList = [
    { value: SortValue.Latest, title: "Latest Arrivals" },
    { value: SortValue.Low, title: "Price: Low -&gt Hight" },
    { value: SortValue.High, title: "Price: Hight -&gt Low" },
]

export const ProductTitle = "All Products"