export function getImg ({item}) {
    switch (item.type) {
        case 'Noz':
            return 'https://www.wireropeshop.co.uk/media/catalog/product/cache/4db29054caf4f786959cb8399a7c9f27/t/h/thumbnail_img_4672.jpg'
        case 'Barrel':
            return 'https://atlas-content-cdn.pixelsquid.com/stock-images/metal-barrel-steel-y1ME6PC-600.jpg'
        case 'Cartridge':
            return 'https://imgproxy.rawlplug.com/rt:auto/w:648/h:368/g:ce/el:true/dpr:1/aHR0cHM6Ly9yYXdscGx1Zy5jb20vbWVkaWEvY2F0YWxvZy9wcm9kdWN0L2NhY2hlL2UxODljY2FiMGIzMWM5M2ZkYTgxNjJjZDMzMTM1ZjA5LzkvYS85YTZlMTI3YzA2ZDQ0ZTIyMDg0YTdkOWI4MzVjZjM5MTIzMTA3YjNiX2I2ZDMxOTExNjg1NWUzODVkODQ2MzVmY2M5YWI1ODQ3MTU2MDkwN2VfUl9DRlNfS0VSSUlfMDFfYS5wc2Qud2VicA=='
        default:
            return 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png'
    }
}