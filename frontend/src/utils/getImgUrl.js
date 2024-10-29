function getImgUrl(name) {
    return new URL(`../assets/Books-Images/${name}`, import.meta.url)
}

export { getImgUrl }