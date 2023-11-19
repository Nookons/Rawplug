export function getAdditionalImg ({item}) {

    const nozleArray = [
        {imgUrl: 'https://imgproxy.rawlplug.com/rt:auto/w:1296/h:736/g:ce/el:true/dpr:1/aHR0cHM6Ly9yYXdscGx1Zy5jb20vbWVkaWEvY2F0YWxvZy9wcm9kdWN0L2NhY2hlL2UxODljY2FiMGIzMWM5M2ZkYTgxNjJjZDMzMTM1ZjA5LzQvNS80NWNjZTM2YWQ3MzNiMDFlYzFmZThiMjZmMTM1OTg1MTQ5OWY2OWNlX2VkYmZhNmU1MWMwNjBmNWIyZGJmYzljNWQ5MTk4MjBhNDUyMTI2YTNfUl9OT1pfMDJfYV9SLnRpZi53ZWJw'},
        {imgUrl: 'https://imgproxy.rawlplug.com/rt:auto/w:1296/h:736/g:ce/el:true/dpr:1/aHR0cHM6Ly9yYXdscGx1Zy5jb20vbWVkaWEvY2F0YWxvZy9wcm9kdWN0L2NhY2hlL2UxODljY2FiMGIzMWM5M2ZkYTgxNjJjZDMzMTM1ZjA5L2QvMi9kMmI4YWRjOTA4ZGIxMDczM2FkNmRmMGM2NzA5ZDVmZGVlY2ZhZmU1XzVlOTc5MmIyNDZmNWUyYWY3NDQ3NTAxNGU2MTNlNWZjZWY1NjU0ZTZfUl9OT1pfMDFfYV9SLnRpZi53ZWJw'},
    ]
    const barrelArray = [
        {imgUrl: 'https://atlas-content-cdn.pixelsquid.com/stock-images/black-barrel-mdKWMNF-600.jpg'},
        {imgUrl: 'https://www.seekpng.com/png/detail/74-743266_black-oil-barrel-and-barrels-png-png-images.png'},
    ]

    switch (item.type) {
        case 'Noz':
            return nozleArray
        case 'Barrel':
            return barrelArray
        case 'Cartridge':
            return nozleArray
        default:
            return nozleArray
    }
}