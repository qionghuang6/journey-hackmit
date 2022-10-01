const getApiUrl = (path) => {
    return `${process.env.NEXT_PUBLIC_API_URL}${path}`
}

export default getApiUrl