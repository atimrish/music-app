export const formatMilliseconds = (ms: number): string => {
    const allSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(allSeconds / 60)
    const seconds = allSeconds % 60
    return minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0')
}